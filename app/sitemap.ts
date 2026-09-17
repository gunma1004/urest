import { MetadataRoute } from 'next';
import { regionData } from '@/app/page'; // 메인 페이지에 정의된 regionData 경로에 맞게 조정하세요

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

  // 4. 서울, 경기, 인천 지역 및 구·동·샵 상세 구조 전체 순회 매핑
  for (const [cityKey, regInfo] of Object.entries(regionData)) {
    allRoutes.push({
      url: `${baseUrl}/${cityKey}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    for (const [districtKey, distInfo] of Object.entries(regInfo.districts)) {
      allRoutes.push({
        url: `${baseUrl}/${cityKey}/${districtKey}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.9,
      });

      for (const sId of shopIds) {
        allRoutes.push({
          url: `${baseUrl}/${cityKey}/${districtKey}/shop/${sId}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }

      if (distInfo.dongs && Array.isArray(distInfo.dongs)) {
        for (const dong of distInfo.dongs) {
          const encodedDong = encodeURIComponent(dong);

          allRoutes.push({
            url: `${baseUrl}/${cityKey}/${districtKey}/${encodedDong}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.85,
          });

          for (const sId of shopIds) {
            allRoutes.push({
              url: `${baseUrl}/${cityKey}/${districtKey}/${encodedDong}/shop/${sId}`,
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