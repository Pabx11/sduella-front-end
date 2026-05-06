import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, FileText, CreditCard, History,
  Settings as SettingsIcon, LogOut, Menu, X
} from 'lucide-react';
import type { User } from '../types';
import { cn } from '../lib/utils';

export default function Dashboard({ user, onLogout, onUpdateUser }: {
  user: User | null;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/" />;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { id: 'items', label: user.role === 'donor' ? 'Donations' : 'Applications', icon: user.role === 'donor' ? <CreditCard size={16} /> : <FileText size={16} /> },
    { id: 'history', label: 'History', icon: <History size={16} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={16} /> },
  ];

  return (
    <div className="pt-[62px] min-h-screen bg-off-white">
      {/* Mobile Sidebar Toggle */}
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
            {tabs.map((tab) => (
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

        {/* Main Content */}
        <main className="p-6 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
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

                  {/* Student profile card */}
                  {user.role === 'student' && (
                    <div className="bg-white border border-grey-200 rounded-sm p-8 mb-6 flex flex-col sm:flex-row gap-6 items-start">
                      <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center font-syne text-2xl font-bold flex-shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Full Name</div>
                          <div className="font-bold text-sm">{user.name}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Email</div>
                          <div className="font-bold text-sm break-all">{user.email}</div>
                        </div>
                        {user.institution && (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Institution</div>
                            <div className="font-bold text-sm">{user.institution}</div>
                          </div>
                        )}
                        {user.year && (
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-grey-400 mb-1">Year of Study</div>
                            <div className="font-bold text-sm">{user.year}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {user.role === 'donor' ? (
                      <>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widests uppercase text-grey-400 mb-2">Total Donated</div>
                          <div className="text-3xl font-syne font-extrabold">{user.totalDonated > 0 ? `R ${user.totalDonated.toLocaleString()}` : 'R --'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Students Helped</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.donations || []).reduce((acc, d) => acc + (d.students || 0), 0) || '--'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Donations</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.donations || []).length || '--'}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Applications</div>
                          <div className="text-3xl font-syne font-extrabold">{(user.applications || []).length || '--'}</div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Status</div>
                          <div className="text-2xl font-syne font-extrabold text-blue">
                            {(user.applications || []).some(a => a.status === 'Under Review') ? 'Active' : 'Idle'}
                          </div>
                        </div>
                        <div className="bg-white p-8 rounded-sm border border-grey-200">
                          <div className="text-[10px] font-bold tracking-widest uppercase text-grey-400 mb-2">Total Funded</div>
                          <div className="text-3xl font-syne font-extrabold text-green">
                            {(user.applications || []).filter(a => a.status === 'Approved').reduce((acc, a) => acc + (a.amount || 0), 0) > 0
                              ? `R ${(user.applications || []).filter(a => a.status === 'Approved').reduce((acc, a) => acc + (a.amount || 0), 0).toLocaleString()}`
                              : 'R --'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

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
                  </div>
                  <div className="bg-white border border-grey-200 rounded-sm overflow-hidden">
                    <div className="p-6 border-b border-grey-200">
                      <div className="grid grid-cols-4 text-[10px] font-bold tracking-widest uppercase text-grey-400">
                        <div className="col-span-2">Description</div>
                        <div>Amount</div>
                        <div className="text-right">Status</div>
                      </div>
                    </div>
                    <div className="divide-y divide-grey-100">
                      {(user.role === 'donor' ? user.donations : user.applications)?.map((item: any, i: number) => (
                        <div key={i} className="p-6 grid grid-cols-4 items-center">
                          <div className="col-span-2">
                            <div className="font-bold text-sm">{item.category || 'Donation'}</div>
                            <div className="text-[11px] text-grey-400">{item.date}</div>
                          </div>
                          <div className="font-syne font-bold text-sm">R {item.amount.toLocaleString()}</div>
                          <div className="text-right">
                            <span className={cn("px-2.5 py-1 rounded-sm font-syne text-[10px] font-bold tracking-widest uppercase", item.status === 'Approved' || item.status === 'Disbursed' ? "bg-green/10 text-green" : "bg-blue/10 text-blue")}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

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
                            <div className="text-xs font-bold text-grey-400 uppercase tracking-widest">{item.date.split('-')[0]}</div>
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
                          <div className="text-[10px] font-bold text-grey-400 uppercase tracking-widest mt-1">Processed</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  <div className="mb-10">
                    <h1 className="text-3xl font-extrabold mb-2">Settings</h1>
                    <p className="text-grey-500 text-sm">Manage your account preferences and security.</p>
                  </div>
                  <div className="max-w-2xl space-y-8">
                    <div className="bg-white p-8 rounded-sm border border-grey-200">
                      <h3 className="text-lg font-extrabold mb-6">Profile Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Full Name</label>
                            <input type="text" defaultValue={user.name} className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest uppercase text-grey-400">Email Address</label>
                            <input type="email" defaultValue={user.email} className="w-full px-4 py-2.5 border border-grey-200 rounded-sm focus:border-blue outline-none text-sm" />
                          </div>
                        </div>
                        <button className="px-6 py-2.5 bg-black text-white font-syne font-bold text-xs rounded-sm">Save Changes</button>
                      </div>
                    </div>
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
                        <button className="text-xs font-bold text-blue uppercase tracking-widest">Change Password</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
