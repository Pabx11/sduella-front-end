import { ImageResponse } from 'next/og';

export const alt = 'Sduella — trusted bursaries, jobs and funding opportunities';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{ background: '#111111', color: '#ffffff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '76px 84px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ color: '#1a6bff', fontSize: 30, fontWeight: 800, letterSpacing: 5 }}>SDUELLA</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.02, maxWidth: 980 }}>Trusted opportunities. Clear next steps.</div>
        <div style={{ fontSize: 30, color: '#b8b8b3' }}>Bursaries · Scholarships · Jobs · Learnerships · Business Funding</div>
      </div>
    </div>,
    size,
  );
}
