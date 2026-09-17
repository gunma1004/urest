import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    region?: string;
    district?: string;
    id?: string;
    shopId?: string;
  }>;
}

function getRegionFullName(region?: string): string {
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

function parseDistrictLocation(region?: string, district?: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  return `${regionName} ${decodedDistrict}`.replace(/\s+/g, " ").trim();
}

function getModifiersPool(): string[] {
  const baseAdjectives = [
    "프라이빗", "전문", "쾌적한 공간", "안락한 분위기", "정성 어린", 
    "신뢰할 수 있는", "차분한 힐링", "품격 있는", "맞춤형 바디케어", "일상 회복",
    "엄선된 웰니스", "편안한 휴식", "체계적인 프로그램", "도심 속 오아시스", "부드러운 릴렉싱",
    "고품격 케어", "피로 회복 맞춤", "안정감 있는", "조용하고 아늑한", "에너지 충전"
  ];
  
  const intensityWords = [
    "깊은", "부드러운", "섬세한", "꼼꼼한", "완벽한", 
    "탁월한", "특별한", "차별화된", "노련한", "깔끔한",
    "포근한", "산뜻한", "정교한", "개운한"
  ];

  const serviceCategories = [
    "출장 중심의 웰니스 마사지",
    "방문 케어를 돕는 스웨디시 마사지",
    "출장 홈케어 전문 아로마 마사지",
    "신속한 방문을 지원하는 타이 마사지",
    "프라이빗 출장 전용 힐링 마사지",
    "맞춤형 홈케어 프로그램 마사지"
  ];

  const pool: string[] = [];
  for (const cat of serviceCategories) {
    for (const adj of baseAdjectives) {
      for (const int of intensityWords) {
        pool.push(`${int} ${adj} ${cat}`);
      }
    }
  }
  return pool;
}

const shopData = {
  "1": { name: "한국골든테라피", image: "/shop3.jpg", badge: "VIP 골든 힐링 케어", desc: "골든 품격의 감성 릴렉싱 제휴 프로그램." },
  "2": { name: "한국미인테라피", image: "/shop1.jpg", badge: "재방문율 최우수", desc: "프리미엄 아로마 바디케어 제휴 프로그램." },
  "3": { name: "주주테라피", image: "/shop2.jpg", badge: "만족도 1위 추천", desc: "정통 릴렉싱 테라피 제휴 프로그램." },
  "4": { name: "퀸즈홈테라피", image: "/shop5.jpg", badge: "여왕처럼 누리는 VIP", desc: "1:1 맞춤 방문 힐링 제휴 프로그램." },
  "5": { name: "오늘밤테라피", image: "/shop4.jpg", badge: "야간 힐링 만족 1위", desc: "나이트 맞춤 방문 힐링 제휴 프로그램." }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const locationPrefix = parseDistrictLocation(resolvedParams.region, resolvedParams.district);

  const modifiersPool = getModifiersPool();
  const seedString = `${locationPrefix}_${targetId}_district_shop_unique_seo`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const modIndex = charSum % modifiersPool.length;

  const selectedModifier = modifiersPool[modIndex];

  const finalTitle = `${locationPrefix} ${selectedModifier}`;
  const finalDescription = `${locationPrefix} 맞춤형 웰니스 바디케어. ${selectedModifier} 프로그램 안내 및 표준 정찰제 요금 비교.`;

  const canonicalUrl = `https://urest-kr.netlify.app/${resolvedParams.region}/${encodeURIComponent(safeDecode(resolvedParams.district))}/shop/${targetId}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${locationPrefix} 타이 마사지`,
      `${locationPrefix} 아로마 마사지`,
      `${locationPrefix} 릴렉스 마사지`,
      `${locationPrefix} 스웨디시 마사지`,
      `${locationPrefix} 힐링 마사지`,
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = (shopData as Record<string, any>)[targetId];

  if (!shop) {
    notFound();
  }

  const region = resolvedParams.region || "seoul";
  const districtName = safeDecode(resolvedParams.district);
  const locationPrefix = parseDistrictLocation(region, resolvedParams.district);

  const displayTitle = `${locationPrefix} 전문 방문 출장 서비스를 지원하는 웰니스 마사지`;

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans pb-28">
      <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-black text-amber-400">Urest</Link>
          <Link href={`/${region}/${encodeURIComponent(districtName)}`} className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            ← {districtName} 목록
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        <section className="bg-[#121216] border border-amber-500/30 rounded-3xl overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img src={shop.image} alt={displayTitle} className="w-full h-full object-cover filter brightness-[0.55]" />
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">✨ {shop.badge}</span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-[#121216] rounded-t-3xl">
            <h1 className="text-2xl md:text-3xl font-black text-white">{displayTitle}</h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/60 p-4 rounded-2xl border border-white/5">{shop.desc}</p>
          </div>
        </section>
      </main>
    </div>
  );
}