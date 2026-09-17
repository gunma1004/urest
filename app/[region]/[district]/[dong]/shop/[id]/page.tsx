import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    region?: string;
    district?: string;
    dong?: string;
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

function parseDongLocation(region?: string, district?: string, dong?: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  const decodedDong = safeDecode(dong);
  return `${regionName} ${decodedDistrict} ${decodedDong}`.replace(/\s+/g, " ").trim();
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

const shopData: Record<string, {
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
  features: string[];
}> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop3.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 지친 일상의 피로를 완벽하게 해소해 드립니다.",
    courses: [
      {
        category: "👑 골든 스웨디시 코스",
        badge: "BEST 시그니처",
        desc: "최고급 천연 오일과 전문 테라피스트의 수준 높은 1:1 감성 림프 순환 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 현장 후불제", "수도권 전지역 신속 방문", "24시간 365일 연중무휴", "철저한 위생 관리"]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop1.jpg",
    desc: "최고급 천연 오일을 활용한 아로마 전신 바디케어 프로그램 및 맞춤형 힐링 서비스.",
    courses: [
      {
        category: "🌿 아로마 테라피 코스",
        desc: "아로마 오일의 부드러움과 스웨디시 기법을 조화롭게 결합한 전신 케어.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 ZERO 현장 결제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 방문 케어"]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop2.jpg",
    desc: "재방문율 1위 만족도! 정통 힐링 테라피부터 올인원 코스까지 체계적인 프로그램 제공.",
    courses: [
      {
        category: "01 RELAX | 전신 스트레칭",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 릴렉싱 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 현장 결제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop5.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    courses: [
      {
        category: "01 DRY | 릴렉싱 건식 코스",
        desc: "오일 없이 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어가는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 현장 결제 안심 시스템", "전문 테라피스트 배정", "수도권 전지역 방문", "24시간 예약 가능"]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop4.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 타이부터 스웨디시까지 완벽하게 해소.",
    courses: [
      {
        category: "01 DRY | 건식 테라피 코스",
        desc: "오일 없이 정통 지압과 스트레칭으로 피로를 시원하게 해소.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 안심 현장 결제", "수도권 전지역 칼도착", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const locationPrefix = parseDongLocation(resolvedParams.region, resolvedParams.district, resolvedParams.dong);

  const modifiersPool = getModifiersPool();
  const seedString = `${locationPrefix}_${targetId}_dong_shop_unique_seo`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const modIndex = charSum % modifiersPool.length;

  const selectedModifier = modifiersPool[modIndex];

  const finalTitle = `${locationPrefix} ${selectedModifier}`;
  const finalDescription = `${locationPrefix} 맞춤형 웰니스 바디케어. ${selectedModifier} 프로그램 안내 및 표준 정찰제 요금 비교.`;

  const canonicalUrl = `https://urest-kr.netlify.app/${resolvedParams.region}/${encodeURIComponent(safeDecode(resolvedParams.district))}/${encodeURIComponent(safeDecode(resolvedParams.dong))}/shop/${targetId}`;

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

export default async function DongShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId];

  if (!shop) {
    notFound();
  }

  const region = resolvedParams.region || "seoul";
  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong);
  const locationPrefix = parseDongLocation(region, resolvedParams.district, resolvedParams.dong);

  const displayTitle = `${locationPrefix} 전문 방문 출장 서비스를 지원하는 웰니스 마사지`;

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-black text-amber-400">Urest</Link>
          <Link href={`/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`} className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            ← {dongName} 목록
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