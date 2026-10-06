import ThresholdStatus from './ThresholdStatus';

const IngredientTable = ({ ingredients }) => {
    return (
        <div>
            <h2 className="font-['Fraunces',Georgia,serif] font-medium text-xl text-[#f4ebdc] mb-4">Ingredients</h2>

            {ingredients.length === 0 ? (
                <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-8 text-center text-[#8b7e70]">
                    No ingredients found
                </div>
            ) : (
                <div className="rounded-[16px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[#f4ebdc]/10 text-[0.78rem] uppercase tracking-wide text-[#8b7e70]">
                                <th className="py-3 px-4">Ingredient</th>
                                <th className="py-3 px-4">Unit</th>
                                <th className="py-3 px-4">Current Stock</th>
                                <th className="py-3 px-4">Threshold</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ingredients.map((ingredient) => (
                                <tr key={ingredient._id} className="border-b border-[#f4ebdc]/5 last:border-0 transition-colors duration-200 hover:bg-[#f4ebdc]/[0.03]">
                                    <td className="py-3 px-4 text-[#f4ebdc]">{ingredient.ingredientName}</td>
                                    <td className="py-3 px-4 text-[#d9cdb9]">{ingredient.unit}</td>
                                    <td className="py-3 px-4 text-[#d9cdb9]">{ingredient.currentStock}</td>
                                    <td className="py-3 px-4 text-[#d9cdb9]">{ingredient.threshold}</td>
                                    <td className="py-3 px-4"><ThresholdStatus ingredient={ingredient} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default IngredientTable;