import { MetadataRoute } from 'next';
import { regionData } from '@/app/page'; // 메인 페이지에 정의된 최신 regionData 연동

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

  // 4. 메인 페이지의 regionData를 순회하여 모든 지역·구·동·샵 경로 자동 생성 (누락 방지)
  for (const [cityKey, regInfo] of Object.entries(regionData)) {
    // 시/도 페이지 (예: /seoul)
    allRoutes.push({
      url: `${baseUrl}/${cityKey}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    for (const [districtKey, distInfo] of Object.entries(regInfo.districts)) {
      const distName = distInfo.name;
      const encodedDist = encodeURI(distName);

      // 구/시/군 페이지 (예: /seoul/종로구)
      allRoutes.push({
        url: `${baseUrl}/${cityKey}/${encodedDist}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.9,
      });

      // 구 단위 샵 상세 페이지 (예: /seoul/종로구/shop/1)
      for (const sId of shopIds) {
        allRoutes.push({
          url: `${baseUrl}/${cityKey}/${encodedDist}/shop/${sId}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }

      // 세부 동 페이지 및 동 단위 샵 상세 페이지
      if (distInfo.dongs && Array.isArray(distInfo.dongs)) {
        for (const dong of distInfo.dongs) {
          const encodedDong = encodeURI(dong);

          // 쿼리스트링 방식 동 페이지 (예: /seoul/종로구?dong=창신동)
          allRoutes.push({
            url: `${baseUrl}/${cityKey}/${encodedDist}?dong=${encodedDong}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.85,
          });

          // 슬래시 경로 방식 동 페이지 (예: /seoul/종로구/창신동)
          allRoutes.push({
            url: `${baseUrl}/${cityKey}/${encodedDist}/${encodedDong}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.85,
          });

          // 동 단위 샵 상세 페이지 (예: /seoul/종로구/창신동/shop/2)
          for (const sId of shopIds) {
            allRoutes.push({
              url: `${baseUrl}/${cityKey}/${encodedDist}/${encodedDong}/shop/${sId}`,
              lastModified,
              changeFrequency: 'weekly',
              priority: 0.75,
            });
          }
        }
      }
    }
  }

  return allRoutes;
}