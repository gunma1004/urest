export const metadata: Metadata = {
  metadataBase: new URL("https://urest-kr.netlify.app"),
  title: {
    default: "유레스트 | 서울·경기·인천 프리미엄 웰니스 테라피 플랫폼",
    template: "%s | 유레스트"
  },
  description: "서울, 경기, 인천 전 지역 프리미엄 바디케어 & 웰니스 테라피 전문 플랫폼 유레스트(Urest). 선입금 없는 100% 현장 결제, 검증된 제휴 센터 코스 및 실시간 일정 안내.",
  keywords: [
    "유레스트",
    "Urest",
    "서울 테라피",
    "경기 테라피",
    "인천 테라피",
    "웰니스 바디케어",
    "아로마 테라피",
    "타이 릴렉싱",
    "프리미엄 테라피",
    "서울 웰니스",
    "경기 웰니스",
    "인천 웰니스"
  ],
  alternates: {
    canonical: "https://urest-kr.netlify.app",
  },
  verification: {
    other: {
      // 🌟 네이버 서치어드바이저 인증 코드 적용 완료
      "naver-site-verification": "feb5dd2e768f90369090ec09143b9fb05c3f437a",
    },
  },
  openGraph: {
    title: "유레스트 | 서울·경기·인천 프리미엄 테라피 플랫폼",
    description: "선입금 없는 100% 현장 결제 안심 예약! 수도권 프리미엄 테라피 안심 가이드.",
    url: "https://urest-kr.netlify.app",
    siteName: "유레스트",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.webp",
        width: 1200,
        height: 630,
        alt: "유레스트 공식 안내",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};