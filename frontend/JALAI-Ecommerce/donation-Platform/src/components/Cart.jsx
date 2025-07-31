import React from "react";

const Cart = ({ open, items, onRemove, onClose, onCheckout }) => {
  if (!open) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-xl shadow-lg w-80 max-h-[80vh] overflow-y-auto border border-gray-200">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-bold">Your Cart</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
      </div>
      {items.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No items in cart.</div>
      ) : (
        <>
          <ul className="divide-y">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 p-4">
                <img src={item.image} alt={item.title} className="w-12 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-green-700 font-bold">{item.price?.toLocaleString()} XAF</div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => onRemove(item)}
                  title="Remove"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t">
            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;