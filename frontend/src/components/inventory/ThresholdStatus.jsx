const ThresholdStatus = ({ ingredient }) => {
    const lowStock = ingredient.currentStock < ingredient.threshold;

    return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            lowStock ? 'bg-[#a85c41]/20 text-[#d98b6f]' : 'bg-[#7fae8c]/15 text-[#7fae8c]'}`}
        >
            {lowStock ? 'Low Stock' : 'Normal'}
        </span>
    );
};

export default ThresholdStatus;