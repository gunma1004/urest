import type { Metadata } from "next";
import Link from "next/link";
import { ClientTextMixerInline } from "./ClientTextMixerInline";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

function safeDecode(str?: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

// 🌟 1. 수식어 300개 이상 풀 생성기 ('출장' 완전 배제)
function getModifiersPool(): string[] {
  const baseAdjectives = [
    "프라이빗한", "전문적인", "쾌적한 공간의", "안락한 분위기 속", "정성 어린 손길의", 
    "신뢰할 수 있는", "차분한 힐링", "품격 있는", "맞춤형 바디케어", "일상 회복을 위한",
    "엄선된 제휴점의", "편안한 휴식을 선사하는", "체계적인 프로그램의", "도심 속 오아시스", "부드러운 릴렉싱",
    "고품격 웰니스", "피로 회복 맞춤형", "안정감 있는", "조용하고 아늑한", "에너지 충전을 위한",
    "릴렉싱 바디케어", "프리미엄 힐링", "상쾌한 활력을 주는", "정성 가득한", "지친 몸을 위한"
  ];
  const intensityWords = [
    "깊은", "부드러운", "섬세한", "꼼꼼한", "완벽한", 
    "탁월한", "특별한", "차별화된", "노련한", "깔끔한",
    "포근한", "산뜻한"
  ];
  const pool: string[] = [];
  for (const adj of baseAdjectives) {
    for (const int of intensityWords) {
      pool.push(`${int} ${adj}`);
    }
  }
  return pool; // 총 300개 충족
}

// 🌟 2. 서비스 종류 150개 풀 생성기 ('마사지' 필수 포함, '출장' 배제)
function getServiceTypesPool(): string[] {
  const coreTechniques = ["스웨디시", "아로마", "타이", "스포츠", "힐링", "바디케어", "릴렉싱", "웰니스", "전문", "프리미엄", "감성", "토탈"];
  const styles = [
    "감성 마사지 코스", "맞춤형 마사지 프로그램", "전신 관리 마사지", "전문 테크닉 마사지", 
    "집중 이완 마사지", "릴렉스 마사지 과정", "힐링 마사지 프로그램", "프리미엄 바디 마사지", 
    "맞춤형 바디 마사지", "토탈 마사지 솔루션", "바디 릴렉싱 마사지", "시그니처 마사지"
  ];
  const pool: string[] = [];
  for (const tech of coreTechniques) {
    for (const style of styles) {
      pool.push(`${tech} 기반의 ${style}`);
      pool.push(`${tech} 전문 ${style}`);
      if (pool.length >= 150) break;
    }
    if (pool.length >= 150) break;
  }
  return pool;
}

// 🌟 3. 상세 설명 100개 풀 생성기 ('출장' 배제)
function getDescriptionsPool(): string[] {
  const actions = [
    "숙련된 테라피스트의 세심한 손길로 진행되는 전문 마사지 프로그램은", 
    "엄선된 제휴 샵에서 제공하는 맞춤형 마사지 서비스는", 
    "지친 일상 속에서 찾아가는 힐링 마사지 코스는", 
    "안락한 공간에서 즐기는 전문적인 테라피 마사지는", 
    "체계적인 프로그램을 통해 제공되는 프라이빗 마사지 솔루션은", 
    "부드러운 테크닉이 돋보이는 릴렉스 중심의 바디 마사지 안내는"
  ];
  const effects = [
    "몸과 마음의 피로를 부드럽게 씻어내 줍니다.",
    "온전한 휴식과 재충전의 시간을 선사합니다.",
    "지친 신체 리듬을 편안하게 되찾아드립니다.",
    "일상의 스트레스를 말끔히 해소해 줍니다.",
    "최상의 릴렉스와 안락함을 제공합니다.",
    "몸의 긴장을 풀고 가벼운 활력을 채워줍니다.",
    "오래도록 지속되는 편안한 안정감을 전해드립니다.",
    "누적된 근육의 긴장을 개운하게 이완시켜 줍니다."
  ];
  const pool: string[] = [];
  for (const act of actions) {
    for (const eff of effects) {
      pool.push(`${act} ${eff}`);
      if (pool.length >= 100) break;
    }
    if (pool.length >= 100) break;
  }
  return pool;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? safeDecode(resolvedSearchParams.dong) : "";
  const districtName = safeDecode(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const modifiersPool = getModifiersPool();
  const serviceTypesPool = getServiceTypesPool();
  const descriptionsPool = getDescriptionsPool();

  const seedString = locationKeyword + dongName + districtName + "urest_clean_seo";
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const modIndex = charSum % modifiersPool.length;
  const serviceIndex = (charSum * 3) % serviceTypesPool.length;
  const descIndex = (charSum * 7) % descriptionsPool.length;

  const selectedModifier = modifiersPool[modIndex];
  const selectedService = serviceTypesPool[serviceIndex];
  const selectedDesc = descriptionsPool[descIndex];

  // 🌟 샵 이름, 사이트 이름, '출장'이 완전히 배제된 조합형 메타 태그
  const finalTitle = `${simpleLocation} ${selectedModifier} 제휴점의 ${selectedService} - 유레스트`;
  const finalDescription = `${locationKeyword} 맞춤형 힐링 네트워크. ${selectedModifier} 진행되는 ${selectedService}. ${selectedDesc}`;

  return {
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    keywords: [
      `${simpleLocation} 타이 마사지`,
      `${simpleLocation} 아로마 마사지`,
      `${simpleLocation} 릴렉스 마사지`,
      `${simpleLocation} 스웨디시 마사지`,
      `${simpleLocation} 힐링 마사지`,
      `${simpleLocation} 전신 마사지`,
      `${simpleLocation} 24시 마사지`,
    ],
    alternates: {
      canonical: `https://urest-kr.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://urest-kr.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      siteName: "유레스트(Urest)",
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: "/og-main.webp",
          width: 1200,
          height: 630,
          alt: `${locationKeyword} 웰니스 테라피 - 유레스트`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? safeDecode(resolvedSearchParams.dong) : "";
  const districtName = safeDecode(district);
  const regionName = region === "seoul" ? "서울특별시" : region === "incheon" ? "인천광역시" : "경기도";
  
  const fullTitle = dongName 
    ? `${regionName} ${districtName} (${dongName})` 
    : `${regionName} ${districtName}`;

  const localShops = [
    {
      id: 1,
      name: `🏆 ${districtName} 한국골든테라피`,
      desc: "VIP 골든 릴렉싱 & 딥티슈 스트레칭 피로회복! 전문 베테랑 테라피스트의 품격 있는 1:1 맞춤 바디케어",
      phone: "0507-1280-3361",
      price: "110,000원부터~",
      image: "/shop3.jpg"
    },
    {
      id: 2,
      name: `🌸 ${districtName} 한국미인테라피`,
      desc: "최고급 천연 식물성 에센셜 오일을 활용한 아로마 테라피 & 림프 순환 케어 전문 프로그램",
      phone: "0507-1280-3303",
      price: "100,000원부터~",
      image: "/shop1.jpg"
    },
    {
      id: 3,
      name: `💎 ${districtName} 미인클럽테라피`,
      desc: "재방문율 1위 만족도! 철저한 위생 관리와 정통 릴렉싱 스트레칭 및 감성 스웨디시 프라이빗 힐링",
      phone: "0507-1280-3303",
      price: "60,000원부터~",
      image: "/shop2.jpg"
    },
    {
      id: 4,
      name: `👑 ${districtName} 퀸즈홈테라피`,
      desc: "여왕처럼 누리는 고품격 힐링! 건식 지압과 스웨디시를 결합한 체형 맞춤형 웰니스 시그니처 코스",
      phone: "0507-1280-3334",
      price: "60,000원부터~",
      image: "/shop5.jpg"
    },
    {
      id: 5,
      name: `🌙 ${districtName} 오늘밤테라피`,
      desc: "지친 하루의 긴장을 완화하는 감성 힐링 스웨디시 & 전신 릴렉스 바디 밸런스 프로그램",
      phone: "0507-1280-3223",
      price: "60,000원부터~",
      image: "/shop4.jpg"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": `${fullTitle} 웰니스 마사지 & 테라피 안내 - 유레스트`,
    "description": `${fullTitle} 지역 아로마 테라피 및 스웨디시 힐링 케어 공식 제휴업체 정보 안내`,
    "url": `https://urest-kr.netlify.app/${region}/${encodeURIComponent(districtName)}`,
    "telephone": "0507-1280-3361",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": districtName,
      "addressRegion": regionName,
      "addressCountry": "KR"
    }
  };

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] bg-gradient-to-b from-neutral-900 to-[#08080a]">
          <img 
            src="/banner.jpg" 
            alt={`${fullTitle} 웰니스 테라피 및 바디케어 안내`} 
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName.toUpperCase()} · LOCAL WELLNESS GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {fullTitle} 웰니스 테라피 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {fullTitle} 고객님을 위한 프리미엄 아로마 테라피, 스웨디시, 타이 릴렉싱 바디케어 가이드입니다. 투명한 표준 정찰제 요금표와 프로그램을 확인하세요.
            </p>
          </div>
        </section>

        <ClientTextMixerInline locationText={fullTitle} />

        <section className="space-y-6">
          <div className="text-center">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">RECOMMENDED PARTNERS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              {fullTitle} 추천 제휴센터 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localShops.map((lShop) => {
              const shopLink = dongName
                ? `/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${lShop.id}`
                : `/${region}/${encodeURIComponent(districtName)}/shop/${lShop.id}`;

              return (
                <div key={lShop.id} className="bg-[#121216] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative">
                  <Link href={shopLink} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세 코스 및 요금 보기`} />
                  
                  <img 
                    src={lShop.image} 
                    alt={lShop.name} 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform flex-shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                      {lShop.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                      {lShop.desc}
                    </p>
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400">{lShop.price}</span>
                      <a 
                        href={`tel:${lShop.phone.replace(/-/g, "")}`} 
                        className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all transform active:scale-95 relative z-20"
                      >
                        상담문의
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}