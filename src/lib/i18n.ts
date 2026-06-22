/**
 * Shared UI strings for the bilingual site (English / 中文).
 *
 * Only chrome strings live here — nav labels, footer, the CTA band. Page body
 * copy stays inline in each page tree (en in src/pages/, zh in src/pages/zh/).
 *
 * URLs are kept constant across languages for now: Chinese labels point at the
 * existing English sub-pages until those get their own /zh/ versions.
 */
export type Lang = "en" | "zh" | "ru" | "ja" | "ko";

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
      oem: "Private Label Manufacturing",
      customization: "Product Customization",
      products: "Products",
      ownProducts: "Own Products",
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
      oemShort: "Private Label Manufacturing",
      allProducts: "All Products",
      noodleProducts: "Noodle Products",
      flourProducts: "Flour Products",
      specifications: "Specifications",
      startProject: "Start a Private Label Project",
      requestSamples: "Request Samples",
      latestNews: "Latest News",
      rights: "© 2026 Lisheng. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms",
    },
    cta: {
      kicker: "Ready for private label noodle production?",
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
      oem: "产品代加工",
      customization: "产品定制",
      products: "产品",
      ownProducts: "自营产品",
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
      oemShort: "产品代加工",
      allProducts: "全部产品",
      noodleProducts: "挂面产品",
      flourProducts: "面粉产品",
      specifications: "规格样品",
      startProject: "启动代加工项目",
      requestSamples: "索取样品",
      latestNews: "最新动态",
      rights: "© 2026 利生集团 版权所有",
      privacy: "隐私政策",
      terms: "使用条款",
    },
    cta: {
      kicker: "准备启动挂面代加工生产？",
      title: "携手打造您的自有品牌挂面项目。",
      text: "告诉我们您的目标市场、产品构想与预期产量，我们的出口团队将为您提供切实可行的生产方案。",
      button: "立即联系我们",
      secondary: "定制您的产品",
    },
  },
  ru: {
    htmlLang: "ru",
    nav: {
      home: "Главная",
      company: "Компания",
      about: "О компании",
      honors: "Награды и сертификаты",
      subsidiaries: "Дочерние компании",
      factory: "Производство",
      smartFactory: "Умный завод",
      foodLab: "Пищевая лаборатория",
      certifications: "Сертификация продукции",
      factoryTour: "Экскурсия по заводу",
      services: "Услуги",
      oem: "Контрактное производство",
      customization: "Индивидуальная разработка",
      products: "Продукция",
      ownProducts: "Собственная продукция",
      noodleProducts: "Продукция из лапши",
      flourProducts: "Мучная продукция",
      partner: "Партнёрское сотрудничество",
      specifications: "Образцы и спецификации",
      news: "Новости",
      contact: "Контакты",
    },
    quote: "Запросить расчёт",
    footer: {
      desc: "Производство лапши на экспорт, выпуск продукции под частной маркой и упаковочные решения для мировых пищевых брендов, импортёров и дистрибьюторов сегмента HoReCa.",
      company: "Компания",
      factory: "Производство",
      services: "Услуги",
      products: "Продукция",
      contact: "Контакты",
      news: "Новости",
      about: "О компании",
      certifications: "Сертификаты",
      oemShort: "Контрактное производство",
      allProducts: "Вся продукция",
      noodleProducts: "Продукция из лапши",
      flourProducts: "Мучная продукция",
      specifications: "Спецификации",
      startProject: "Запустить проект под частной маркой",
      requestSamples: "Запросить образцы",
      latestNews: "Последние новости",
      rights: "© 2026 Lisheng. Все права защищены.",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
    },
    cta: {
      kicker: "Готовы запустить производство лапши под своей маркой?",
      title: "Создадим вашу линейку лапши под частной маркой.",
      text: "Расскажите о вашем рынке, идее продукта и целевых объёмах — наша экспортная команда подготовит практичное производственное предложение.",
      button: "Связаться с нами",
      secondary: "Настроить продукт",
    },
  },
  ja: {
    htmlLang: "ja",
    nav: {
      home: "ホーム",
      company: "会社情報",
      about: "会社概要",
      honors: "受賞・認証",
      subsidiaries: "グループ会社",
      factory: "工場",
      smartFactory: "スマート工場",
      foodLab: "食品ラボ",
      certifications: "製品認証",
      factoryTour: "工場見学",
      services: "サービス",
      oem: "OEM受託製造",
      customization: "製品カスタマイズ",
      products: "製品",
      ownProducts: "自社製品",
      noodleProducts: "麺製品",
      flourProducts: "小麦粉製品",
      partner: "パートナー協業",
      specifications: "サンプル仕様",
      news: "ニュース",
      contact: "お問い合わせ",
    },
    quote: "お見積もり依頼",
    footer: {
      desc: "世界の食品ブランド・輸入業者・外食流通向けに、輸出対応の麺受託製造、プライベートブランド生産、包装サポートを提供します。",
      company: "会社情報",
      factory: "工場",
      services: "サービス",
      products: "製品",
      contact: "お問い合わせ",
      news: "ニュース",
      about: "会社概要",
      certifications: "製品認証",
      oemShort: "OEM受託製造",
      allProducts: "全製品",
      noodleProducts: "麺製品",
      flourProducts: "小麦粉製品",
      specifications: "仕様",
      startProject: "プライベートブランド案件を始める",
      requestSamples: "サンプル請求",
      latestNews: "最新ニュース",
      rights: "© 2026 利生グループ。無断転載を禁じます。",
      privacy: "プライバシーポリシー",
      terms: "利用規約",
    },
    cta: {
      kicker: "プライベートブランドの麺製造をお考えですか？",
      title: "プライベートブランドの麺プログラムを共に構築しましょう。",
      text: "市場、製品アイデア、目標数量をお知らせください。当社の輸出チームが実践的な製造提案をご提示します。",
      button: "今すぐお問い合わせ",
      secondary: "製品をカスタマイズ",
    },
  },
  ko: {
    htmlLang: "ko",
    nav: {
      home: "홈",
      company: "회사 소개",
      about: "회사 개요",
      honors: "수상 · 인증",
      subsidiaries: "계열사",
      factory: "공장",
      smartFactory: "스마트 공장",
      foodLab: "식품 연구소",
      certifications: "제품 인증",
      factoryTour: "공장 견학",
      services: "서비스",
      oem: "OEM 위탁 생산",
      customization: "제품 맞춤 제작",
      products: "제품",
      ownProducts: "자사 제품",
      noodleProducts: "면 제품",
      flourProducts: "밀가루 제품",
      partner: "파트너 협업",
      specifications: "샘플 사양",
      news: "뉴스",
      contact: "문의하기",
    },
    quote: "견적 요청",
    footer: {
      desc: "전 세계 식품 브랜드·수입업체·외식 유통을 위한 수출 대응 면 위탁 생산, PB 생산, 포장 지원을 제공합니다.",
      company: "회사 소개",
      factory: "공장",
      services: "서비스",
      products: "제품",
      contact: "문의하기",
      news: "뉴스",
      about: "회사 개요",
      certifications: "제품 인증",
      oemShort: "OEM 위탁 생산",
      allProducts: "전체 제품",
      noodleProducts: "면 제품",
      flourProducts: "밀가루 제품",
      specifications: "사양",
      startProject: "PB 프로젝트 시작하기",
      requestSamples: "샘플 요청",
      latestNews: "최신 뉴스",
      rights: "© 2026 Lisheng 그룹. 무단 전재를 금합니다.",
      privacy: "개인정보 처리방침",
      terms: "이용약관",
    },
    cta: {
      kicker: "PB 면 생산을 고려하고 계신가요?",
      title: "PB 면 프로그램을 함께 만들어 갑시다.",
      text: "시장, 제품 아이디어, 목표 수량을 알려주세요. 당사 수출팀이 실질적인 생산 제안을 드립니다.",
      button: "지금 문의하기",
      secondary: "제품 맞춤 제작",
    },
  },
} as const;

export function getUI(lang: Lang) {
  return ui[lang] ?? ui.en;
}

// Display order + labels for the language switcher. English is the base tree at
// `/`; every other language lives under `/<code>/`. Add a language here once its
// page tree exists and the switcher picks it up everywhere automatically.
export const langOrder: Lang[] = ["en", "zh", "ru", "ja", "ko"];
export const langLabels: Record<Lang, string> = {
  en: "EN",
  zh: "中文",
  ru: "Русский",
  ja: "日本語",
  ko: "한국어",
};

// Routes that have a translated version under /<code>/. English is the base, so
// it is implicitly "ready" for everything. Header and Footer use `localizeHref`
// to point links at the localized page; anything not listed falls back to the
// shared English page. Add routes here as the matching page is built — nav and
// footer pick it up automatically.
export const readyByLang: Record<Exclude<Lang, "en">, Set<string>> = {
  zh: new Set<string>([
    "/",
    "/company/",
    "/company/honors/",
    "/company/subsidiaries/",
    "/factory/production/",
    "/factory/lab/",
    "/factory/certificates/",
    "/services/",
    "/services/customization/",
    "/contact/",
    "/products/",
    "/products/specifications/",
    "/news/",
  ]),
  // Russian: full site except News (News stays English for now).
  ru: new Set<string>([
    "/",
    "/company/",
    "/company/honors/",
    "/company/subsidiaries/",
    "/factory/production/",
    "/factory/lab/",
    "/factory/certificates/",
    "/services/",
    "/services/customization/",
    "/contact/",
    "/products/",
    "/products/specifications/",
  ]),
  // Japanese: full site except News (News stays English for now).
  ja: new Set<string>([
    "/",
    "/company/",
    "/company/honors/",
    "/company/subsidiaries/",
    "/factory/production/",
    "/factory/lab/",
    "/factory/certificates/",
    "/services/",
    "/services/customization/",
    "/contact/",
    "/products/",
    "/products/specifications/",
  ]),
  // Korean: full site except News (News stays English for now).
  ko: new Set<string>([
    "/",
    "/company/",
    "/company/honors/",
    "/company/subsidiaries/",
    "/factory/production/",
    "/factory/lab/",
    "/factory/certificates/",
    "/services/",
    "/services/customization/",
    "/contact/",
    "/products/",
    "/products/specifications/",
  ]),
};

function isReady(route: string, lang: Lang): boolean {
  if (lang === "en") return true;
  return readyByLang[lang]?.has(route) ?? false;
}

export function localizeHref(href: string, lang: Lang): string {
  if (lang === "en") return href;
  const route = href.split("#")[0];
  if (!isReady(route, lang)) return href;
  return route === "/" ? `/${lang}/` : `/${lang}${href}`;
}

// Split a pathname into its language and the canonical (English) route, so the
// switcher can map the current page to its equivalent in every language.
export function splitLangPath(pathname: string): { lang: Lang; route: string } {
  for (const code of langOrder) {
    if (code === "en") continue;
    if (pathname === `/${code}` || pathname === `/${code}/`) {
      return { lang: code, route: "/" };
    }
    if (pathname.startsWith(`/${code}/`)) {
      return { lang: code, route: pathname.slice(code.length + 1) };
    }
  }
  return { lang: "en", route: pathname };
}

export interface LangAlternate {
  code: Lang;
  label: string;
  href: string;
  current: boolean;
}

// All languages for the current page. A language that lacks this exact route
// (e.g. News in Russian) falls back to that language's home page.
export function languageAlternates(pathname: string): LangAlternate[] {
  const { lang: current, route } = splitLangPath(pathname);
  return langOrder.map((code) => {
    const href = isReady(route, code)
      ? localizeHref(route, code)
      : code === "en"
        ? "/"
        : `/${code}/`;
    return { code, label: langLabels[code], href, current: code === current };
  });
}
