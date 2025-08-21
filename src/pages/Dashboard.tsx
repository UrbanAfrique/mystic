import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsOverview from '@/components/dashboard/StatsOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import { Calendar, TrendingUp, Users, Star, MapPin, Crown } from 'lucide-react';

const Dashboard = () => {
  const upcomingEvents = [
    { name: 'Festival Gnawa', date: '15 Mars', location: 'Essaouira' },
    { name: 'Moussem des Roses', date: '20 Mars', location: 'Kelâa M\'Gouna' },
    { name: 'Festival des Amandiers', date: '25 Mars', location: 'Tafraoute' }
  ];

  const topDestinations = [
    { name: 'Marrakech', bookings: 45, trend: '+15%' },
    { name: 'Chefchaouen', bookings: 32, trend: '+8%' },
    { name: 'Essaouira', bookings: 28, trend: '+12%' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section with Moroccan Design */}
        <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
          {/* Moroccan geometric pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>

          {/* Decorative Moroccan elements */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-60"></div>
            <div className="w-6 h-6 bg-white/20 rounded-lg transform rotate-45"></div>
            <div className="w-4 h-4 bg-orange-300 rounded-sm"></div>
          </div>

          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">
                Ahlan wa Sahlan
              </h1>
              <p className="text-white/90 text-lg">
                Bienvenue dans votre espace vendeur MystigTravel
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity - 2 columns */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Quick Actions - 1 column */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Additional Moroccan-themed sections */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200/50 shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-b border-purple-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Événements à venir</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/30 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {event.date.split(' ')[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{event.name}</h4>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Destinations */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200/50 shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-b border-green-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Destinations populaires</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {topDestinations.map((dest, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{dest.name}</h4>
                      <p className="text-gray-600 text-sm">{dest.bookings} réservations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-600 font-semibold text-sm">{dest.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;