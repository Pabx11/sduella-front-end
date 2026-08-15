"use client";

import { useEffect, useState } from 'react';
import AdSenseInFeed from './AdSenseInFeed';

const RAIL_LAYOUT_KEY = '-6q+e9+15-2u+4y';
const RAIL_SLOT = '9013858698';
const RAIL_MEDIA_QUERY = '(min-width: 1280px)';

export default function AdSenseWideRails() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(RAIL_MEDIA_QUERY);
    const updateVisibility = () => setVisible(media.matches);
    updateVisibility();
    media.addEventListener('change', updateVisibility);
    return () => media.removeEventListener('change', updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* <div className="absolute inset-y-0 right-full mr-2 w-[112px] min-[1360px]:mr-4 min-[1360px]:w-[140px] min-[1650px]:w-[160px] min-[1800px]:mr-6 min-[1800px]:w-[220px]">
        <div className="sticky top-[86px]">
          <AdSenseInFeed layoutKey={RAIL_LAYOUT_KEY} slot={RAIL_SLOT} variant="rail" />
        </div>
      </div> */}
      <div className="absolute inset-y-0 left-full ml-2 w-[112px] min-[1360px]:ml-4 min-[1360px]:w-[140px] min-[1650px]:w-[160px] min-[1800px]:ml-6 min-[1800px]:w-[220px]">
        <div className="sticky top-[86px]">
          <AdSenseInFeed layoutKey={RAIL_LAYOUT_KEY} slot={RAIL_SLOT} variant="rail" />
        </div>
      </div>
    </>
  );
}
