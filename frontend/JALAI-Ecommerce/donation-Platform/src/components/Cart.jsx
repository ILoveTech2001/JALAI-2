import React, { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const Cart = ({ open, items, onRemove, onClose, onCheckout }) => {
  const [showCheckout, setShowCheckout] = useState(false);
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
              <li key={item.id || idx} className="flex items-center gap-3 p-4">
                <img src={item.image} alt={item.name || item.title} className="w-12 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name || item.title}</div>
                  <div className="text-green-700 font-bold">{item.price?.toLocaleString()} XAF</div>
                  {item.quantity > 1 && (
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                  )}
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
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-green-600">
                {items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0).toLocaleString()} FCFA
              </span>
            </div>
            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cartItems={items}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => {
            // Clear cart and close modals
            items.forEach(item => onRemove(item));
            setShowCheckout(false);
            onClose();
            alert('Order placed successfully!');
          }}
        />
      )}
    </div>
  );
};

export default Cart;