import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Star } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: 'Revenus ce mois',
      value: '45,230 MAD',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200/50'
    },
    {
      title: 'Réservations',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200/50'
    },
    {
      title: 'Clients actifs',
      value: '89',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200/50'
    },
    {
      title: 'Note moyenne',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl p-6 border-2 ${stat.borderColor} shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group overflow-hidden`}
        >
          {/* Moroccan geometric pattern */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10-10v20h20V10H30z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                {stat.title}
              </p>
            </div>

            {/* Decorative Moroccan element */}
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;