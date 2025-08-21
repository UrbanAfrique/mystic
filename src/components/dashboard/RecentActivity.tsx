import { Clock, MapPin, Users, DollarSign, Star, Calendar } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'Nouvelle réservation - Circuit Désert',
      description: 'Famille Martin - 4 personnes',
      amount: '2,800 MAD',
      time: 'Il y a 2h',
      icon: MapPin,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      id: 2,
      type: 'review',
      title: 'Nouvel avis client',
      description: 'Sarah L. - 5 étoiles pour Riad Marrakech',
      time: 'Il y a 4h',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Paiement reçu',
      description: 'Forfait Atlas Mountains',
      amount: '1,500 MAD',
      time: 'Il y a 6h',
      icon: DollarSign,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Réservation annulée',
      description: 'Excursion Essaouira - Remboursement effectué',
      time: 'Il y a 1 jour',
      icon: Calendar,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-50'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200/50 shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Activité récente</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`relative p-4 rounded-xl bg-gradient-to-r ${activity.bgGradient} border border-orange-200/30 hover:shadow-lg transition-all duration-300 hover:scale-102 group overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Moroccan decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 transform rotate-45 translate-x-4 -translate-y-4"></div>
              </div>

              <div className="flex items-start space-x-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                  </div>
                </div>
                
                {activity.amount && (
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-lg">
                      {activity.amount}
                    </p>
                    <div className="w-2 h-2 bg-gradient-to-br from-green-400 to-green-500 rounded-full mt-1"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
            Voir toute l'activité
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;