
const BillPrint = ({ bill }) => {
    const handlePrint = () => {
        window.print();
    };

    if(!bill){
        return null;
    }

    return(
        <div>
            <button onClick={handlePrint}
                className="rounded-[9px] border border-[#f4ebdc]/20 px-5 py-2.5 text-[0.95rem] text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]"
            >Print Bill</button>
        </div>
    );
};

export default BillPrint;