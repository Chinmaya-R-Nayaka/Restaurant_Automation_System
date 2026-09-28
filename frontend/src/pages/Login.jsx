import { useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../api/axios';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('/api/v1/auth/login', { email, password });
            console.log(response.data);
        } 
        catch(error){
            console.error('Error logging in user:', error);
        }
    }

    return(
        <div className="min-h-screen flex flex-col md:flex-row bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] overflow-x-hidden">
            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .login-anim-1 { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
                .login-anim-2 { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
                @media (prefers-reduced-motion: reduce) {
                    .login-anim-1, .login-anim-2 { animation: none; }
                }
            `}</style>

            {/* Brand panel */}
            <div className="relative flex-1 md:flex-[46] flex items-center justify-center text-center md:text-left px-7 py-11 md:px-12
                            bg-[radial-gradient(circle_at_20%_15%,rgba(198,161,91,0.10),transparent_55%),linear-gradient(160deg,#241b16_0%,#1c1512_70%)]">
                <div className="max-w-[380px] login-anim-1">
                    <span className="font-['Fraunces',Georgia,serif] text-[1.1rem] tracking-[0.04em] text-[#c6a15b]">
                        Bistro&nbsp;Nº7
                    </span>

                    <h1 className="mt-6 font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.25] text-[#f4ebdc] md:max-w-[20ch]">
                        Where great food meets seamless management
                    </h1>

                    <svg
                        viewBox="0 0 200 200"
                        fill="none"
                        aria-hidden="true"
                        className="hidden md:block w-[150px] h-[150px] mt-12 text-[#c6a15b]/35"
                    >
                        <path d="M40 20 C40 60, 40 90, 40 120 M40 120 C40 140, 55 150, 55 150" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M55 20 C55 60, 55 90, 55 120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M70 20 C70 60, 70 90, 70 120 M70 20 C70 20, 84 20, 84 40 C84 60, 70 70, 70 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="150" cy="90" r="48" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="150" cy="90" r="30" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                </div>
            </div>

            {/* Form panel */}
            <div className="flex-1 md:flex-[54] flex items-center justify-center bg-[#1c1512] px-5 py-11 md:py-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-[380px] rounded-[18px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.06]
                               backdrop-blur-[6px] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]
                               px-9 py-11 sm:px-9
                               login-anim-2"
                >
                    <div className="mb-8">
                        <h2 className="font-['Fraunces',Georgia,serif] font-medium text-[1.7rem] text-[#f4ebdc] m-0">
                            Welcome back
                        </h2>
                        <p className="mt-1.5 text-[#8b7e70] text-[0.92rem]">
                            Sign in to keep the tables turning.
                        </p>
                    </div>

                    <label className="block mb-5">
                        <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">Email</span>
                        <input
                            type="email"
                            placeholder="you@restaurant.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full box-border rounded-[9px] border border-[#f4ebdc]/[0.16] bg-black/[0.18]
                                       px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40
                                       outline-none transition duration-200
                                       focus:border-[#c6a15b] focus:bg-black/[0.28] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                        />
                    </label>

                    <label className="block mb-5">
                        <span className="block text-[0.82rem] text-[#d9cdb9] mb-2">Password</span>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full box-border rounded-[9px] border border-[#f4ebdc]/[0.16] bg-black/[0.18]
                                       px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] placeholder:text-[#d9cdb9]/40
                                       outline-none transition duration-200
                                       focus:border-[#c6a15b] focus:bg-black/[0.28] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full mt-1.5 rounded-[9px] py-3.5 font-semibold text-[0.98rem] text-[#2a2118]
                                   bg-gradient-to-br from-[#c6a15b] to-[#b98d47]
                                   transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)]
                                   active:scale-[0.98]
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a15b] focus-visible:outline-offset-2"
                    >
                        Sign in
                    </button>

                    <p className="mt-6 text-center text-[0.9rem] text-[#8b7e70]">
                        New here?{' '}
                        <Link
                            to="/register"
                            className="text-[#c6a15b] border-b border-transparent transition duration-200 hover:border-[#c6a15b]
                                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a15b] focus-visible:outline-offset-2"
                        >
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;