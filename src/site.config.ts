import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  // === 基础配置 ===
  /** 网站标题，将用于元数据和浏览器标签标题 */
  title: '我的个人主页',
  /** 将用于首页和版权声明 */
  author: '张洪瑞',
  /** 网站的元数据描述，可用于页面元数据 */
  description: '这是我的个人主页，欢迎访问！',
  /** 网站的默认图标，应该是 `public/` 目录中图片的路径 */
  favicon: '/favicon/favicon.ico',
  /** 指定网站的默认语言 */
  locale: {
    lang: 'zh-CN',
    attrs: 'zh_CN',
    // 日期本地化
    dateLocale: 'zh-CN',
    dateOptions: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  },
  /** 设置首页显示的logo图片 */
  logo: {
    src: 'src/assets/logo.jpg',
    alt: '头像'
  },

  // === 全局配置 ===
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',

  // 仍在测试中
  head: [
    /* Telegram 频道 */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [],

  /** 配置网站的头部 */
  header: {
    menu: [
      { title: 'blog', link: '/blog' },
      // { title: '项目', link: '/projects' },
      // { title: '友链', link: '/links' },
      { title: 'about', link: '/about' }
    ]
  },

  /** 配置网站的底部 */
  footer: {
    // ICP备案信息（可选）
    registration: {
      url: '',
      text: ''
    },
    /** 在网站底部启用显示 "Astro & Pure theme powered" 链接 */
    credits: true,
    /** 可选的社交媒体账号信息 */
    social: { 
      github: 'https://github.com/xhdr0618',
      email: 'mailto:your.email@example.com'  // 请替换为您的实际邮箱
    }
  },

  content: {
    externalLinksContent: ' ↗',
    /** 博客分页大小（可选） */
    blogPageSize: 8,
    externalLinkArrow: true, // 显示外部链接箭头
    // 目前支持微博、X、蓝空
    share: ['weibo', 'x']
  }
}

export const integ: IntegrationUserConfig = {
  // 链接管理
  // 参见: https://astro-pure.js.org/docs/integrations/links
  links: {
    // 友链日志
    logbook: [
      { date: '2024-04-13', content: '欢迎来到我的个人主页！' }
    ],
    // 您的链接信息
    applyTip: [
      { name: '名称', val: theme.title },
      { name: '描述', val: theme.description || 'Null' },
      { name: '链接', val: '您的网站地址' },
      { name: '头像', val: '您的头像地址' }
    ]
  },
  // 启用页面搜索功能
  pagefind: true,
  // 在页脚添加随机引用（默认在首页页脚）
  // 参见: https://astro-pure.js.org/docs/integrations/advanced#web-content-render
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'
    // https://github.com/lukePeavey/quotable
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || 'Error'`
  },
  // Tailwindcss 排版
  // 参见: https://astro-pure.js.org/docs/integrations/others#tailwindcsstypography
  typography: {
    // https://github.com/tailwindlabs/tailwindcss-typography
    class: 'prose text-base text-muted-foreground'
  },
  // 可以添加缩放效果的灯箱库
  // 参见: https://astro-pure.js.org/docs/integrations/others#medium-zoom
  mediumZoom: {
    enable: true, // 禁用将不会加载整个库
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // 评论系统
  waline: {
    enable: true,
    // 服务器服务链接
    server: 'https://astro-theme-pure-waline.arthals.ink/',
    // 参考 https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo'],
    // 参考 https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      // search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: '欢迎评论（填写邮箱可收到回复，无需登录）'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: '条款内容',
  list: [
    {
      title: '隐私政策',
      link: '/terms/privacy-policy'
    },
    {
      title: '条款和条件',
      link: '/terms/terms-and-conditions'
    },
    {
      title: '版权',
      link: '/terms/copyright'
    },
    {
      title: '免责声明',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
