"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// 🌟 회피형 키워드 40개 리스트
const evasionKeywords = [
  "출장 타이 마사지", "출장 힐링 마사지", "출장 테라피 마사지", "출장 아로마 마사지", "출장 스웨디시 마사지",
  "방문 타이 마사지", "방문 힐링 마사지", "방문 테라피 마사지", "방문 아로마 마사지", "방문 스웨디시 마사지",
  "홈타이 마사지", "홈힐링 마사지", "홈테라피 마사지", "홈아로마 마사지", "홈스웨디시 마사지",
  "서울 출장 마사지", "경기 출장 마사지", "인천 출장 마사지", "수도권 출장 마사지", "24시 출장 마사지",
  "출장 건식 마사지", "출장 오일 마사지", "출장 전신 마사지", "방문 건식 마사지", "방문 오일 마사지",
  "방문 전신 마사지", "홈건식 마사지", "홈오일 마사지", "홈전신 마사지", "프리미엄 출장 마사지",
  "VIP 출장 마사지", "출장 감성 마사지", "방문 감성 마사지", "홈감성 마사지", "출장 스포츠 마사지",
  "방문 스포츠 마사지", "홈스포츠 마사지", "여성전용 출장 마사지", "커플 출장 마사지", "심야 출장 마사지"
];

// 🌟 서울·경기·인천 전지역 데이터 (요청하신 모든 시/구 완벽 반영)
export const regionData: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로1.2.3.4가동", "종로5.6가동", "이화동", "혜화동", "창신동", "숭인동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "동화동", "황학동", "중림동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산2가동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"] },
      seongdong: { name: "성동구", dongs: ["왕십리동", "마장동", "사근동", "행당동", "응봉동", "금호동", "옥수동", "성수동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "휘경동", "이문동"] },
      jungnang: { name: "중랑구", dongs: ["면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "월곡동", "장위동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "삼각산동", "번동", "수유동", "우이동", "인수동"] },
      dobong: { name: "도봉구", dongs: ["창동", "도봉동", "쌍문동", "방학동"] },
      nowon: { name: "노원구", dongs: ["월계동", "공릉동", "하계동", "중계본동", "중계동", "상계동"] },
      eunpyeong: { name: "은평구", dongs: ["녹번동", "불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "수색동", "진관동"] },
      seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제동", "홍은동", "남가좌동", "북가좌동"] },
      mapo: { name: "마포구", dongs: ["아현동", "공덕동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원동", "연남동", "성산동", "상암동"] },
      yangcheon: { name: "양천구", dongs: ["목동", "신월동", "신정동"] },
      gangseo: { name: "강서구", dongs: ["염창동", "등촌동", "화곡동", "우장산동", "가양동", "발산동", "공항동", "방화동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "수궁동", "항동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산동", "시흥동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포동", "여의동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"] },
      dongjak: { name: "동작구", dongs: ["노량진동", "상도동", "흑석동", "사당동", "대방동", "신대방동"] },
      gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "중앙동", "인헌동", "남현동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "삼성동", "미성동", "난곡동"] },
      seocho: { name: "서초구", dongs: ["서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"] },
      gangnam: { name: "강남구", dongs: ["신사동", "논현동", "압구정동", "청담동", "삼성동", "대치동", "역삼동", "도곡동", "개포동", "일원동", "일원본동", "수서동", "세곡동"] },
      songpa: { name: "송파구", dongs: ["풍납동", "거여동", "마천동", "방이동", "오륜동", "오금동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "위례동", "잠실동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일동", "명일동", "고덕동", "암사동", "천호동", "성내동", "길동", "둔촌동"] },
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자동", "영화동", "송죽동", "조원동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류동", "권선동", "곡선동", "평동", "호매실동", "서둔동", "금곡동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["매교동", "매산동", "고등동", "화서동", "지동", "우만동", "인계동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄동", "원천동", "영통동", "망포동", "광교동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "양지동", "복정동", "위례동", "신촌동", "고등동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광동", "은행동", "상대원동", "하대원동", "도촌동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "금곡동", "미금동", "구미동", "판교동", "삼평동", "백현동", "운중동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["원신동", "흥도동", "효자동", "창릉동", "능곡동", "행신동", "화정동", "대덕동", "고양동", "관산동", "성사동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산동", "정발산동", "풍산동", "백석동", "마두동", "장항동", "고봉동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산동", "탄현동", "주엽동", "대화동", "송포동", "덕이동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "남사읍", "원삼면", "백암면", "동부동", "중앙동", "역삼동", "유림동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "마북동", "구성동", "동백동", "보정동", "상갈동", "기흥동", "서농동", "중동", "상하동", "보라동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡동", "원미동", "소사동", "역곡동", "중동", "상동", "약대동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["소사본동", "범박동", "옥길동", "괴안동", "송내동", "춘의동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["오정동", "고강동", "원종동", "성곡동"] },
      anyang_manan: { name: "안양시 만안구", dongs: ["안양동", "석수동", "박달동"] },
      anyang_dongan: { name: "안양시 동안구", dongs: ["비산동", "부흥동", "달안동", "관양동", "평촌동", "평안동", "귀인동", "범계동", "호계동"] },
      ansan_sangnok: { name: "안산시 상록구", dongs: ["반월동", "사동", "일동", "이동", "본오동", "수암동", "장상동"] },
      ansan_danwon: { name: "안산시 단원구", dongs: ["와동", "고잔동", "초지동", "원곡동", "백운동", "신길동", "성곡동", "대부동"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "가능동", "흥선동", "자금동"] },
      gwangmyeong: { name: "광명시", dongs: ["광명동", "철산동", "하안동", "소하동", "학온동"] },
      pyeongtaek: { name: "평택시", dongs: ["진위면", "서탄면", "고덕면", "청북읍", "포승읍", "현덕면", "팽성읍", "신장동", "서정동", "송탄동", "지산동", "원평동", "비전동", "소사동", "세교동"] },
      dongducheon: { name: "동두천시", dongs: ["생연동", "보산동", "동두천동", "상패동", "중앙동", "송내동", "불현동"] },
      gwacheon: { name: "과천시", dongs: ["중앙동", "갈현동", "별양동", "부림동", "과천동", "문원동"] },
      guri: { name: "구리시", dongs: ["갈매동", "동구동", "인창동", "교문동", "수택동"] },
      namyangju: { name: "남양주시", dongs: ["와부읍", "진접읍", "화도읍", "수동면", "조안면", "퇴계원읍", "별내면", "별내동", "다산동", "평내동", "호평동", "오남읍"] },
      osan: { name: "오산시", dongs: ["중앙동", "신장동", "세마동", "초평동", "대원동"] },
      siheung: { name: "시흥시", dongs: ["대야동", "신천동", "신현동", "은행동", "매화동", "목감동", "군자동", "월곶동", "정왕동", "배곧동", "과림동", "연성동"] },
      gunpo: { name: "군포시", dongs: ["군포동", "산본동", "금정동", "재궁동", "오금동", "수리동", "대야미동"] },
      uiwang: { name: "의왕시", dongs: ["고천동", "부곡동", "오전동", "내손동", "청계동"] },
      hanam: { name: "하남시", dongs: ["천현동", "신장동", "덕풍동", "감북동", "위례동", "미사동", "춘궁동", "초이동"] },
      paju: { name: "파주시", dongs: ["문산읍", "조리읍", "법원읍", "파주읍", "탄현면", "광탄면", "월롱면", "적성면", "파평면", "교하동", "운정동", "금촌동"] },
      icheon: { name: "이천시", dongs: ["창전동", "중리동", "증포동", "부발읍", "장호원읍"] },
      anseong: { name: "안성시", dongs: ["공도읍", "죽산면", "삼죽면", "보개면", "금광면", "서운면", "미양면", "대덕면", "원곡면", "양성면", "안성동"] },
      gimpo: { name: "김포시", dongs: ["고촌읍", "통진읍", "대곶면", "월곶면", "하성면", "사우동", "풍무동", "장기동", "구래동", "운양동", "마산동"] },
      hwaseong: { name: "화성시", dongs: ["봉담읍", "우정읍", "향남읍", "남양읍", "새솔동", "진안동", "병점동", "반월동", "기배동", "화산동", "동탄동"] },
      gwangju: { name: "광주시", dongs: ["오포읍", "초월읍", "퇴촌면", "남종면", "남한산성면", "송정동", "광남동"] },
      yangju: { name: "양주시", dongs: ["회천동", "양주동", "백석읍", "은현면", "남면", "장흥면"] },
      pocheon: { name: "포천시", dongs: ["소흘읍", "군내면", "내촌면", "가산면", "일동면", "이동면", "영중면", "창수면", "관인면", "화현면", "포천동", "선단동"] },
      yeoju: { name: "여주시", dongs: ["여흥동", "중앙동", "오학동", "가남읍"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍", "군남면", "청산면", "백학면", "미산면", "왕징면", "신서면", "중면"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "설악면", "청평면", "상면", "조종면", "북면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "강상면", "강하면", "양서면", "옥천면", "지평면", "용문면", "개군면"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      jemulpo: { name: "제물포구", dongs: ["신포동", "연안동", "만석동", "송림동", "화수동", "송현동", "금창동", "도원동", "율목동", "동인천동", "개항동"] },
      yeongjong: { name: "영종구", dongs: ["영종동", "운서동", "용유동"] },
      michuhol: { name: "미추홀구", dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] },
      yeonsu: { name: "연수구", dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "장수서창동", "서창동", "남촌도림동", "논현동", "고잔동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "일신동", "십정동"] },
      gyeyang: { name: "계양구", dongs: ["효성동", "계산동", "작전동", "작전서운동", "계양동"] },
      seohae: { name: "서해구", dongs: ["연희동", "청라동", "가정동", "신현원창동", "석남동", "가좌동"] },
      geomdan: { name: "검단구", dongs: ["검단동", "불로대곡동", "원당동", "당하동", "오류왕길동", "마전동", "아라동"] },
      ganghwa: { name: "강화군", dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"] },
      ongjin: { name: "옹진군", dongs: ["북도면", "연평면", "백령면", "대청면", "덕적면", "자월면", "영흥면"] }
    }
  }
};

// 5개 공식 제휴 업체 데이터
const verifiedShopsData = [
  {
    id: 1,
    badge: "제휴 1호점",
    name: "🌸 한국미인테라피",
    desc: "서울 및 수도권 전역 신속 매칭. 굳은 근육을 부드럽게 이완하는 건식 타이 & 딥 릴렉스 전문 센터",
    phone: "0507-1280-3303",
    price: "80,000원부터~",
    image: "/assets/images/partners/shop-01.webp"
  },
  {
    id: 2,
    badge: "제휴 2호점",
    name: "✨ 미인클럽테라피",
    desc: "천연 에센셜 오일과 정교한 핸드 테크닉. 몸과 마음을 편안하게 감싸주는 프리미엄 아로마 바디 순환 케어",
    phone: "0507-1280-3303",
    price: "80,000원부터~",
    image: "/assets/images/partners/shop-02.webp"
  },
  {
    id: 3,
    badge: "제휴 3호점",
    name: "🏆 한국골든테라피",
    desc: "타이와 아로마를 결합한 VIP 시그니처 힐링 프로그램. 커플 및 2인 동시 케어 전문 스케줄 지원",
    phone: "0507-1280-3361",
    price: "80,000원부터~",
    image: "/assets/images/partners/shop-03.webp"
  },
  {
    id: 4,
    badge: "제휴 4호점",
    name: "🌙 오늘밤테라피",
    desc: "100% 현장 결제 원칙! 야간 및 심야 시간대 빠른 배정과 지친 하루 끝 완벽한 휴식을 선사하는 맞춤 케어",
    phone: "0507-1280-3223",
    price: "80,000원부터~",
    image: "/assets/images/partners/shop-04.webp"
  },
  {
    id: 5,
    badge: "제휴 5호점",
    name: "👑 퀸즈홈테라피",
    desc: "자택 및 숙박 호텔 전담 케어. 철저한 위생 수칙 준수와 프라이버시를 보장하는 1:1 VIP 웰니스 프로그램",
    phone: "0507-1280-3334",
    price: "80,000원부터~",
    image: "/assets/images/partners/shop-05.webp"
  }
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#121216] rounded-2xl border border-white/5 overflow-hidden transition-all hover:border-amber-500/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 text-left flex justify-between items-center font-bold text-sm text-gray-200 hover:text-amber-400 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-amber-400 font-extrabold">Q.</span> {question}
        </span>
        <span className="text-amber-400 font-extrabold text-lg">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed border-t border-white/5 pt-3 bg-black/40">
          <span className="text-emerald-400 font-bold">A. </span>{answer}
        </div>
      )}
    </div>
  );
}

export default function MainClientUI() {
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  
  // 🌟 랜덤 샵 데이터 상태 관리 (새로고침 시 랜덤 셔플)
  const [shops, setShops] = useState(verifiedShopsData);
  // 🌟 회피형 키워드 셔플 상태 관리
  const [rollingKeywords, setRollingKeywords] = useState<string[]>([]);

  useEffect(() => {
    // 샵 데이터를 무작위로 섞음
    const shuffledShops = [...verifiedShopsData].sort(() => Math.random() - 0.5);
    setShops(shuffledShops);

    // 40개 키워드를 무작위로 섞음
    const shuffledKeywords = [...evasionKeywords].sort(() => Math.random() - 0.5);
    setRollingKeywords(shuffledKeywords);
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  const handleSearch = () => {
    if (!selectedDistrict) {
      alert("원하시는 지역(구/시/군)을 먼저 선택해주세요!");
      return;
    }
    const districtObj = regionData[selectedRegion]?.districts[selectedDistrict];
    const districtName = districtObj ? districtObj.name : selectedDistrict;
    
    const baseUrl = `/${selectedRegion}/${encodeURIComponent(districtName)}`;
    const targetUrl = selectedDong 
      ? `${baseUrl}?dong=${encodeURIComponent(selectedDong)}` 
      : baseUrl;
    
    window.location.href = targetUrl;
  };

  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDongs = selectedDistrict && currentDistricts[selectedDistrict] ? currentDistricts[selectedDistrict].dongs : [];

  return (
    <div className="bg-[#08080a] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 🌟 회피형 키워드 롤링 배너 구역 */}
      {rollingKeywords.length > 0 && (
        <div className="w-full bg-neutral-900 border-b border-white/5 py-2 overflow-hidden relative flex whitespace-nowrap">
          <div className="animate-marquee flex gap-6 text-[11px] text-gray-400">
            {rollingKeywords.map((kw, idx) => (
              <span key={idx} className="hover:text-amber-400 cursor-default transition-colors">#{kw}</span>
            ))}
            {/* 자연스러운 롤링을 위해 한 번 더 반복 */}
            {rollingKeywords.map((kw, idx) => (
              <span key={`dup-${idx}`} className="hover:text-amber-400 cursor-default transition-colors">#{kw}</span>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 50s linear infinite;
            }
          `}} />
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        
        {/* 1. 상단 히어로 메인 배너 */}
        <section className="text-center my-2">
          <div className="overflow-hidden rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative h-64 md:h-84 flex items-center justify-center p-6 bg-gradient-to-b from-neutral-900 to-[#08080a]">
            <div className="absolute inset-0 z-0">
              <img 
                src="/assets/images/og-main.webp" 
                alt="유레스트 프리미엄 웰니스 케어 배너" 
                className="w-full h-full object-cover filter brightness-[0.35] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 space-y-3">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-black text-xs tracking-wider shadow-lg">
                ✨ 수도권 공식 제휴 테라피 네트워크
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                가장 온전한 쉼의 시간, <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">유레스트</span>
              </h1>
              <p className="text-gray-200 text-xs md:text-sm font-medium max-w-lg mx-auto drop-shadow leading-relaxed">
                서울·경기·인천 전 지역 엄선된 전문 테라피스트의 프라이빗 피로회복 & 웰니스 프로그램. 선입금 없는 100% 현장 결제로 만나보세요.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 공식 제휴 파트너 (랜덤 셔플) */}
        <section className="space-y-6" id="partners">
          <div className="text-center mb-6">
            <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">OFFICIAL PARTNER SHOPS</p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              🏆 유레스트 공식 제휴 센터
            </h2>
            <p className="text-xs text-gray-400 mt-1">표준 요금제와 철저한 위생 관리를 준수하는 권역별 추천 센터입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shops.map((shop) => (
              <div key={shop.id} className="bg-[#121216] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-md transition-all group relative">
                
                <img 
                  src={shop.image} 
                  alt={shop.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold">{shop.badge}</span>
                    <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                      {shop.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {shop.desc}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{shop.price}</span>
                    <a 
                      href={`tel:${shop.phone.replace(/-/g, '')}`} 
                      className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow transition-colors relative z-20"
                    >
                      직통예약
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 내 동네/세부 구·동 검색 박스 */}
        <section className="pt-4" id="search">
          <div className="bg-gradient-to-b from-[#141418] to-[#0d0d10] border-2 border-amber-500/40 p-6 md:p-8 rounded-3xl max-w-xl mx-auto shadow-[0_10px_35px_rgba(0,0,0,0.8)] text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <label className="text-sm text-amber-400 font-black uppercase tracking-wider flex items-center gap-2">
                📍 내 동네 상세 지역 테라피 찾기
              </label>
              <span className="text-[11px] text-gray-300 bg-black/50 px-3 py-1 rounded-lg border border-white/10">
                수도권 전지역 지원
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-gray-400 block mb-1.5 font-semibold">1단계: 시·도 선택</span>
                <select 
                  value={selectedRegion} 
                  onChange={handleRegionChange} 
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  {Object.keys(regionData).map((key) => (
                    <option key={key} value={key} className="bg-[#1e1e1e] text-white">
                      {regionData[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-xs text-gray-400 block mb-1.5 font-semibold">2단계: 구·시·군 선택</span>
                <select 
                  value={selectedDistrict} 
                  onChange={handleDistrictChange} 
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">구 / 시 / 군을 선택해주세요</option>
                  {Object.keys(currentDistricts).map((dKey) => (
                    <option key={dKey} value={dKey} className="bg-[#1e1e1e] text-white">
                      {currentDistricts[dKey].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-xs text-gray-400 block mb-1.5 font-semibold">3단계: 동 선택 (상세 지역)</span>
                <select 
                  value={selectedDong} 
                  onChange={(e) => setSelectedDong(e.target.value)} 
                  disabled={!selectedDistrict}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/30 disabled:opacity-30 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">동 전체 보기</option>
                  {currentDongs.map((dong, idx) => (
                    <option key={idx} value={dong} className="bg-[#1e1e1e] text-white">
                      {dong}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-4 rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] mt-4 cursor-pointer transform active:scale-[0.98]"
              >
                🔍 선택 지역 테라피 안내 보기
              </button>
            </div>
          </div>
        </section>

        {/* 4. 유레스트 간편 이용 절차 */}
        <section className="bg-[#0f0f13] border border-amber-500/30 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">SERVICE PROCESS</span>
            <h3 className="text-xl font-black text-white mt-1">간편한 케어 진행 절차</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 1</span>
              <h4 className="font-bold text-white mt-1">지역 확인</h4>
              <p className="text-xs text-gray-400 mt-1">이용을 원하시는 세부 지역 및 방문 장소를 선택합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 2</span>
              <h4 className="font-bold text-white mt-1">프로그램 비교</h4>
              <p className="text-xs text-gray-400 mt-1">타이, 에센셜 아로마, 시그니처 코스를 비교합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 3</span>
              <h4 className="font-bold text-white mt-1">직통 일정 조율</h4>
              <p className="text-xs text-gray-400 mt-1">검증된 제휴점과 편안한 시간대를 확인합니다.</p>
            </div>
            <div className="bg-black/60 p-4 rounded-2xl border border-white/5 text-center">
              <span className="text-xs text-amber-400 font-bold">STEP 4</span>
              <h4 className="font-bold text-white mt-1">프리미엄 케어</h4>
              <p className="text-xs text-gray-400 mt-1">선입금 없는 100% 현장 결제로 편안하게 휴식합니다.</p>
            </div>
          </div>
        </section>

        {/* 5. 고객 실제 후기 */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">CUSTOMER REVIEWS</span>
            <h3 className="text-xl font-black text-white mt-1">실제 이용 고객 솔직 후기</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121216] p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-black text-sm">★★★★★ 5.0</span>
                <span className="text-[11px] text-gray-500">서울 강남구 이용 고객</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                "시간 약속도 칼같이 지켜주시고 테라피스트 분 실력이 너무 훌륭하셨어요. 야근 후 굳어있던 목과 어깨가 완전히 풀렸습니다."
              </p>
            </div>
            <div className="bg-[#121216] p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-amber-400 font-black text-sm">★★★★★ 5.0</span>
                <span className="text-[11px] text-gray-500">경기 성남시 이용 고객</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                "선입금이나 예약금 요구 없이 100% 현장 결제라 정말 안심하고 이용했습니다. 위생 용품도 꼼꼼히 챙겨오셔서 대만족입니다."
              </p>
            </div>
          </div>
        </section>

        {/* 6. 자주 묻는 질문 (FAQ) */}
        <section className="space-y-4">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">FAQ & GUIDE</span>
            <h3 className="text-xl font-black text-white mt-1">자주 묻는 질문</h3>
          </div>
          <div className="space-y-3">
            <FaqItem 
              question="예약 및 방문까지 소요 시간은 어떻게 되나요?"
              answer="서울, 경기, 인천 전 권역 전담 스케줄러가 상주하고 있어 위치 확인 후 평균 20분~30분 내외로 빠른 방문 조율이 가능합니다."
            />
            <FaqItem 
              question="선입금이나 예약금이 발생하나요?"
              answer="유레스트의 모든 제휴 센터는 100% 안심 결제제로 운영되므로 도착 전 어떠한 선입금이나 예약금도 요구하지 않습니다."
            />
            <FaqItem 
              question="호텔이나 레지던스에서도 이용 가능한가요?"
              answer="방문객 출입 규정이 허용되는 호텔 및 레지던스라면 자택과 동일하게 편안하게 이용하실 수 있습니다."
            />
          </div>
        </section>

      </main>

      {/* 푸터 */}
      <footer className="bg-[#040405] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div>
            <a 
              href="tel:050712803361" 
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 유레스트 제휴 및 입점 안내 (0507-1280-3361)
            </a>
          </div>
          <p className="text-gray-400 font-bold">유레스트(Urest)는 수도권 웰니스 바디케어 & 테라피 정보 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; 2026 UREST. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}