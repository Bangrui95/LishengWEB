/**
 * Shared UI strings for the bilingual site (English / 中文).
 *
 * Only chrome strings live here — nav labels, footer, the CTA band. Page body
 * copy stays inline in each page tree (en in src/pages/, zh in src/pages/zh/).
 *
 * URLs are kept constant across languages for now: Chinese labels point at the
 * existing English sub-pages until those get their own /zh/ versions.
 */
export type Lang = "en" | "zh";

export const ui = {
  en: {
    htmlLang: "en",
    nav: {
      home: "Home",
      company: "Company",
      about: "About",
      honors: "Honors & Awards",
      subsidiaries: "Subsidiaries",
      factory: "Factory",
      smartFactory: "Smart Factory",
      foodLab: "Food Lab",
      certifications: "Product Certifications",
      factoryTour: "Factory Tour",
      services: "Services",
      oem: "OEM Manufacturing",
      customization: "Product Customization",
      products: "Products",
      noodleProducts: "Noodle Products",
      flourProducts: "Flour Products",
      partner: "Partner Collaborations",
      specifications: "Sample Specifications",
      news: "News",
      contact: "Contact",
    },
    quote: "Request a Quote",
    langCurrent: "EN",
    langOther: "中文",
    footer: {
      desc: "Export-ready noodle manufacturing, private label production, and packaging support for global food brands, importers, and foodservice distributors.",
      company: "Company",
      factory: "Factory",
      services: "Services",
      products: "Products",
      contact: "Contact",
      news: "News",
      about: "About us",
      certifications: "Certifications",
      oemShort: "OEM Manufacturing",
      noodleProducts: "Noodle Products",
      flourProducts: "Flour Products",
      specifications: "Specifications",
      startProject: "Start an OEM Project",
      requestSamples: "Request Samples",
      latestNews: "Latest News",
      rights: "© 2026 Lisheng. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms",
    },
    cta: {
      kicker: "Ready for OEM noodle production?",
      title: "Let’s build your private label noodle program.",
      text: "Tell us about your market, product idea and target volume — our export team will come back with a practical manufacturing proposal.",
      button: "Contact us today",
      secondary: "Customize Your Product",
    },
  },
  zh: {
    htmlLang: "zh-CN",
    nav: {
      home: "首页",
      company: "公司",
      about: "公司简介",
      honors: "荣誉资质",
      subsidiaries: "下属公司",
      factory: "工厂",
      smartFactory: "智能工厂",
      foodLab: "食品实验室",
      certifications: "产品认证",
      factoryTour: "工厂参观",
      services: "服务",
      oem: "OEM 代加工",
      customization: "产品定制",
      products: "产品",
      noodleProducts: "挂面产品",
      flourProducts: "面粉产品",
      partner: "合作定制",
      specifications: "规格样品",
      news: "新闻",
      contact: "联系我们",
    },
    quote: "获取报价",
    langCurrent: "中文",
    langOther: "EN",
    footer: {
      desc: "为全球食品品牌、进口商与餐饮渠道商提供出口级挂面代加工、自有品牌生产与包装配套服务。",
      company: "公司",
      factory: "工厂",
      services: "服务",
      products: "产品",
      contact: "联系",
      news: "新闻",
      about: "公司简介",
      certifications: "产品认证",
      oemShort: "OEM 代加工",
      noodleProducts: "挂面产品",
      flourProducts: "面粉产品",
      specifications: "规格样品",
      startProject: "启动 OEM 项目",
      requestSamples: "索取样品",
      latestNews: "最新动态",
      rights: "© 2026 利生集团 版权所有",
      privacy: "隐私政策",
      terms: "使用条款",
    },
    cta: {
      kicker: "准备启动 OEM 挂面生产？",
      title: "携手打造您的自有品牌挂面项目。",
      text: "告诉我们您的目标市场、产品构想与预期产量，我们的出口团队将为您提供切实可行的生产方案。",
      button: "立即联系我们",
      secondary: "定制您的产品",
    },
  },
} as const;

export function getUI(lang: Lang) {
  return ui[lang] ?? ui.en;
}
