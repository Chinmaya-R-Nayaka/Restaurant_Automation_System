import api from '../../api/axios';

const PaymentStatus = ({ invoice, onSuccess }) => {
    const payInvoice = async () => {
        try{
            await api.post(`/api/v1/invoices/${invoice._id}/pay`);
            onSuccess();
        }
        catch(error){
            alert(error.response?.data?.message || 'Error processing payment');
        }
    };

    if(invoice.paymentStatus === 'Paid'){
        return <span className="rounded-full px-2.5 py-1 text-xs font-medium bg-[#7fae8c]/15 text-[#7fae8c]">Paid</span>;
    }

    return(
        <button onClick={payInvoice}
            className="rounded-[9px] border border-[#f4ebdc]/20 px-3.5 py-1.5 text-sm text-[#f4ebdc] transition duration-200 hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.97]"
        >
            Pay
        </button>
    );
};

export default PaymentStatus;