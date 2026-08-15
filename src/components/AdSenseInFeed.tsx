"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdSenseInFeedProps {
  className?: string;
  layoutKey?: string;
  slot?: string;
  variant?: 'feed' | 'text' | 'card' | 'rail';
}

export default function AdSenseInFeed({
  className,
  layoutKey = '-fc+5g+70-cl-1m',
  slot = '7800703584',
  variant = 'feed',
}: AdSenseInFeedProps) {
  const requested = useRef(false);
  const adRef = useRef<HTMLModElement | null>(null);
  const [unfilled, setUnfilled] = useState(false);

  useEffect(() => {
    if (requested.current) return;
    requested.current = true;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.warn('The in-feed ad could not be requested.', error);
    }
  }, []);

  useEffect(() => {
    const element = adRef.current;
    if (!element) return;
    const updateStatus = () => setUnfilled(element.dataset.adStatus === 'unfilled');
    const observer = new MutationObserver(updateStatus);
    observer.observe(element, { attributes: true, attributeFilter: ['data-ad-status'] });
    updateStatus();
    return () => observer.disconnect();
  }, []);

  const variantClass = {
    feed: 'border-y border-grey-200 px-2 py-4',
    text: 'border-y border-grey-200 px-3 py-4',
    card: 'h-fit self-start border border-grey-200 p-4 shadow-sm',
    rail: 'border border-grey-200 p-3 shadow-sm',
  }[variant];

  return (
    <aside
      className={cn(
        'w-full min-w-0 overflow-hidden bg-white',
        variantClass,
        unfilled && 'hidden',
        className,
      )}
      aria-label="Advertisement"
    >
      <div className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-grey-500">Advertisement</div>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-format="fluid"
        data-ad-layout-key={layoutKey}
        data-ad-client="ca-pub-8240540609956576"
        data-ad-slot={slot}
      />
    </aside>
  );
}
