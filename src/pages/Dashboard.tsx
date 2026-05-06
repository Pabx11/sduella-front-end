import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, FileText, CreditCard, History,
  Settings as SettingsIcon, LogOut, Menu, X, Download, ChevronRight,
} from 'lucide-react';
import type { User } from '../types';
import { cn } from '../lib/utils';
import { printDonationReceipt, printDonationStatement } from '../lib/pdf';

export default function Dashboard({ user, onLogout, onUpdateUser }: {
  user: User | null;
  onLogout: () => void;
  onUpdateUser?: (user: User) => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<{ item: any; index: number } | null>(null);
  const [donorType, setDonorType] = useState<'individual' | 'company'>(user?.donorType ?? 'individual');

  if (!user) return <Navigate to="/" />;

  const tabs = [
    { id: 'overview',  label: 'Overview',   icon: <LayoutDashboard size={16} /> },
    { id: 'items',     label: user.role === 'donor' ? 'Donations' : 'Applications', icon: user.role === 'donor' ? <CreditCard size={16} /> : <FileText size={16} /> },
    { id: 'history',   label: 'History',    icon: <History size={16} /> },
    { id: 'settings',  label: 'Settings',   icon: <SettingsIcon size={16} /> },
  ];

  return (
    <div className="pt-[62px] min-h-screen bg-off-white">
      {/* Mobile top bar */}
      <div className="lg:hidden bg-white border-b border-grey-200 px-6 py-4 flex items-center justify-between sticky top-[62px] z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-syne text-xs font-bold">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <span className="font-syne font-bold text-sm">{tabs.find(t => t.id === activeTab)?.label}</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-grey-100 rounded-sm transition-colors">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-[calc(100vh-62px)]">
        {/* Sidebar */}
        <aside className={cn(
          "bg-white border-r border-grey-200 p-8 flex flex-col fixed inset-y-0 left-0 z-50 w-[280px] transition-transform lg:relative lg:translate-x-0 lg:z-0 lg:pt-8 pt-24",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="mb-10">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-syne text-xl font-bold mb-4">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="text-lg font-extrabold">{user.name}</div>
            <div className="font-syne text-[10px] font-bold tracking-widest uppercase text-blue mt-1">{user.role}</div>
            {user.email && <div className="text-[11px] text-grey-400 mt-1">{user.email}</div>}
          </div>
          <nav className="flex-1 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 font-syne font-bold text-[13px] rounded-sm transition-all",
                  activeTab === tab.id ? "bg-grey-100 text-black shadow-sm" : "text-grey-600 hover:bg-grey-50"
                )}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>
          <button onClick={onLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red font-syne font-bold text-[13px] hover:bg-red/5 rounded-sm transition-colors">
            <LogOut size={16} /> Log Out
          </button>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}

        {/* Main */}
        <main className="p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >

              {/* ── OVERVIEW ── */}
              {activeTab === 'overview' && (
                <>
                  <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-extrabold mb-2">Overview</h1>
                      <p className="text-grey-500 text-sm">Welcome back, {user.name.split(' ')[0]}.</p>
                    </div>
                    {user.role === 'student' && (
                      <a href="/apply" className="px-6 py-3 bg-black text-white font-syne font-bold text-[13px] rounded-sm shadow-lg shadow-black/10 hover:translate-y-[-2px] transition-all text-center">New Application</a>
                    )}
                  </div>

                  {/* Donor profile card */}
                  {user.role === 'donor' && (
                    <div className="bg-white border border-grey-200 rounded-sm p-8 mb-6 flex flex-col sm:flex-row gap-6 items-start">
                      <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center font-syne text-2xl font-bold flex-shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Full Name</div><div className="font-bold text-sm">{user.name}</div></div>
                        <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Email</div><div className="font-bold text-sm break-all">{user.email}</div></div>
                        {user.phone && <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Phone</div><div className="font-bold text-sm">{user.phone}</div></div>}
                        {user.address && <div className="sm:col-span-2"><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Address</div><div className="font-bold text-sm">{user.address}</div></div>}
                      </div>
                    </div>
                  )}

                  {/* Student profile card */}
                  {user.role === 'student' && (
                    <div className="bg-white border border-grey-200 rounded-sm p-8 mb-6 flex flex-col sm:flex-row gap-6 items-start">
                      <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center font-syne text-2xl font-bold flex-shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Full Name</div><div className="font-bold text-sm">{user.name}</div></div>
                        <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Email</div><div className="font-bold text-sm break-all">{user.email}</div></div>
                        {user.phone && <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Phone</div><div className="font-bold text-sm">{user.phone}</div></div>}
                        {user.institution && <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Institution</div><div className="font-bold text-sm">{user.institution}</div></div>}
                        {user.year && <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Year of Study</div><div className="font-bold text-sm">{user.year}</div></div>}
                        {user.idNumber && <div><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">ID Number</div><div className="font-bold text-sm font-mono">{'•'.repeat(9)}{user.idNumber.slice(-4)}</div></div>}
                        {user.address && <div className="sm:col-span-2 lg:col-span-3"><div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Home Address</div><div className="font-bold text-sm">{user.address}</div></div>}
                      </div>
                    </div>
                  )}

                  {/* Stat cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {user.role === 'donor' ? (
                      <>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Total Donated</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.totalDonated ?? 0) > 0 ? `R ${(user.totalDonated ?? 0).toLocaleString()}` : 'R --'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Students Helped</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.donations ?? []).reduce((a, d) => a + (d.students || 0), 0) || '--'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Donations</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.donations ?? []).length || '--'}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Applications</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.applications ?? []).length || '--'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Status</div>
                          <div className="text-2xl font-syne font-extrabold text-blue">
                            {(user.applications ?? []).some(a => a.status === 'Under Review') ? 'Active' : 'Idle'}
                          </div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Total Funded</div>
                          <div className="text-3xl font-syne font-extrabold text-green">
                            {(user.applications ?? []).filter(a => a.status === 'Approved').reduce((a, ap) => a + (ap.amount || 0), 0) > 0
                              ? `R ${(user.applications ?? []).filter(a => a.status === 'Approved').reduce((a, ap) => a + (ap.amount || 0), 0).toLocaleString()}`
                              : 'R --'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Recent activity */}
                  <div className="bg-white border border-grey-200 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-grey-200 flex items-center justify-between">
                      <h3 className="font-syne font-bold text-sm">Recent Activity</h3>
                      <button onClick={() => setActiveTab('items')} className="text-[11px] font-bold text-blue uppercase tracking-widest">View All</button>
                    </div>
                    <div className="divide-y divide-grey-100">
                      {(user.role === 'donor' ? user.donations : user.applications)?.slice(0, 3).map((item: any, i: number) => (
                        <div key={i} className="p-6 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn("w-10 h-10 rounded-sm flex items-center justify-center", item.status === 'Approved' || item.status === 'Disbursed' ? "bg-green/10 text-green" : "bg-blue/10 text-blue")}>
                              {user.role === 'donor' ? <CreditCard size={18} /> : <FileText size={18} />}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{item.category || 'Donation'}</div>
                              <div className="text-[11px] text-grey-400">{item.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-sm">R {item.amount.toLocaleString()}</div>
                            <div className={cn("text-[10px] font-bold uppercase tracking-widest", item.status === 'Approved' || item.status === 'Disbursed' ? "text-green" : "text-blue")}>{item.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── ITEMS ── */}
              {activeTab === 'items' && (
                <>
                  <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-extrabold mb-2">{user.role === 'donor' ? 'Donations' : 'Applications'}</h1>
                      <p className="text-grey-500 text-sm">Manage your {user.role === 'donor' ? 'contributions' : 'funding requests'}.</p>
                    </div>
                    {user.role === 'student' && (
                      <a href="/apply" className="px-6 py-3 bg-black text-white font-syne font-bold text-[13px] rounded-sm shadow-lg shadow-black/10 hover:translate-y-[-2px] transition-all text-center">New Application</a>
                    )}
                    {user.role === 'donor' && (user.donations ?? []).length > 0 && (
                      <button
                        onClick={() => printDonationStatement(user)}
                        className="flex items-center gap-2 px-6 py-3 border-1.5 border-black text-black font-syne font-bold text-[13px] rounded-sm hover:bg-grey-50 transition-colors"
                      >
                        <Download size={14} /> Download Statement
                      </button>
                    )}
                  </div>
                  <div className="bg-white border border-grey-200 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-grey-200">
                      <div className={cn("grid text-[10px] font-bold tracking-widests uppercase text-grey-400", user.role === 'donor' ? "grid-cols-[1fr_1fr_auto_32px]" : "grid-cols-4")}>
                        <div className={user.role !== 'donor' ? "col-span-2" : ""}>Description</div>
                        <div>Amount</div>
                        <div>Status</div>
                        {user.role === 'donor' && <div />}
                      </div>
                    </div>
                    <div className="divide-y divide-grey-100">
                      {(user.role === 'donor' ? user.donations : user.applications)?.map((item: any, i: number) => (
                        <div
                          key={i}
                          onClick={() => user.role === 'donor' && setSelectedDonation({ item, index: i })}
                          className={cn(
                            "p-6 grid items-center gap-4",
                            user.role === 'donor'
                              ? "grid-cols-[1fr_1fr_auto_32px] cursor-pointer hover:bg-grey-50 transition-colors"
                              : "grid-cols-4"
                          )}
                        >
                          <div className={user.role !== 'donor' ? "col-span-2" : ""}>
                            <div className="font-bold text-sm">{item.category || 'Donation'}</div>
                            <div className="text-[11px] text-grey-400">{item.date}</div>
                          </div>
                          <div className="font-syne font-bold text-sm">R {item.amount.toLocaleString()}</div>
                          <div>
                            <span className={cn("px-2.5 py-1 rounded-sm font-syne text-[10px] font-bold tracking-widests uppercase", item.status === 'Approved' || item.status === 'Disbursed' ? "bg-green/10 text-green" : "bg-blue/10 text-blue")}>
                              {item.status}
                            </span>
                          </div>
                          {user.role === 'donor' && <ChevronRight size={16} className="text-grey-400 justify-self-end" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── HISTORY ── */}
              {activeTab === 'history' && (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-extrabold mb-2">History</h1>
                    <p className="text-grey-500 text-sm">A complete record of your activity on Sduella.</p>
                  </div>
                  <div className="space-y-4">
                    {(user.role === 'donor' ? user.donations : user.applications)?.map((item: any, i: number) => (
                      <div key={i} className="bg-white p-6 rounded-sm border border-grey-200 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-center min-w-[60px]">
                            <div className="text-xs font-bold text-grey-400 uppercase tracking-widests">{item.date.split('-')[0]}</div>
                            <div className="text-xl font-extrabold">{item.date.split('-')[2]}</div>
                          </div>
                          <div className="w-px h-10 bg-grey-100" />
                          <div>
                            <div className="font-bold text-sm">{item.category || 'Donation'}</div>
                            <div className="text-[11px] text-grey-400">Ref: SD-{1000 + i}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-syne font-bold text-sm">R {item.amount.toLocaleString()}</div>
                          <div className="text-[10px] font-bold text-grey-400 uppercase tracking-widests mt-1">Processed</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── SETTINGS ── */}
              {activeTab === 'settings' && (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-extrabold mb-2">Settings</h1>
                    <p className="text-grey-500 text-sm">Manage your account preferences and security.</p>
                  </div>
                  <div className="max-w-2xl space-y-8">

                    {/* Profile */}
                    <div className="bg-white p-8 rounded-sm border border-grey-200">
                      <h3 className="text-lg font-extrabold mb-6">Profile Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Full Name</label>
                            <input type="text" defaultValue={user.name} className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Email Address</label>
                            <input type="email" defaultValue={user.email} className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Phone Number</label>
                            <input type="tel" defaultValue={user.phone ?? ''} placeholder="e.g. +27 82 000 0000" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Gender</label>
                            <select defaultValue={user.gender ?? ''} className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm bg-white appearance-none">
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="non-binary">Non-binary</option>
                              <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Home Address</label>
                            <input type="text" defaultValue={user.address ?? ''} placeholder="Street, City, Province" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                          {user.role === 'student' && (
                            <>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Institution</label>
                                <input type="text" defaultValue={user.institution ?? ''} placeholder="University / TVET College" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Year of Study</label>
                                <input type="text" defaultValue={user.year ?? ''} placeholder="e.g. 3rd Year" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                              </div>
                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">
                                  SA ID Number <span className="normal-case tracking-normal font-normal text-grey-400">· encrypted</span>
                                </label>
                                <input type="text" defaultValue={user.idNumber ?? ''} placeholder="13-digit SA ID" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm font-mono tracking-widests" />
                              </div>
                            </>
                          )}
                        </div>
                        <button className="px-6 py-2.5 bg-black text-white font-syne font-bold text-xs rounded-sm">Save Changes</button>
                      </div>
                    </div>

                    {/* Donor type + company */}
                    {user.role === 'donor' && (
                      <div className="bg-white p-8 rounded-sm border border-grey-200">
                        <h3 className="text-lg font-extrabold mb-2">Donor Type</h3>
                        <p className="text-sm text-grey-500 mb-6">Specify whether you are donating as an individual or on behalf of a company. Company details are required for Section 18A tax receipts.</p>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {(['individual', 'company'] as const).map(type => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setDonorType(type)}
                              className={cn(
                                "py-3 text-[12px] font-bold border-1.5 rounded-sm transition-all font-syne",
                                donorType === type ? "border-blue bg-blue/5 text-blue" : "border-grey-200 text-grey-600 hover:bg-grey-50"
                              )}
                            >
                              {type === 'individual' ? 'Individual' : 'Company / Organisation'}
                            </button>
                          ))}
                        </div>
                        {donorType === 'company' && (
                          <div className="space-y-4 pt-4 border-t border-grey-100">
                            <p className="text-[11px] text-grey-400">Company details are encrypted at rest and used solely for tax documentation and Section 18A compliance.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Company / Organisation Name</label>
                                <input type="text" defaultValue={user.company?.companyName ?? ''} placeholder="Registered company name" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Company Reg. Number <span className="normal-case tracking-normal font-normal">· encrypted</span></label>
                                <input type="text" defaultValue={user.company?.registrationNumber ?? ''} placeholder="e.g. 2001/123456/07" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm font-mono" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">VAT Number <span className="normal-case tracking-normal font-normal">· encrypted · optional</span></label>
                                <input type="text" defaultValue={user.company?.vatNumber ?? ''} placeholder="e.g. 4123456789" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm font-mono" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Authorised Representative</label>
                                <input type="text" defaultValue={user.company?.authorisedRepresentative ?? ''} placeholder="Full name of signatory" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-bold tracking-widests uppercase text-grey-400">Company Address</label>
                                <input type="text" defaultValue={user.company?.companyAddress ?? ''} placeholder="Registered office address" className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                              </div>
                            </div>
                            <button className="mt-2 px-6 py-2.5 bg-black text-white font-syne font-bold text-xs rounded-sm">Save Company Details</button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Student documents */}
                    {user.role === 'student' && (
                      <div className="bg-white p-8 rounded-sm border border-grey-200">
                        <h3 className="text-lg font-extrabold mb-2">Documents</h3>
                        <p className="text-sm text-grey-500 mb-6">Upload or update your supporting documents. All files are reviewed privately.</p>
                        <div className="space-y-3">
                          {[
                            { label: 'Academic Transcript',       note: 'Latest official transcript from your institution' },
                            { label: 'Institution Fee Statement', note: 'Showing outstanding or projected balance' },
                            { label: 'National ID / Passport',    note: 'Must match the ID number on your profile' },
                            { label: 'Student Card',              note: 'Current academic year' },
                            { label: 'Proof of Income / Affidavit', note: 'Household income or financial need documentation' },
                          ].map(doc => (
                            <div key={doc.label} className="flex items-center justify-between p-4 border border-grey-200 rounded-sm">
                              <div>
                                <div className="text-sm font-bold">{doc.label}</div>
                                <div className="text-[11px] text-grey-400 mt-0.5">{doc.note}</div>
                              </div>
                              <button className="px-4 py-2 border border-grey-200 text-[11px] font-bold uppercase tracking-widests rounded-sm hover:bg-grey-100 transition-colors text-blue">
                                Upload
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Security */}
                    <div className="bg-white p-8 rounded-sm border border-grey-200">
                      <h3 className="text-lg font-extrabold mb-6">Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-grey-100 rounded-sm">
                          <div>
                            <div className="text-sm font-bold">Two-Factor Authentication</div>
                            <div className="text-xs text-grey-500 mt-0.5">Add an extra layer of security.</div>
                          </div>
                          <div className="w-10 h-5 bg-grey-200 rounded-full relative cursor-pointer">
                            <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full" />
                          </div>
                        </div>
                        <button className="text-xs font-bold text-blue uppercase tracking-widests">Change Password</button>
                      </div>
                    </div>

                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Donation detail modal */}
      <AnimatePresence>
        {selectedDonation && user.role === 'donor' && (
          <div className="fixed inset-0 bg-black/40 z-[400] flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="bg-white w-full max-w-lg rounded-sm relative z-0 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-grey-200 shrink-0">
                <div>
                  <h2 className="font-syne font-extrabold text-lg">Donation Receipt</h2>
                  <p className="text-[11px] text-grey-400 mt-0.5 uppercase tracking-widests">
                    SDU-RCP-{new Date(selectedDonation.item.date).getFullYear()}-{String(selectedDonation.index + 1).padStart(4, '0')}
                  </p>
                </div>
                <button onClick={() => setSelectedDonation(null)} className="p-2 text-grey-400 hover:text-black hover:bg-grey-100 rounded-sm z-10 relative">
                  <X size={16} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                <div className={cn("px-4 py-3 rounded-sm flex items-center justify-between", selectedDonation.item.status === 'Disbursed' ? "bg-green/10" : "bg-blue/10")}>
                  <span className="font-syne font-bold text-sm">{selectedDonation.item.status === 'Disbursed' ? 'Funds Disbursed' : selectedDonation.item.status}</span>
                  <span className={cn("font-syne text-[10px] font-bold uppercase tracking-widests", selectedDonation.item.status === 'Disbursed' ? "text-green" : "text-blue")}>{selectedDonation.item.status}</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widests text-grey-400 mb-3">Donor</div>
                  {[
                    { label: 'Name',    value: user.name },
                    { label: 'Email',   value: user.email },
                    ...(user.phone   ? [{ label: 'Phone',   value: user.phone }]   : []),
                    ...(user.address ? [{ label: 'Address', value: user.address }] : []),
                    ...(user.donorType === 'company' && user.company ? [{ label: 'Company', value: user.company.companyName }] : []),
                  ].map(r => (
                    <div key={r.label} className="flex justify-between text-sm py-1.5 border-b border-dashed border-grey-100 last:border-0">
                      <span className="text-grey-400">{r.label}</span>
                      <span className="font-semibold text-right max-w-[60%]">{r.value}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widests text-grey-400 mb-3">Donation Details</div>
                  {[
                    { label: 'Date',             value: selectedDonation.item.date },
                    { label: 'Amount',           value: `R ${selectedDonation.item.amount.toLocaleString()}` },
                    { label: 'Students Helped',  value: String(selectedDonation.item.students ?? '—') },
                    { label: 'Fund Status',      value: selectedDonation.item.status },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between text-sm py-1.5 border-b border-dashed border-grey-100 last:border-0">
                      <span className="text-grey-400">{r.label}</span>
                      <span className="font-semibold">{r.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-grey-400 leading-relaxed">
                  This receipt confirms your contribution to the Sduella Community Education Fund. Funds are disbursed exclusively to reviewed, approved student applications. Section 18A tax receipt available on request.
                </p>
              </div>

              <div className="p-6 border-t border-grey-200 flex gap-3 shrink-0">
                <button
                  onClick={() => printDonationReceipt(selectedDonation.item, user, selectedDonation.index)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border-1.5 border-black text-black font-syne font-bold text-[12px] tracking-wide rounded-sm hover:bg-grey-50 transition-colors"
                >
                  <Download size={14} /> Download Receipt
                </button>
                <button
                  onClick={() => printDonationStatement(user)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white font-syne font-bold text-[12px] tracking-wide rounded-sm hover:bg-blue transition-colors"
                >
                  <Download size={14} /> Full Statement
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
