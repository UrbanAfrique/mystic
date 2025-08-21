import { Users, Award, Globe, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Qui Sommes-Nous ?
            </h2>
            <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              MystigTravel est une agence de voyage spécialisée dans la découverte authentique du Maroc, 
              offrant des expériences uniques et personnalisées depuis plus de 15 ans.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="fade-in-up">
              <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
                Notre Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Nous nous engageons à révéler la beauté authentique du Maroc à travers des voyages 
                sur mesure qui respectent la culture locale et l'environnement. Notre équipe passionnée 
                vous accompagne dans la découverte des trésors cachés du royaume chérifien.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                De la médina animée de Marrakech aux dunes dorées du Sahara, en passant par les 
                montagnes majestueuses de l'Atlas, nous créons des expériences inoubliables qui 
                marquent l'âme de nos voyageurs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 fade-in-up">
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">15+</h4>
                <p className="text-muted-foreground">Années d'expérience</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">5000+</h4>
                <p className="text-muted-foreground">Voyageurs satisfaits</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">50+</h4>
                <p className="text-muted-foreground">Destinations uniques</p>
              </div>
              
              <div className="text-center p-6 bg-luxury-beige rounded-xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-2xl text-foreground mb-2">98%</h4>
                <p className="text-muted-foreground">Taux de satisfaction</p>
              </div>
            </div>
          </div>

          <div className="bg-luxury-beige rounded-2xl p-8 fade-in-up">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
              Nos Valeurs
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-3">Authenticité</h4>
                <p className="text-muted-foreground">
                  Nous privilégions les expériences authentiques qui respectent 
                  la culture et les traditions marocaines.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-3">Excellence</h4>
                <p className="text-muted-foreground">
                  Chaque détail de votre voyage est soigneusement orchestré 
                  pour vous offrir une expérience d'exception.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-foreground mb-3">Durabilité</h4>
                <p className="text-muted-foreground">
                  Nous nous engageons pour un tourisme responsable qui préserve 
                  l'environnement et soutient les communautés locales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;