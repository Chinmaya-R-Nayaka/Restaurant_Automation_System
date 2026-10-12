import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navigation = {
    customer: [
        { label: 'Menu', path: '/customer/menu', icon: '▦' }
    ],
    sales_clerk: [
        { label: 'Dashboard', path: '/clerk/dashboard', icon: '⌂' },
        { label: 'Menu', path: '/menu', icon: '▦' },
        { label: 'New Order', path: '/orders', icon: '+' },
        { label: 'Bills', path: '/sales-history', icon: '▤' },
        { label: 'Inventory', path: '/inventory', icon: '◇' },
        { label: 'Purchase Orders', path: '/purchase-orders', icon: '▣' },
        { label: 'Invoices', path: '/invoices', icon: '₹' },
        { label: 'Reports', path: '/reports', icon: '◷' }
    ],
    manager: [
        { label: 'Dashboard', path: '/manager/dashboard', icon: '⌂' },
        { label: 'Menu Management', path: '/menu', icon: '▦' },
        { label: 'Inventory', path: '/inventory', icon: '◇' },
        { label: 'Purchase Orders', path: '/purchase-orders', icon: '▣' },
        { label: 'Invoices', path: '/invoices', icon: '₹' },
        { label: 'Reports', path: '/reports', icon: '◷' }
    ]
};

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await logout();
            navigate('/login', { replace: true });
        }
        catch(error){
            console.error('Error logging out:', error);
        }
    };

    const links = navigation[user?.role] || [];

    return (
        <aside className="flex w-full shrink-0 flex-col border-b border-[#f4ebdc]/10 bg-[#241b16] px-4 py-4 print:hidden md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r md:px-5 md:py-6">
            <h1 className="mb-4 font-['Fraunces',Georgia,serif] text-2xl font-medium tracking-tight text-[#c6a15b] md:mb-10">
                🍽 Savoury
            </h1>

            <p className="mb-4 hidden px-2 text-xs font-semibold uppercase tracking-widest text-[#8b7e70] md:block">
                Restaurant OS
            </p>

            <nav className="flex gap-2 overflow-x-auto md:flex-1 md:flex-col md:overflow-x-hidden md:overflow-y-auto">
                {links.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-[10px] px-4 py-3 text-[0.95rem] font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a15b] ${
                                isActive
                                    ? 'bg-[#c6a15b]/15 text-[#c6a15b]'
                                    : 'text-[#d9cdb9] hover:bg-[#f4ebdc]/[0.06] hover:text-[#f4ebdc]'
                            }`
                        }
                    >
                        <span className="w-4 text-center">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-4 rounded-[12px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.05] p-4 md:mt-8">
                <p className="text-xs text-[#8b7e70]">VIEWING AS</p>

                <p className="mt-2 font-semibold text-[#f4ebdc]">
                    {user?.role?.replace('_', ' ').toUpperCase()}
                </p>

                <p className="mt-1 truncate text-sm text-[#8b7e70]">
                    {user?.name}
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-4 w-full rounded-[9px] border border-[#f4ebdc]/20 px-3 py-2 text-sm text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]"
                >
                    Sign out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;