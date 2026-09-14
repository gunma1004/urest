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

// 🎯 스팸 키워드(출장, 방문, 24시, 선입금 등)를 완전히 배제한 클린 웰니스 패턴 20종
const CLEAN_WELLNESS_PATTERNS = [
  {
    title: (loc: string) => `${loc} 프리미엄 웰니스 마사지 & 바디 테라피 제휴 안내 - 유레스트`,
    desc: (loc: string) => `${loc} 엄선된 프리미엄 웰니스 마사지 제휴점 안내. 정갈한 바디케어 프로그램과 표준 정찰제 요금을 유레스트에서 확인하세요.`
  },
  {
    title: (loc: string) => `${loc} 스웨디시 테라피 & 감성 바디 릴렉스 가이드 | 유레스트`,
    desc: (loc: string) => `섬세한 터칭과 부드러운 압으로 전신 긴장을 완화하는 ${loc} 스웨디시 전문 제휴 센터 상세 코스별 비교.`
  },
  {
    title: (loc: string) => `${loc} 천연 아로마 오일 테라피 힐링 케어 추천 - 유레스트`,
    desc: (loc: string) => `순도 높은 식물성 에센셜 아로마 오일로 누적된 일상의 피로를 편안하게 해소하는 ${loc} 제휴 샵 안내.`
  },
  {
    title: (loc: string) => `${loc} 정통 타이 릴렉싱 스트레칭 & 바디케어 | 유레스트`,
    desc: (loc: string) => `체계적인 전신 이완 스트레칭을 통해 굳은 근육의 활력을 되찾아 드리는 ${loc} 웰니스 프로그램 정보.`
  },
  {
    title: (loc: string) => `${loc} 프라이빗 1:1 맞춤형 웰니스 테라피 큐레이션 - 유레스트`,
    desc: (loc: string) => `고객별 컨디션에 맞춘 독립된 휴식 솔루션. ${loc} 지역 공식 검증 제휴처 정보 총집합.`
  },
  {
    title: (loc: string) => `${loc} 딥티슈 집중 릴렉스 케어 및 요금 안내 | 유레스트`,
    desc: (loc: string) => `목과 어깨, 등의 뭉친 피로를 섬세하게 풀어주는 ${loc} 심층 릴렉스 바디 테라피 코스 가이드.`
  },
  {
    title: (loc: string) => `${loc} 림프 순환 케어 & 에스테틱 바디 솔루션 - 유레스트`,
    desc: (loc: string) => `체내 원활한 순환과 바디 밸런스 안정을 돕는 ${loc} 림프 테라피 및 표준 정찰제 안내.`
  },
  {
    title: (loc: string) => `${loc} 안심 표준 정찰제 힐링 마사지 제휴센터 | 유레스트`,
    desc: (loc: string) => `신뢰할 수 있는 투명한 표준 요금제와 쾌적한 환경을 갖춘 ${loc} 추천 바디케어 안내.`
  },
  {
    title: (loc: string) => `${loc} 바디 밸런스 트리트먼트 & 전신 스트레칭 - 유레스트`,
    desc: (loc: string) => `지친 심신에 활력을 충전해 드리는 ${loc} 전문 테라피스트의 품격 있는 힐링 프로그램.`
  },
  {
    title: (loc: string) => `${loc} VIP 시그니처 웰니스 바디 테라피 추천 | 유레스트`,
    desc: (loc: string) => `품격 있는 프라이빗 케어와 프리미엄 에센셜 오일로 완성하는 ${loc} 최상의 휴식 프로그램.`
  }
];

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? safeDecode(resolvedSearchParams.dong) : "";
  const districtName = safeDecode(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  const charSum = (locationKeyword + dongName + districtName + "urest_clean_seo").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = Math.abs(charSum) % CLEAN_WELLNESS_PATTERNS.length;

  const pattern = CLEAN_WELLNESS_PATTERNS[variantIndex];
  const finalTitle = pattern.title(simpleLocation);
  const finalDescription = pattern.desc(locationKeyword);

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [
      `${simpleLocation} 웰니스`,
      `${simpleLocation} 마사지`,
      `${simpleLocation} 테라피`,
      `${simpleLocation} 스웨디시`,
      `${simpleLocation} 아로마테라피`,
      `${simpleLocation} 바디케어`,
      `${locationKeyword} 힐링센터`,
      "유레스트"
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
        
        {/* 상단 지역 대표 배너 */}
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

        {/* 클라이언트 사이드 키워드 믹서 영역 */}
        <ClientTextMixerInline locationText={fullTitle} />

        {/* 제휴업체 5개 카드리스트 */}
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

        {/* 건강 칼럼 섹션 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base md:text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>🌿</span> {fullTitle} 웰니스 바디케어 & 스트레칭 건강 가이드
          </h3>
          <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
            <p>
              현대 직장인들이 장시간 앉아서 근무하거나 전자기기를 지속적으로 이용할 경우, 승모근과 목 주변 근육이 쉽게 경직되어 일상 피로를 유발합니다. 규칙적인 스트레칭과 전신 바디케어는 체내 순환을 원활하게 돕고 심신 안정에 기여합니다.
            </p>
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
              <h4 className="font-bold text-white text-xs">💡 나에게 맞는 웰니스 테라피 선택 기준</h4>
              <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                <li><strong className="text-gray-200">정통 타이 테라피:</strong> 견갑골과 하체의 경직된 부위를 시원하게 풀어주는 스트레칭 중심의 케어.</li>
                <li><strong className="text-gray-200">천연 아로마 케어:</strong> 은은한 에센셜 오일의 부드러운 압을 이용해 림프 순환과 심신 이완을 돕는 코스.</li>
                <li><strong className="text-gray-200">감성 스웨디시 케어:</strong> 부드러운 오일 터칭으로 깊은 안정감과 활력을 충전해 주는 인기 프로그램.</li>
              </ul>
            </div>
            <p className="text-gray-400 text-[11px]">
              * 본 콘텐츠는 {fullTitle} 주민 여러분의 건강한 휴식과 올바른 웰니스 정보 제공을 목적으로 작성되었습니다.
            </p>
          </div>
        </section>

        {/* 이용 방법 4단계 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 안심 이용 순서</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">지역 확인</h4>
              <p className="text-xs text-gray-400 mt-1">{fullTitle} 제휴 센터 목록을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">코스 비교</h4>
              <p className="text-xs text-gray-400 mt-1">타이, 아로마, 스웨디시 프로그램을 비교합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">직접 소통</h4>
              <p className="text-xs text-gray-400 mt-1">전화 버튼을 통해 샵과 직접 일정을 조율합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">맞춤 힐링</h4>
              <p className="text-xs text-gray-400 mt-1">전문 힐러의 정성 어린 케어를 경험합니다.</p>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 (FAQ) */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-[#121216] p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {fullTitle} 제휴 샵 이용 문의는 어떻게 하나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 원하시는 제휴 샵의 상담문의 버튼을 누르시면 해당 센터 매니저와 직접 프로그램 및 시간을 조율하실 수 있습니다.
              </p>
            </div>
            <div className="bg-[#121216] p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 유레스트 플랫폼 이용 시 별도 수수료가 발생하나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-amber-400 font-bold">A.</span> 유레스트는 투명한 정보 안내 플랫폼으로 이용 고객님께 어떠한 중개 수수료도 부과하지 않습니다.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#040405] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:050712803361" 
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 유레스트 입점 및 제휴문의 (0507-1280-3361)
            </a>
          </div>
          <p className="text-gray-400 font-bold">유레스트(Urest)는 건전하고 안전한 웰니스 테라피 & 바디케어 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; UREST ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}