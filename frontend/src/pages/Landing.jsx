// import {Link} from 'react-router-dom'

// function Landing(){
//     return(
//         <div>
//             <h1>Welcome to the Full Stack Web Application</h1>
//             <p>This is the landing page of the Restaurant Automation System application</p>

//             <Link to="/register"><button>Register</button></Link>
//             <Link to="/login"><button>Login</button></Link>
//         </div>
//     )
// }

// export default Landing;


// with CSS
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'

/* ---------- tiny scroll-reveal helper (no extra deps) ---------- */
function useInView() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.18 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return [ref, inView];
}

function Reveal({ children, className = '', delay = 0 }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
            style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
}

/* ---------- small icon set (inline SVG, no icon library) ---------- */
const icons = {
    order: <path d="M6 3h12l1 5H5l1-5Zm-1 5h14l-1.4 11.2A2 2 0 0 1 15.62 21H8.38a2 2 0 0 1-1.98-1.8L5 8Z" />,
    bill: <path d="M7 2h10a1 1 0 0 1 1 1v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2.5-1.5L3 21V3a1 1 0 0 1 1-1h3Zm1 6h8M8 11h8M8 14h5" />,
    stock: <path d="M4 7h16M4 12h16M4 17h10M3 3h4v4H3V3Zm14 0h4v4h-4V3Z" />,
    cart: <path d="M4 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" />,
    chart: <path d="M4 20V10m6 10V4m6 16v-7m6 7V8" />,
    menu: <path d="M5 4h14M5 10h14M5 16h9" />,
};
function Icon({ name, className = 'w-5 h-5' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            {icons[name]}
        </svg>
    );
}

/* ---------- data ---------- */
const features = [
    { icon: 'order', title: 'Smart Order Processing', body: 'Staff enter item code and quantity as items sell — orders stay organized without paper tickets.' },
    { icon: 'bill', title: 'Automated Billing', body: 'A bill is generated the moment an item is sold, with prices pulled from a single, manager-controlled list.' },
    { icon: 'stock', title: 'Inventory Intelligence', body: 'Every ingredient issued for preparation is logged, so stock levels stay accurate in real time.' },
    { icon: 'cart', title: 'Automated Purchase Orders', body: 'When stock drops below its threshold, a purchase order is generated automatically — no manual checks.' },
    { icon: 'chart', title: 'Sales & Expense Reports', body: 'Monthly sales receipts and expense reports are ready whenever a manager needs to see them.' },
    { icon: 'menu', title: 'Menu Management', body: 'Maintain items and prices in one place, and print an up-to-date menu card at any time.' },
];

const workflow = [
    'Order placed', 'Item sold', 'Bill generated', 'Ingredients used',
    'Inventory updated', 'Stock monitored', 'Threshold reached', 'Purchase order generated',
];

const stock = [
    { name: 'Tomatoes', pct: 82, label: 'Healthy stock', tone: 'gold' },
    { name: 'Onions', pct: 38, label: 'Low stock', tone: 'terracotta' },
    { name: 'Cheese', pct: 14, label: 'Purchase order triggered', tone: 'red' },
];

const stats = [
    { label: "Today's revenue", value: '₹48,250', note: '+12.4% vs yesterday' },
    { label: 'Items sold today', value: '312', note: 'across 9 categories' },
    { label: 'Inventory alerts', value: '3', note: 'below threshold' },
    { label: 'Purchase orders', value: '3', note: 'generated automatically' },
];

const benefits = [
    'Centralized restaurant operations',
    'Automated inventory monitoring',
    'Accurate, instant billing',
    'Smarter, threshold-based purchasing',
    'Clear monthly sales & expense reports',
];

function Landing(){
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How it works', href: '#how-it-works' },
        { label: 'Analytics', href: '#analytics' },
    ];

    return (
        <div className="min-h-screen bg-[#1c1512] text-[#f4ebdc] font-[Work_Sans,system-ui,sans-serif] overflow-x-hidden">
            <style>{`
                @keyframes fadeSlideUp { from { opacity:0; transform: translateY(18px); } to { opacity:1; transform: translateY(0); } }
                @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes drift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                @keyframes growBar { from { width: 0%; } }
                @keyframes dashFlow { to { stroke-dashoffset: -24; } }
                .ras-hero-in { animation: fadeSlideUp 0.8s cubic-bezier(0.22,1,0.36,1) both; }
                .ras-float { animation: floatY 6s ease-in-out infinite; }
                .ras-gradient-drift { background-size: 200% 200%; animation: drift 12s ease-in-out infinite; }
                .ras-bar { animation: growBar 1.1s cubic-bezier(0.22,1,0.36,1) both; }
                .ras-flow-line { stroke-dasharray: 6 6; animation: dashFlow 1.4s linear infinite; }
                @media (prefers-reduced-motion: reduce) {
                    .ras-hero-in, .ras-float, .ras-gradient-drift, .ras-bar, .ras-flow-line { animation: none; }
                }
            `}</style>

            {/* ---------- Navbar ---------- */}
            <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[#1c1512]/90 border-b border-[#f4ebdc]/10 backdrop-blur-md' : 'bg-transparent border-b border-transparent'}`}>
                <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
                    <span className="font-['Fraunces',Georgia,serif] text-lg tracking-[0.02em] text-[#c6a15b]">RAS</span>

                    <div className="hidden md:flex items-center gap-8 text-sm text-[#d9cdb9]">
                        {navLinks.map(l => (
                            <a key={l.href} href={l.href} className="hover:text-[#f4ebdc] transition-colors duration-200">{l.label}</a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login" className="text-sm text-[#d9cdb9] hover:text-[#f4ebdc] transition-colors duration-200 px-3 py-2">Login</Link>
                        <Link to="/register" className="text-sm font-semibold text-[#2a2118] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] rounded-[9px] px-4 py-2 transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]">Get Started</Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                        className="md:hidden text-[#f4ebdc] p-2 -mr-2"
                    >
                        <Icon name="menu" className="w-6 h-6" />
                    </button>
                </nav>

                {menuOpen && (
                    <div className="md:hidden bg-[#1c1512] border-t border-[#f4ebdc]/10 px-5 py-4 flex flex-col gap-4">
                        {navLinks.map(l => (
                            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-[#d9cdb9] text-sm">{l.label}</a>
                        ))}
                        <div className="flex items-center gap-3 pt-2">
                            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm text-[#d9cdb9] border border-[#f4ebdc]/15 rounded-[9px] py-2">Login</Link>
                            <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-semibold text-[#2a2118] bg-[#c6a15b] rounded-[9px] py-2">Get Started</Link>
                        </div>
                    </div>
                )}
            </header>

            {/* ---------- Hero ---------- */}
            <section className="relative pt-36 pb-24 px-5 sm:px-8 bg-[radial-gradient(circle_at_15%_20%,rgba(198,161,91,0.10),transparent_55%)]">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
                    <div className="ras-hero-in">
                        <span className="text-[0.82rem] text-[#c6a15b]">Restaurant Automation System</span>
                        <h1 className="mt-4 font-['Fraunces',Georgia,serif] font-medium text-[clamp(2.2rem,4.2vw,3.4rem)] leading-[1.15] text-[#f4ebdc] max-w-[18ch]">
                            Smarter restaurant operations. Better business.
                        </h1>
                        <p className="mt-5 text-[#c9bda9] text-[1.02rem] leading-relaxed max-w-[46ch]">
                            RAS brings order processing, billing, inventory and purchasing into one system —
                            so stock never runs out and every bill is accurate, automatically.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link to="/register" className="font-semibold text-[0.98rem] text-[#2a2118] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] rounded-[9px] px-6 py-3.5 transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]">
                                Get Started
                            </Link>
                            <a href="#features" className="text-[0.98rem] text-[#f4ebdc] border border-[#f4ebdc]/20 rounded-[9px] px-6 py-3.5 transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b]">
                                Explore Features
                            </a>
                            <Link to="/login" className="text-[0.95rem] text-[#8b7e70] hover:text-[#d9cdb9] transition-colors duration-200 underline-offset-4 hover:underline">
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* dashboard preview */}
                    <div className="relative h-[380px] hidden sm:block">
                        <div className="absolute right-0 top-0 w-[320px] rounded-[16px] border border-[#f4ebdc]/12 bg-[#f4ebdc]/[0.05] backdrop-blur-md shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] p-5 ras-float">
                            <p className="text-[0.78rem] text-[#8b7e70]">Today's sales</p>
                            <p className="mt-1 font-['Fraunces',Georgia,serif] text-2xl text-[#f4ebdc]">₹48,250 <span className="text-[#7fae8c] text-sm font-sans">+12.4%</span></p>
                        </div>

                        <div className="absolute left-0 top-24 w-[280px] rounded-[16px] border border-[#f4ebdc]/12 bg-[#f4ebdc]/[0.05] backdrop-blur-md shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] p-5 ras-float" style={{ animationDelay: '1.2s' }}>
                            <p className="text-[0.78rem] text-[#8b7e70]">Inventory status</p>
                            <p className="mt-1 text-[#f4ebdc]">8 items need attention</p>
                        </div>

                        <div className="absolute right-6 top-52 w-[240px] rounded-[16px] border border-[#f4ebdc]/12 bg-[#f4ebdc]/[0.05] backdrop-blur-md shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] p-5 ras-float" style={{ animationDelay: '2.1s' }}>
                            <p className="text-[0.78rem] text-[#8b7e70]">Pending orders</p>
                            <p className="mt-1 text-[#f4ebdc] text-xl">24</p>
                        </div>

                        <div className="absolute left-8 bottom-0 w-[260px] rounded-[16px] border border-[#c6a15b]/25 bg-[#f4ebdc]/[0.05] backdrop-blur-md shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] p-5 ras-float" style={{ animationDelay: '0.6s' }}>
                            <p className="text-[0.78rem] text-[#8b7e70]">Purchase orders</p>
                            <p className="mt-1 text-[#c6a15b]">3 generated automatically</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- Features ---------- */}
            <section id="features" className="py-24 px-5 sm:px-8">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <h2 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc] max-w-[24ch]">
                            Everything a restaurant runs on, in one system.
                        </h2>
                    </Reveal>

                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => (
                            <Reveal key={f.title} delay={i * 80}>
                                <div className="h-full rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c6a15b]/40 hover:bg-[#f4ebdc]/[0.07]">
                                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center bg-[#c6a15b]/12 text-[#c6a15b]">
                                        <Icon name={f.icon} />
                                    </div>
                                    <h3 className="mt-4 text-[#f4ebdc] font-medium">{f.title}</h3>
                                    <p className="mt-2 text-[0.92rem] text-[#a99c8b] leading-relaxed">{f.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- How it works ---------- */}
            <section id="how-it-works" className="py-24 px-5 sm:px-8 bg-[#1a140f]">
                <div className="max-w-5xl mx-auto">
                    <Reveal>
                        <h2 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc] max-w-[26ch]">
                            From a single sale to a restocked kitchen — automatically.
                        </h2>
                    </Reveal>

                    <div className="mt-14 relative">
                        <svg className="hidden md:block absolute left-0 top-5 w-full h-[2px]" preserveAspectRatio="none">
                            <line x1="0" y1="1" x2="100%" y2="1" stroke="#c6a15b" strokeOpacity="0.35" strokeWidth="2" className="ras-flow-line" />
                        </svg>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 relative">
                            {workflow.map((step, i) => (
                                <Reveal key={step} delay={i * 70} className="flex flex-col items-center text-center">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#c6a15b] mb-3" />
                                    <span className="text-[0.85rem] text-[#d9cdb9]">{step}</span>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- Automation highlight ---------- */}
            <section className="py-24 px-5 sm:px-8">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <Reveal>
                        <h2 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.3rem)] text-[#f4ebdc] max-w-[18ch]">
                            Never run out of what you need.
                        </h2>
                        <p className="mt-4 text-[#a99c8b] leading-relaxed max-w-[42ch]">
                            RAS watches ingredient consumption over the previous three days, keeps a minimum
                            stock buffer, and raises a purchase order the moment any ingredient crosses its threshold.
                        </p>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6 space-y-5">
                            {stock.map(s => (
                                <div key={s.name}>
                                    <div className="flex justify-between text-[0.88rem] text-[#d9cdb9]">
                                        <span>{s.name}</span>
                                        <span className={s.tone === 'gold' ? 'text-[#c6a15b]' : s.tone === 'terracotta' ? 'text-[#a85c41]' : 'text-[#c17a5f]'}>{s.label}</span>
                                    </div>
                                    <div className="mt-2 h-2 rounded-full bg-[#f4ebdc]/10 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ras-bar ${s.tone === 'gold' ? 'bg-[#c6a15b]' : s.tone === 'terracotta' ? 'bg-[#a85c41]' : 'bg-[#9a4a35]'}`}
                                            style={{ width: `${s.pct}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------- Analytics ---------- */}
            <section id="analytics" className="py-24 px-5 sm:px-8 bg-[#1a140f]">
                <div className="max-w-6xl mx-auto">
                    <Reveal>
                        <h2 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc] max-w-[24ch]">
                            Understand your business at a glance.
                        </h2>
                    </Reveal>

                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((s, i) => (
                            <Reveal key={s.label} delay={i * 80}>
                                <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6">
                                    <p className="text-[0.8rem] text-[#8b7e70]">{s.label}</p>
                                    <p className="mt-2 font-['Fraunces',Georgia,serif] text-2xl text-[#f4ebdc]">{s.value}</p>
                                    <p className="mt-1 text-[0.8rem] text-[#a99c8b]">{s.note}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- Operational benefits ---------- */}
            <section className="py-24 px-5 sm:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <Reveal>
                        <h2 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.3rem)] text-[#f4ebdc]">
                            Everything your restaurant needs to stay in control.
                        </h2>
                    </Reveal>

                    <Reveal delay={100}>
                        <ul className="mt-10 grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                            {benefits.map(b => (
                                <li key={b} className="flex items-start gap-3 text-[#d9cdb9]">
                                    <span className="mt-0.5 text-[#c6a15b]">✓</span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ---------- Final CTA ---------- */}
            <section className="py-24 px-5 sm:px-8">
                <Reveal>
                    <div className="max-w-4xl mx-auto text-center rounded-[20px] border border-[#c6a15b]/25 bg-[linear-gradient(120deg,#241b16,#2a2016,#241b16)] ras-gradient-drift p-12">
                        <h2 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.9rem,3.4vw,2.6rem)] text-[#f4ebdc] max-w-[22ch] mx-auto">
                            Ready to simplify your restaurant operations?
                        </h2>
                        <p className="mt-4 text-[#a99c8b] max-w-[42ch] mx-auto">
                            Bring orders, inventory, billing and reporting together in one system.
                        </p>
                        <Link to="/register" className="inline-block mt-8 font-semibold text-[0.98rem] text-[#2a2118] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] rounded-[9px] px-7 py-3.5 transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]">
                            Get Started
                        </Link>
                    </div>
                </Reveal>
            </section>

            {/* ---------- Footer ---------- */}
            <footer className="border-t border-[#f4ebdc]/10 py-8 px-5 sm:px-8">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.85rem] text-[#8b7e70]">
                    <span className="font-['Fraunces',Georgia,serif] text-[#c6a15b]">RAS</span>
                    <span>Restaurant Automation System</span>
                </div>
            </footer>
        </div>
    )
}

export default Landing;