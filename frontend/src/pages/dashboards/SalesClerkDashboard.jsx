import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SalesClerkDashboard = () => {
    const { user } = useAuth();

    const actions = [
        { label: 'New Walk-in Order', path: '/orders' },
        { label: 'Sales History & Bills', path: '/sales-history' },
        { label: 'Inventory', path: '/inventory' },
        { label: 'Purchase Orders', path: '/purchase-orders' },
        { label: 'Supplier Invoices', path: '/invoices' },
        { label: 'Sales Reports', path: '/reports' }
    ];

    return (
        <div className="min-h-screen bg-[#1c1512] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-5xl mx-auto">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#c6a15b]">
                    Sales Clerk Portal
                </p>

                <h1 className="mt-2 font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">
                    Welcome, {user?.name}
                </h1>

                <p className="mt-2 text-[#8b7e70]">
                    Manage walk-in sales, billing and restaurant operations.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {actions.map((action) => (
                        <Link
                            key={action.path}
                            to={action.path}
                            className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c6a15b]/40 hover:bg-[#f4ebdc]/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c6a15b]"
                        >
                            <h2 className="font-['Fraunces',Georgia,serif] text-lg font-medium text-[#f4ebdc]">{action.label}</h2>
                            <p className="mt-3 text-sm text-[#8b7e70]">
                                Open {action.label.toLowerCase()}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SalesClerkDashboard;