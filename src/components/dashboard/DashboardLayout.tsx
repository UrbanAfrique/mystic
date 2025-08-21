import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Hotel, 
  Calendar, 
  Car, 
  Package, 
  Palette, 
  UtensilsCrossed,
  Ticket,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Building,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  Crown,
  Bell,
  Search
} from 'lucide-react';
import { getCurrentUser, isAuthenticated, logout as doLogout } from "@/services/auth";
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  businessInfo: {
    companyName: string | null;
    license: string | null;
    specialties: string[];
    description: string | null;
  };
  emailVerified: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      getCurrentUser()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          // Handle error
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      navigate('/login');
    }
  }, [navigate]);

  const menuItems = [
    { icon: Home, label: 'Tableau de bord', href: '/dashboard', color: 'from-blue-500 to-blue-600' },
    { icon: BarChart3, label: 'Statistiques', href: '/dashboard/statistics', color: 'from-green-500 to-green-600' },
    { icon: Calendar, label: 'Événements', href: '/dashboard/events', color: 'from-purple-500 to-purple-600' },
    { icon: Car, label: 'Transport', href: '/dashboard/transport', color: 'from-orange-500 to-orange-600' },
    { icon: Package, label: 'Forfaits', href: '/dashboard/packages', color: 'from-pink-500 to-pink-600' },
    { icon: Palette, label: 'Artisanat', href: '/dashboard/artisan', color: 'from-indigo-500 to-indigo-600' },
    { icon: UtensilsCrossed, label: 'Gastronomie', href: '/dashboard/food', color: 'from-red-500 to-red-600' },
    { icon: Ticket, label: 'Billetterie', href: '/dashboard/tickets', color: 'from-yellow-500 to-yellow-600' },
  ];

  const handleLogout = () => {
    doLogout();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadge = (role: string) => {
    const roleMap: { [key: string]: { text: string; color: string; icon: React.ReactNode } } = {
      'ROLE_SELLER': { 
        text: 'Vendeur', 
        color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
        icon: <Building className="w-3 h-3" />
      },
      'ROLE_ADMIN': { 
        text: 'Administrateur', 
        color: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
        icon: <Crown className="w-3 h-3" />
      },
      'ROLE_USER': { 
        text: 'Utilisateur', 
        color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
        icon: <User className="w-3 h-3" />
      }
    };

    return roleMap[role] || { text: role, color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white', icon: <User className="w-3 h-3" /> };
  };

  const isActiveItem = (href: string) => {
    return location.pathname === href;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-red-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Moroccan Pattern Overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-orange-900 via-red-900 to-yellow-900 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Moroccan Geometric Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10-10v20h20V10H30zm-20 0a10 10 0 1 0 20 0 10 10 0 0 0-20 0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="flex flex-col h-full relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-white rounded-sm opacity-90"></div>
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-white">
                  MystigTravel
                </h1>
                <p className="text-orange-200 text-xs">Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/20">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {getUserInitials(user.name)}
                      </span>
                    )}
                  </div>
                  {user.emailVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <BadgeCheck className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{user.name}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getRoleBadge(user.role).color}`}>
                      {getRoleBadge(user.role).icon}
                      <span className="ml-1">{getRoleBadge(user.role).text}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                {user.businessInfo.companyName && (
                  <div className="flex items-center text-orange-200">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="truncate">{user.businessInfo.companyName}</span>
                  </div>
                )}
                
                <div className="flex items-center text-orange-200">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{user.email}</span>
                </div>
                
                {user.phone && (
                  <div className="flex items-center text-orange-200">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const active = isActiveItem(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                    active
                      ? 'bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20'
                      : 'text-orange-200 hover:text-white hover:bg-white/10 hover:shadow-md'
                  }`}
                >
                  {/* Moroccan accent line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color} transition-all duration-300 ${
                    active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></div>
                  
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} shadow-lg transition-transform duration-300 ${
                    !active ? 'group-hover:scale-110' : ''
                  }`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Moroccan decorative element */}
                  {active && (
                    <div className="absolute right-4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-white/20 space-y-2">
            <button
              onClick={() => {
                navigate('/dashboard/settings');
                setSidebarOpen(false);
              }}
              className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActiveItem('/dashboard/settings')
                  ? 'bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg backdrop-blur-sm border border-white/20'
                  : 'text-orange-200 hover:text-white hover:bg-white/10 hover:shadow-md'
              }`}
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Paramètres</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-orange-200 hover:text-white hover:bg-red-500/20 transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar with Moroccan design */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-orange-200/50 shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                {/* Moroccan decorative elements */}
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
                  </div>
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-sm rotate-45"></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-orange-200/50">
                  <Search className="w-4 h-4 text-orange-600" />
                  <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="bg-transparent border-none outline-none text-sm placeholder-orange-400 w-32"
                  />
                </div>
                
                {/* Notifications */}
                <button className="relative p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-200/50 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>
                
                {user && (
                  <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-orange-200/50">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getRoleBadge(user.role).color}`}>
                          {getRoleBadge(user.role).icon}
                          <span className="ml-1">{getRoleBadge(user.role).text}</span>
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/30">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-medium">
                          {getUserInitials(user.name)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content with Moroccan styling */}
        <main className="p-6 min-h-screen relative">
          {/* Moroccan tile pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.3'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2L74 40h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;