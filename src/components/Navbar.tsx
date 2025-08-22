import { useState, useEffect } from 'react';
import { Menu, X, Search, LogIn } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Products', href: '/products' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Accommodations', href: '#accommodations' },
    { name: 'Activities', href: '#activities' },
    { name: 'Gastronomy', href: '#gastronomy' },
    { name: 'Transport', href: '#transport' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-luxury border-b border-border/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="font-serif text-3xl font-light tracking-wider text-foreground hover:text-primary transition-colors duration-300">
              MystigTravel
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground font-light text-sm tracking-wide uppercase hover:text-primary transition-all duration-500 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
            
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="ml-4 p-2 text-foreground hover:text-primary transition-colors duration-300 relative group"
            >
              <Search className="w-5 h-5" />
              <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            </button>
            
            {/* Login Button */}
            <a
              href="/login"
              className="ml-4 flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium relative"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </a>
            
            {/* Cart Icon */}
            <a
              href="/cart"
              className="ml-2 flex items-center space-x-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-all duration-300 font-medium relative"
            >
              <div className="relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="/login"
              className="p-2 text-foreground hover:text-primary transition-colors duration-300"
            >
              <LogIn className="w-5 h-5" />
            </a>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-6 pb-4 border-t border-border/20 bg-background/95 backdrop-blur-sm">
            <div className="space-y-6">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-foreground font-light text-lg tracking-wide uppercase hover:text-primary transition-all duration-300 hover:translate-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;