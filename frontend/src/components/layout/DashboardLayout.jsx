import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] md:flex-row">
            <Sidebar />

            <main className="min-w-0 flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;