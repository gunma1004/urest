import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://urest-kr.netlify.app';
  const lastModified = new Date();

  // 1. 메인 홈 페이지
  const mainRoute: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 상단 카테고리 메인 페이지
  const categories = ['services', 'prices', 'travel', 'places', 'reviews'];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. 메인 제휴업체 상세 페이지 (/shop/1 ~ /shop/5)
  const shopIds = ['1', '2', '3', '4', '5'];
  const shopRoutes: MetadataRoute.Sitemap = shopIds.map((id) => ({
    url: `${baseUrl}/shop/${id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const allRoutes: MetadataRoute.Sitemap = [...mainRoute, ...categoryRoutes, ...shopRoutes];

  // 4. 지역 데이터 내장 정의 (빌드 에러 방지)
  const regions = [
    {
      regionKey: 'seoul',
      districts: [
        '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', 
        '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', 
        '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'
      ]
    },
    {
      regionKey: 'gyeonggi',
      districts: [
        '수원시 장안구', '수원시 권선구', '수원시 팔달구', '수원시 영통구', 
        '성남시 수정구', '성남시 중원구', '성남시 분당구', 
        '고양시 덕양구', '고양시 일산동구', '고양시 일산서구', 
        '용인시 처인구', '용인시 기흥구', '용인시 수지구', 
        '부천시 원미구', '부천시 소사구', '부천시 오정구', 
        '안산시 상록구', '안산시 단원구', 
        '안양시 만안구', '안양시 동안구', 
        '광명시', '평택시', '동두천시', '과천시', '구리시', '남양주시', '오산시', 
        '시흥시', '군포시', '의왕시', '하남시', '파주시', '이천시', '안성시', 
        '김포시', '화성시', '광주시', '양주시', '포천시', '여주시', '연천군', '가평군', '양평군'
      ]
    },
    {
      regionKey: 'incheon',
      districts: [
        '제물포구', '영종구', '미추홀구', '연수구', '남동구', '부평구', 
        '계양구', '서해구', '검단동', '강화군', '옹진군'
      ]
    }
  ];

  // 구 및 샵 상세 경로 순회 매핑
  for (const item of regions) {
    allRoutes.push({
      url: `${baseUrl}/${item.regionKey}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    for (const district of item.districts) {
      const encodedDistrict = encodeURIComponent(district);

      allRoutes.push({
        url: `${baseUrl}/${item.regionKey}/${encodedDistrict}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.9,
      });

      for (const sId of shopIds) {
        allRoutes.push({
          url: `${baseUrl}/${item.regionKey}/${encodedDistrict}/shop/${sId}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  }

  return allRoutes;
}