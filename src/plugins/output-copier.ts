// Copy integrations output
// It's a known problem on Astro v5, causing output-dependened integrations
// files missing on the final build.
// This plugin helps to copy the output files to the final build.
// See:
// - https://github.com/withastro/astro/issues/12663
// - https://github.com/withastro/adapters/issues/445

import { cp, readdir } from 'node:fs/promises'
import * as path from 'node:path'
import type { AstroIntegration, AstroIntegrationLogger } from 'astro'

const copierTasks = {
  sitemap: sitemapCopier,
  pagefind: pagefindCopier
}

export type OutputCopierOptions = {
  integ: Array<'sitemap' | 'pagefind'>,
  staticMode?: boolean
}

export const outputCopier = (
  opts: OutputCopierOptions = { integ: ['sitemap'] }
): AstroIntegration => ({
  name: 'output-copier',
  hooks: {
    'astro:build:done': async ({ logger }) => {
      const buildLogger = logger.fork('output-copier')
      buildLogger.info('Copying output files from dist to vercel out')

      await Promise.all(
        opts.integ.map(async (integ) => {
          const copier = copierTasks[integ]
          if (copier) {
            await copier(buildLogger, opts.staticMode)
          } else {
            buildLogger.warn(`No copier found for integration: ${integ}`)
          }
        })
      )
    }
  }
})

async function sitemapCopier(logger: AstroIntegrationLogger, staticMode?: boolean) {
  logger.info('[sitemap] Copying XML files to .vercel/output/static')
  try {
    // 在静态模式下，文件直接放在dist目录而不是dist/client
    const baseDir = staticMode ? './dist' : './dist/client'
    const files = await readdir(baseDir)
    const xmlFiles = files.filter(
      (file) =>
        path.extname(file).toLowerCase() === '.xml' &&
        path.basename(file).toLowerCase().startsWith('sitemap')
    )
    logger.info(xmlFiles.join(', '))
    await Promise.all(
      xmlFiles.map(async (file) => {
        const sourcePath = path.join(baseDir, file)
        const destPath = path.join('./.vercel/output/static', file)
        await cp(sourcePath, destPath)
      })
    )
  } catch (error) {
    logger.error(`[sitemap] Error copying files: ${error}`)
  }
}

async function pagefindCopier(logger: AstroIntegrationLogger, staticMode?: boolean) {
  logger.info('[pagefind] Copying pagefind folder to .vercel/output/static')
  // 在静态模式下，文件直接放在dist目录而不是dist/client
  const sourcePath = staticMode ? './dist/pagefind' : './dist/client/pagefind'
  const destPath = './.vercel/output/static/pagefind'
  try {
    await cp(sourcePath, destPath, { recursive: true })
  } catch (error) {
    logger.error(`[pagefind] Error copying folder: ${error}`)
  }
}
