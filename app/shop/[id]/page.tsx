import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const shopData: Record<string, {
  name: string;
  phone: string;
  location: string;
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
  // ───────────────────────────────────────────
  // 1. 한국골든테라피 (0507-1280-3361)
  // ───────────────────────────────────────────
  "1": {
    name: "🏆 한국골든테라피",
    phone: "0507-1280-3361",
    location: "서울 · 경기 · 인천 전지역 25분 내 신속 방문",
    badge: "VIP 골든 힐링 케어",
    image: "/assets/images/partners/shop-03.webp",
    desc: "골든 품격의 감성 릴렉싱! 전문 한국인 관리사와 프리미엄 힐러진이 선사하는 맞춤형 웰니스 바디케어.",
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
    features: ["100% 안심 현장 결제", "수도권 25분 내 도착", "24시간 상시 운영", "위생 및 방역 철저"]
  },

  // ───────────────────────────────────────────
  // 2. 한국미인테라피 (0507-1280-3303)
  // ───────────────────────────────────────────
  "2": {
    name: "🌸 한국미인테라피",
    phone: "0507-1280-3303",
    location: "서울 · 경기 · 인천 전지역 신속 방문",
    badge: "재방문율 최우수",
    image: "/assets/images/partners/shop-01.webp",
    desc: "품격 있는 힐링을 선사하는 프라이빗 테라피! 프리미엄 웰니스 바디케어 프로그램 완벽 구비.",
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
        desc: "세련된 감성 터치와 깊이 있는 전신 이완으로 지친 일상의 활력을 되찾아주는 코스.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "👑 스웨디시 전문 코스",
        badge: "프리미엄",
        desc: "전문 자격을 갖춘 테라피스트의 프라이빗 1:1 맞춤형 감성 스웨디시 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 ZERO 100% 현장 결제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 코스 안내"]
  },

  // ───────────────────────────────────────────
  // 3. 미인클럽테라피 (0507-1280-3303)
  // ───────────────────────────────────────────
  "3": {
    name: "✨ 미인클럽테라피",
    phone: "0507-1280-3303",
    location: "서울 · 경기 · 인천 전지역 신속 도착",
    badge: "만족도 1위 추천",
    image: "/assets/images/partners/shop-02.webp",
    desc: "재방문율 1위 만족도! 정통 릴렉싱 케어부터 올인원 VVIP 스페셜까지 체계적인 웰니스 프로그램.",
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
      },
      {
        category: "04 VVIP SPECIAL | 올인원 스페셜코스",
        badge: "💥 추천 올인원",
        desc: "시원함과 스웨디시의 감성 테라피를 극대화한 시그니처 코스.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분 (인기)", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" },
          { time: "150분", price: "160,000원" }
        ]
      }
    ],
    features: ["선입금 없는 100% 현장 결제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
  },

  // ───────────────────────────────────────────
  // 4. 퀸즈홈테라피 (0507-1280-3334)
  // ───────────────────────────────────────────
  "4": {
    name: "👑 퀸즈홈테라피",
    phone: "0507-1280-3334",
    location: "서울 · 경기 · 인천 전지역 방문",
    badge: "여왕처럼 누리는 VIP",
    image: "/assets/images/partners/shop-05.webp",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 테라피스트의 품격 있는 1:1 맞춤 바디케어.",
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
        category: "02 AROMA | 아로마 힐링 코스",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 릴렉싱 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "03 SWEDISH | 힐링스웨디시 코스",
        badge: "인기 만족",
        desc: "따뜻한 오일과 부드러운 압으로 림프 순환과 깊은 휴식을 이끄는 감성 테라피.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분", price: "100,000원", recommend: true },
          { time: "120분", price: "120,000원" }
        ]
      },
      {
        category: "04 VIP SPECIAL | VIP 스페셜 코스",
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

  // ───────────────────────────────────────────
  // 5. 오늘밤테라피 (0507-1280-3223)
  // ───────────────────────────────────────────
  "5": {
    name: "🌙 오늘밤테라피",
    phone: "0507-1280-3223",
    location: "서울 · 경기 · 인천 전지역 실시간 방문",
    badge: "야간 힐링 만족 1위",
    image: "/assets/images/partners/shop-04.webp",
    desc: "선입금 없는 100% 현장 결제! 깊은 밤 지친 하루의 피로를 완벽하게 날려버릴 나이트 맞춤 힐링 케어.",
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
      },
      {
        category: "03 BEST VVIP | 🧠 전신혼합VVIP 코스",
        badge: "🔥 최고 인기",
        desc: "건식 지압의 개운함과 아로마/스웨디시의 부드러움을 동시에 누리는 최고 인기 종합 코스입니다.",
        items: [
          { time: "60분 코스", price: "100,000원" },
          { time: "90분 코스", price: "120,000원", recommend: true },
          { time: "120분 코스", price: "140,000원" },
          { time: "150분 코스", price: "180,000원" }
        ]
      }
    ],
    features: ["100% 안심 현장 결제", "수도권 전지역 25분 칼도착", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const shop = shopData[resolvedParams.id] || shopData["1"];

  return {
    title: `${shop.name} 코스 및 가격 안내 | 유레스트(Urest) 24시 제휴`,
    description: `${shop.name} 24시 안심 방문 테라피! 선입금 없는 100% 현장 결제, 코스별 가격비교 및 신속 예약 정보를 유레스트에서 확인하세요.`,
    alternates: {
      canonical: `https://urest-kr.netlify.app/shop/${resolvedParams.id}`,
    },
    openGraph: {
      title: `${shop.name} | 유레스트(Urest) 프리미엄 제휴점`,
      description: `${shop.name} 코스 및 가격 정보 안내. 100% 안심 현장 결제로 편안하게 이용해 보세요.`,
      url: `https://urest-kr.netlify.app/shop/${resolvedParams.id}`,
      siteName: "유레스트(Urest)",
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: shop.name }],
    },
  };
}

export default async function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const shopId = resolvedParams.id;
  const shop = shopData[shopId] || shopData["1"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": `${shop.name} - 유레스트`,
    "description": shop.desc,
    "telephone": shop.phone,
    "url": `https://urest-kr.netlify.app/shop/${shopId}`,
    "image": `https://urest-kr.netlify.app${shop.image}`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "수도권(서울, 경기, 인천)",
      "addressCountry": "KR"
    },
    "priceRange": "$$"
  };

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 상단 헤더 */}
      <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-sm shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform border border-amber-300/40">
              UR
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent leading-none">
                유레스트 <span className="text-xs text-amber-300/80 font-semibold">Urest</span>
              </span>
            </div>
          </Link>
          
          <Link href="/" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
            🏠 메인 홈으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        
        {/* 대표 비주얼 카드 */}
        <section className="bg-[#121216] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img 
              src={shop.image} 
              alt={shop.name} 
              className="w-full h-full object-cover filter brightness-[0.55]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              ✨ {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {shop.location}
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-white">
              {shop.name}
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
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">💎 정규 코스 및 요금 안내</h2>
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

                {/* 시간별 가격 리스트 */}
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
            <span>📌</span> 이용 예약 안내
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>유레스트 제휴업체는 <strong>100% 현장 결제</strong>로 운영됩니다. 출발 전 선입금을 절대 요구하지 않습니다.</li>
            <li>희망하시는 시간 20~30분 전에 미리 예약 문의 주시면 보다 원활한 서비스 매칭이 가능합니다.</li>
          </ul>
        </section>

      </main>

      {/* 하단 고정 전화/문자 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 즉시예약
          </a>
          <a 
            href={`sms:${shop.phone}?body=${encodeURIComponent(`${shop.name} 예약 문의드립니다. (유레스트 보고 연락드렸습니다)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>

    </div>
  );
}