import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://urest.netlify.app"),
  title: {
    // 🌟 유레스트 브랜딩 및 타겟 지역 설정 (스팸 키워드 완전 배제)
    default: "유레스트 | 서울·경기·인천 프리미엄 웰니스 테라피 플랫폼",
    template: "%s | 유레스트"
  },
  // 네이버/구글 검색 최적 노출 디스크립션 (75~80자 내외)
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
    canonical: "https://urest.netlify.app",
  },
  verification: {
    other: {
      // 🌟 네이버 서치어드바이저 사이트 등록 후 발급받은 실제 인증 코드로 교체하세요
      "naver-site-verification": "YOUR_NAVER_VERIFICATION_CODE",
    },
  },
  openGraph: {
    title: "유레스트 | 서울·경기·인천 프리미엄 테라피 플랫폼",
    description: "선입금 없는 100% 현장 결제 안심 예약! 수도권 프리미엄 테라피 안심 가이드.",
    url: "https://urest.netlify.app",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}