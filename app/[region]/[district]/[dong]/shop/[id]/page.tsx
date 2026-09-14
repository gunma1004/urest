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

function parseLocationText(region?: string, district?: string, dong?: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  const decodedDong = safeDecode(dong);
  return `${regionName} ${decodedDistrict} ${decodedDong}`.replace(/\s+/g, " ").trim();
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
    desc: "골든 품격의 감성 릴렉싱! 전문 한국인 관리사와 프리미엄 힐러진이 계신 곳으로 직접 찾아가 굳은 근육과 묵은 피로를 시원하게 풀어드립니다.",
    courses: [
      {
        category: "👑 한국인 골든 스웨디시",
        badge: "BEST 시그니처",
        desc: "최고급 천연 오일과 전문 테라피스트의 수준 높은 1:1 감성 림프 순환 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "💎 프리미엄 힐링 코스",
        desc: "부드러운 압과 섬세한 테크닉으로 전신의 피로를 완벽하게 해소하는 인기 테라피 코스.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["100% 현장 후불제", "수도권 전지역 25분 칼도착", "24시간 365일 연중무휴", "철저한 위생 및 방역 관리"]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop1.jpg",
    desc: "품격 있는 힐링을 선사하는 프라이빗 홈케어! 프리미엄 출장 아로마 마사지와 맞춤형 바디케어로 지친 일상의 활력을 되찾아보세요.",
    courses: [
      {
        category: "🌿 아로마 테라피 코스",
        desc: "아로마 오일의 부드러움과 스웨디시 기법을 조화롭게 결합한 실속 전신 케어.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "✨ 프리미엄 VIP 코스",
        badge: "인기 추천",
        desc: "세련된 감성 터치와 깊이 있는 전신 이완으로 지친 몸에 깊은 휴식을 선사하는 코스.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["선입금 ZERO 100% 현장 결제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 방문 케어"]
  },
  "3": {
    name: "미인클럽테라피",
    phone: "0507-1280-3303",
    badge: "만족도 1위 추천",
    image: "/shop2.jpg",
    desc: "재방문율 1위 만족도! 정통 릴렉싱 케어부터 올인원 VVIP 스페셜까지 계신 곳에서 편안하게 정통 힐링을 누려보세요.",
    courses: [
      {
        category: "01 RELAX | 전신 릴렉싱 스트레칭",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 릴렉싱 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분 (추천)", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "02 AROMA | 부드러운 전신 아로마",
        badge: "인기 코스",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉싱 케어.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분 (인기)", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "03 VIP SWEDISH | 감성힐링 스웨디시",
        badge: "💥 추천 코스",
        desc: "따뜻한 오일과 섬세한 터치로 림프 순환을 돕고 깊은 힐링을 선사하는 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분 (강력추천)", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      }
    ],
    features: ["선입금 없는 100% 현장 결제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop5.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 테라피스트의 품격 있는 1:1 맞춤 방문 바디케어 서비스.",
    courses: [
      {
        category: "01 DRY | 릴렉싱 건식 코스",
        desc: "오일 없이 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어가는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "02 VIP SPECIAL | VIP 스페셜 코스",
        badge: "시그니처",
        desc: "건식의 시원함과 스웨디시의 부드러움을 한 번에 누리는 시그니처 코스.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" }
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
    desc: "선입금 없는 100% 현장 결제! 깊은 밤 지친 하루의 피로를 완벽하게 날려버릴 나이트 맞춤 방문 힐링 케어.",
    courses: [
      {
        category: "01 DRY | 🧠 건식 테라피 코스",
        desc: "오일 없이 정통 지압과 스트레칭으로 굳은 전신 근육과 피로를 시원하게 해소합니다.",
        items: [
          { time: "60분 코스", price: "60,000원" },
          { time: "90분 코스", price: "80,000원", recommend: true },
          { time: "120분 코스", price: "90,000원" }
        ]
      },
      {
        category: "02 SENSUAL | 🧠 센슈얼스웨디시 코스",
        badge: "감성 릴렉스",
        desc: "감각적이고 섬세한 터치와 부드러운 스웨디시 기법으로 깊은 이완과 힐링을 선사합니다.",
        items: [
          { time: "60분 코스", price: "90,000원" },
          { time: "90분 코스", price: "110,000원", recommend: true },
          { time: "120분 코스", price: "130,000원" }
        ]
      }
    ],
    features: ["100% 안심 현장 결제", "수도권 전지역 25분 칼도착", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId] || shopData["1"];

  const locationPrefix = parseLocationText(resolvedParams.region, resolvedParams.district, resolvedParams.dong);

  // 🌟 요청하신 출장/방문 형태의 30가지 순환형 타이틀 패턴 분기
  const titleVariants = [
    `${locationPrefix} 출장 방문 릴렉스 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 프라이빗 맞춤 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 웰니스 바디 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 케어 전신 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 스웨디시 힐링 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 아로마 오일 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 홈케어 맞춤 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 럭셔리 스파 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 감성 테라피 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 정통 바디 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 1:1 커스텀 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 안심 힐링 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 프리미엄 케어 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 소프트 릴렉싱 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 신속방문 스웨디시 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 전문 웰니스 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 딥티슈 바디 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 커스텀 아로마 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 VIP 힐링 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 스페셜 맞춤 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 안심 홈케어 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 프리미엄 릴렉스 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 피로해소 전신 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 맞춤형 스웨디시 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 힐링 테라피 마사지 · ${shop.name}`,
    `${locationPrefix} 출장 실속형 바디 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 쾌적한 방문 마사지 | ${shop.name}`,
    `${locationPrefix} 출장 종합 웰니스 마사지 - ${shop.name}`,
    `${locationPrefix} 출장 최고급 감성 마사지 · ${shop.name}`
  ];

  const charSum = (locationPrefix + shop.name + targetId).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = Math.abs(charSum) % titleVariants.length;

  const pageTitle = titleVariants[variantIndex];
  const pageDescription = `${locationPrefix} 24시 신속 방문 출장 타이 & 아로마 마사지 전문 ${shop.name}. 선입금 없는 100% 현장 결제로 안심하고 이용하세요.`;

  const canonicalUrl = resolvedParams.dong
    ? `https://urest-kr.netlify.app/${resolvedParams.region}/${encodeURIComponent(safeDecode(resolvedParams.district))}/${encodeURIComponent(safeDecode(resolvedParams.dong))}/shop/${targetId}`
    : `https://urest-kr.netlify.app/${resolvedParams.region}/${encodeURIComponent(safeDecode(resolvedParams.district))}/shop/${targetId}`;

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "유레스트(Urest)",
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: shop.name }],
    },
  };
}

export default async function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId];

  if (!shop) {
    notFound();
  }

  const region = resolvedParams.region || "seoul";
  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong);
  const locationPrefix = parseLocationText(region, resolvedParams.district, dongName);

  const backLink = dongName 
    ? `/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`
    : `/${region}/${encodeURIComponent(districtName)}`;

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      
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
            href={backLink} 
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← {dongName || districtName} 목록
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 대표 비주얼 카드 */}
        <section className="bg-[#121216] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={shop.image} 
              alt={`${locationPrefix} 출장 마사지 - ${shop.name}`} 
              className="w-full h-full object-cover filter brightness-[0.55]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              ✨ {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {locationPrefix} 출장 타이·아로마·릴렉스 마사지 24시 신속 방문
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-white">
              {locationPrefix} 출장마사지 24시 안내 - <span className="text-amber-400">{shop.name}</span>
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/60 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 코스 및 요금 목록 */}
        <section className="bg-[#0f0f13] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              💎 {locationPrefix} 출장 마사지 코스 및 요금 안내
            </h2>
          </div>

          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div 
                key={idx} 
                className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 md:p-6 rounded-2xl space-y-4 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-white text-base md:text-lg">
                      {courseGroup.category}
                    </h3>
                    {courseGroup.badge && (
                      <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded-full">
                        {courseGroup.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {courseGroup.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className={`p-3.5 rounded-xl border flex justify-between items-center ${
                        item.recommend 
                          ? "bg-amber-500/10 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]" 
                          : "bg-[#121216] border-white/5"
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                        <span className="text-amber-400">⏱️</span> {item.time}
                      </span>
                      <span className="text-sm font-black text-amber-400">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 안내사항 */}
        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> {locationPrefix} 마사지 안심 이용 안내
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>모든 제휴 업체는 <strong>100% 현장 후불제</strong>로만 운영되며, 사전 선입금이나 예약금을 절대 요구하지 않습니다.</li>
            <li>원하시는 시간 20~30분 전에 문의해 주시면 출장 타이 마사지, 출장 아로마 마사지, 출장 릴렉스 마사지 전문 테라피스트가 신속하게 방문합니다.</li>
          </ul>
        </section>

      </main>

      {/* 하단 고정 전화/문자 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone.replace(/-/g, "")}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 즉시예약
          </a>
          <a 
            href={`sms:${shop.phone.replace(/-/g, "")}?body=${encodeURIComponent(`[${locationPrefix}] ${shop.name} 출장마사지 예약 문의드립니다. (유레스트 보고 연락드렸어요)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>

    </div>
  );
}