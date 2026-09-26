/**
 * Site Configuration & Content Data for Miss Yanyan (妍妍女王)
 * -------------------------------------------------------------
 * 高冷女王支配 • ATM奴金融上交 • 高定置装心愿清单
 */

export interface WardrobeItem {
  id: string;
  name: string;
  category: '高定礼服' | '乳胶与皮革' | '鞋履' | '奢华内衣' | '仪式配饰' | 'Couture' | 'Leather & Latex' | 'Footwear' | 'Lingerie' | 'Accessories';
  price: number;
  currency?: string;
  description: string;
  image: string;
  status: 'Available' | 'Tributed' | 'Most Wanted';
  brand?: string;
  tributeLink?: string;
}

export interface TributeTier {
  id: string;
  title: string;
  amount: number;
  currency?: string;
  iconName: string;
  description: string;
  perks: string[];
}

export const SITE_CONFIG = {
  // 品牌与形象
  mistressName: "妍妍女王 (Miss Yanyan)",
  shortName: "妍妍女王",
  title: "妍妍女王 Miss Yanyan - 女S专收ATM奴 • 绝对主宰金库",
  tagline: "绝对主宰 • 专收ATM奴 • 放弃人格沦为提款畜生",
  bio: "女S 😈 出原味🉑定制，专收纯种ATM奴。线下可足、调（无性无裸）4爱、前高、恋足、羞辱、pegging、龟责、榨精。不傻逼的抓紧滚，进门吐10，一分钟不吐直接踹！进来之后你就不是人，彻底放弃人格，成为纯粹的提款畜生！",
  locations: ["伦敦", "巴黎", "全球线上极恶调教"],

  // 官方钱包供奉收款地址 (EVM / TRX / SOL / TON 独立与共享地址池)
  paymentAddresses: {
    EVM: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    ETH: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    BSC: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    ARB: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    BASE: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    OP: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    POL: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    AVAX: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    TRX: "TFzEPofUYVtq9ZGiZS75zJf5X8C6JGfoXi",
    SOL: "CTcrqkMoxk5rqXNcdE3mN8BPh4LnCyK6YUSCF5zQqTsa",
    TON: "UQBC3hBjmi4jaDMuYxBABp9gGqMC1WBnLWAo0WywwVAyuw76"
  },
  tags: [
    "出原味🉑定制", "专收纯种ATM奴", "线下可足", "无性无裸4爱",
    "前高", "恋足", "极限羞辱", "Pegging", "龟责", "榨精",
    "ATM转盘", "敷衍聊天", "黑心银行", "贡猪", "黑心洗脑PUA", "全程语音"
  ],

  // 女王铁律六条（凶狠粗暴规训）
  houseRules: [
    { num: "01", title: "只要白痴傻逼狗", text: "不傻逼的抓紧滚，本女王没闲工夫陪正常人过家家！" },
    { num: "02", title: "进门🚪10", text: "进门直接上交，一分钟不吐门槛直接踹出拉黑！" },
    { num: "03", title: "恶魔专属项目", text: "可玩ATM转盘、敷衍聊天、黑心银行、贡猪、诅咒全家、黑心洗脑、PUA傻逼，全程冷酷语音虐杀！" },
    { num: "04", title: "反向戒断治疗", text: "也可以治疗贡瘾🖤 让你彻底倾家荡产、欲罢不能。" },
    { num: "05", title: "彻底放弃人格", text: "进来之后你就不是个人，剥夺所有尊严，沦为没有思想的提款畜生！" },
    { num: "06", title: "认脚底亲妈", text: "想认脚底亲妈的狗奴，跪着把门槛吐干净了再滚进来！" }
  ],
  
  // 支付与供奉地址 (钱包与心愿单) - 参考 E-Commerce/Sim 地址与二维码配置
  crypto: {
    evmAddress: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    ethAddress: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32", // Ethereum (ETH / USDT-ERC20)
    solAddress: "CTcrqkMoxk5rqXNcdE3mN8BPh4LnCyK6YUSCF5zQqTsa", // Solana (SOL / USDC)
    trxAddress: "TFzEPofUYVtq9ZGiZS75zJf5X8C6JGfoXi",          // TRON (TRX / USDT-TRC20)
    tonAddress: "UQBC3hBjmi4jaDMuYxBABp9gGqMC1WBnLWAo0WywwVAyuw76", // TON Network
    addresses: {
      TRX: "TFzEPofUYVtq9ZGiZS75zJf5X8C6JGfoXi",
      ETH: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
      BSC: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
      SOL: "CTcrqkMoxk5rqXNcdE3mN8BPh4LnCyK6YUSCF5zQqTsa",
      TON: "UQBC3hBjmi4jaDMuYxBABp9gGqMC1WBnLWAo0WywwVAyuw76",
      ARB: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
      BASE: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
      OP: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
      POL: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
      AVAX: "0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32",
    },
    qrCodes: {
      TRX: "/others/TFzEPofUYVtq9ZGiZS75zJf5X8C6JGfoXi.webp",
      ETH: "/others/0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32.webp",
      BSC: "/others/0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32.webp",
      SOL: "/others/CTcrqkMoxk5rqXNcdE3mN8BPh4LnCyK6YUSCF5zQqTsa.webp",
      TON: "/others/UQBC3hBjmi4jaDMuYxBABp9gGqMC1WBnLWAo0WywwVAyuw76.webp",
      ARB: "/others/0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32.webp",
      BASE: "/others/0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32.webp",
      OP: "/others/0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32.webp",
      POL: "/others/0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32.webp",
      AVAX: "/others/0x7e16129dbd6841f21e2e21ba6f0cfc519c2b9c32.webp",
    }
  },
  wechatPayQRCode: "/images/payment/wechat-qr.png",
  throneWishlistUrl: "https://throne.com/missyanyan",
  emailContact: "",
  
  // 极简高冷导航（单一入口，无重复Tab）
  navItems: [
    { name: '女王殿堂', path: '/home' },
    { name: '金库上交 & 高定心愿', path: '/wardrobe', highlight: true },
  ],

  // 纯现金上交档位（对齐经典手游 6/8 氪金阶梯，ATM奴纯金钱进贡）
  tributeTiers: [
    {
      id: "tier-coffee",
      title: "晨间恩赏 • 咖啡与日常特许",
      amount: 68,
      currency: "¥",
      iconName: "Coffee",
      description: "允许你为女王开启精致奢华的晨间咖啡。一份无需多言的微薄上交，换取被记住的资格。",
      perks: ["进入女王私人视野名单", "享受被女王视若尘埃的被动恩赐"]
    },
    {
      id: "tier-stockings",
      title: "足尖私享 • 高定真丝与指尖恩宠",
      amount: 168,
      currency: "¥",
      iconName: "Sparkles",
      description: "资助场景所用的顶级意大利真丝连裤袜与高定沙龙美甲。让你的上交化作紧贴女王肌肤的织物。",
      perks: ["独家大片专属提及", "从属印记记录"]
    },
    {
      id: "tier-dinner",
      title: "名庄香槟 • 奢靡晚宴买单特权",
      amount: 328,
      currency: "¥",
      iconName: "Wine",
      description: "为女王在顶级米其林餐厅与年份香槟买单。没有任何索取，上交即是你的最高奖赏。",
      perks: ["私信与沟通队列极速特权", "专属高冷私密指令"]
    },
    {
      id: "tier-couture",
      title: "高定战袍 • 核心专项基金",
      amount: 648,
      currency: "¥",
      iconName: "Crown",
      description: "经典648旗舰单笔上交。直接用于资助专属定制压模乳胶或设计师高定大作，将你的金钱塑造成女王的权威披风。",
      perks: ["提前解锁新战袍独家高清大片", "女王亲自下达专属定制服从任务"]
    },
    {
      id: "tier-goddess",
      title: "至尊提款金主 • 终极金库上交",
      amount: 1688,
      currency: "¥",
      iconName: "Gem",
      description: "专为顶级ATM奴设立的无上限崇拜门槛。你只负责源源不断地上交金钱，让奢靡成为女王的日常。",
      perks: ["永久雕刻于至尊金主荣耀榜首", "独享女王专属VIP一对一沟通通道", "女王私藏高冷专属致谢"]
    }
  ] as TributeTier[],

  // 衣橱心愿单单品（精准保留4件指定单品与指定价格）
  wardrobeItems: [
    {
      id: "w-01",
      name: "黑色图案连裤袜",
      category: "奢华内衣",
      price: 368,
      currency: "¥",
      description: "Nero精选暗夜花纹连裤袜。薄如蝉翼的包裹，彰显女王冷冽修长曲线的艺术品。",
      image: "/images/wardrobe/1-黑色图案连裤袜-Quirky Pattern Tights.webp",
      status: "Available",
      brand: "Designer Hosiery"
    },
    {
      id: "w-03",
      name: "定制牛皮九尾鞭",
      category: "仪式配饰",
      price: 168,
      currency: "¥",
      description: "头层纯黑真牛皮手工精编九尾鞭，冷硬与狂热的交融。仅用于树立绝对的秩序与规训。",
      image: "/images/wardrobe/3-定制牛皮九尾鞭-Personalized Cat O Nine Flogger.webp",
      status: "Available",
      brand: "Bespoke Fetish"
    },
    {
      id: "w-02",
      name: "皮革BDSM套装",
      category: "乳胶与皮革",
      price: 498,
      currency: "¥",
      description: "大师级手工剪裁重工皮革套装。纯粹的金属扣件与冷感皮革，凝聚女王不可撼动的威权。",
      image: "/images/wardrobe/2-皮革BDSM套装-Leather BDSM Set.webp",
      status: "Most Wanted",
      brand: "Premium Leather"
    },
    {
      id: "w-06",
      name: "金属雕塑跟细高跟鞋",
      category: "鞋履",
      price: 998,
      currency: "¥",
      description: "先锋建筑雕塑金属跟晚宴浅口高跟鞋。将锋芒与优雅合二为一的足尖艺术。",
      image: "/images/wardrobe/6-金属雕塑跟细高跟鞋-Sculpted Metal Heel Pumps.webp",
      status: "Most Wanted",
      brand: "Avant-Garde Heels"
    }
  ] as WardrobeItem[],

  // 功德榜 / 实时上交金库记录（丰富轮播数据，滚动条展示）
  recentTributes: [
    { name: "神豪提款机 #01", item: "金属雕塑跟细高跟鞋", amount: "¥998", time: "刚刚", note: "自愿为女王买单战靴，请狠狠踩在我的胸膛。" },
    { name: "专属钱包奴 K.", item: "高定战袍 • 核心专项基金", amount: "¥648", time: "3分钟前", note: "已全额上交，女王的奢华生活是我唯一的意义。" },
    { name: "低贱臣服者 C.", item: "黑色图案连裤袜", amount: "¥368", time: "9分钟前", note: "微薄诚意，敬献女王玉足。" },
    { name: "自律买单者 L.", item: "皮革BDSM套装", amount: "¥498", time: "18分钟前", note: "只为女王穿上最冷酷的战甲，静待受训。" },
    { name: "奴仆 M.", item: "定制牛皮九尾鞭", amount: "¥168", time: "25分钟前", note: "自备皮鞭上交，甘愿承受女王的一切戒律。" },
    { name: "顶级ATM #09", item: "至尊提款金主 • 终极金库上交", amount: "¥1688", time: "42分钟前", note: "今日额度已刷新，自觉双手奉上金库。" },
    { name: "匿名付款猪", item: "晨间恩赏 • 咖啡与日常特许", amount: "¥68", time: "1小时前", note: "每天为女王开启精致咖啡是我最大的奖赏。" },
    { name: "跪拜者 Alex", item: "足尖私享 • 高定真丝与指尖恩宠", amount: "¥168", time: "1小时前", note: "求女王践踏，绝不敢有任何多余妄想。" },
    { name: "工蜂奴 #127", item: "名庄香槟 • 奢靡晚宴买单特权", amount: "¥328", time: "2小时前", note: "工资全额上交，为女王奢华晚宴买单。" },
    { name: "忠诚金主 #042", item: "金属雕塑跟细高跟鞋", amount: "¥998", time: "3小时前", note: "高跟鞋是女王的权杖，为女王买单是我的本分。" },
    { name: "永久提款器", item: "高定战袍 • 核心专项基金", amount: "¥648", time: "4小时前", note: "已连续上交第15期，求女王冷眼过目。" },
    { name: "盲目服从者", item: "皮革BDSM套装", amount: "¥498", time: "5小时前", note: "不需要女王理我，只要女王金库充盈即可。" }
  ]
};
