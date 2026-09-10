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

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울" : region === "incheon" ? "인천" : "경기";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  // -------------------------------------------------------------
  // 🎯 고유 해시 연산 (50가지 분산 회피 패턴 분기)
  // -------------------------------------------------------------
  const charSum = (locationKeyword + dongName + districtName + "urest_massage_30_types_split").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 50;

  // 🌟 [전수 포함 50종 타이틀] 30가지 이상의 출장 회피형 마사지 키워드 다채로운 분산 조합
  const titleVariants = [
    /* 0 */ `${locationKeyword} 출장 웰니스 마사지 안내 - 유레스트`,
    /* 1 */ `[유레스트] 출장 ${simpleLocation} 아로마 마사지 24시`,
    /* 2 */ `${locationKeyword} 24시 방문 출장 산후전후 마사지`,
    /* 3 */ `${simpleLocation} 홈케어 출장 타이 마사지 안내 · 유레스트`,
    /* 4 */ `프리미엄 출장 ${locationKeyword} 스웨디시 마사지`,
    /* 5 */ `유레스트 | ${simpleLocation} 안심 현장 결제 출장 힐링 마사지`,
    /* 6 */ `${locationKeyword} 프라이빗 출장 테라피 마사지 가이드`,
    /* 7 */ `${regionName} ${simpleLocation} 24시 출장 홈케어 마사지`,
    /* 8 */ `${locationKeyword} 출장 오일 마사지 & 전신 릴렉싱`,
    /* 9 */ `[유레스트] ${locationKeyword} 24시 방문 출장 감성 마사지`,
    /* 10 */ `${simpleLocation} 출장 스포츠 마사지 & 바디케어`,
    /* 11 */ `${locationKeyword} 25분 도착 출장 림프 순환 마사지`,
    /* 12 */ `단독 힐링 ${locationKeyword} 출장 딥티슈 마사지 안내`,
    /* 13 */ `${locationKeyword} 24시 출장 근육 이완 마사지 프로그램`,
    /* 14 */ `${simpleLocation} 베테랑 출장 홈타이 마사지 추천`,
    /* 15 */ `${locationKeyword} 출장 커플 마사지 예약 가이드`,
    /* 16 */ `[유레스트 케어] ${locationKeyword} 1:1 출장 림프마사지 안내`,
    /* 17 */ `${locationKeyword} 전신 피로해소 출장 체형교정 마사지`,
    /* 18 */ `${simpleLocation} 24시간 출장 아로마테라피 마사지 유레스트`,
    /* 19 */ `${locationKeyword} 선입금 없는 정직한 출장 건식 마사지`,
    /* 20 */ `${regionName} ${simpleLocation} 출장 경락 마사지 추천`,
    /* 21 */ `${locationKeyword} 출장 산전산후 테라피 마사지 전문`,
    /* 22 */ `[유레스트 추천] 출장 ${simpleLocation} 족욕 마사지 가격 안내`,
    /* 23 */ `${simpleLocation} 25분 빠른 출장 스킨케어 마사지 케어`,
    /* 24 */ `${locationKeyword} VIP 출장 산후조리 마사지 유레스트`,
    /* 25 */ `유레스트 파트너 ${locationKeyword} 24시 출장 디톡스 마사지`,
    /* 26 */ `${locationKeyword} 출장 홈타이 & 천연 허브 마사지`,
    /* 27 */ `${simpleLocation} 현장 결제 출장 밸런스 마사지 실시간 예약`,
    /* 28 */ `${locationKeyword} 친절 방문 출장 파워트리 마사지 추천`,
    /* 29 */ `[24시 신속] ${simpleLocation} 출장 피로회복 마사지 안내`,
    /* 30 */ `${locationKeyword} VIP 출장 리프레시 마사지 제휴 안내`,
    /* 31 */ `내 주변 ${locationKeyword} 출장 순환마사지 빠른 방문`,
    /* 32 */ `${simpleLocation} 24시간 출장 스톤 마사지 가이드`,
    /* 33 */ `${locationKeyword} 안전한 1:1 출장 전신오일 마사지`,
    /* 34 */ `[유레스트] ${simpleLocation} 출장 산후전후 마사지 모음`,
    /* 35 */ `${locationKeyword} 출장 림프관리 마사지 코스 및 가격표`,
    /* 36 */ `${locationKeyword} 선입금 없는 24시 출장 아로마오일 마사지`,
    /* 37 */ `${simpleLocation} 전문 테라피스트 출장 체형관리 마사지 안내`,
    /* 38 */ `${locationKeyword} 나만의 공간에서 받는 출장 맞춤 마사지`,
    /* 39 */ `[24시 힐링] ${locationKeyword} 출장 통증완화 마사지`,
    /* 40 */ `${locationKeyword} 출장 스웨디시 & 출장 감성릴렉스 마사지`,
    /* 41 */ `${simpleLocation} 건전 힐링 출장 아로마테라피 마사지 - 유레스트`,
    /* 42 */ `${locationKeyword} 피로가 풀리는 1:1 맞춤 출장 딥오일 마사지`,
    /* 43 */ `유레스트 | ${locationKeyword} 25분 내 빠른 출장 웰니스 마사지`,
    /* 44 */ `${simpleLocation} 24시 출장 홈케어 바디케어 마사지 제휴 목록`,
    /* 45 */ `${locationKeyword} 현장 결제 24시 출장 스웨디시 림프 마사지`,
    /* 46 */ `${locationKeyword} 집에서 받는 편안한 출장 스페셜 마사지`,
    /* 47 */ `[안심결제] ${simpleLocation} 출장 산전산후 케어 마사지`,
    /* 48 */ `${locationKeyword} 최고급 오일 출장 전신아로마 마사지`,
    /* 49 */ `${locationKeyword} 출장 전문 마사지 이용 후기 및 가이드 - 유레스트`
  ];

  // 🌟 [전수 포함 50종 디스크립션] 30개 이상의 출장 회피형 마사지 키워드를 구·동별 본문에 골고루 밀착 반영
  const descriptionVariants = [
    /* 0 */ `${locationKeyword} 출장 웰니스 마사지 및 출장 아로마 마사지 25분 내 빠른 방문! 100% 현장 결제. 출장 산후전후 마사지 제휴 정보를 유레스트에서 확인하세요.`,
    /* 1 */ `프라이빗 힐링! 출장 ${simpleLocation} 타이 마사지 24시 안내. 전문 관리사의 맞춤형 1:1 출장 스웨디시 마사지와 출장 림프 순환 마사지를 연결해 드립니다.`,
    /* 2 */ `${locationKeyword} 방문 출장 산후전후 마사지 예약. 현장 결제 시스템으로 안전하게 즐기는 출장 딥티슈 마사지 및 출장 스포츠 마사지 정보를 제공합니다.`,
    /* 3 */ `${simpleLocation} 홈케어 출장 힐링 마사지 24시 안심 방문. 출장 오일 마사지와 출장 전신 릴렉싱 프로그램으로 편안한 휴식을 누려보세요.`,
    /* 4 */ `출장 ${locationKeyword} 감성 마사지 찾으시나요? 선입금 0원, 100% 현장 결제로 안심하는 출장 경락 마사지 및 출장 웰니스 마사지 전문 가이드.`,
    /* 5 */ `지친 피로를 풀어줄 ${locationKeyword} 24시 출장 아로마테라피 마사지. 빠른 방문과 출장 산전산후 테라피 마사지의 품격 있는 서비스를 경험하세요.`,
    /* 6 */ `${locationKeyword} 어디든 25분 내 도착! 선입금 없는 현장 결제 출장 테라피 마사지와 출장 근육 이완 마사지 코스를 정직하게 안내합니다.`,
    /* 7 */ `${simpleLocation} 출장 홈케어 마사지 전문 제휴처. 익숙한 공간에서 누리는 출장 스웨디시 림프 마사지 및 출장 스톤 마사지 테라피입니다.`,
    /* 8 */ `${locationKeyword} 믿을 수 있는 출장 전신오일 마사지 정보. 출장 통증완화 마사지부터 출장 체형교정 마사지까지 합리적인 가격을 비교하세요.`,
    /* 9 */ `유레스트가 보장하는 ${locationKeyword} 방문 출장 디톡스 마사지! 관리사 도착 후 결제하는 100% 안전한 출장 밸런스 마사지 시스템입니다.`,
    /* 10 */ `${locationKeyword} 24시 출장 파워트리 마사지 완벽 안내. 출장 산후조리 마사지로 뭉친 근육과 묵은 피로를 상쾌하게 비워내 드립니다.`,
    /* 11 */ `${simpleLocation} 출장 순환마사지 코스별 요금 안내. 신속한 방문 배차로 출장 피로회복 마사지 및 출장 리프레시 마사지 만족도를 높여드립니다.`,
    /* 12 */ `${locationKeyword} 출장 딥오일 마사지 릴렉싱 프로그램. 출장 스페셜 마사지로 깊은 휴식과 활력을 선사하는 유레스트입니다.`,
    /* 13 */ `${locationKeyword} 24시 출장 체형관리 마사지 예약 가이드. 100% 현장 결제 제휴점 정보만을 선별하여 전달합니다.`,
    /* 14 */ `${simpleLocation} 어디서나 신속 방문하는 출장 맞춤 마사지. 출장 웰니스 마사지 중 내 몸에 맞는 코스를 추천합니다.`,
    /* 15 */ `${locationKeyword} 출장 커플 마사지 안심 안내! 선입금 없는 정직한 100% 현장 결제 출장 족욕 마사지를 만나보세요.`,
    /* 16 */ `전문 힐러의 섬세한 손길로 만나는 ${locationKeyword} 출장 스킨케어 마사지. 출장 아로마 마사지의 투명한 가격 정보를 안내합니다.`,
    /* 17 */ `${simpleLocation} 24시 출장 웰니스 마사지 서비스. 하루 종일 쌓인 스트레스를 출장 산후전후 마사지와 출장 건식 마사지로 이완하세요.`,
    /* 18 */ `${locationKeyword} 엄선 제휴점 안내. 선입금 제로, 검증된 출장 아로마오일 마사지로 안전한 휴식을 약속합니다.`,
    /* 19 */ `${locationKeyword} 인근 25분 내 출동하는 출장 마사지! 출장 홈타이 마사지 친절 상담과 신속한 매칭을 제공합니다.`,
    /* 20 */ `${simpleLocation} 고객 만족 1위 출장 홈케어 마사지. 출장 림프관리 마사지 코스로 깊은 피로를 부드럽게 녹여보세요.`,
    /* 21 */ `${locationKeyword} 출장 아로마테라피 마사지 24시 운영! 현장 결제 안심 예약으로 출장 산전산후 테라피 마사지를 부담 없이 이용하세요.`,
    /* 22 */ `유레스트 공식 ${locationKeyword} 출장 마사지 정보. 신속한 방문과 출장 스웨디시 마사지 서비스를 직접 만나보세요.`,
    /* 23 */ `${simpleLocation} 출장 타이 마사지 안내. 1:1 맞춤 출장 딥티슈 마사지로 편안한 휴식 시간을 선물합니다.`,
    /* 24 */ `${locationKeyword} 전지역 신속 방문 예약! 현장 결제로 즐기는 럭셔리 출장 산후조리 마사지 프로그램.`,
    /* 25 */ `지친 몸에 활력을 주는 ${locationKeyword} 24시 출장 마사지. 출장 스포츠 마사지와 출장 힐링 마사지 코스를 추천합니다.`,
    /* 26 */ `${locationKeyword} 출장 홈타이 마사지 요금 안내. 24시간 방문하는 출장 오일 마사지와 출장 감성 마사지.`,
    /* 27 */ `${locationKeyword} 안심 현장 결제 출장 마사지 추천! 출발 전 선입금을 요구하지 않는 출장 전신 릴렉싱 마사지.`,
    /* 28 */ `${locationKeyword} 25분 신속 방문 출장 바디 마사지. 출장 산후전후 마사지와 출장 경락 마사지로 시원하게 풀어보세요.`,
    /* 29 */ `${simpleLocation} 24시 출장 웰니스 마사지 제휴. 정직한 출장 림프 순환 마사지 정보를 유레스트에서 확인하세요.`,
    /* 30 */ `${locationKeyword} 출장 힐링 마사지 맞춤 케어! 이동 없이 누리는 프라이빗 출장 근육 이완 마사지.`,
    /* 31 */ `100% 현장 결제 ${locationKeyword} 24시 출장 마사지. 출장 아로마 마사지와 출장 체형교정 마사지의 빠른 방문.`,
    /* 32 */ `${simpleLocation} 출장 아로마테라피 마사지 프로그램. 24시간 빠르게 이용하는 출장 스톤 마사지 가이드.`,
    /* 33 */ `${locationKeyword} 출장 홈타이 마사지 제휴 샵. 신속한 출장 산후전후 마사지와 출장 디톡스 마사지 제공.`,
    /* 34 */ `${locationKeyword} 24시 안심 출장 스웨디시 마사지. 출장 파워트리 마사지로 진행되는 100% 현장 결제.`,
    /* 35 */ `${simpleLocation} 출장 타이 마사지 전문 관리사 배치. 최고급 출장 피로회복 마사지로 피로를 회복하세요.`,
    /* 36 */ `${locationKeyword} 24시 출장 마사지 신속 방문. 100% 현장 결제 출장 리프레시 마사지를 편하게 이용하세요.`,
    /* 37 */ `${locationKeyword} 1:1 맞춤 출장 마사지 안내. 출장 순환마사지로 온전한 휴식을 선사합니다.`,
    /* 38 */ `${simpleLocation} 25분 내 빠른 출동 출장 마사지! 출장 전신오일 마사지의 고품격 방문 케어.`,
    /* 39 */ `유레스트 ${locationKeyword} 24시 출장 홈타이 마사지. 출장 통증완화 마사지 가격표 안내.`,
    /* 40 */ `${locationKeyword} 출장 스웨디시 & 출장 딥오일 마사지. 현장 결제 매장만 선별했습니다.`,
    /* 41 */ `${simpleLocation} 24시간 출장 마사지 실시간 예약. 출장 산전산후 테라피 마사지로 피로 날리기.`,
    /* 42 */ `${locationKeyword} 릴렉스 출장 마사지 가이드. 출장 체형관리 마사지 프로그램을 만나보세요.`,
    /* 43 */ `${locationKeyword} 전지역 24시 신속 출장 마사지. 출장 족욕 마사지로 편안한 쉼을 누리세요.`,
    /* 44 */ `${simpleLocation} 출장 홈케어 마사지 가이드. 100% 현장 결제 출장 스킨케어 마사지 제휴.`,
    /* 45 */ `${locationKeyword} 빠른 출장 스웨디시 마사지 예약. 출장 산후조리 마사지 맞춤 프로그램.`,
    /* 46 */ `${locationKeyword} 집에서 받는 출장 마사지 추천! 현장 결제 출장 스페셜 마사지.`,
    /* 47 */ `${simpleLocation} 신속 방문 출장 타이 마사지. 전문 테라피스트의 출장 웰니스 마사지.`,
    /* 48 */ `${locationKeyword} 24시 출장 아로마 마사지 정보. 정찰 요금 및 출장 림프관리 마사지 예약.`,
    /* 49 */ `${locationKeyword} 출장 마사지 안심 가이드. 100% 현장 결제 출장 산후전후 마사지 정보 - 유레스트`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: [
      `${locationKeyword} 출장 웰니스 마사지`,
      `${locationKeyword} 출장 아로마 마사지`,
      `${locationKeyword} 출장 산후전후 마사지`,
      `${simpleLocation} 출장 스웨디시 마사지`,
      `${locationKeyword} 출장 타이 마사지`,
      `${locationKeyword} 출장 림프 순환 마사지`,
      `${locationKeyword} 출장 딥티슈 마사지`,
      `${locationKeyword} 출장 스포츠 마사지`,
      `${locationKeyword} 출장 홈타이 마사지`,
      "100% 현장 결제 출장 마사지",
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
          alt: `${locationKeyword} 출장 마사지 - 유레스트`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { region, district } = resolvedParams;
  const dongName = resolvedSearchParams.dong ? decodeURIComponent(resolvedSearchParams.dong) : "";
  const districtName = decodeURIComponent(district);
  const regionName = region === "seoul" ? "서울특별시" : region === "incheon" ? "인천광역시" : "경기도";
  
  const fullTitle = dongName 
    ? `${regionName} ${districtName} (${dongName})` 
    : `${regionName} ${districtName}`;

  const localShops = [
    {
      id: 1,
      name: `✨ ${fullTitle} 한국골든테라피`,
      desc: "VIP 골든 릴렉싱 & 출장 딥티슈 마사지 피로회복! 출장 웰니스 마사지 전문 베테랑 테라피스트의 품격 있는 1:1 맞춤 케어",
      phone: "0507-1280-3361",
      price: "80,000원부터~",
      image: "/shop3.jpg"
    },
    {
      id: 2,
      name: `🌸 ${fullTitle} 한국미인테라피`,
      desc: "최고급 천연 오일을 활용한 출장 아로마 마사지 & 출장 림프 순환 마사지 프로그램",
      phone: "0507-1280-3303",
      price: "70,000원부터~",
      image: "/shop1.jpg"
    },
    {
      id: 3,
      name: `💎 ${fullTitle} 미인클럽테라피`,
      desc: "재방문율 1위 만족도! 철저한 위생 관리와 출장 산후전후 마사지 및 출장 스웨디시 마사지 프라이빗 힐링",
      phone: "0507-1280-3303",
      price: "60,000원부터~",
      image: "/shop2.jpg"
    },
    {
      id: 4,
      name: `👑 ${fullTitle} 퀸즈홈테라피`,
      desc: "여왕처럼 누리는 VIP 홈케어! 출장 스포츠 마사지 및 체형 맞춤형 출장 힐링 마사지 특화 프로그램",
      phone: "0507-1280-3334",
      price: "60,000원부터~",
      image: "/shop5.jpg"
    },
    {
      id: 5,
      name: `🌙 ${fullTitle} 오늘밤테라피`,
      desc: "선입금 전혀 없는 100% 안심 현장 결제! 수도권 전지역 25분 내 빠른 방문 출장 타이 마사지",
      phone: "0507-1280-3223",
      price: "60,000원부터~",
      image: "/shop4.jpg"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${fullTitle} 출장 웰니스 마사지 & 홈케어 안내 - 유레스트`,
    "description": `${fullTitle} 지역 출장 아로마 마사지 및 출장 산후전후 마사지 제휴업체 정보 제공`,
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
            alt={`${fullTitle} 출장 마사지 및 바디케어 안내`} 
            className="w-full h-56 md:h-72 object-cover filter brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1">
              {regionName.toUpperCase()} · LOCAL HEALING GUIDE
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {fullTitle} 출장 마사지 & 홈타이 안내
            </h1>
            <p className="text-xs md:text-sm text-gray-300 mt-2 max-w-xl leading-relaxed">
              {fullTitle} 고객님을 위한 24시 출장 웰니스 마사지, 출장 아로마 마사지, 출장 산후전후 마사지 및 출장 스웨디시 마사지 가이드입니다. 100% 현장 결제 안심 시스템을 확인해 보세요.
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
              {fullTitle} 추천 제휴업체 (총 5곳)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localShops.map((lShop) => (
              <div key={lShop.id} className="bg-[#121216] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group relative">
                <Link href={`/shop/${lShop.id}`} className="absolute inset-0 z-10" aria-label={`${lShop.name} 상세페이지 보기`} />
                <img 
                  src={lShop.image} 
                  alt={lShop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
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
                      href={`tel:${lShop.phone}`} 
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all transform active:scale-95 relative z-20"
                    >
                      전화예약
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 건강 칼럼 섹션 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-base md:text-lg font-bold text-amber-400 flex items-center gap-2">
            <span>🌿</span> {fullTitle} 웰니스 바디케어 & 스트레칭 건강 가이드
          </h3>
          <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
            <p>
              현대 직장인들이 오랫동안 앉아서 일하거나 스마트폰을 지속적으로 사용할 경우, 승모근과 목 주변의 근육이 경직되어 만성 두통이나 피로감을 유발하기 쉽습니다. 주기적인 스트레칭과 맞춤형 전신 바디케어는 체내 순환을 돕고 일상의 활력을 되찾는 데 큰 도움이 됩니다.
            </p>
            <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2">
              <h4 className="font-bold text-white text-xs">💡 나에게 맞는 테라피 프로그램 선택 기준</h4>
              <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                <li><strong className="text-gray-200">출장 웰니스 마사지:</strong> 하체 근육과 견갑골 주위의 굳은 부위를 풀어주어 근육 긴장을 해소합니다.</li>
                <li><strong className="text-gray-200">출장 아로마 마사지:</strong> 최고급 천연 오일로 부드러운 림프 순환과 심신 안정, 부종 완화에 탁월합니다.</li>
                <li><strong className="text-gray-200">출장 산후전후 마사지:</strong> 출산 전후 지친 산모의 컨디션 회복과 신체 밸런스 안정을 돕습니다.</li>
              </ul>
            </div>
            <p className="text-gray-400 text-[11px]">
              * 본 가이드는 {fullTitle} 주민 여러분의 건강한 피로 회복과 올바른 웰니스 정보 제공을 목적으로 작성되었습니다.
            </p>
          </div>
        </section>

        {/* 이용 방법 4단계 */}
        <section className="bg-[#0f0f13] p-6 md:p-8 rounded-3xl border border-amber-500/30 space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 서비스 이용 순서</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">위치 전달</h4>
              <p className="text-xs text-gray-400 mt-1">{fullTitle} 희망 장소를 알려줍니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">시간 조율</h4>
              <p className="text-xs text-gray-400 mt-1">원하시는 방문 시간을 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">코스 선택</h4>
              <p className="text-xs text-gray-400 mt-1">컨디션에 맞는 프로그램을 선택합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">케어 진행</h4>
              <p className="text-xs text-gray-400 mt-1">도착 후 100% 현장 결제로 이용합니다.</p>
            </div>
          </div>
        </section>

        {/* 자주 묻는 질문 (FAQ) */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ & GUIDE</span>
            <h3 className="text-xl font-black text-white mt-1">{fullTitle} 자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-[#121216] p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> {fullTitle} 테라피스트 방문 소요 시간은 얼마나 되나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-emerald-400 font-bold">A.</span> 주요 거점 기준 평균 20분~30분 내외로 신속하게 방문이 가능합니다.
              </p>
            </div>
            <div className="bg-[#121216] p-4 rounded-2xl border border-white/5 space-y-1.5">
              <div className="font-bold text-sm text-gray-200 flex items-center gap-2">
                <span className="text-amber-400">Q.</span> 예약금이나 선입금 요청이 있나요?
              </div>
              <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                <span className="text-emerald-400 font-bold">A.</span> 유레스트 제휴업체는 100% 안심 현장 결제로 운영되므로 출발 전 선입금을 절대 요구하지 않습니다.
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