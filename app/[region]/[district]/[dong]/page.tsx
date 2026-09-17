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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionShort = getRegionShortName(region);
  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);
  const locationKeyword = `${regionShort} ${districtName} ${dongName}`.trim();

  const modifiersPool = getModifiersPool();
  const serviceTypesPool = getServiceTypesPool();
  const descriptionsPool = getDescriptionsPool();

  const seedString = locationKeyword + "urest_clean_dong_seo";
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const modIndex = charSum % modifiersPool.length;
  const serviceIndex = (charSum * 3) % serviceTypesPool.length;
  const descIndex = (charSum * 7) % descriptionsPool.length;

  const selectedModifier = modifiersPool[modIndex];
  const selectedService = serviceTypesPool[serviceIndex];
  const selectedDesc = descriptionsPool[descIndex];

  // 🌟 샵 이름, 사이트 이름, '출장'이 완전히 배제된 조합형 메타 태그
  const finalTitle = `${locationKeyword} ${selectedModifier} 제휴점의 ${selectedService} - 유레스트`;
  const finalDescription = `${locationKeyword} 맞춤형 힐링 네트워크. ${selectedModifier} 진행되는 ${selectedService}. ${selectedDesc}`;

  const canonicalUrl = `https://urest-kr.netlify.app/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  return {
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      `${locationKeyword} 타이 마사지`,
      `${locationKeyword} 아로마 마사지`,
      `${locationKeyword} 릴렉스 마사지`,
      `${locationKeyword} 스웨디시 마사지`,
      `${locationKeyword} 힐링 마사지`,
      `${locationKeyword} 전신 마사지`,
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