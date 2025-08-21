import { Plus, Upload, MessageCircle, BarChart3, Sparkles } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Ajouter une offre',
      description: 'Créer un nouveau forfait voyage',
      icon: Plus,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50',
      href: '/dashboard/packages/new'
    },
    {
      title: 'Importer photos',
      description: 'Ajouter des images à vos offres',
      icon: Upload,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      href: '/dashboard/media'
    },
    {
      title: 'Messages clients',
      description: '3 nouveaux messages',
      icon: MessageCircle,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
      href: '/dashboard/messages',
      badge: '3'
    },
    {
      title: 'Rapport mensuel',
      description: 'Générer le rapport de performance',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      href: '/dashboard/reports'
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200/50 shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Actions rapides</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className={`relative block p-4 rounded-xl bg-gradient-to-r ${action.bgGradient} border-2 border-orange-200/30 hover:border-orange-300/50 hover:shadow-lg transition-all duration-300 group hover:scale-105 overflow-hidden`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Moroccan tile accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500"></div>
              
              <div className="flex items-center space-x-4 relative z-10">
                <div className={`relative p-3 rounded-xl bg-gradient-to-br ${action.gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                  {action.badge && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                      {action.badge}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </div>

                {/* Moroccan arrow */}
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-3 h-3 border-r-2 border-b-2 border-white transform rotate-[-45deg]"></div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;