import { useEffect, useState } from "react";
import api from "../api/axios";

import MenuCard from "../components/menu/MenuCard";
import AddMenuItemModal from "../components/menu/AddMenuItemModal";
import EditMenuItemModal from "../components/menu/EditMenuItemModal";
import PriceUpdateForm from "../components/menu/PriceUpdateForm";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [priceItem, setPriceItem] = useState(null);

  const fetchMenuItems = async () => {
    try{
      setLoading(true);
      const response = await api.get("/api/v1/menu-items");
      setMenuItems(response.data.menuItems);
    } 
    catch(error){
      console.error(error.response?.data || error.message);
    } 
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleAdd = async (data) => {
    try{
      await api.post("/api/v1/menu-items", data);
      setShowAddModal(false);
      await fetchMenuItems();
    } 
    catch(error){
      console.error(error.response?.data || error.message);
    }
  };

  const handleUpdate = async (id, data) => {
    try{
      await api.patch(`/api/v1/menu-items/${id}`, data);
      setEditingItem(null);
      await fetchMenuItems();
    } 
    catch(error){
      console.error(error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this menu item?");
    if (!confirmed) return;
    try{
      await api.delete(`/api/v1/menu-items/${id}`);
      await fetchMenuItems();
    } 
    catch(error){
      console.error(error.response?.data || error.message);
    }
  };

  const handlePriceUpdate = async (id, data) => {
    try{
      await api.patch(`/api/v1/menu-items/${id}/price`, data);
      setPriceItem(null);
      await fetchMenuItems();
    } 
    catch(error){
      console.error(error.response?.data || error.message);
    }
  };

  return(
    <div className="min-h-screen bg-[#1c1512] font-[Work_Sans,system-ui,sans-serif] text-[#f4ebdc] overflow-x-hidden px-5 py-10 sm:px-8 bg-[radial-gradient(circle_at_15%_0%,rgba(198,161,91,0.10),transparent_50%)]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-10">
          <div>
            <h1 className="font-['Fraunces',Georgia,serif] font-medium text-[clamp(1.8rem,3vw,2.4rem)] text-[#f4ebdc]">Menu Management</h1>
            <p className="text-[#8b7e70] mt-1 text-[0.95rem]">Manage restaurant menu items</p>
          </div>

          <button onClick={() => setShowAddModal(true)} className="self-start sm:self-auto rounded-[9px] bg-gradient-to-br from-[#c6a15b] to-[#b98d47] px-5 py-3 text-[0.95rem] font-semibold text-[#2a2118] transition duration-200 hover:brightness-105 hover:shadow-[0_10px_24px_-8px_rgba(198,161,91,0.35)] active:scale-[0.97]">
            + Add Menu Item
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 text-[#8b7e70]">
            <span className="h-4 w-4 rounded-full border-2 border-[#c6a15b]/30 border-t-[#c6a15b] animate-spin motion-reduce:animate-none"/>
            Loading menu items...
          </div>
        )}

        {/* Empty State */}
        {!loading && menuItems.length === 0 && (
          <div className="rounded-[18px] border border-[#f4ebdc]/10 bg-[#f4ebdc]/[0.04] p-12 text-center">
            <h2 className="font-['Fraunces',Georgia,serif] text-xl font-medium text-[#f4ebdc]">No menu items found</h2>
            <p className="text-[#8b7e70] mt-2">Add your first menu item.</p>
          </div>
        )}

        {/* Menu Items */}
        {!loading && menuItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {menuItems.map((item) => (
              <MenuCard key={item._id} item={item} onEdit={setEditingItem}
                onDelete={handleDelete} onPriceUpdate={setPriceItem}/>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddMenuItemModal onClose={() => setShowAddModal(false)} onAdd={handleAdd}/>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <EditMenuItemModal item={editingItem} onClose={() => setEditingItem(null)} onUpdate={handleUpdate}/>
      )}

      {/* Price Modal */}
      {priceItem && (
        <PriceUpdateForm item={priceItem} onClose={() => setPriceItem(null)} onUpdate={handlePriceUpdate}/>
      )}
    </div>
  );
};

export default MenuPage;