import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

function getRegionFullName(region: string): string {
  switch (region?.toLowerCase()) {
    case "seoul": return "서울특별시";
    case "gyeonggi": return "경기도";
    case "incheon": return "인천광역시";
    default: return region || "";
  }
}

function getRegionShortName(region: string): string {
  switch (region?.toLowerCase()) {
    case "seoul": return "서울";
    case "gyeonggi": return "경기";
    case "incheon": return "인천";
    default: return region || "";
  }
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

// 🎯 스팸 키워드 ZERO + 마사지 종류별 특화 40가지 클린 SEO 패턴
const CLEAN_DONG_SEO_PATTERNS = [
  /* 0 */ {
    title: (loc: string) => `${loc} 프리미엄 웰니스 마사지 & 바디 테라피 제휴 안내 - 유레스트`,
    desc: (loc: string) => `${loc} 엄선된 프리미엄 웰니스 마사지 제휴점 안내. 정갈한 바디케어 프로그램과 표준 정찰제 요금을 유레스트에서 확인하세요.`
  },
  /* 1 */ {
    title: (loc: string) => `${loc} 스웨디시 테라피 & 감성 바디 릴렉스 가이드 | 유레스트`,
    desc: (loc: string) => `섬세한 터칭과 부드러운 압으로 전신 긴장을 완화하는 ${loc} 스웨디시 전문 제휴 센터 상세 코스별 비교.`
  },
  /* 2 */ {
    title: (loc: string) => `${loc} 천연 아로마 오일 테라피 힐링 케어 추천 - 유레스트`,
    desc: (loc: string) => `순도 높은 식물성 에센셜 아로마 오일로 누적된 일상의 피로를 편안하게 해소하는 ${loc} 제휴 샵 안내.`
  },
  /* 3 */ {
    title: (loc: string) => `${loc} 정통 타이 릴렉싱 스트레칭 & 바디케어 | 유레스트`,
    desc: (loc: string) => `체계적인 전신 이완 스트레칭을 통해 굳은 근육의 활력을 되찾아 드리는 ${loc} 웰니스 프로그램 정보.`
  },
  /* 4 */ {
    title: (loc: string) => `${loc} 프라이빗 1:1 맞춤형 림프 순환 케어 제휴 - 유레스트`,
    desc: (loc: string) => `림프 흐름을 원활하게 돕고 신체 밸런스 안정을 선사하는 ${loc} 전문 림프 관리 프로그램 안내.`
  },
  /* 5 */ {
    title: (loc: string) => `${loc} 심층 딥티슈 바디 테라피 & 릴렉스 안내 | 유레스트`,
    desc: (loc: string) => `속근육 깊은 곳까지 꼼꼼하게 이완시켜 주는 ${loc} 딥티슈 마사지 프로그램과 표준 요금표.`
  },
  /* 6 */ {
    title: (loc: string) => `${loc} 맞춤형 스포츠 바디케어 & 스트레칭 | 유레스트`,
    desc: (loc: string) => `운동 후 뭉친 근육이나 만성 결림을 시원하게 정돈해 주는 ${loc} 스포츠 테라피 제휴 샵.`
  },
  /* 7 */ {
    title: (loc: string) => `${loc} 전통 경락 테라피 & 바디 밸런스 관리 - 유레스트`,
    desc: (loc: string) => `부드러운 압과 전문 테크닉으로 신체 리듬을 조화롭게 가꾸어 주는 ${loc} 경락 마사지 가이드.`
  },
  /* 8 */ {
    title: (loc: string) => `${loc} 따뜻한 온열 스톤 힐링 테라피 추천 | 유레스트`,
    desc: (loc: string) => `스톤의 온기를 통해 심신을 포근하게 녹여주고 이완을 유도하는 ${loc} 프리미엄 테라피.`
  },
  /* 9 */ {
    title: (loc: string) => `${loc} 산전 산후 전문 바디 릴렉싱 케어 - 유레스트`,
    desc: (loc: string) => `출산 전후 지친 산모의 컨디션 회복과 편안한 휴식을 돕는 ${loc} 전문 케어 프로그램.`
  },
  /* 10 */ {
    title: (loc: string) => `${loc} 시원한 발 관리 & 풋 테라피 가이드 | 유레스트`,
    desc: (loc: string) => `지친 하체의 피로를 집중적으로 정돈해 주는 ${loc} 풋 바디케어 코스 및 요금 비교.`
  },
  /* 11 */ {
    title: (loc: string) => `${loc} 로미로미 감성 힐링 트리트먼트 | 유레스트`,
    desc: (loc: string) => `물 흐르듯 부드러운 리듬감으로 온전한 안식을 선물하는 ${loc} 로미로미 테라피 제휴 정보.`
  },
  /* 12 */ {
    title: (loc: string) => `${loc} 컨디션 맞춤형 전신 바디 리프레시 | 유레스트`,
    desc: (loc: string) => `무거운 신체를 가볍고 개운하게 리셋하는 ${loc} 에너지 충전 바디 웰니스 프로그램.`
  },
  /* 13 */ {
    title: (loc: string) => `${loc} 프리미엄 스파 감성 바디케어 추천 - 유레스트`,
    desc: (loc: string) => `도심 속 안락한 공간에서 누리는 ${loc} 힐링 스파 및 프라이빗 테라피 센터 모음.`
  },
  /* 14 */ {
    title: (loc: string) => `${loc} 스트레스 완화 릴렉싱 바디 테라피 | 유레스트`,
    desc: (loc: string) => `복잡한 일상에서 벗어나 깊은 휴식과 숙면을 유도하는 ${loc} 맞춤형 힐링 프로그램.`
  },
  /* 15 */ {
    title: (loc: string) => `${loc} 소프트 바디 트리트먼트 & 이완 케어 - 유레스트`,
    desc: (loc: string) => `강한 자극 없이 섬세하고 포근하게 전신을 감싸주는 ${loc} 소프트 테라피 가이드.`
  },
  /* 16 */ {
    title: (loc: string) => `${loc} 승모근 및 목·어깨 집중 바디케어 | 유레스트`,
    desc: (loc: string) => `컴퓨터와 스마트폰 사용으로 지친 현대인을 위한 ${loc} 상체 집중 웰니스 테라피.`
  },
  /* 17 */ {
    title: (loc: string) => `${loc} 에센셜 허브 아로마 바디 솔루션 | 유레스트`,
    desc: (loc: string) => `자연에서 온 허브 향기와 함께 심신 안정을 돕는 ${loc} 프리미엄 오일 케어.`
  },
  /* 18 */ {
    title: (loc: string) => `${loc} 바디 라인 정돈 및 밸런스 테라피 | 유레스트`,
    desc: (loc: string) => `균형 잡힌 신체 컨디션을 유지할 수 있도록 돕는 ${loc} 전문 바디 리셋 프로그램.`
  },
  /* 19 */ {
    title: (loc: string) => `${loc} 안심 표준 정찰제 힐링 마사지 제휴센터 | 유레스트`,
    desc: (loc: string) => `신뢰할 수 있는 투명한 표준 요금제와 쾌적한 환경을 갖춘 ${loc} 추천 바디케어 안내.`
  },
  /* 20 */ {
    title: (loc: string) => `${loc} 호텔식 럭셔리 힐링 바디 테라피 | 유레스트`,
    desc: (loc: string) => `고급스러운 프라이빗 케어를 합리적인 가격대로 즐기는 ${loc} 웰니스 추천 샵.`
  },
  /* 21 */ {
    title: (loc: string) => `${loc} 1:1 전담 테라피스트 맞춤 바디 힐링 - 유레스트`,
    desc: (loc: string) => `고객 컨디션에 따른 부위별 집중 관리, ${loc} 맞춤 테라피 코스 및 요금 안내.`
  },
  /* 22 */ {
    title: (loc: string) => `${loc} 쾌적한 힐링 스페이스 바디케어 가이드 | 유레스트`,
    desc: (loc: string) => `철저한 위생 및 방역 수칙을 준수하는 ${loc} 안심 웰니스 테라피 플랫폼.`
  },
  /* 23 */ {
    title: (loc: string) => `${loc} 데일리 힐링 바디 릴렉스 프로그램 - 유레스트`,
    desc: (loc: string) => `매일 받아도 부담 없는 가벼운 릴렉싱 코스, ${loc} 테라피 샵 상세 가격 안내.`
  },
  /* 24 */ {
    title: (loc: string) => `${loc} 전신 밸런스 회복 힐링 트리트먼트 | 유레스트`,
    desc: (loc: string) => `지친 심신에 활력을 불어넣는 ${loc} 전신 스트레칭 및 이완 케어 정보.`
  },
  /* 25 */ {
    title: (loc: string) => `${loc} 프리미엄 스웨디시 & 아로마 복합 코스 | 유레스트`,
    desc: (loc: string) => `건식의 시원함과 아로마의 부드러움을 한 번에 경험하는 ${loc} 인기 복합 프로그램.`
  },
  /* 26 */ {
    title: (loc: string) => `${loc} 타이 & 스웨디시 추천 제휴 샵 - 유레스트`,
    desc: (loc: string) => `${loc} 지역 검증된 제휴 업체의 실제 코스별 요금을 투명하게 확인하세요.`
  },
  /* 27 */ {
    title: (loc: string) => `${loc} 감성 힐링 릴렉스 바디 테라피 안내 | 유레스트`,
    desc: (loc: string) => `마음까지 편안해지는 섬세한 터치와 쾌적한 공간, ${loc} 인기 테라피 샵 모음.`
  },
  /* 28 */ {
    title: (loc: string) => `${loc} 피로회복 집중 바디 트리트먼트 - 유레스트`,
    desc: (loc: string) => `목, 등, 허리 등 결림 부위를 꼼꼼히 이완시키는 ${loc} 전문 관리 프로그램.`
  },
  /* 29 */ {
    title: (loc: string) => `${loc} 온열 힐링 아로마 케어 가이드 | 유레스트`,
    desc: (loc: string) => `따뜻한 온기와 천연 오일이 어우러져 피로를 녹여주는 ${loc} 웰니스 테라피.`
  },
  /* 30 */ {
    title: (loc: string) => `${loc} 웰빙 바디 리프레시 큐레이션 | 유레스트`,
    desc: (loc: string) => `건강하고 활력 넘치는 일상을 위한 ${loc} 지역 웰니스 테라피 가이드.`
  },
  /* 31 */ {
    title: (loc: string) => `${loc} 프라이빗 1인 룸 힐링 바디케어 - 유레스트`,
    desc: (loc: string) => `독립된 프라이빗 공간에서 온전한 휴식을 누리는 ${loc} 바디 테라피 정보.`
  },
  /* 32 */ {
    title: (loc: string) => `${loc} 럭셔리 감성 스웨디시 케어 안내 | 유레스트`,
    desc: (loc: string) => `최고급 오일과 정성 가득한 관리사의 손길, ${loc} 추천 스웨디시 프로그램.`
  },
  /* 33 */ {
    title: (loc: string) => `${loc} 근육 이완 맞춤형 바디 솔루션 | 유레스트`,
    desc: (loc: string) => `신체 긴장을 부드럽게 이완하고 가벼운 몸 상태를 만드는 ${loc} 전문 테라피.`
  },
  /* 34 */ {
    title: (loc: string) => `${loc} 전신 활력 충전 힐링케어 안내 | 유레스트`,
    desc: (loc: string) => `${loc} 전지역 엄선된 제휴 네트워크! 지금 바로 내 주변 추천 웰니스 센터를 만나보세요.`
  },
  /* 35 */ {
    title: (loc: string) => `${loc} 바디 컨디셔닝 & 이완 프로그램 | 유레스트`,
    desc: (loc: string) => `흐트러진 신체 밸런스를 차분하게 정돈해 주는 ${loc} 맞춤형 바디케어.`
  },
  /* 36 */ {
    title: (loc: string) => `${loc} 프라이빗 릴렉스 테라피 스페이스 | 유레스트`,
    desc: (loc: string) => `일상의 무게를 내려놓고 편안한 쉼을 누릴 수 있는 ${loc} 힐링 테라피.`
  },
  /* 37 */ {
    title: (loc: string) => `${loc} 아로마 림프 순환 케어 센터 안내 | 유레스트`,
    desc: (loc: string) => `맑고 가벼운 바디 컨디션을 위한 ${loc} 아로마 오일 림프 순환 관리.`
  },
  /* 38 */ {
    title: (loc: string) => `${loc} 스웨디시 림프 테라피 가이드 | 유레스트`,
    desc: (loc: string) => `부드러운 이완과 섬세한 감성 터치가 조화로운 ${loc} 스웨디시 테라피 프로그램.`
  },
  /* 39 */ {
    title: (loc: string) => `${loc} 종합 바디 웰니스 큐레이션 서비스 | 유레스트`,
    desc: (loc: string) => `다양한 테라피 코스와 정찰제 요금을 한눈에 비교하는 ${loc} 공식 제휴 가이드.`
  }
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionShort = getRegionShortName(region);
  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);
  const locationKeyword = `${regionShort} ${districtName} ${dongName}`.trim();

  const charSum = locationKeyword.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = Math.abs(charSum) % CLEAN_DONG_SEO_PATTERNS.length;

  const pattern = CLEAN_DONG_SEO_PATTERNS[variantIndex];
  const finalTitle = pattern.title(locationKeyword);
  const finalDescription = pattern.desc(locationKeyword);

  const canonicalUrl = `https://urest-kr.netlify.app/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `${locationKeyword} 웰니스`,
      `${locationKeyword} 마사지`,
      `${locationKeyword} 테라피`,
      `${locationKeyword} 스웨디시`,
      `${locationKeyword} 아로마`,
      `${dongName} 바디케어`,
      "유레스트"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "유레스트(Urest)",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionFullName = getRegionFullName(region);
  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);
  const shortLocation = `${districtName} ${dongName}`;

  const dongShops = [
    {
      id: 1,
      name: `🏆 한국골든테라피 (${dongName})`,
      desc: "골든 품격의 감성 릴렉싱! 전문 한국인 관리사와 프리미엄 힐러진의 1:1 맞춤 바디 테라피",
      phone: "0507-1280-3361",
      price: "110,000원부터~",
      image: "/shop3.jpg"
    },
    {
      id: 2,
      name: `🌸 한국미인테라피 (${dongName})`,
      desc: "최고급 천연 아로마 오일을 활용한 전신 이완 및 림프 순환 케어 전문 프로그램",
      phone: "0507-1280-3303",
      price: "100,000원부터~",
      image: "/shop1.jpg"
    },
    {
      id: 3,
      name: `💎 미인클럽테라피 (${dongName})`,
      desc: "재방문율 1위 만족도! 철저한 위생 관리와 품격 있는 정통 타이 & 릴렉싱 케어",
      phone: "0507-1280-3303",
      price: "60,000원부터~",
      image: "/shop2.jpg"
    },
    {
      id: 4,
      name: `👑 퀸즈홈테라피 (${dongName})`,
      desc: "수도권 전지역 엄선된 공식 파트너! 정직한 안내와 함께하는 프라이빗 힐링 바디 테라피",
      phone: "0507-1280-3334",
      price: "60,000원부터~",
      image: "/shop5.jpg"
    },
    {
      id: 5,
      name: `🌙 오늘밤테라피 (${dongName})`,
      desc: "전문 힐러진의 맞춤형 바디 관리, 시간대별 편안한 VIP 피로회복 솔루션",
      phone: "0507-1280-3223",
      price: "60,000원부터~",
      image: "/shop4.jpg"
    }
  ];

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-24">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-sm shadow-[0_0_12px_rgba(245,158,11,0.4)] border border-amber-300/40">
              UR
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-none">
                유레스트 <span className="text-xs text-amber-300/80 font-semibold">Urest</span>
              </span>
            </div>
          </Link>
          <Link 
            href={`/${region}/${encodeURIComponent(districtName)}`}
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← {districtName} 전체보기
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 타이틀 배너 */}
        <section className="bg-[#121216] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
            {districtName} · {dongName} WELLNESS DIRECTORY
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            📍 {shortLocation} 웰니스 테라피 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
            {regionFullName} {shortLocation} 고객님을 위한 엄선된 힐링 바디케어 디렉토리입니다. 타이마사지, 아로마 테라피, 감성 스웨디시 제휴 센터의 표준 정찰제 요금과 프로그램을 확인해 보세요.
          </p>
        </section>

        {/* 제휴 샵 리스트 */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            🏆 {shortLocation} 추천 제휴점
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dongShops.map((shop) => (
              <div 
                key={shop.id} 
                className="bg-[#121216] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative"
              >
                <Link 
                  href={`/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${shop.id}`}
                  className="absolute inset-0 z-10" 
                  aria-label={`${shop.name} 코스 및 상세정보 보기`} 
                />

                <img 
                  src={shop.image} 
                  alt={shop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform flex-shrink-0" 
                />

                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {shop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                    {shop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{shop.price}</span>
                    <a 
                      href={`tel:${shop.phone.replace(/-/g, "")}`} 
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow relative z-20 transition-all active:scale-95"
                    >
                      상담문의
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 웰니스 케어 팁 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-white/10 space-y-3">
          <h3 className="text-base md:text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>🌿</span> {shortLocation} 일상 속 건강한 쉼을 위한 팁
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            반복되는 일상 업무와 불규칙한 생활 패턴으로 굳어진 신체는 적절한 스트레칭과 바디케어를 통해 긴장을 풀어주는 것이 중요합니다. 나에게 맞는 프로그램을 선택하여 최상의 휴식을 경험해 보세요.
          </p>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#040405] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-gray-400 font-bold">유레스트(Urest)는 건전하고 안전한 웰니스 테라피 & 바디케어 정보 안내 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; UREST ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}