import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useScrollAnimation();

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout successful! Thank you for your purchase.');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover our amazing products and experiences to start your journey.
            </p>
            <a
              href="/products"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg mb-1">
                        {item.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2 capitalize">
                        {item.type}
                      </p>
                      {item.description && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-lg">
                        {item.price} {item.currency}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-6">
                <h2 className="font-bold text-foreground text-xl mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{getTotalPrice()} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">50 MAD</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="font-bold text-primary text-lg">
                        {getTotalPrice() + 50} MAD
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}</span>
                </button>

                <button
                  onClick={clearCart}
                  className="w-full mt-3 text-red-600 hover:text-red-700 transition-colors text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;