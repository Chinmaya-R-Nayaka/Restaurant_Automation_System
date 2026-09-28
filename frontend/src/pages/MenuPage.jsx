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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Menu Management</h1>
            <p className="text-gray-500 mt-1">Manage restaurant menu items</p>
          </div>

          <button onClick={() => setShowAddModal(true)} className="bg-black text-white px-4 py-2 rounded">
            + Add Menu Item
          </button>
        </div>

        {/* Loading */}
        {loading && (<p className="text-gray-500">Loading menu items...</p>)}

        {/* Empty State */}
        {!loading && menuItems.length === 0 && (
          <div className="bg-white border rounded-lg p-10 text-center">
            <h2 className="text-xl font-semibold">No menu items found</h2>
            <p className="text-gray-500 mt-2">Add your first menu item.</p>
          </div>
        )}

        {/* Menu Items */}
        {!loading && menuItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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