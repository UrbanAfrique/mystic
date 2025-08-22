import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Star } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200/50'
    },
    {
      title: 'Bookings',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200/50'
    },
    {
      title: 'Active Clients',
      value: '89',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200/50'
    },
    {
      title: 'Average Rating',
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
          className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-3xl p-8 border-2 ${stat.borderColor} shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden`}
        >
          {/* Moroccan geometric pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626'%3E%3Cpath d='M24 24c0-6.6-5.4-12-12-12s-12 5.4-12 12 5.4 12 12 12 12-5.4 12-12zm12-12v24h24V12H36z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                <span className="text-base">{stat.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-base font-semibold">
                {stat.title}
              </p>
            </div>

            {/* Decorative Moroccan element */}
            <div className="absolute bottom-3 right-3 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;