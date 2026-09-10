import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

export const metadata: Metadata = {
  title: "유레스트 (Urest) | 서울·경기·인천 프리미엄 웰니스 테라피 플랫폼",
  // 네이버 모바일/PC 최적 노출 글자 수 (공백 포함 75~80자 내외) 및 CTR 극대화 문구
  description: "서울·경기·인천 100% 검증 프리미엄 웰니스 테라피 유레스트! 맞춤 바디케어와 온전한 휴식을 위한 공식 제휴 센터 정보를 확인하세요.",
  keywords: [
    "유레스트",
    "Urest",
    "테라피플랫폼",
    "바디케어",
    "타이릴렉싱",
    "아로마테라피",
    "프리미엄케어",
    "서울테라피",
    "경기테라피",
    "인천테라피",
    "웰니스테라피",
    "프리미엄스파"
  ],
  alternates: {
    canonical: "https://urest.netlify.app",
  },
  openGraph: {
    title: "유레스트(Urest) | 서울·경기·인천 프리미엄 테라피 플랫폼",
    description: "내 주변 검증된 프리미엄 테라피 센터 정보 총집합! 온전한 휴식을 위한 맞춤 웰니스 케어를 유레스트에서 만나보세요.",
    url: "https://urest.netlify.app",
    siteName: "유레스트(Urest)",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.webp",
        width: 1200,
        height: 630,
        alt: "유레스트 - 프리미엄 웰니스 & 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "유레스트 (Urest) | 서울·경기·인천 프리미엄 바디케어",
    description: "서울·경기·인천 검증된 테라피 제휴 정보 및 프리미엄 웰니스 가이드",
    images: ["/og-main.webp"],
  },
};

export default function Page() {
  return <MainClientUI />;
}