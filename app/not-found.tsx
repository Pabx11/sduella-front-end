import Link from 'next/link';
export default function NotFound() {
  return <div className="flex min-h-[70vh] items-center justify-center px-6 pt-[62px]"><div className="max-w-xl text-center"><p className="font-syne text-xs font-bold uppercase tracking-widest text-blue">404</p><h1 className="mt-4 text-4xl font-extrabold">This page could not be found.</h1><p className="mt-4 text-grey-600">Browse current bursaries, jobs and funding from the main opportunity pages.</p><Link href="/" className="mt-7 inline-flex bg-black px-6 py-3 font-syne text-sm font-bold text-white">Go to Sduella</Link></div></div>;
}
