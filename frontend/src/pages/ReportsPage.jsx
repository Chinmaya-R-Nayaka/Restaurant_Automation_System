import { useEffect, useState } from 'react';
import api from '../api/axios';

const ReportsPage = () => {
    const [sales, setSales] = useState(null);
    const [monthlySales, setMonthlySales] = useState([]);
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchReports = async () => {
        try{
            const [ salesResponse,monthlySalesResponse, expensesResponse ] = await Promise.all([
                api.get('/api/v1/reports/sales'),
                api.get('/api/v1/reports/sales/monthly'),
                api.get('/api/v1/reports/expenses/monthly')
            ]);

            setSales(salesResponse.data);
            setMonthlySales(monthlySalesResponse.data.sales);
            setMonthlyExpenses(expensesResponse.data.expenses);
        }
        catch(error){
            setMessage(error.response?.data?.message || 'Error fetching reports');
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    if(loading){
        return (
            <div className="min-h-screen bg-[#1c1512] px-5 py-10 sm:px-8">
                <div className="max-w-5xl mx-auto flex items-center gap-3 text-[#8b7e70]">
                    <span className="h-4 w-4 rounded-full border-2 border-[#c6a15b]/30 border-t-[#c6a15b] animate-spin motion-reduce:animate-none"/>
                    Loading reports...
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <h1 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">Reports</h1>

                    <button onClick={() => window.print()}
                        className="self-start sm:self-auto rounded-[9px] border border-[#f4ebdc]/20 px-5 py-2.5 text-[0.95rem] text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97] print:hidden"
                    >
                        Print Report
                    </button>
                </div>
                {message && <p className="text-[0.92rem] text-[#d98b6f]">{message}</p>}
                <div>
                    <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Sales Report</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6">
                            <p className="text-[0.8rem] text-[#8b7e70]">Total Sales</p>
                            <p className="mt-2 font-['Fraunces',Georgia,serif] text-3xl text-[#c6a15b]">₹{sales?.totalSales}</p>
                        </div>

                        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6">
                            <p className="text-[0.8rem] text-[#8b7e70]">Total Orders</p>
                            <p className="mt-2 font-['Fraunces',Georgia,serif] text-3xl text-[#f4ebdc]">{sales?.orderCount}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Monthly Sales</h2>
                    <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                                    <th className="py-3 px-4">Year</th>
                                    <th className="py-3 px-4">Month</th>
                                    <th className="py-3 px-4">Sales</th>
                                    <th className="py-3 px-4">Orders</th>
                                </tr>
                            </thead>

                            <tbody>
                                {monthlySales.map((item) => (
                                    <tr key={`${item._id.year}-${item._id.month}`} className="border-b border-[#f4ebdc]/5 last:border-0 transition-colors duration-200 hover:bg-[#f4ebdc]/[0.03]">
                                        <td className="py-3 px-4 text-[#f4ebdc]">{item._id.year}</td>
                                        <td className="py-3 px-4 text-[#d9cdb9]">{item._id.month}</td>
                                        <td className="py-3 px-4 text-[#c6a15b]">₹{item.totalSales}</td>
                                        <td className="py-3 px-4 text-[#d9cdb9]">{item.orderCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Monthly Expenses</h2>
                    <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                                    <th className="py-3 px-4">Year</th>
                                    <th className="py-3 px-4">Month</th>
                                    <th className="py-3 px-4">Expenses</th>
                                    <th className="py-3 px-4">Invoices</th>
                                </tr>
                            </thead>

                            <tbody>
                                {monthlyExpenses.map((item) => (
                                    <tr key={`${item._id.year}-${item._id.month}`} className="border-b border-[#f4ebdc]/5 last:border-0 transition-colors duration-200 hover:bg-[#f4ebdc]/[0.03]">
                                        <td className="py-3 px-4 text-[#f4ebdc]">{item._id.year}</td>
                                        <td className="py-3 px-4 text-[#d9cdb9]">{item._id.month}</td>
                                        <td className="py-3 px-4 text-[#d98b6f]">₹{item.totalExpenses}</td>
                                        <td className="py-3 px-4 text-[#d9cdb9]">{item.invoiceCount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;