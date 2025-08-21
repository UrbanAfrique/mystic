import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Filter, MapPin, Star, Clock, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useScrollAnimation();

  const categories = [
    { id: 'all', name: 'Tous les produits', count: 24 },
    { id: 'hotels', name: 'Hôtels & Riads', count: 8 },
    { id: 'transport', name: 'Transport', count: 6 },
    { id: 'packages', name: 'Forfaits', count: 5 },
    { id: 'events', name: 'Événements', count: 3 },
    { id: 'food', name: 'Gastronomie', count: 2 }
  ];

  const products = [
    {
      id: 1,
      category: 'hotels',
      name: 'Riad Atlas Premium',
      location: 'Marrakech, Médina',
      price: '1,200 MAD/nuit',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      description: 'Riad de luxe au cœur de la médina avec spa traditionnel',
      features: ['Spa', 'Piscine', 'Restaurant', 'WiFi']
    },
    {
      id: 2,
      category: 'transport',
      name: 'Bus Premium Marrakech-Casablanca',
      location: 'Marrakech → Casablanca',
      price: '120 MAD',
      rating: 4.6,
      reviews: 89,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Transport confortable avec WiFi et climatisation',
      features: ['WiFi', 'Climatisation', 'Sièges inclinables']
    },
    {
      id: 3,
      category: 'packages',
      name: 'Circuit Impérial 7 jours',
      location: 'Marrakech, Fès, Rabat',
      price: '4,500 MAD',
      rating: 4.9,
      reviews: 67,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Découvrez les villes impériales du Maroc',
      features: ['Guide', 'Hébergement', 'Transport', 'Repas']
    },
    {
      id: 4,
      category: 'events',
      name: 'Festival Gnawa Essaouira',
      location: 'Essaouira',
      price: '150 MAD',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      description: 'Festival de musique Gnawa avec artistes internationaux',
      features: ['Concert', 'Artistes', 'Ambiance', 'Culture']
    },
    {
      id: 5,
      category: 'food',
      name: 'Cours de Cuisine Traditionnelle',
      location: 'Riad Marrakech',
      price: '350 MAD',
      rating: 4.8,
      reviews: 45,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      description: 'Apprenez à préparer un tajine authentique',
      features: ['Ingrédients', 'Recettes', 'Dégustation', 'Certificat']
    },
    {
      id: 6,
      category: 'hotels',
      name: 'Hotel Sahara Luxury',
      location: 'Merzouga, Désert',
      price: '2,800 MAD/nuit',
      rating: 4.9,
      reviews: 78,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      description: 'Hôtel de luxe au cœur du désert du Sahara',
      features: ['Vue désert', 'Excursions', 'Restaurant', 'Spa']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-ivory via-luxury-beige to-luxury-sand">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Nos Produits & Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Découvrez notre sélection d'expériences authentiques au Maroc
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un produit, une destination..."
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
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Products Grid */}
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
                      <span className="text-sm font-medium">{product.rating}</span>
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <p className="text-xs text-muted-foreground">{product.reviews} avis</p>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12 fade-in-up">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
              Voir plus de produits
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;