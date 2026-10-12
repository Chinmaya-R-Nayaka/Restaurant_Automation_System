import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomerDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#1c1512] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-5xl mx-auto">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#c6a15b]">
                    Customer Portal
                </p>

                <h1 className="mt-2 font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">
                    Welcome, {user?.name}
                </h1>

                <p className="mt-2 text-[#8b7e70]">
                    Discover your favourites and enjoy freshly prepared food.
                </p>

                <div className="mt-8 rounded-[18px] border border-[#c6a15b]/25 bg-[linear-gradient(120deg,#241b16,#2a2016,#241b16)] p-8">
                    <h2 className="font-['Fraunces',Georgia,serif] text-2xl font-medium text-[#f4ebdc]">
                        Good food, good mood.
                    </h2>

                    <p className="mt-2 text-[#a99c8b]">
                        Explore our menu and choose what you love.
                    </p>

                    <Link
                        to="/customer/menu"
                        className="mt-6 inline-block rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-6 py-3 font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a15b] focus-visible:outline-offset-2"
                    >
                        Explore Menu
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;