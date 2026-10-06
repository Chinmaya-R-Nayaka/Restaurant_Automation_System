import { useState } from 'react';
import api from '../../api/axios';

const StockUsageForm = ({ ingredients, onSuccess }) => {
    const [ingredientId, setIngredientId] = useState('');
    const [quantityUsed, setQuantityUsed] = useState(1);
    const [message, setMessage] = useState('');

    const recordUsage = async () => {
        try{
            const response = await api.post(
                '/api/v1/ingredients/stock-usage',
                {
                    ingredientId,
                    quantityUsed: Number(quantityUsed)
                }
            );

            setMessage(response.data.message);
            setIngredientId('');
            setQuantityUsed(1);
            onSuccess();
        }
        catch(error){
            setMessage(
                error.response?.data?.message || 'Error recording stock usage'
            );
        }
    };

    return (
        <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-6">
            <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Record Stock Usage</h2>

            <div className="flex flex-col sm:flex-row gap-3">
                <select
                    value={ingredientId}
                    onChange={(e) => setIngredientId(e.target.value)}
                    className="flex-1 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                >
                    <option value="">Select ingredient</option>

                    {ingredients.map((ingredient) => (
                        <option
                            key={ingredient._id}
                            value={ingredient._id}
                        >
                            {ingredient.ingredientName}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    value={quantityUsed}
                    onChange={(e) => setQuantityUsed(e.target.value)}
                    className="w-full sm:w-28 rounded-[9px] border border-[#f4ebdc]/15 bg-black/20 px-3.5 py-3 text-[0.96rem] text-[#f4ebdc] outline-none transition duration-200 focus:border-[#c6a15b] focus:shadow-[0_0_0_3px_rgba(198,161,91,0.35)]"
                />

                <button
                    onClick={recordUsage}
                    className="rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-5 py-3 text-[0.95rem] font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]"
                >
                    Record Usage
                </button>
            </div>

            {message && <p className="text-[0.9rem] text-[#d98b6f] mt-4">{message}</p>}
        </div>
    );
};

export default StockUsageForm;