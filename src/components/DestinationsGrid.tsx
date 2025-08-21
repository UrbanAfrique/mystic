import chefchaouenImage from '@/assets/chefchaouen.jpg';
import marrakechImage from '@/assets/marrakech.jpg';
import essaouiraImage from '@/assets/essaouira.jpg';
import desertImage from '@/assets/desert-sunset.jpg';
import atlasImage from '@/assets/atlas-mountains.jpg';

const DestinationsGrid = () => {
  const destinations = [
    {
      image: desertImage,
      title: 'Marrakech',
      subtitle: 'La Ville Rouge',
      description: 'Palais somptueux, jardins secrets et souks animés au cœur de la ville impériale',
      highlights: ['Palais de la Bahia', 'Jardins Majorelle', 'Place Jemaa el-Fna', 'Souks traditionnels']
    },
    {
      image: desertImage,
      title: 'Désert du Sahara',
      subtitle: 'Merzouga & Erg Chebbi',
      description: 'Dunes dorées, nuits étoilées et traditions nomades dans l\'immensité du désert',
      highlights: ['Méharée au coucher du soleil', 'Bivouac de luxe', 'Musique gnawa', 'Lever de soleil sur les dunes']
    },
    {
      image: essaouiraImage,
      title: 'Essaouira',
      subtitle: 'La Cité des Vents',
      description: 'Port fortifié, plages sauvages et artisanat authentique face à l\'Atlantique',
      highlights: ['Médina UNESCO', 'Port de pêche', 'Ateliers d\'artisans', 'Sports nautiques']
    },
    {
      image: chefchaouenImage,
      title: 'Chefchaouen',
      subtitle: 'Perle du Rif',
      description: 'Ruelles azur, terrasses fleuries et panoramas montagneux dans cette perle berbère',
      highlights: ['Architecture bleue unique', 'Artisanat local', 'Randonnées en montagne', 'Cascades d\'Akchour']
    },
    {
      image: atlasImage,
      title: 'Montagnes de l\'Atlas',
      subtitle: 'Toubkal & Vallées',
      description: 'Sommets enneigés, villages berbères et vallées verdoyantes pour les amoureux de nature',
      highlights: ['Mont Toubkal 4167m', 'Villages berbères', 'Cascades d\'Ouzoud', 'Vallée de l\'Ourika']
    },
    {
      image: marrakechImage,
      title: 'Fès',
      subtitle: 'Capitale Spirituelle',
      description: 'Médina millénaire, université Al Quaraouiyine et artisanat d\'art dans la plus ancienne ville impériale',
      highlights: ['Médina UNESCO', 'Université Al Quaraouiyine', 'Tanneries Chouara', 'Palais royal']
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Destinations Recommandées
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des lieux d'exception soigneusement sélectionnés pour leur beauté authentique et leur richesse culturelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-luxury hover:shadow-luxury-hover transition-all duration-500 group-hover:scale-105">
                <div className="aspect-[4/3] w-full">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-1">
                    {destination.title}
                  </h3>
                  <p className="text-sm opacity-80 mb-2">
                    {destination.subtitle}
                  </p>
                  <p className="text-sm opacity-90">
                    {destination.description}
                  </p>
                  <div className="space-y-1">
                    {destination.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-xs opacity-80">
                        <div className="w-1 h-1 bg-white rounded-full mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;