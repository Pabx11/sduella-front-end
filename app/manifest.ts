import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sduella Opportunity Platform',
    short_name: 'Sduella',
    description: 'Bursaries, jobs and funding opportunities from trusted sources.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a6bff',
    icons: [{ src: '/pictures/Sduella Modern Logo (1).svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
