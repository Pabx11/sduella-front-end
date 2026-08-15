"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  BookOpenText,
  BriefcaseBusiness,
  CircleDollarSign,
  Globe2,
  ShieldCheck,
  FileText,
  ArrowRight,
  Check,
  Users,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import type { User } from "../types";
import { cn } from "../lib/utils";

export default function Home({
  user,
  onOpenAuth,
}: {
  user: User | null;
  onOpenAuth: (redirectTo?: string) => void;
}) {
  const router = useRouter();

  const handleApply = () => {
    if (user) router.push("/dashboard");
    else onOpenAuth("/dashboard");
  };
  const [flowStep, setFlowStep] = useState(0);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [poolDisplay, setPoolDisplay] = useState("Indexed");
  const [schoolDisplay, setSchoolDisplay] = useState("—");
  const [poolAmountFlash, setPoolAmountFlash] = useState(false);
  const [poolWaterHeight, setPoolWaterHeight] = useState("38%");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("—");
  const [seq, setSeq] = useState(0);

  const waveBackRef = useRef<SVGPathElement>(null);
  const waveMidRef = useRef<SVGPathElement>(null);
  const waveFrontRef = useRef<SVGPathElement>(null);
  const waveLineRef = useRef<SVGPathElement>(null);
  const animFrameRef = useRef<number>(0);
  const waveStartRef = useRef(performance.now());

  const coin1Ref = useRef<HTMLDivElement>(null);
  const coin2Ref = useRef<HTMLDivElement>(null);
  const donorCardRef = useRef<HTMLDivElement>(null);
  const poolCircleRef = useRef<HTMLDivElement>(null);
  const schoolCardRef = useRef<HTMLDivElement>(null);
  const canvas1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buildPath = (
      t: number,
      amp: number,
      speed: number,
      phase: number,
      baseY: number,
      close: boolean,
    ) => {
      const pts: string[] = [];
      for (let i = 0; i <= 24; i++) {
        const x = (i / 24) * 200;
        const y =
          baseY +
          Math.sin(x * 0.04 + t * speed + phase) * amp +
          Math.sin(x * 0.08 + t * speed * 1.4 + phase) * (amp * 0.4);
        pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
      }
      return pts.join(" ") + (close ? " L 200 60 L 0 60 Z" : "");
    };

    const tick = (now: number) => {
      const t = (now - waveStartRef.current) / 1000;
      waveBackRef.current?.setAttribute("d", buildPath(t, 4, 1.2, 0, 32, true));
      waveMidRef.current?.setAttribute(
        "d",
        buildPath(t, 3.5, 1.6, 1.5, 30, true),
      );
      waveFrontRef.current?.setAttribute(
        "d",
        buildPath(t, 3, 2.0, 3, 27, true),
      );
      waveLineRef.current?.setAttribute(
        "d",
        buildPath(t, 3, 2.0, 3, 27, false),
      );
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const flyCoin = useCallback(
    (
      coinEl: HTMLDivElement,
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      dur: number,
    ) => {
      coinEl.style.transition = "none";
      coinEl.style.left = `${fromX}px`;
      coinEl.style.top = `${fromY}px`;
      coinEl.style.opacity = "1";
      coinEl.style.transform = "scale(1)";
      void coinEl.offsetWidth;
      coinEl.style.transition = `left ${dur}ms cubic-bezier(0.4,0,0.2,1), top ${dur}ms cubic-bezier(0.4,0,0.2,1), transform ${dur}ms ease, opacity 0.2s`;
      coinEl.style.left = `${toX}px`;
      coinEl.style.top = `${toY}px`;
      setTimeout(() => {
        coinEl.style.opacity = "0";
        coinEl.style.transform = "scale(0.3)";
      }, dur - 100);
    },
    [],
  );

  useEffect(() => {
    setFlowStep(0);
    setPipelineStep(0);
    setPoolDisplay("Indexed");
    setSchoolDisplay("—");
    setPoolWaterHeight("38%");
    setPoolAmountFlash(false);
    setProgress(0);
    setProgressLabel("—");

    const ids: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      ids.push(id);
    };
    let t = 600;

    at(() => setProgressLabel("Importing source"), t);
    t += 400;

    at(() => {
      setFlowStep(1);
      const coin = coin1Ref.current;
      const canvas = canvas1Ref.current;
      const donor = donorCardRef.current;
      const pool = poolCircleRef.current;
      if (coin && canvas && donor && pool) {
        const cr = canvas.getBoundingClientRect();
        const dr = donor.getBoundingClientRect();
        const pr = pool.getBoundingClientRect();
        flyCoin(
          coin,
          dr.right - cr.left - 7,
          dr.top + dr.height / 2 - cr.top,
          pr.left + pr.width / 2 - cr.left,
          pr.top + pr.height / 2 - cr.top,
          1200,
        );
      }
    }, t);
    t += 1300;

    at(() => {
      setPoolWaterHeight("52%");
      setPoolAmountFlash(true);
      setPoolDisplay("Imported");
      setProgress(33);
    }, t);
    at(() => setPoolAmountFlash(false), t + 400);
    t += 1200;

    at(() => setFlowStep(2), t);
    t += 1000;
    at(() => setFlowStep(3), t);
    t += 400;

    at(() => {
      const coin = coin2Ref.current;
      const canvas = canvas1Ref.current;
      const pool = poolCircleRef.current;
      const school = schoolCardRef.current;
      if (coin && canvas && pool && school) {
        const cr = canvas.getBoundingClientRect();
        const pr = pool.getBoundingClientRect();
        const sr = school.getBoundingClientRect();
        flyCoin(
          coin,
          pr.left + pr.width / 2 - cr.left,
          pr.top + pr.height / 2 - cr.top,
          sr.left - cr.left + 7,
          pr.top + pr.height / 2 - cr.top,
          1200,
        );
      }
    }, t);
    t += 1300;

    at(() => {
      setPoolWaterHeight("44%");
      setPoolAmountFlash(true);
      setPoolDisplay("Ready");
      setSchoolDisplay("Live");
      setFlowStep(4);
      setProgress(50);
    }, t);
    at(() => setPoolAmountFlash(false), t + 400);
    t += 1200;

    at(() => setProgressLabel("Checking listing"), t);
    t += 400;
    at(() => {
      setPipelineStep(1);
      setProgress(60);
    }, t);
    t += 1500;
    at(() => {
      setPipelineStep(2);
      setProgress(72);
    }, t);
    t += 1800;
    at(() => {
      setPipelineStep(3);
      setProgress(85);
    }, t);
    t += 1700;
    at(() => {
      setPipelineStep(4);
      setProgress(100);
      setProgressLabel("Sequence complete");
    }, t);
    t += 1500;
    at(() => setSeq((s) => s + 1), t + 3500);

    return () => ids.forEach(clearTimeout);
  }, [seq, flyCoin]);

  return (
    <div className="pt-[62px]">
      {/* Hero */}
      <section className="min-h-[calc(100vh-62px)] grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
        <div className="p-6 sm:p-12 md:p-24 flex flex-col justify-center border-r border-grey-200">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter mb-6">
            Business Funding.
            <br />
            Job Opportunities.
            <br />
            Student <span className="text-blue">Funding.</span>
          </h1>
          <p className="text-lg text-grey-600 leading-relaxed max-w-md mb-10">
            Discover trusted opportunities from employers, universities, funders
            and government programmes—all brought together in one clear place.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/bursaries")}
              className="px-8 py-4 bg-black text-white font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-black/90 transition-colors"
            >
              Student Funding
            </button>
            <a
              href="/learnerships"
              className="px-8 py-4 border-1.5 border-blue text-blue font-syne font-bold text-sm tracking-wide rounded-sm hover:bg-blue/5 transition-colors"
            >
              Jobs &amp; Learnerships
            </a>
          </div>
        </div>
        <div className="relative overflow-hidden flex flex-col justify-center bg-[url(https://plus.unsplash.com/premium_photo-1713296255442-e9338f42aad8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZHVhdGV8ZW58MHx8MHx8fDA%3D)] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 p-12 md:p-24">
            <div className="mb-12">
              {/* <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-2">
                Our Purpose
              </span> */}
              <div className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight text-white">
                Connecting people to trusted opportunities.
              </div>
              <p className="text-sm text-white/65 mt-4 leading-relaxed max-w-sm">
                Sduella makes opportunities easier to find and understand, while
                directing every applicant back to the official source.
              </p>
            </div>
            {/* <div className="grid grid-cols-2 gap-px bg-grey-200 border border-grey-200">
              {[
                { label: 'Opportunity Areas', value: '4' },
                { label: 'Initial Market', value: 'South Africa' },
                { label: 'Source Standard', value: 'Official' },
                { label: 'Platform Status', value: 'Growing' }
              ].map(stat => (
                <div key={stat.label} className="bg-white p-4 sm:p-6 min-w-0">
                  <div className="text-xl sm:text-3xl font-extrabold mb-1 break-words">{stat.value}</div>
                  <div className="font-syne text-[10px] font-bold tracking-widest uppercase text-grey-400">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="h-14 border-y border-grey-200 bg-white overflow-hidden flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {[
                "Jobs",
                "Internships",
                "Learnerships",
                "Bursaries",
                "Scholarships",
                "Student Funding",
                "Business Grants",
                "Official Sources",
              ].map((item) => (
                <span
                  key={item}
                  className="px-10 border-r border-grey-200 font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-grey-400"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      {/* <section id="how" className="py-24 px-6 md:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 items-end mb-20 pb-12 border-b border-grey-200">
            <div>
              <span className="font-syne text-[11px] font-bold tracking-[0.2em] uppercase text-blue block mb-6">— How it works</span>
              <h2 className="font-syne text-6xl md:text-[80px] font-extrabold tracking-[-0.04em] leading-[0.95] text-black">
                Every opportunity<br/>has a <em className="italic text-blue">path.</em>
              </h2>
            </div>
            <div className="pb-3">
              <p className="text-grey-600 leading-relaxed mb-4">Opportunities are scattered across employers, universities, funders and government websites.</p>
              <p className="text-black font-medium leading-relaxed">Sduella collects the important details, standardises them and sends every applicant to the official source.</p>
            </div>
          </div>

          01 — Donor flow 
          <div className="mb-28">
            <div className="flex items-baseline gap-6 mb-10">
              <span className="font-syne text-[96px] font-bold text-blue leading-none tracking-[-0.04em] italic">01</span>
              <div>
                <div className="font-syne text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-2">— The opportunity flow</div>
                <div className="font-syne text-[28px] font-semibold text-black tracking-[-0.02em]">From official source to searchable listing</div>
              </div>
            </div>

            <div ref={canvas1Ref} className="bg-white border border-grey-200 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{backgroundImage:'linear-gradient(#e0e0dc 1px,transparent 1px),linear-gradient(90deg,#e0e0dc 1px,transparent 1px)',backgroundSize:'40px 40px'}} />

              <div ref={coin1Ref} className="absolute w-3.5 h-3.5 bg-blue rounded-full z-30 pointer-events-none opacity-0" style={{boxShadow:'0 0 0 3px rgba(26,107,255,0.2)'}} />
              <div ref={coin2Ref} className="absolute w-3.5 h-3.5 bg-blue rounded-full z-30 pointer-events-none opacity-0" style={{boxShadow:'0 0 0 3px rgba(26,107,255,0.2)'}} />

              Unified responsive layout — vertical on mobile, horizontal on desktop 
              <div className="flex flex-col lg:flex-row items-center lg:min-h-[340px]">

                Donor card 
                <div ref={donorCardRef} className="w-full lg:w-[240px] lg:flex-shrink-0 bg-black text-white p-6 relative z-10">
                  <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-white/55 mb-4">— Official source</div>
                  <div className="font-syne text-lg font-semibold mb-1 tracking-[-0.01em]">Official Provider</div>
                  <div className="text-sm text-white/65 mb-5">API or official website</div>
                  <div className="font-syne text-[36px] font-bold tracking-[-0.02em] leading-none">1 new</div>
                  <div className="font-syne text-[12px] font-semibold uppercase tracking-[0.05em] text-white/65 mt-1.5">Opportunity found</div>
                </div>

                Connector 1: vertical on mobile, horizontal on desktop 
                <div className="flex-shrink-0 w-0.5 h-12 lg:h-0.5 lg:w-auto lg:flex-1 bg-[#e0e0dc] relative overflow-hidden z-0">
                  <div
                    className="absolute top-0 left-0 bg-blue transition-[width,height] duration-1000 ease-in-out"
                    style={{ width: flowStep >= 1 ? '100%' : '0%', height: flowStep >= 1 ? '100%' : '0%' }}
                  />
                </div>

                Pool circle 
                <div className="flex flex-col items-center flex-shrink-0 z-10 py-6 lg:py-0 lg:px-2">
                  <div ref={poolCircleRef} className="relative w-[200px] h-[200px] rounded-full border-2 border-black bg-[#fafaf7] flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute left-0 right-0 bottom-0 overflow-visible"
                      style={{ height: poolWaterHeight, transition: 'height 1.2s cubic-bezier(0.4,0,0.2,1)' }}
                    >
                      <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute left-0 right-0 bottom-0 w-full overflow-visible" style={{height:'100%'}}>
                        <path ref={waveBackRef}  fill="#1a6bff" fillOpacity="0.18" />
                        <path ref={waveMidRef}   fill="#1a6bff" fillOpacity="0.22" />
                        <path ref={waveFrontRef} fill="#1a6bff" fillOpacity="0.28" />
                        <path ref={waveLineRef}  fill="none" stroke="#1a6bff" strokeWidth="1.5" strokeOpacity="0.5" />
                      </svg>
                    </div>
                    <div className="relative z-10 text-center px-4">
                      <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-2">Sduella index</div>
                      <div
                        className="font-syne text-[26px] font-bold tracking-[-0.02em] leading-none transition-all duration-300"
                        style={{ color: poolAmountFlash ? '#1a6bff' : '#111111', transform: poolAmountFlash ? 'scale(1.05)' : 'scale(1)' }}
                      >
                        {poolDisplay}
                      </div>
                      <div className="font-syne text-[10px] font-semibold uppercase tracking-[0.05em] text-grey-500 mt-2">Standardised records</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-5 px-4 py-2.5 border border-grey-200 bg-[#fafaf7]">
                    <span className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300",
                      flowStep === 0 ? "bg-[#9a9a96]" : flowStep >= 4 ? "bg-green" : "bg-blue animate-pulse"
                    )} />
                    <span className="font-syne text-[11px] font-semibold tracking-[0.05em] text-black">
                      {flowStep === 0 ? 'Waiting' : flowStep === 1 ? 'Importing source' : flowStep === 2 ? 'Checking duplicate' : flowStep === 3 ? 'Publishing listing' : 'Live'}
                    </span>
                  </div>
                </div>

                Connector 2 
                <div className="flex-shrink-0 w-0.5 h-12 lg:h-0.5 lg:w-auto lg:flex-1 bg-[#e0e0dc] relative overflow-hidden z-0">
                  <div
                    className="absolute top-0 left-0 bg-blue transition-[width,height] duration-1000 ease-in-out"
                    style={{ width: flowStep >= 3 ? '100%' : '0%', height: flowStep >= 3 ? '100%' : '0%' }}
                  />
                </div>

                Institution card 
                <div ref={schoolCardRef} className="w-full lg:w-[240px] lg:flex-shrink-0 bg-blue text-white p-6 relative z-10">
                  <div className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 mb-4">— Sduella frontend</div>
                  <div className="font-syne text-lg font-semibold mb-1 tracking-[-0.01em]">Opportunity Feed</div>
                  <div className="text-sm text-white/85 mb-5">Searchable, consistent listing</div>
                  <div
                    className="font-syne text-[36px] font-bold tracking-[-0.02em] leading-none transition-opacity duration-500"
                    style={{ opacity: flowStep >= 4 ? 1 : 0.3 }}
                  >
                    {schoolDisplay}
                  </div>
                  <div className="font-syne text-[12px] font-semibold uppercase tracking-[0.05em] text-white/80 mt-1.5">Listing published</div>
                </div>

              </div>
            </div>
          </div>

          02 — Student pipeline 
          <div className="mb-16">
            <div className="flex items-baseline gap-6 mb-10">
              <span className="font-syne text-[96px] font-bold text-blue leading-none tracking-[-0.04em] italic">02</span>
              <div>
                <div className="font-syne text-[11px] font-bold tracking-[0.2em] uppercase text-grey-400 mb-2">— The applicant's path</div>
                <div className="font-syne text-[28px] font-semibold text-black tracking-[-0.02em]">From discovery to official application</div>
              </div>
            </div>

            <div className="bg-white border border-grey-200 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-40" style={{backgroundImage:'linear-gradient(#e0e0dc 1px,transparent 1px),linear-gradient(90deg,#e0e0dc 1px,transparent 1px)',backgroundSize:'40px 40px'}} />

              <div className="relative grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12">
                <div className={cn("bg-white border border-black p-7 relative transition-all duration-500", pipelineStep >= 3 && "shadow-2xl shadow-blue/10")}>
                  {pipelineStep >= 3 && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute top-6 -right-3 bg-blue text-white font-syne text-sm font-bold tracking-[0.15em] px-4 py-2 rotate-[8deg] border-2 border-white shadow-md z-10"
                    >
                      VERIFIED
                    </motion.div>
                  )}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-grey-100">
                    <span className="text-[11px] font-semibold text-grey-400 tracking-[0.1em] font-mono">OPP-ZA-0847</span>
                    <span className={cn(
                      "font-syne text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 transition-all duration-500",
                      pipelineStep === 0 ? "bg-grey-100 text-grey-500" :
                      pipelineStep <= 2 ? "bg-blue/10 text-blue" : "bg-blue text-white"
                    )}>
                      {pipelineStep === 0 ? 'New' : pipelineStep <= 2 ? 'Processing' : 'Verified'}
                    </span>
                  </div>
                  <h3 className="font-syne text-xl font-semibold text-black mb-1 tracking-[-0.01em]">Standardised Opportunity</h3>
                  <p className="text-sm text-grey-500 mb-5">One consistent Sduella record</p>
                  {[
                    ['Provider', 'Official source'],
                    ['Opportunity type', 'Tagged'],
                    ['Location', 'Searchable'],
                    ['Deadline', 'Monitored'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-dashed border-grey-200 text-sm last:border-0">
                      <span className="text-grey-400">{label}</span>
                      <span className="text-black font-medium font-syne">{value}</span>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-black flex justify-between items-baseline">
                    <span className="font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-grey-400">— Application</span>
                    <span className="font-syne text-xl font-bold text-black tracking-[-0.02em]">Official link ↗</span>
                  </div>
                </div>

                <div className="lg:pl-8 lg:border-l lg:border-grey-200 flex flex-col gap-6">
                  {([
                    { Icon: FileText,    num: '01', title: 'Opportunity discovered',       desc: 'A collector finds a new listing on an official provider website.',                      times: ['Waiting','Discovered','Indexed','Indexed','Indexed'] },
                    { Icon: ShieldCheck, num: '02', title: 'Details standardised',          desc: 'Key fields such as type, location and deadline are organised consistently.',            times: ['Waiting','Waiting','Standardising...','Completed','Completed'] },
                    { Icon: Check,       num: '03', title: 'Eligibility made clear',        desc: 'Requirements are summarised while the official source remains the authority.',           times: ['Waiting','Waiting','Waiting','Checking...','Completed'] },
                    { Icon: ArrowRight,  num: '04', title: 'Applicant visits official source', desc: 'Sduella sends the applicant to the provider to complete the application.',            times: ['Waiting','Waiting','Waiting','Waiting','Official link ready'] },
                  ] as const).map(({ Icon, num, title, desc, times }, i) => (
                    <div key={i} className={cn("grid grid-cols-[32px_1fr] gap-4 items-start transition-all duration-500", i >= pipelineStep ? "opacity-30" : "opacity-100")}>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 lg:-ml-12 border transition-all duration-500",
                        pipelineStep === i + 1 ? "bg-blue border-blue text-white shadow-[0_0_0_4px_rgba(26,107,255,0.15)]" :
                        pipelineStep > i + 1  ? "bg-black border-black text-white" :
                        "bg-off-white border-grey-200 text-grey-400"
                      )}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <div className={cn("font-syne text-[10px] font-bold tracking-[0.2em] uppercase mb-1 transition-colors duration-300",
                          pipelineStep === i + 1 ? "text-blue" : pipelineStep > i + 1 ? "text-black" : "text-grey-400"
                        )}>— Step {num}</div>
                        <div className="font-syne text-base font-semibold text-black tracking-[-0.01em] mb-1">{title}</div>
                        <div className="text-sm text-grey-500 leading-relaxed">{desc}</div>
                        <div className={cn("text-[11px] mt-1.5 font-medium transition-colors duration-300",
                          pipelineStep === i + 1 ? "text-blue font-semibold" : "text-grey-400"
                        )}>{times[Math.min(pipelineStep, 4) as 0|1|2|3|4]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

            Progress bar + Replay 
          <div className="flex items-center justify-between gap-6 pt-6 border-t border-grey-200 flex-wrap mb-20">
            <div className="flex items-center gap-4 flex-1 min-w-[240px]">
              <span className="font-syne text-[11px] font-bold tracking-[0.15em] uppercase text-grey-400 min-w-[160px]">{progressLabel}</span>
              <div className="flex-1 h-px bg-grey-200 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-blue"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <button
              onClick={() => setSeq(s => s + 1)}
              className="font-syne text-[11px] font-bold py-3 px-6 border-[1.5px] border-black bg-black text-white tracking-[0.15em] uppercase hover:bg-blue hover:border-blue transition-all"
            >
              Replay sequence
            </button>
          </div>

         CTA 
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 bg-blue text-white">
            <div className="max-w-xl">
              <h3 className="text-3xl font-extrabold mb-3">Find the right next step.</h3>
              <p className="text-white/70 text-lg">Explore trusted student funding and early-career opportunities from official sources.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="/bursaries" className="px-10 py-4 bg-white text-blue font-syne font-bold text-sm tracking-wide hover:bg-grey-100 transition-all text-center">Student Funding</a>
              <a href="/learnerships" className="px-10 py-4 border-2 border-white text-white font-syne font-bold text-sm tracking-wide hover:bg-white/10 transition-all text-center">Early Careers</a>
            </div>
          </div>

        </div>
      </section> */}

      {/* Categories */}
      <section id="categories" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              {/* <span className="font-syne text-[11px] font-bold tracking-widest uppercase text-blue block mb-4">
                Opportunity Categories
              </span> */}
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
                Find your next opportunity.
              </h2>
            </div>
            <p className="text-grey-600 text-sm md:text-base max-w-sm">
              Explore trusted jobs, early-career pathways, student funding and
              business support from official sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <motion.div
              id="jobs"
              whileHover={{ y: -5 }}
              className="scroll-mt-[90px] md:col-span-8 bg-black text-white p-10 md:p-14 rounded-sm relative overflow-hidden group"
            >
              <div className="relative z-10">
                {/* <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue text-[10px] font-bold tracking-widest uppercase rounded-sm mb-8">
                  <ShieldCheck size={12} /> Core Category
                </div> */}
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 max-w-md">
                  Job Opportunities
                </h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-lg mb-8">
                  Full-time, entry-level and graduate roles collected from
                  trusted employer and government sources.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold border-b-2 border-blue pb-1 text-white/70 hover:text-off-black hover:border-blue/10 transition-colors">
                  <a href="/scholarships" className=" ">
                    Learn more{" "}
                  </a>
                  <ArrowUpRight />
                </span>
              </div>
              <BriefcaseBusiness className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 group-hover:text-white/10 transition-colors rotate-12" />
            </motion.div>

            <motion.div
              id="early-careers"
              whileHover={{ y: -5 }}
              className="scroll-mt-[90px] md:col-span-4 bg-off-white border border-grey-200 p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white border border-grey-200 rounded-sm flex items-center justify-center mb-8 shadow-sm">
                  <Users size={20} className="text-blue" />
                </div>
                <h3 className="text-xl font-extrabold mb-3">Early Careers</h3>
                <p className="text-[13px] text-grey-600 leading-relaxed">
                  Internships, learnerships, apprenticeships and graduate
                  programmes that build practical experience.
                </p>
              </div>
              {/* <span className="inline-flex items-center w-max gap-2 text-sm font-bold border-b-2 border-blue pb-1 text-blue hover:text-blue hover:border-blue/10 transition-colors">
                <a href="/learnerships" className=" ">
                  Learn more{" "}
                </a>
                <ArrowUpRight />
              </span> */}
              <span className="inline-flex items-center w-max gap-2 text-sm font-bold border-b-2 border-blue/80 pb-1 text-blue/80 hover:text-blue hover:border-blue/10 transition-colors">
                <a href="/learnerships" className=" ">
                  Browse Business Funding{" "}
                </a>
                <ArrowUpRight />
              </span>
            </motion.div>

            <motion.div
              id="study-funding"
              whileHover={{ y: -5 }}
              className="scroll-mt-[90px] md:col-span-4 bg-off-white border border-grey-200 p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white border border-grey-200 rounded-sm flex items-center justify-center mb-8 shadow-sm">
                  <BookOpenText size={20} className="text-blue" />
                </div>
                <h3 className="text-xl font-extrabold mb-3">Study Funding</h3>
                <p className="text-[13px] text-grey-600 leading-relaxed">
                  Bursaries, scholarships, financial aid and grants for
                  undergraduate and postgraduate study.
                </p>
              </div>

              <span className="inline-flex items-center w-max gap-2 text-sm font-bold border-b-2 border-blue/80 pb-1 text-blue/80 hover:text-blue hover:border-blue/10 transition-colors">
                <a href="/bursaries" className=" ">
                  Browse Study Funding{" "}
                </a>
                <ArrowUpRight />
              </span>
            </motion.div>

            <motion.div
              id="business-funding"
              whileHover={{ y: -5 }}
              className="scroll-mt-[90px] md:col-span-4 bg-off-white border border-grey-200 p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white border border-grey-200 rounded-sm flex items-center justify-center mb-8 shadow-sm">
                  <CircleDollarSign size={20} className="text-blue" />
                </div>
                <h3 className="text-xl font-extrabold mb-3">
                  Business Funding
                </h3>
                <p className="text-[13px] text-grey-600 leading-relaxed">
                  Grants, youth funding and enterprise support for
                  entrepreneurs, startups and growing businesses.
                </p>
              </div>
              <span className="inline-flex items-center w-max gap-2 text-sm font-bold border-b-2 border-blue/80 pb-1 text-blue/80 hover:text-blue hover:border-blue/10 transition-colors">
                <a href="/business-funding" className=" ">
                  Browse Business Funding{" "}
                </a>
                <ArrowUpRight />
              </span>
            </motion.div>

            {/* <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-4 bg-blue text-white p-10 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center mb-8">
                  <Globe2 size={20} />
                </div>
                <h3 className="text-xl font-extrabold mb-3">
                  International Reach
                </h3>
                <p className="text-white/70 text-[13px] leading-relaxed mb-6">
                  Starting with strong South African sources and expanding into
                  trusted global opportunities.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" /> South
                    African sources
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />{" "}
                    International opportunities
                  </div>
                </div>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
                Source network expanding
              </span>
              <span className="inline-flex items-center w-max gap-2 text-sm font-bold border-b-2 border-white/80 pb-1 text-white/80 hover:text-white hover:border-white/10 transition-colors">
                <a href="/bursaries" className=" ">
                  Browse Study Funding{" "}
                </a>
                <ArrowUpRight />
              </span>
            </motion.div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
