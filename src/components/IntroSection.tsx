const IntroSection = () => {
  return (
    <section className="py-32 bg-luxury-beige">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-foreground leading-none">
            Votre Voyage, Notre Passion
          </h2>
          <div className="w-32 h-px bg-primary mx-auto mb-12"></div>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-luxury-beige rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Notre Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Plus de 15 années d'expérience dans l'organisation de voyages sur mesure au Maroc, 
                avec une connaissance approfondie de chaque région.
              </p>
            </div>
            <div className="bg-luxury-beige rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Notre Approche</h3>
              <p className="text-muted-foreground leading-relaxed">
                Chaque voyage est unique et personnalisé selon vos envies, votre budget et vos centres d'intérêt, 
                pour une expérience authentique et mémorable.
              </p>
            </div>
            <div className="bg-luxury-beige rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">Notre Engagement</h3>
              <p className="text-muted-foreground leading-relaxed">
                Un service d'excellence avec accompagnement 24h/7j, guides francophones expérimentés 
                et partenaires locaux soigneusement sélectionnés.
              </p>
            </div>
          </div>
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;