'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  CheckCircle, 
  Loader2, 
  ExternalLink, 
  Smartphone, 
  Download, 
  X,
  Menu,
  Zap,
  ArrowRight,
  ChevronRight,
  User,
  Calendar,
  BarChart3,
  Shield,
  Target,
  Star // <--- Added the missing Star icon here
} from 'lucide-react';

// --- MOCK DATA GENERATORS (The "Biz Consultant" Brain) ---

const generateMockResults = (query: string) => [
  {
    type: 'LOW_RISK',
    title: `Micro-Niche ${query.split(' ').pop() || 'Service'} Agency`,
    description: 'Low capital requirement. Start as a freelancer, scale into an agency. High demand in current market.',
    potential: '$2k - $5k / month',
    tools: ['Upwork', 'Notion'],
    rating: 4.8,
  },
  {
    type: 'HIGH_GROWTH',
    title: `Drop-Service ${query.split(' ').pop() || 'Consulting'}`,
    description: 'Arbitrage model. Find clients needing this skill, outsource the labor, keep the margin. Infinite scalability.',
    potential: '$10k+ / month',
    tools: ['Shopify', 'LinkedIn Sales Nav'],
    rating: 4.9, // Added rating
  },
  {
    type: 'PASSIVE',
    title: `Digital ${query.split(' ').pop() || 'Course'} & Templates`,
    description: 'Build once, sell forever. Package your knowledge into a downloadable asset or video series.',
    potential: 'Passive Recurring',
    tools: ['Teachable', 'ClickFunnels'],
    rating: 4.7, // Added rating
  },
];

const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "How to Start a Service Business with $0 in 2025",
    excerpt: "The arbitrage economy is booming. Here is the exact blueprint to selling services you don't even perform yourself.",
    image: "https://placehold.co/800x400/0f172a/f59e0b?text=Zero+Dollar+Startup",
    date: "Nov 14, 2025",
    author: "Pilot AI",
    category: "Bootstrap"
  },
  {
    id: 2,
    title: "The 'High Ticket' Trap: Why You Should Sell Cheap First",
    excerpt: "Everyone wants to sell $5k coaching. Here is why selling $27 templates is actually the faster path to your first million.",
    image: "https://placehold.co/800x400/1e293b/f59e0b?text=Pricing+Strategy",
    date: "Nov 12, 2025",
    author: "J. Wolf",
    category: "Strategy"
  },
  {
    id: 3,
    title: "3 AI Tools That Replace a Marketing Agency",
    excerpt: "Stop paying retainers. These 3 automated tools can handle your SEO, Content, and Ads for pennies on the dollar.",
    image: "https://placehold.co/800x400/334155/f59e0b?text=AI+Automation",
    date: "Nov 10, 2025",
    author: "Tech Lead",
    category: "Automation"
  },
];

// --- AD COMPONENTS (High CPM Finance Ads) ---

const AdUnit = ({ format = "horizontal", label = "Sponsor" }) => {
  const isVertical = format === "vertical";
  const isSticky = format === "sticky";
  
  if (isSticky) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.5)] z-50 p-2 flex justify-center animate-in slide-in-from-bottom-full duration-700">
        <div className="w-full max-w-[728px] h-[90px] bg-slate-800 border border-dashed border-slate-700 rounded flex flex-col items-center justify-center text-slate-500 text-xs">
          <span className="font-bold text-amber-500">PREMIUM FINANCE AD (Sticky)</span>
          <span>Google AdSense 728x90</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-900/50 border border-dashed border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-600 text-sm font-medium p-2 relative overflow-hidden group ${isVertical ? 'h-[600px] w-full' : 'h-32 w-full my-6'}`}>
      <span className="z-10 font-bold text-slate-500 mb-1">SPONSORED ({label})</span>
      <span className="z-10 text-xs opacity-50">Secure Ad Slot</span>
    </div>
  );
};

// --- LEAD MAGNET MODAL (The "Blueprint" Unlock) ---

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState('capture'); 
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep('download'), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full z-20">
              <X size={20} />
            </button>

            <div className="p-0">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-10 text-center text-white relative overflow-hidden">
                <Rocket className="mx-auto mb-4 drop-shadow-xl relative z-10" size={56} />
                <h3 className="text-3xl font-black mb-2 relative z-10">Initialize Sequence 🚀</h3>
                <p className="text-amber-100 font-medium relative z-10">Unlock the full 50-page execution roadmap and tool database.</p>
              </div>

              <div className="p-8 bg-slate-900 text-white">
                {step === 'capture' ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Pilot Credentials (Email)</label>
                        <input 
                          type="email" 
                          required
                          placeholder="pilot@hustle.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 rounded-xl border border-slate-700 bg-slate-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all font-mono text-lg text-white"
                        />
                      </div>
                      <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 text-lg group">
                        Access Flight Plan <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <div className="mt-6 flex justify-center gap-4 text-slate-500">
                        <span className="text-xs font-mono">ENCRYPTED CONNECTION</span>
                        <span className="text-xs font-mono">SSL SECURE</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="w-16 h-16 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">You are Cleared for Takeoff.</h3>
                    <p className="text-slate-400 mb-8 text-sm">
                      Blueprint sent to <strong>{email}</strong>. Download the mobile command center below:
                    </p>
                    <div className="space-y-3">
                      <button className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors font-bold shadow-lg border border-slate-800">
                        <span>Download on the <br/><span className="text-xs font-normal">App Store</span></span>
                      </button>
                      <button className="w-full bg-slate-800 text-white border border-slate-700 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors font-bold shadow-lg">
                        <span>Get it on <br/><span className="text-xs font-normal">Google Play</span></span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- BLOG COMPONENTS ---

const BlogCard = ({ post, onClick }: { post: any; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col h-full"
  >
    <div className="h-48 overflow-hidden relative bg-slate-800">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 rounded-sm text-xs font-bold text-amber-500 uppercase tracking-widest border border-amber-500/20">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-amber-500 transition-colors">{post.title}</h3>
      <p className="text-slate-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-slate-600 border-t border-slate-800 pt-4 font-mono">
        <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
        <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
      </div>
    </div>
  </div>
);

const BlogPostView = ({ post, onBack, onOpenDownload }: { post: any; onBack: () => void; onOpenDownload: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-400 mb-6 font-mono uppercase tracking-widest">
      <ChevronRight className="rotate-180" size={16} /> Abort / Return
    </button>

    <div className="flex flex-col lg:flex-row gap-12">
      {/* Main Article Content */}
      <article className="flex-1">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-slate-400 mb-8 pb-8 border-b border-slate-800 font-mono">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center font-bold text-amber-500 border border-amber-500/30">AI</div>
              <span>By {post.author}</span>
           </div>
           <span>•</span>
           <span>{post.date}</span>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-xl mb-10 shadow-2xl border border-slate-700 bg-slate-800" />

        <div className="prose prose-lg prose-invert max-w-none text-slate-300">
          <p className="lead text-xl text-white font-medium mb-6">
            The market data is clear: The arbitrage window is closing. However, our algorithm has identified a key inefficiency in the current service sector.
          </p>
          
          <AdUnit label="In-Article Top" />

          <h2 className="text-2xl font-bold text-amber-500 mt-8 mb-4">1. The Opportunity Vector</h2>
          <p className="mb-6">
            Traditional businesses are slow to adapt to AI. By leveraging automated tools, you can offer the same service for 10% of the cost and 90% margins.
          </p>

          <h2 className="text-2xl font-bold text-amber-500 mt-8 mb-4">2. Recommended Models</h2>
          <p className="mb-6">
            Based on current market volatility, here are the safest plays:
          </p>

          {/* Embedded Product Cards */}
          <div className="grid gap-6 my-8 not-prose">
             {generateMockResults("Blog Context").map((biz, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm flex flex-col md:flex-row gap-6 items-center hover:border-amber-500/30 transition-colors">
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold px-2 py-0.5 rounded font-mono">{biz.type}</span>
                        <span className="font-bold text-white font-mono">{biz.potential}</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1 text-white">{biz.title}</h4>
                      <p className="text-sm text-slate-400 mb-3">{biz.description}</p>
                      <button className="text-amber-500 font-bold text-sm flex items-center gap-1 hover:text-amber-300">
                        View Execution Plan <ExternalLink size={14}/>
                      </button>
                   </div>
                </div>
             ))}
          </div>

          <AdUnit label="In-Article Middle" />
        </div>

        {/* Article CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 text-white rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              <Download size={32} className="text-black" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Need the full 50-Step Guide?</h3>
              <p className="text-slate-300 mb-4">Download the app to access the "Founder's Vault" database.</p>
              <button 
                onClick={onOpenDownload}
                className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-amber-500 hover:text-black transition-all inline-flex items-center gap-2"
              >
                Download App <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </article>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8 shrink-0">
         <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm sticky top-24">
            <h4 className="font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-amber-500"/> Market Trends</h4>
            <div className="space-y-4">
               {[1,2,3].map((_, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer border-b border-slate-800 pb-3 last:border-0">
                     <div className="w-16 h-16 bg-slate-800 rounded-lg shrink-0 overflow-hidden border border-slate-700">
                        <img src={`https://placehold.co/100x100/0f172a/f59e0b?text=Trend+${i+1}`} className="w-full h-full object-cover"/>
                     </div>
                     <div>
                        <h5 className="text-sm font-bold text-slate-200 leading-tight group-hover:text-amber-500 transition-colors">Why "Micro-SaaS" is the new Real Estate</h5>
                        <span className="text-xs text-slate-500 font-mono">4 min read</span>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="my-6 border-t border-slate-800 pt-6">
               <AdUnit format="vertical" label="Sidebar Ad" />
            </div>

            <button 
              onClick={onOpenDownload}
              className="w-full bg-amber-500 text-black py-3 rounded-xl font-bold shadow-lg hover:bg-amber-400 transition-colors"
            >
              Get Hustle Pilot
            </button>
         </div>
      </aside>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function Home() {
  const [view, setView] = useState('HOME'); // HOME, SEARCH_RESULTS, BLOG_LIST, BLOG_POST
  const [activePost, setActivePost] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!query) return;
    setIsLoading(true);
    setView('SEARCH_RESULTS');
    
    setTimeout(() => {
       setResults(generateMockResults(query));
       setIsLoading(false);
    }, 2500);
  };

  const openBlog = () => setView('BLOG_LIST');
  
  const openPost = (post: any) => {
    setActivePost(post);
    setView('BLOG_POST');
    window.scrollTo(0,0);
  };

  const goHome = () => {
    setView('HOME');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-100 overflow-x-hidden pb-24 selection:bg-amber-500 selection:text-black">
      
      {/* TOP AD BANNER */}
      <div className="bg-amber-500 text-black py-1.5 text-center text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
         System Status: Online • Market Data: Live
      </div>

      {/* NAVIGATION */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={goHome}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-slate-700 group-hover:border-amber-500 transition-colors">
                 {/* Ensure logo.png is in your public folder */}
                 <img src="/rocket-logo.png"alt="Pilot" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none text-white">Hustle<span className="text-amber-500">Pilot</span></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-amber-500/80 transition-colors">AI Venture Architect</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={openBlog} className={`text-sm font-bold tracking-wide uppercase transition-colors ${view.includes('BLOG') ? 'text-amber-500' : 'text-slate-400 hover:text-white'}`}>
                Mission Logs
              </button>
              <button className="text-sm font-bold tracking-wide uppercase text-slate-400 hover:text-white transition-colors">Success Stories</button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-amber-500 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-2"
              >
                <Rocket size={16} /> Launch App
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
           <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-4">
              <button onClick={() => {openBlog(); setIsMenuOpen(false)}} className="block w-full text-left font-bold text-slate-300 hover:text-amber-500 uppercase tracking-wider">Mission Logs</button>
              <button onClick={() => setIsModalOpen(true)} className="block w-full bg-amber-500 text-black py-3 rounded-lg font-bold">Initialize App</button>
           </div>
        )}
      </nav>

      {/* MAIN CONTENT SWITCHER */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: HOME */}
        {view === 'HOME' && (
           <div className="flex flex-col items-center animate-in fade-in duration-700">
              <div className="max-w-5xl w-full text-center py-16 md:py-24 relative">
                 
                 {/* Background Glow */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                 <div className="inline-flex items-center gap-3 bg-slate-900/50 border border-slate-700 shadow-sm rounded-full px-5 py-2 mb-8 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                    <span className="text-xs font-bold text-slate-300 tracking-widest uppercase font-mono">Protocol v2.0 • Profit Engine Ready</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-8 leading-[1.1]">
                   Turn Your Spare Time into <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">A Business Empire.</span>
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                    Don't guess. Let our AI analyze your skills, budget, and time to generate a <span className="text-white font-bold">Low-Risk Execution Plan</span> in seconds.
                 </p>
                 
                 {/* Search Box */}
                 <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group z-10">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative flex items-center bg-slate-900 rounded-full p-2 shadow-2xl border border-slate-700 group-hover:border-amber-500/50 transition-colors">
                       <div className="pl-6 text-amber-500">
                          <TerminalIcon />
                       </div>
                       <input 
                         type="text" 
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="I have $0 and 5 hours/week. I am good at writing..." 
                         className="w-full px-6 py-5 text-lg md:text-xl font-medium outline-none bg-transparent text-white placeholder:text-slate-600"
                       />
                       <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                          Analyze
                       </button>
                    </div>
                 </form>

                 {/* Hero Image Display */}
                 <div className="mt-20 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10"></div>
                    <img src="/hero.png" alt="Dashboard" className="w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    {/* Floating HUD Elements */}
                    <div className="absolute bottom-10 left-10 z-20 hidden md:block">
                        <div className="bg-black/50 backdrop-blur border border-amber-500/30 p-4 rounded-lg flex items-center gap-4">
                            <div className="text-amber-500"><BarChart3 /></div>
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Projected Growth</div>
                                <div className="text-xl font-bold text-white font-mono">+420% YOY</div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
              
              <AdUnit label="Home Hero Banner" />

              {/* Latest Blog Posts Section */}
              <div className="w-full mt-24">
                 <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                    <h2 className="text-2xl font-black text-white flex items-center gap-2"><Briefcase className="text-amber-500"/> Intelligence Reports</h2>
                    <button onClick={openBlog} className="text-slate-400 font-bold hover:text-amber-500 uppercase tracking-widest text-xs flex items-center gap-1 transition-colors">
                       View Archive <ArrowRight size={14} />
                    </button>
                 </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_BLOG_POSTS.map(post => (
                       <BlogCard key={post.id} post={post} onClick={() => openPost(post)} />
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* VIEW: SEARCH RESULTS */}
        {view === 'SEARCH_RESULTS' && (
           <div className="min-h-[60vh]">
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-32">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-amber-500 animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Rocket className="text-amber-500 animate-pulse" size={32} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mt-8 text-white animate-pulse">Running Market Simulations...</h3>
                    <p className="text-slate-500 font-mono mt-2 text-sm uppercase tracking-widest">Analyzing 50,000+ Business Models</p>
                 </div>
              ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-8">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-slate-800 pb-8">
                       <div>
                           <p className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-2">Analysis Complete</p>
                           <h2 className="text-3xl md:text-4xl font-black text-white">Target: "{query}"</h2>
                       </div>
                       <button onClick={goHome} className="text-slate-400 font-bold hover:text-white border border-slate-700 px-6 py-3 rounded-lg hover:border-amber-500 transition-colors uppercase text-sm tracking-wide">New Simulation</button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                       {results.map((biz, i) => (
                          <div key={i} className="bg-slate-900 rounded-2xl p-1 border border-slate-800 hover:border-amber-500/50 transition-colors group h-full flex flex-col">
                             {/* Card Header */}
                             <div className="bg-slate-950 rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                     <Target size={100} />
                                 </div>
                                 
                                 <div className="flex items-center justify-between mb-6">
                                     <div className={`text-xs font-black px-3 py-1 rounded uppercase tracking-widest ${
                                         biz.type === 'LOW_RISK' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 
                                         biz.type === 'HIGH_GROWTH' ? 'bg-amber-900/30 text-amber-400 border border-amber-500/30' : 
                                         'bg-purple-900/30 text-purple-400 border border-purple-500/30'
                                     }`}>
                                         {biz.type.replace('_', ' ')}
                                     </div>
                                     {biz.rating && <div className="flex items-center gap-1 text-amber-500 font-bold text-sm"><Star size={14} fill="currentColor"/> {biz.rating}</div>}
                                 </div>

                                 <h3 className="font-bold text-2xl text-white mb-3 leading-tight">{biz.title}</h3>
                                 <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">{biz.description}</p>
                                 
                                 <div className="bg-slate-900 rounded-lg p-4 mb-6 border border-slate-800">
                                     <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                         <DollarSign size={14} /> Profit Potential
                                     </div>
                                     <div className="text-xl font-mono font-bold text-white">{biz.potential}</div>
                                 </div>

                                 <div className="flex flex-wrap gap-2 mb-6">
                                     {biz.tools.map((t:string) => (
                                         <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{t}</span>
                                     ))}
                                 </div>

                                 <button className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-amber-500 transition-colors uppercase tracking-wide text-sm shadow-lg">
                                     View Blueprint
                                 </button>
                             </div>
                          </div>
                       ))}
                    </div>
                    
                    <AdUnit label="Search Results Bottom" />
                 </div>
              )}
           </div>
        )}

        {/* VIEW: BLOG LIST */}
        {view === 'BLOG_LIST' && (
           <div className="animate-in fade-in">
              <div className="text-center py-16">
                 <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">Mission Logs</h1>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto">Tactical guides, market analysis, and growth hacks for the modern entrepreneur.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {/* Duplicate mock posts to fill the grid */}
                 {[...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS].map((post, i) => (
                    <BlogCard key={i} post={post} onClick={() => openPost(post)} />
                 ))}
              </div>
              <div className="mt-16 text-center">
                 <button className="bg-slate-900 border border-slate-700 text-white px-8 py-4 rounded-full font-bold hover:border-amber-500 hover:text-amber-500 transition-colors uppercase tracking-widest text-sm">
                    Load Archive Data
                 </button>
              </div>
           </div>
        )}

        {/* VIEW: BLOG POST */}
        {view === 'BLOG_POST' && activePost && (
           <BlogPostView 
             post={activePost} 
             onBack={openBlog} 
             onOpenDownload={() => setIsModalOpen(true)} 
           />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-32 mt-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-10 rounded bg-amber-500 flex items-center justify-center">
                   <Rocket className="text-black" />
               </div>
               <span className="font-black text-2xl text-white tracking-tight">Hustle<span className="text-amber-500">Pilot</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mb-8 text-xs font-bold text-slate-500 uppercase tracking-widest">
               <button onClick={openBlog} className="hover:text-white transition-colors">Mission Logs</button>
               <button className="hover:text-white transition-colors">Manifesto</button>
               <button className="hover:text-white transition-colors">Secure Contact</button>
               <button onClick={() => setIsModalOpen(true)} className="hover:text-amber-500 transition-colors">Initialize App</button>
            </div>
            <p className="text-slate-600 text-xs font-mono">
                © 2025 ILLOSOPHY MULTIMEDIA, LLC. SECURE SERVER CONNECTION ESTABLISHED.<br/>
                SYSTEMS NOMINAL. PASSIVE INCOME ENGINE ACTIVE.
            </p>
         </div>
      </footer>

      {/* STICKY FOOTER AD */}
      <AdUnit format="sticky" />

      {/* LEAD MAGNET MODAL */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}

// Icon Helper
const TerminalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
);