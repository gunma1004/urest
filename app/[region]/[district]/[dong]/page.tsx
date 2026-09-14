import { Metadata } from "next";
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

function safeDecode(str: string): string {
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

const DONG_SEO_PATTERNS = [
  {
    title: (loc: string) => `${loc} 웰니스 마사지 제휴점 안내 | 스웨디시 & 테라피 - 유레스트`,
    desc: (loc: string) => `${loc} 인근 검증된 웰니스 테라피 제휴점 안내. 투명한 표준 정찰제 요금표와 프라이빗 바디케어 코스를 확인하세요.`
  },
  {
    title: (loc: string) => `${loc} 프리미엄 바디 힐링 테라피 추천 코스 | 유레스트`,
    desc: (loc: string) => `체계적인 전신 스트레칭과 섬세한 압으로 일상의 피로를 정돈하는 ${loc} 웰니스 제휴 센터 상세 안내.`
  },
  {
    title: (loc: string) => `${loc} 아로마 오일 테라피 & 바디케어 프로그램 안내 - 유레스트`,
    desc: (loc: string) => `순도 높은 천연 에센셜 오일로 굳은 몸을 부드럽게 이완시켜 드리는 ${loc} 추천 아로마 마사지 정보.`
  },
  {
    title: (loc: string) => `${loc} 정통 릴렉싱 및 감성 스웨디시 제휴 가이드 | 유레스트`,
    desc: (loc: string) => `1:1 맞춤형 피로회복 솔루션을 제공하는 ${loc} 엄선된 웰니스 바디케어 제휴점 모음.`
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
  const variantIndex = Math.abs(charSum) % DONG_SEO_PATTERNS.length;

  const pattern = DONG_SEO_PATTERNS[variantIndex];
  const finalTitle = pattern.title(locationKeyword);
  const finalDescription = pattern.desc(locationKeyword);

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
      `${locationKeyword} 마사지`,
      `${locationKeyword} 테라피`,
      `${locationKeyword} 스웨디시`,
      `${locationKeyword} 아로마케어`,
      `${dongName} 웰니스`,
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

export default async function UrestDongPage({ params }: PageProps) {
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
      desc: "골든 품격의 감성 릴렉싱! 전문 한국인 관리사와 프리미엄 힐러진의 웰니스 케어",
      phone: "0507-1280-3361",
      price: "110,000원부터~",
      image: "/assets/images/partners/shop-03.webp"
    },
    {
      id: 2,
      name: `🌸 한국미인테라피 (${dongName})`,
      desc: "품격 있는 힐링을 선사하는 프라이빗 테라피! 아로마 및 스웨디시 케어 완비",
      phone: "0507-1280-3303",
      price: "100,000원부터~",
      image: "/assets/images/partners/shop-01.webp"
    },
    {
      id: 3,
      name: `✨ 미인클럽테라피 (${dongName})`,
      desc: "재방문율 1위 만족도! 정통 릴렉싱 스트레칭부터 올인원 VVIP 웰니스 프로그램",
      phone: "0507-1280-3303",
      price: "60,000원부터~",
      image: "/assets/images/partners/shop-02.webp"
    },
    {
      id: 4,
      name: `👑 퀸즈홈테라피 (${dongName})`,
      desc: "여왕처럼 누리는 고품격 테라피! 전문 테라피스트의 1:1 맞춤 바디케어",
      phone: "0507-1280-3334",
      price: "60,000원부터~",
      image: "/assets/images/partners/shop-05.webp"
    },
    {
      id: 5,
      name: `🌙 오늘밤테라피 (${dongName})`,
      desc: "지친 하루의 피로를 편안하게 해소하는 나이트 릴렉싱 & 센슈얼스웨디시 케어",
      phone: "0507-1280-3223",
      price: "60,000원부터~",
      image: "/assets/images/partners/shop-04.webp"
    }
  ];

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-24">
      {/* 상단 네비게이션 */}
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
            📍 {shortLocation} 웰니스 마사지 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 mt-2">
            {regionFullName} {shortLocation} 고객님을 위한 안심 힐링 테라피 디렉토리입니다. 투명한 표준 정찰제 요금표와 코스를 확인하세요.
          </p>
        </section>

        {/* 🌟 샵 목록: 누르면 동 기준 상세주소( /[region]/[district]/[dong]/shop/[id] )로 이동 */}
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
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 flex-shrink-0" 
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
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow relative z-20"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}