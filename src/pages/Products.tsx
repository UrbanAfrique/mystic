import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, MapPin, Star, Clock, Users, ShoppingCart } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCart } from '@/contexts/CartContext';
import { hotelsAPI, packagesAPI, transportAPI, foodAPI, artisanAPI, eventsAPI } from '@/services/api';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  useScrollAnimation();

  const categories = [
    { id: 'all', name: 'All Products', count: 0 },
    { id: 'hotels', name: 'Hotels & Riads', count: 0 },
    { id: 'transport', name: 'Transport', count: 0 },
    { id: 'packages', name: 'Packages', count: 0 },
    { id: 'events', name: 'Events', count: 0 },
    { id: 'food', name: 'Gastronomy', count: 0 },
    { id: 'artisan', name: 'Artisan Crafts', count: 0 }
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let allProducts: any[] = [];

      if (selectedCategory === 'all' || selectedCategory === 'hotels') {
        const hotels = await hotelsAPI.getAll();
        const hotelProducts = (hotels.content || hotels || []).map((hotel: any) => ({
          ...hotel,
          category: 'hotels',
          type: 'hotel',
          location: `${hotel.city}, ${hotel.region || 'Morocco'}`,
          price: hotel.basePrice || 0,
          currency: hotel.currency || 'MAD',
          image: hotel.images?.[0]?.url || 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
        }));
        allProducts = [...allProducts, ...hotelProducts];
      }

      if (selectedCategory === 'all' || selectedCategory === 'packages') {
        const packages = await packagesAPI.getAll();
        const packageProducts = (packages.content || packages || []).map((pkg: any) => ({
          ...pkg,
          category: 'packages',
          type: 'package',
          location: 'Morocco',
          price: pkg.basePrice || pkg.price || 0,
          currency: pkg.currency || 'MAD',
          image: pkg.images?.[0]?.url || 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
        }));
        allProducts = [...allProducts, ...packageProducts];
      }

      if (selectedCategory === 'all' || selectedCategory === 'transport') {
        const transports = await transportAPI.getAll();
        const transportProducts = (transports.items || transports || []).map((transport: any) => ({
          ...transport,
          category: 'transport',
          type: 'transport',
          location: transport.city || 'Morocco',
          price: transport.price || 0,
          currency: transport.currency || 'MAD',
          image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
        }));
        allProducts = [...allProducts, ...transportProducts];
      }

      if (selectedCategory === 'all' || selectedCategory === 'food') {
        const foods = await foodAPI.getAll();
        const foodProducts = (foods.content || foods || []).map((food: any) => ({
          ...food,
          category: 'food',
          type: 'food',
          location: food.location || 'Morocco',
          price: food.price || 0,
          currency: food.currency || 'MAD',
          image: food.images?.[0]?.url || 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
        }));
        allProducts = [...allProducts, ...foodProducts];
      }

      if (selectedCategory === 'all' || selectedCategory === 'artisan') {
        const artisans = await artisanAPI.getAll();
        const artisanProducts = (artisans.items || artisans || []).map((artisan: any) => ({
          ...artisan,
          category: 'artisan',
          type: 'artisan',
          location: artisan.origin || 'Morocco',
          price: artisan.price || 0,
          currency: artisan.currency || 'MAD',
          image: artisan.images?.[0]?.url || 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
        }));
        allProducts = [...allProducts, ...artisanProducts];
      }

      if (selectedCategory === 'all' || selectedCategory === 'events') {
        const events = await eventsAPI.getAll();
        const eventProducts = (events.content || events || []).map((event: any) => ({
          ...event,
          category: 'events',
          type: 'event',
          location: `${event.city}, ${event.venue}`,
          price: event.tickets?.[0]?.price || 0,
          currency: event.tickets?.[0]?.currency || 'MAD',
          image: event.images?.[0]?.url || 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
        }));
        allProducts = [...allProducts, ...eventProducts];
      }

      setProducts(allProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      type: product.type,
      image: product.image,
      description: product.description
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-ivory via-luxury-beige to-luxury-sand">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Products & Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our selection of authentic experiences in Morocco
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a product, destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background/80 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Products */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-up">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background border border-border hover:border-primary hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-background rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{product.rating || '4.5'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                          {product.name}
                        </h3>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {product.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-lg font-bold text-primary">
                          {product.price} {product.currency}
                        </span>
                        <p className="text-xs text-muted-foreground capitalize">{product.type}</p>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12 fade-in-up">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
              View More Products
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;