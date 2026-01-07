import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Globe, Layout, ShoppingBag, ArrowRight, MessageSquare, 
  Menu, X, CheckCircle, ExternalLink, Mail, Phone, Facebook, 
  Linkedin, Youtube, ChevronDown, Calendar, Search, Star, HelpCircle,
  Users, User, Send, Instagram, Github, Twitter, Linkedin as LinkedInIcon,
  ShieldCheck, CreditCard, Tv, Key, PenTool, Monitor, Award, Rocket, Shield,
  Clock, Tag, Calculator
} from 'lucide-react';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import FluidBackground from './components/FluidBackground';

type Page = 'home' | 'services' | 'portfolio' | 'products' | 'about' | 'blog' | 'faq' | 'contact' | 'book-demo' | 'book-now' | 'team';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  detailedBio: string;
  icon: any;
  skills: string[];
  socials: { platform: string; url: string; icon: any }[];
  image: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: 'Automation' | 'Meta' | 'E-commerce' | 'Digital Product';
  date: string;
  readTime: string;
}

const teamData: TeamMember[] = [
  {
    id: 'naiem',
    name: "Md Naiem Din Taslim",
    role: "FOUNDER & AUTOMATION EXPERT",
    bio: "Automation এবং Digital Growth নিয়ে কাজ করছি দীর্ঘ সময় ধরে।",
    detailedBio: "আমি md naiem din taslim। আমার মূল লক্ষ্য হলো বিজনেসের ম্যানুয়াল এবং বোরিং কাজগুলোকে স্মার্ট অটোমেশনের আওতায় নিয়ে আসা। n8n এবং বিভিন্ন API ইন্টিগ্রেশনে আমার বিশেষ দক্ষতা রয়েছে।",
    icon: Zap,
    skills: ["n8n", "Make.com", "API Integration", "Business Systems"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    socials: [
      { platform: 'Facebook', url: '#', icon: Facebook },
      { platform: 'LinkedIn', url: '#', icon: LinkedInIcon }
    ]
  },
  {
    id: 'pranto',
    name: "Pranto",
    role: "META ADS SPECIALIST",
    bio: "Meta বিজ্ঞাপন এবং পলিসি সংক্রান্ত যেকোনো সমস্যায় পারদর্শী।",
    detailedBio: "প্রান্ত একজন এক্সপার্ট অ্যাডভাইজার যিনি মেটা অ্যাডস পলিসি, একাউন্ট রিকভারি এবং হাই-কনভার্টিং ক্যাম্পেইন সেটআপে বিশেষজ্ঞ। তিনি আপনার অ্যাড স্পেন্ড অপ্টিমাইজ করতে সাহায্য করবেন।",
    icon: Globe,
    skills: ["Meta Ads", "Pixel Tracking", "Policy Compliance", "Scaling"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    socials: [
      { platform: 'Facebook', url: '#', icon: Facebook },
      { platform: 'Messenger', url: '#', icon: MessageSquare }
    ]
  },
  {
    id: 'avi',
    name: "Avi",
    role: "E-COMMERCE DEVELOPER",
    bio: "Shopify এবং WooCommerce স্টোর ডেভেলপমেন্ট বিশেষজ্ঞ।",
    detailedBio: "অভি একজন অভিজ্ঞ ওয়েব ডেভেলপার। তিনি বিশেষ করে ই-কমার্স স্টোরগুলোকে এমনভাবে ডিজাইন করেন যা কাস্টমারকে কেনাকাটা করতে উৎসাহিত করে। স্পিড এবং ইউজার এক্সপেরিয়েন্স তার প্রধান ফোকাস।",
    icon: ShoppingBag,
    skills: ["Shopify", "WooCommerce", "Liquid", "React"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    socials: [
      { platform: 'Github', url: '#', icon: Github },
      { platform: 'LinkedIn', url: '#', icon: LinkedInIcon }
    ]
  },
  {
    id: 'suvo',
    name: "Suvo",
    role: "CREATIVE DESIGNER",
    bio: "বিজনেসের ব্র্যান্ড ভ্যালু বাড়ানোর জন্য আকর্ষণীয় ডিজাইন নিশ্চিত করেন।",
    detailedBio: "শুভ একজন ভিশনারি ডিজাইনার। লোগো থেকে শুরু করে ইউজার ইন্টারফেস—সব জায়গায় তিনি আধুনিক এবং প্রিমিয়াম লুক ফুটিয়ে তুলতে পারদর্শী। আপনার বিজনেসের ভিজ্যুয়াল আইডেন্টিটি তার হাতে নিরাপদ।",
    icon: Layout,
    skills: ["Figma", "UI/UX", "Branding", "Illustrator"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    socials: [
      { platform: 'Instagram', url: '#', icon: Instagram },
      { platform: 'Facebook', url: '#', icon: Facebook }
    ]
  },
  {
    id: 'sourav',
    name: "Sourav Swadhin",
    role: "GROWTH STRATEGIST",
    bio: "হাই-কনভার্টিং কপিরাইটিং এবং কন্টেন্ট প্ল্যানিং নিয়ে কাজ করেন।",
    detailedBio: "সৌরভ একজন স্ট্রাটেজিস্ট যিনি আপনার কন্টেন্টকে সেলস মেশিনে পরিণত করতে পারেন। কপিরাইটিং থেকে শুরু করে ভিডিও স্ক্রিপ্টিং—সবকিছুতে তিনি বিজনেসের গ্রোথ নিশ্চিত করেন।",
    icon: Send,
    skills: ["Copywriting", "Sales Funnels", "Content Strategy", "Video Scripts"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1974&auto=format&fit=crop",
    socials: [
      { platform: 'Twitter', url: '#', icon: Twitter },
      { platform: 'LinkedIn', url: '#', icon: LinkedInIcon }
    ]
  }
];

const digitalProducts = [
  { id: 1, title: "Meta Verified Subscription", price: "2,500 BDT", desc: "Facebook & Instagram verified badge support and setup.", icon: ShieldCheck },
  { id: 2, title: "Premium VPN Service", price: "450 BDT / mo", desc: "NordVPN, ExpressVPN high-speed private connections.", icon: Globe },
  { id: 3, title: "Virtual Debit Cards", price: "Starts at $5", desc: "Pyypl, RedotPay & virtual cards for global payments.", icon: CreditCard },
  { id: 4, title: "Netflix Premium Shared", price: "350 BDT", desc: "4K Ultra HD streaming with personal profile pin.", icon: Tv },
  { id: 5, title: "Canva Pro Lifetime", price: "199 BDT", desc: "Unlimited design assets with official team access.", icon: PenTool },
  { id: 6, title: "Windows 10/11 Pro Keys", price: "500 BDT", desc: "Genuine original activation keys for your PC.", icon: Key },
  { id: 7, title: "Adobe Creative Cloud", price: "1,200 BDT / mo", desc: "All Adobe apps access with personal email.", icon: Monitor },
  { id: 8, title: "n8n Workflow Pack", price: "5,000 BDT", desc: "10+ Ready to use workflows for automation.", icon: Zap }
];

const blogPosts: BlogPost[] = [
  { id: 1, title: "How to use n8n for Shopify: A complete guide 2024", excerpt: "Learn how to sync orders, customer data and inventory automatically between Shopify and your CRM using n8n workflows.", category: 'Automation', date: 'May 24, 2024', readTime: '5 min read' },
  { id: 2, title: "Recovering Restricted Meta Ad Accounts: Expert Tips", excerpt: "Is your Meta ad account disabled? Here are the top 5 strategies we use to get our clients back online fast.", category: 'Meta', date: 'June 10, 2024', readTime: '8 min read' },
  { id: 3, title: "Boosting E-commerce Conversion Rates by 200%", excerpt: "Small design changes can make a big impact. Discover the UX elements that drive sales for successful stores.", category: 'E-commerce', date: 'July 05, 2024', readTime: '6 min read' },
  { id: 4, title: "The Future of Digital Product Sales Funnels", excerpt: "Why automated delivery systems are changing the game for course creators and digital product sellers.", category: 'Digital Product', date: 'August 12, 2024', readTime: '7 min read' },
  { id: 5, title: "Integrating AI into your Business Workflows", excerpt: "Step-by-step guide to using OpenAI APIs within your n8n automation for smart data processing.", category: 'Automation', date: 'September 20, 2024', readTime: '10 min read' },
  { id: 6, title: "Mastering Meta Pixel: Tracking the Right Events", excerpt: "Don't just track clicks. Learn how to track deep funnel events to improve your Meta Ads performance.", category: 'Meta', date: 'October 01, 2024', readTime: '5 min read' }
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-white cursor-auto md:cursor-none selection:bg-blue-600/30">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-2xl' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('home')}>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl group-hover:rotate-12 transition-transform">N</div>
            <span className="font-bold text-lg hidden sm:inline-block tracking-tight">md naiem din taslim</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => navigate('home')} className={`hover:text-blue-400 transition-colors ${currentPage === 'home' ? 'text-blue-400' : ''}`}>Home</button>
            <button onClick={() => navigate('services')} className={`hover:text-blue-400 transition-colors ${currentPage === 'services' ? 'text-blue-400' : ''}`}>Services</button>
            <button onClick={() => navigate('portfolio')} className={`hover:text-blue-400 transition-colors ${currentPage === 'portfolio' ? 'text-blue-400' : ''}`}>Portfolio</button>
            <button onClick={() => navigate('team')} className={`hover:text-blue-400 transition-colors ${currentPage === 'team' ? 'text-blue-400' : ''}`}>Team</button>
            <button onClick={() => navigate('products')} className={`hover:text-blue-400 transition-colors ${currentPage === 'products' ? 'text-blue-400' : ''}`}>Digital Products</button>
            <button onClick={() => navigate('blog')} className={`hover:text-blue-400 transition-colors ${currentPage === 'blog' ? 'text-blue-400' : ''}`}>Blog</button>
            <button onClick={() => navigate('faq')} className={`hover:text-blue-400 transition-colors ${currentPage === 'faq' ? 'text-blue-400' : ''}`}>FAQ</button>
            <button onClick={() => navigate('about')} className={`hover:text-blue-400 transition-colors ${currentPage === 'about' ? 'text-blue-400' : ''}`}>About</button>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('contact')}
                className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 flex items-center gap-2"
              >
                <Calculator size={16} /> Get a Quote
              </button>
              <button 
                onClick={() => navigate('book-demo')}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Book Demo
              </button>
            </div>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-slate-950 flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-bold text-xl">Taslim Brand</span>
              <button onClick={() => setMobileMenuOpen(false)}><X /></button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-semibold overflow-y-auto">
              <button onClick={() => navigate('home')}>Home</button>
              <button onClick={() => navigate('services')}>Services</button>
              <button onClick={() => navigate('portfolio')}>Portfolio</button>
              <button onClick={() => navigate('team')}>Team</button>
              <button onClick={() => navigate('products')}>Products</button>
              <button onClick={() => navigate('blog')}>Blog</button>
              <button onClick={() => navigate('about')}>About</button>
              <button onClick={() => navigate('contact')}>Contact</button>
              <hr className="border-white/10" />
              <button onClick={() => navigate('contact')} className="text-blue-500">Get a Quote</button>
              <button onClick={() => navigate('book-demo')} className="text-blue-400">Book Demo</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="pt-24 pb-20">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomeView key="home" navigate={navigate} />}
          {currentPage === 'services' && <ServicesView key="services" navigate={navigate} />}
          {currentPage === 'portfolio' && <PortfolioView key="portfolio" />}
          {currentPage === 'team' && <TeamView key="team" />}
          {currentPage === 'products' && <ProductsView key="products" />}
          {currentPage === 'blog' && <BlogView key="blog" />}
          {currentPage === 'contact' && <ContactView key="contact" />}
          {currentPage === 'book-demo' && <BookingView key="book-demo" type="demo" />}
          {currentPage === 'book-now' && <BookingView key="book-now" type="order" />}
          {currentPage === 'faq' && <FAQView key="faq" />}
          {currentPage === 'about' && <AboutView key="about" navigate={navigate} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950/80 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="font-bold text-2xl mb-6">Taslim</div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              আমি md naiem din taslim — Automation & Digital Growth Specialist। স্মার্ট সিস্টেম তৈরির মাধ্যমে আপনার বিজনেসের প্রোডাক্টিভিটি বাড়াতে আমি পাশে আছি।
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 glass rounded-lg hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 glass rounded-lg hover:bg-blue-600 transition-colors"><LinkedInIcon size={18} /></a>
              <a href="#" className="p-2 glass rounded-lg hover:bg-blue-600 transition-colors"><Youtube size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>n8n Automation</li>
              <li>Meta Support</li>
              <li>Digital Product Systems</li>
              <li>E-commerce Solutions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="cursor-pointer hover:text-white" onClick={() => navigate('portfolio')}>Portfolio</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate('team')}>Team</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate('blog')}>Blog</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate('faq')}>FAQ</li>
              <li className="cursor-pointer hover:text-white" onClick={() => navigate('about')}>About Me</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><Mail size={16}/> mail@taslim.com</li>
              <li className="flex items-center gap-2"><Phone size={16}/> WhatsApp (Available)</li>
              <li className="flex items-center gap-2"><Globe size={16}/> Bangladesh / Remote</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} md naiem din taslim. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a href="https://wa.me/yournumber" target="_blank" className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Phone className="text-white fill-current" />
        </a>
        <button onClick={() => navigate('contact')} className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageSquare className="text-white" />
        </button>
      </div>
    </div>
  );
};

// --- View Components ---

const HomeView: React.FC<{navigate: (p: Page) => void}> = ({ navigate }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* Hero Section */}
    <section className="px-6 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-8">
              Business Growth, Simplified—<span className="text-blue-500">Automation</span> + Systems that Sell
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-10 font-medium">
              n8n Automation, Digital Product Systems, Meta support, E-commerce—সবকিছু এক জায়গায়।
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button onClick={() => navigate('book-demo')} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
                Book Demo <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('portfolio')} className="px-8 py-4 glass hover:bg-white/5 rounded-full font-bold transition-all">
                See Portfolio
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                "Automation that saves time",
                "Systems that convert leads",
                "Reliable support + strategy"
              ].map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle size={16} className="text-blue-500 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl border border-white/5 relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
              alt="Automation Workflow" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 p-6 glass rounded-2xl max-w-xs">
              <p className="text-sm font-semibold mb-2">Real-time Automation</p>
              <div className="flex gap-2">
                <div className="h-2 w-12 bg-blue-600 rounded-full animate-pulse" />
                <div className="h-2 w-8 bg-white/20 rounded-full" />
                <div className="h-2 w-16 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Trust Bar */}
    <section className="py-12 glass border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col">
          <span className="text-4xl font-bold">50+</span>
          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Projects Done</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold">80%</span>
          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Faster workflow</span>
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold">30+</span>
          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Happy Clients</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 grayscale opacity-50">
          <div className="font-black text-xl">BRAND A</div>
          <div className="font-black text-xl">BRAND B</div>
          <div className="font-black text-xl">BRAND C</div>
        </div>
      </div>
    </section>

    {/* Services Overview */}
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">My Expertise</h2>
          <p className="text-gray-400">আপনার বিজনেসের জন্য কমপ্লিট ডিজিটাল সলিউশন।</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Zap, title: "n8n Automation", desc: "বোরিং কাজগুলো অটোমেটিক করুন সহজেই।" },
            { icon: Globe, title: "Meta Support", desc: "Facebook/Insta অ্যাড অ্যাকাউন্ট সাপোর্ট।" },
            { icon: Layout, title: "Digital Product Systems", desc: "সেলস ফানেল এবং অটোমেটেড ডেলিভারি।" },
            { icon: ShoppingBag, title: "E-commerce Solutions", desc: "স্টোর অপ্টিমাইজেশান এবং সেলস গ্রোথ।" }
          ].map((s, i) => (
            <div key={i} className="p-8 glass rounded-3xl hover:border-blue-500 transition-all group">
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                <s.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">{s.desc}</p>
              <button onClick={() => navigate('services')} className="text-sm font-bold text-blue-500 flex items-center gap-1 hover:gap-3 transition-all">
                Learn more <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Case Study */}
    <section className="py-20 px-6 bg-slate-900/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <button onClick={() => navigate('portfolio')} className="text-blue-500 font-bold border-b border-blue-500/0 hover:border-blue-500 transition-all">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden border border-white/5 bg-slate-900">
              <div className="aspect-video overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1551288049-bbda38a5f972?q=80&w=1000&auto=format&fit=crop`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60" alt="Work" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-2 block">E-commerce • Automation</span>
                <h3 className="text-xl font-bold mb-4">Project Title Here</h3>
                <div className="space-y-2 mb-6">
                  <p className="text-xs text-gray-400"><span className="text-white">Problem:</span> Manual order tracking was slow.</p>
                  <p className="text-xs text-gray-400"><span className="text-white">Solution:</span> n8n workflow for Google Sheets.</p>
                  <p className="text-xs text-green-400"><span className="text-white">Result:</span> 50% Time Saved.</p>
                </div>
                <button onClick={() => navigate('portfolio')} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all">View details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Digital Products Preview */}
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Ready-made templates & systems</h2>
        <p className="text-gray-400 mb-12">আপনার বিজনেস রান করার জন্য রেডিমেড সলিউশনগুলো ট্রাই করুন।</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 text-left">
          {["Meta Verified", "Premium VPNs", "Virtual Cards"].map((p, i) => (
            <div key={i} className="p-6 glass rounded-2xl border-l-4 border-blue-600">
              <h4 className="font-bold mb-2">{p}</h4>
              <p className="text-xs text-gray-500">Premium quality system.</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('products')} className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all">
          Explore Digital Products
        </button>
      </div>
    </section>

    {/* Why Work with Me */}
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-bold mb-8">কেন আমাকে বেছে নিবেন?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { t: "Clear communication", d: "প্রজেক্টের শুরু থেকে শেষ পর্যন্ত নিয়মিত আপডেট।" },
              { t: "Fast delivery", d: "টাইমলি প্রজেক্ট ডেলিভারি গ্যারান্টি।" },
              { t: "Documented workflows", d: "ক্লিয়ার ডকুমেন্টেশন যেন আপনি নিজেও হ্যান্ডেল করতে পারেন।" },
              { t: "Scalable systems", d: "আপনার বিজনেস বড় হওয়ার সাথে সাথে সিস্টেমও বড় হবে।" },
              { t: "Security-first", d: "আপনার ডাটা এবং অ্যাকাউন্ট সিকিউরিটি আমাদের প্রায়োরিটি।" },
              { t: "After-support", d: "কাজ শেষেও আপনার যেকোনো দরকারে আমি আছি।" }
            ].map((item, i) => (
              <div key={i}>
                <h4 className="font-bold text-blue-500 mb-2">• {item.t}</h4>
                <p className="text-sm text-gray-400">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-10 flex flex-col justify-center text-center">
          <HelpCircle size={48} className="mx-auto text-blue-500 mb-6" />
          <h3 className="text-2xl font-bold mb-6">আপনার কোনো প্রশ্ন আছে?</h3>
          <p className="text-gray-400 mb-10">বিনা দ্বিধায় আমাদের সাথে যোগাযোগ করুন এবং আপনার বিজনেস গ্রোথ নিয়ে আলোচনা করুন।</p>
          <button onClick={() => navigate('faq')} className="w-full py-4 glass hover:bg-blue-600 transition-all font-bold rounded-xl">See all FAQs</button>
        </div>
      </div>
    </section>
  </motion.div>
);

const ServicesView: React.FC<{navigate: (p: Page) => void}> = ({ navigate }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 py-12">
    <div className="mb-20 text-center">
      <h1 className="text-5xl font-bold mb-6">Our Services</h1>
      <p className="text-gray-400 max-w-2xl mx-auto">প্রতিটি সার্ভিস আপনার বিজনেসের প্রোডাক্টিভিটি এবং সেলস বাড়ানোর জন্য ডিজাইন করা হয়েছে।</p>
    </div>

    <div className="space-y-24">
      {[
        { 
          id: "n8n", 
          title: "n8n Automation", 
          who: "Busy founders and agencies.",
          what: ["Lead capture → CRM", "Auto follow-up", "Order notifications", "Webhook setups"],
          timeline: "3-7 Days",
          process: "Discovery -> Workflow Design -> Testing -> Launch"
        },
        { 
          id: "meta", 
          title: "Meta Support", 
          who: "Advertisers facing account issues.",
          what: ["Policy compliance check", "Ad manager setup", "Tracking (Pixel) setup", "Page management"],
          timeline: "1-3 Days",
          process: "Audit -> Strategy -> Implementation"
        },
        { 
          id: "digital", 
          title: "Digital Product Systems", 
          who: "Course creators and digital sellers.",
          what: ["Landing page setup", "Payment integration", "Auto delivery", "Email marketing"],
          timeline: "1-2 Weeks",
          process: "Funnel Mapping -> Setup -> Email Automation"
        },
        { 
          id: "ecom", 
          title: "E-commerce Solutions", 
          who: "Shopify/WooCommerce store owners.",
          what: ["Store optimization", "Inventory automation", "Conversion rate boost", "Analytics tracking"],
          timeline: "Varies",
          process: "Audit -> Improvements -> Optimization"
        }
      ].map((s, i) => (
        <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-white/5 pb-24">
          <div className={`${i % 2 === 0 ? '' : 'lg:order-2'}`}>
            <h2 className="text-3xl font-bold mb-4">{s.title}</h2>
            <div className="mb-6">
              <span className="text-xs uppercase font-bold text-blue-500 tracking-widest">Target: {s.who}</span>
            </div>
            <div className="space-y-4 mb-8">
              <h4 className="font-bold">What you get:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.what.map((w, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle size={14} className="text-blue-500" /> {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-12 mb-10 border-t border-white/5 pt-8">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Timeline</p>
                <p className="font-bold">{s.timeline}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">Process</p>
                <p className="font-bold">{s.process}</p>
              </div>
            </div>
            <button onClick={() => navigate('book-now')} className="px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-700 transition-all">Get Started</button>
          </div>
          <div className={`aspect-video rounded-2xl bg-white/5 border border-white/10 ${i % 2 === 0 ? '' : 'lg:order-1'}`} />
        </div>
      ))}
    </div>
  </motion.div>
);

const TeamView: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Meet The <span className="text-blue-500 underline decoration-blue-500/30">Experts</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">অভিজ্ঞ প্রফেশনালদের নিয়ে গঠিত আমাদের টিম আপনার বিজনেসের গ্রোথ এবং সলিউশনে সদা প্রস্তুত।</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {teamData.map((member, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] group"
          >
            <div className="p-8 h-full bg-[#0a0c10] rounded-[2.5rem] flex flex-col transition-all group-hover:bg-[#0f172a]">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 ring-1 ring-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all">
                  <member.icon size={32} />
                </div>
                <div className="flex gap-2">
                  {member.socials.slice(0, 2).map((s, idx) => (
                    <div key={idx} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                      <s.icon size={18} />
                    </div>
                  ))}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-1 tracking-tight text-white">{member.name}</h3>
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">{member.role}</p>
              <p className="text-sm text-gray-400 mb-10 leading-relaxed font-medium">
                {member.bio}
              </p>
              
              <div className="mt-auto pt-6 border-t border-white/5">
                <button 
                  onClick={() => setSelectedMember(member)}
                  className="w-full py-4 bg-[#1e293b]/50 hover:bg-blue-600 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 group-hover:text-white"
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setSelectedMember(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button 
                className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center z-10 hover:bg-red-500/20 transition-all"
                onClick={() => setSelectedMember(null)}
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="h-full min-h-[400px]">
                  <img 
                    src={selectedMember.image} 
                    alt={selectedMember.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                    <selectedMember.icon size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-2">{selectedMember.name}</h2>
                  <p className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-8">{selectedMember.role}</p>
                  
                  <div className="space-y-6 mb-10">
                    <p className="text-gray-300 leading-relaxed italic">"{selectedMember.detailedBio}"</p>
                    
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4">Top Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 glass rounded-lg text-xs font-semibold">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="py-4 bg-blue-600 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                      Contact <MessageSquare size={18} />
                    </button>
                    <div className="flex gap-2">
                      {selectedMember.socials.map((s, idx) => (
                        <a 
                          key={idx} 
                          href={s.url} 
                          className="flex-1 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"
                          title={s.platform}
                        >
                          <s.icon size={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PortfolioView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-12">
    <div className="mb-16">
      <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
      <div className="flex flex-wrap gap-4">
        {["All", "Automation", "Meta", "E-commerce", "Digital Products"].map((f) => (
          <button key={f} className="px-4 py-2 glass rounded-lg text-sm hover:bg-blue-600 transition-all">{f}</button>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="glass rounded-3xl overflow-hidden p-8 group">
          <div className="aspect-video bg-white/5 rounded-2xl mb-8 overflow-hidden">
             {/* Placeholder for project screenshot */}
          </div>
          <h3 className="text-2xl font-bold mb-4">Scale Up Automation</h3>
          <p className="text-gray-400 mb-6 text-sm">Helping a local brand automate 2,000+ monthly orders using n8n.</p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-3 bg-white/5 rounded-xl">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Reduction</p>
              <p className="font-bold text-green-500">60%</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Time</p>
              <p className="font-bold">20hrs/wk</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Errors</p>
              <p className="font-bold">Zero</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-blue-500 font-bold hover:gap-4 transition-all">View Detail Case Study <ArrowRight size={16} /></button>
        </div>
      ))}
    </div>
  </motion.div>
);

const ProductsView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-12">
    <div className="mb-20 text-center">
      <h1 className="text-5xl font-bold mb-6">Digital Shop</h1>
      <p className="text-gray-400">আপনার কাজ সহজ করার জন্য সেরা টেম্পলেট, সার্ভিস এবং মেম্বারশিপ।</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {digitalProducts.map((p) => (
        <div key={p.id} className="p-8 glass rounded-[2rem] flex flex-col justify-between hover:border-blue-500/50 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-blue-600/10" />
          <div>
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl mb-6 flex items-center justify-center text-blue-500 ring-1 ring-blue-500/20 group-hover:scale-110 transition-transform">
              <p.icon size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{p.title}</h3>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">{p.desc}</p>
          </div>
          <div>
            <div className="text-xl font-bold mb-6 text-white">{p.price}</div>
            <button className="w-full py-3.5 glass hover:bg-blue-600 rounded-xl text-sm font-bold transition-all active:scale-95 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const BlogView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const categories = ['All', 'Automation', 'Meta', 'E-commerce', 'Digital Product'];

  const filteredPosts = activeFilter === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-6 tracking-tight">Insights & <span className="text-blue-500">Guides</span></h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">ডিজিটাল গ্রোথ এবং অটোমেশন নিয়ে আমার লেটেস্ট ব্লগ এবং গাইডসমূহ।</p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                activeFilter === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'glass text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={post.id} 
              className="p-8 glass rounded-[2.5rem] group cursor-pointer hover:border-blue-500/30 transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/10 rounded-lg">
                  <Tag size={12} className="text-blue-500" />
                  <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight">{post.title}</h2>
              <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed max-w-3xl">{post.excerpt}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold">N</div>
                  <span className="text-xs font-bold">Naiem Taslim</span>
                </div>
                <button className="text-sm font-bold text-blue-500 flex items-center gap-2 hover:gap-4 transition-all">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 glass rounded-[2.5rem]">
            <Search size={48} className="mx-auto text-gray-600 mb-6" />
            <h3 className="text-xl font-bold text-gray-400">No articles found in this category.</h3>
            <button onClick={() => setActiveFilter('All')} className="mt-4 text-blue-500 font-bold hover:underline">Clear Filters</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ContactView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
    <div>
      <h1 className="text-5xl font-bold mb-8">Contact Me</h1>
      <p className="text-xl text-gray-400 mb-12">চলুন আপনার বিজনেস প্রবলেম সলভ করার জন্য একটি আলোচনা শুরু করি।</p>
      
      <div className="space-y-8 mb-16">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-blue-500"><Mail size={20}/></div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
            <p className="font-bold">hello@taslim.com</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-green-500"><Phone size={20}/></div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">WhatsApp</p>
            <p className="font-bold">+880 1XXX-XXXXXX</p>
          </div>
        </div>
      </div>

      <div className="p-8 glass rounded-3xl border-blue-600/30">
        <h4 className="font-bold mb-4">Social Presence</h4>
        <div className="flex gap-4">
          <button className="flex-1 py-3 glass rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"><Facebook size={18}/> Facebook</button>
          <button className="flex-1 py-3 glass rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all"><LinkedInIcon size={18}/> LinkedIn</button>
        </div>
      </div>
    </div>

    <form className="glass p-10 rounded-3xl space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-[10px] font-black text-gray-500 mb-2 block uppercase tracking-widest">Name</label>
          <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all" placeholder="John Doe" />
        </div>
        <div>
          <label className="text-[10px] font-black text-gray-500 mb-2 block uppercase tracking-widest">Email</label>
          <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all" placeholder="john@example.com" />
        </div>
      </div>
      <div>
        <label className="text-[10px] font-black text-gray-500 mb-2 block uppercase tracking-widest">WhatsApp Number</label>
        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all" placeholder="+880..." />
      </div>
      <div>
        <label className="text-[10px] font-black text-gray-500 mb-2 block uppercase tracking-widest">Service Required</label>
        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all text-gray-400">
          <option>n8n Automation</option>
          <option>Meta Support</option>
          <option>Digital Products</option>
          <option>E-commerce Solutions</option>
        </select>
      </div>
      <div>
        <label className="text-[10px] font-black text-gray-500 mb-2 block uppercase tracking-widest">Message</label>
        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all h-32" placeholder="Tell me about your project..."></textarea>
      </div>
      <button className="w-full py-4 bg-blue-600 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">Send Message</button>
    </form>
  </motion.div>
);

const BookingView: React.FC<{type: 'demo' | 'order'}> = ({ type }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto px-6 py-12 text-center">
    <h1 className="text-4xl font-bold mb-6">{type === 'demo' ? 'Book a Free Demo' : 'Confirm Your Order'}</h1>
    <p className="text-gray-400 mb-12">
      {type === 'demo' 
        ? 'আপনার বিজনেসের বর্তমান অবস্থা নিয়ে আমরা ১৫ মিনিট কথা বলব এবং সেরা সলিউশন সাজাবো।' 
        : 'আপনি আপনার প্রজেক্টের রিকোয়ারমেন্ট গুলো সিলেক্ট করুন, আমরা দ্রুত শুরু করব।'}
    </p>
    <div className="glass h-[600px] rounded-3xl flex items-center justify-center">
      <div className="text-center p-12">
        <Calendar size={64} className="mx-auto text-blue-500 mb-6" />
        <p className="text-xl font-bold">Calendly/Order Embed Placeholder</p>
        <p className="text-gray-500">This area will contain your booking widget.</p>
      </div>
    </div>
  </motion.div>
);

const FAQView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto px-6 py-12">
    <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>
    <div className="space-y-6">
      {[
        { q: "কিভাবে কাজ শুরু করব?", a: "প্রথমে একটি ডেমো কল বুক করুন অথবা কন্টাক্ট ফর্মে মেসেজ দিন।" },
        { q: "কি কি ইনফরমেশন লাগবে?", a: "আপনার বিজনেসের গোল এবং বর্তমান সিস্টেমের এক্সেস প্রয়োজন হতে পারে।" },
        { q: "ডেলিভারি টাইমলাইন কেমন?", a: "সাধারণত ৩ থেকে ১০ দিনের মধ্যে আমরা প্রজেক্ট হ্যান্ডওভার করি।" },
        { q: "সার্ভিস পরবর্তী সাপোর্ট কি পাওয়া যাবে?", a: "হ্যাঁ, কাজ শেষেও আমরা ১৫ দিন ফ্রি সাপোর্ট প্রদান করি।" },
        { q: "পেমেন্ট প্রসেস কি?", a: "আমরা ফিফটি-ফিফটি পেমেন্ট মডেলে কাজ করি (শুরুতে ৫০%, শেষে ৫০%)।" }
      ].map((f, i) => (
        <div key={i} className="glass p-6 rounded-2xl">
          <h4 className="font-bold mb-3 flex justify-between items-center">{f.q} <ChevronDown size={16}/></h4>
          <p className="text-sm text-gray-400 leading-relaxed">{f.a}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const AboutView: React.FC<{navigate: (p: Page) => void}> = ({ navigate }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-2xl group-hover:opacity-100 opacity-50 transition-opacity"></div>
        <div className="aspect-[4/5] bg-[#0f172a] rounded-[2.5rem] border border-white/5 overflow-hidden relative shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
            alt="Md Naiem Din Taslim" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
      <div>
        <h1 className="text-5xl font-black mb-10 tracking-tight leading-[1.1]">
          আমি <span className="text-blue-500">Naiem</span>। একজন ডিজিটাল সলিউশন এক্সপার্ট।
        </h1>
        <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
          <p>
            আমি md naiem din taslim — একজন Automation এবং Digital Growth Specialist। আমি বিশ্বাস করি যে প্রতিটি আধুনিক বিজনেসের একটি স্মার্ট এবং সিস্টেম-ড্রিভেন প্রসেস থাকা প্রয়োজন। ম্যানুয়াল কাজ কমিয়ে অটোমেশন ব্যবহারের মাধ্যমে প্রোডাক্টিভিটি বাড়ানোই আমার মূল লক্ষ্য।
          </p>
          <p>
            বিগত কয়েক বছর ধরে আমি n8n Automation, Meta Support এবং E-commerce সলিউশন নিয়ে কাজ করছি। আমি শুধু কোড বা টুল ব্যবহার করি না, বরং আপনার বিজনেসের জন্য একটি পূর্ণাঙ্গ গ্রোথ ইঞ্জিন তৈরি করি যা ২৪/৭ আপনার হয়ে কাজ করবে।
          </p>
          <p>
            আমার কাজের মূল ফোকাস হচ্ছে বিজনেসের অপারেশনাল খরচ কমিয়ে আনা এবং সেলস বাড়ানো। আমি প্রতিটি প্রজেক্টকে এমনভাবে ডিজাইন করি যাতে এটি লং-টার্মে স্কেলেবল এবং সিকিউর থাকে।
          </p>
        </div>
        
        <div className="mt-12 flex flex-wrap gap-4">
          <button onClick={() => navigate('book-demo')} className="px-10 py-5 bg-blue-600 rounded-full font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20 flex items-center gap-2">
            Work with me <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>

    {/* Work Principles Section */}
    <div className="mb-32">
      <h2 className="text-3xl font-bold mb-16 text-center">আমার কাজের মূলনীতি</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Rocket, title: "Efficiency First", desc: "আমি এমন সিস্টেম তৈরি করি যা আপনার সময় বাঁচায় এবং কাজের গতি কয়েকগুণ বাড়িয়ে দেয়।" },
          { icon: Shield, title: "Data Security", desc: "আপনার বিজনেস ডাটা এবং প্রাইভেসি সুরক্ষায় আমি কখনো কোনো প্রকার আপস করি না।" },
          { icon: Award, title: "Scalability", desc: "আজকের সলিউশন যেন আপনার আগামীদিনের বিশাল বিজনেসকেও সাপোর্ট দিতে পারে সেই চিন্তা করেই আমি কাজ করি।" }
        ].map((p, i) => (
          <div key={i} className="p-8 glass rounded-[2rem] hover:bg-blue-600/5 transition-colors group">
            <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <p.icon size={24} />
            </div>
            <h4 className="text-xl font-bold mb-4">{p.title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Skill Stack Section */}
    <div className="glass p-12 rounded-[3rem] bg-gradient-to-br from-blue-600/5 to-transparent">
      <div className="text-center mb-12">
        <h4 className="text-xs uppercase tracking-widest font-black text-blue-500 mb-4">The Tool Stack</h4>
        <h2 className="text-3xl font-bold">আমার প্রতিদিনের কাজের হাতিয়ার</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {[
          "n8n Automation", "Make (Integromat)", "Meta Ads Manager", "Shopify Developer", "GoHighLevel", 
          "OpenAI Integration", "Google Sheets API", "Pyypl & RedotPay", "Python", "Cloud Infrastructure"
        ].map((t) => (
          <span key={t} className="px-6 py-3 glass rounded-2xl text-sm font-bold hover:text-blue-400 transition-colors cursor-default">{t}</span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default App;