import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://urest-kr.netlify.app"),
  title: {
    default: "유레스트 | 서울·경기·인천 프리미엄 웰니스 마사지 & 바디 테라피 안내",
    template: "%s | 유레스트"
  },
  description: "서울, 경기, 인천 전 지역 프리미엄 웰니스 마사지 및 바디케어 테라피 전문 플랫폼 유레스트(Urest). 정직한 정찰제 요금과 검증된 제휴 센터 코스 및 프로그램 안내.",
  keywords: [
    "유레스트",
    "Urest",
    "서울 마사지",
    "경기 마사지",
    "인천 마사지",
    "웰니스 바디케어",
    "스웨디시 마사지",
    "아로마 테라피",
    "타이마사지",
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
      "naver-site-verification": "feb5dd2e768f90369090ec09143b9fb05c3f437a",
    },
  },
  openGraph: {
    title: "유레스트 | 서울·경기·인천 프리미엄 웰니스 마사지 플랫폼",
    description: "투명한 정찰제 요금과 쾌적한 힐링 프로그램! 수도권 프리미엄 마사지 & 테라피 제휴 안내.",
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