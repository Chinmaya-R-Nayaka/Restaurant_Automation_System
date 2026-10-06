import { useEffect, useState } from 'react';
import api from '../api/axios';
import IngredientTable from '../components/inventory/IngredientTable';
import StockUsageForm from '../components/inventory/StockUsageForm';

const InventoryDashboard = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const fetchIngredients = async () => {
        try{
            const response = await api.get('/api/v1/ingredients');
            setIngredients(response.data.ingredients);
        }
        catch(error){
            setMessage(
                error.response?.data?.message || 'Error fetching ingredients'
            );
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    if(loading){
        return (
            <div className="min-h-screen bg-[#1c1512] px-5 py-10 sm:px-8">
                <div className="max-w-5xl mx-auto flex items-center gap-3 text-[#8b7e70]">
                    <span className="h-4 w-4 rounded-full border-2 border-[#c6a15b]/30 border-t-[#c6a15b] animate-spin motion-reduce:animate-none"/>
                    Loading inventory...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">Inventory Dashboard</h1>

                {message && <p className="text-[0.92rem] text-[#d98b6f]">{message}</p>}

                <StockUsageForm
                    ingredients={ingredients}
                    onSuccess={fetchIngredients}
                />

                <IngredientTable ingredients={ingredients} />
            </div>
        </div>
    );
};

export default InventoryDashboard;