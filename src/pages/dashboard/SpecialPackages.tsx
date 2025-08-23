import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star,
  X,
  Save,
  Percent
} from 'lucide-react';
import { SpecialPackage, City, Activity, Service } from '@/models/travel-programs';
import { 
  specialPackagesAPI, 
  citiesAPI, 
  activitiesAPI, 
  servicesAPI,
  hotelsAPI,
  transportAPI 
} from '@/services/travel-programs-api';

const defaultForm: Partial<SpecialPackage> = {
  title: '',
  description: '',
  cities: [],
  hotels: [],
  activities: [],
  services: [],
  transport: '',
  cityDates: {},
  basePrice: 0,
  discountPercent: 0,
  finalPrice: 0,
  currency: 'MAD',
  featured: false,
  status: 'DRAFT'
};

const SpecialPackages = () => {
  const [packages, setPackages] = useState<SpecialPackage[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [transports, setTransports] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SpecialPackage | null>(null);
  const [form, setForm] = useState<Partial<SpecialPackage>>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [packagesData, citiesData, activitiesData, servicesData, hotelsData, transportsData] = await Promise.all([
        specialPackagesAPI.getAll(),
        citiesAPI.getAll(),
        activitiesAPI.getAll(),
        servicesAPI.getAll(),
        hotelsAPI.getAll(),
        transportAPI.getAll()
      ]);

      setPackages(packagesData);
      setCities(citiesData);
      setActivities(activitiesData);
      setServices(servicesData);
      setHotels(hotelsData.content || hotelsData || []);
      setTransports(transportsData.items || transportsData || []);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const calculateBasePrice = (): number => {
    let total = 0;

    // Hotels cost
    form.hotels?.forEach(hotelId => {
      const hotel = hotels.find(h => h.id === hotelId);
      if (hotel) {
        const totalDays = Object.values(form.cityDates || {}).reduce((sum, dates) => sum + dates.duration, 0);
        total += (hotel.basePrice || hotel.price || 0) * totalDays;
      }
    });

    // Activities cost
    form.activities?.forEach(activityId => {
      const activity = activities.find(a => a.id === activityId);
      if (activity) {
        total += activity.price || 0;
      }
    });

    // Services cost
    form.services?.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        total += service.price || 0;
      }
    });

    // Transport cost
    if (form.transport) {
      const transport = transports.find(t => t.id === form.transport);
      if (transport) {
        const totalDays = Object.values(form.cityDates || {}).reduce((sum, dates) => sum + dates.duration, 0);
        total += (transport.price || 0) * totalDays;
      }
    }

    return total;
  };

  const calculateFinalPrice = (): number => {
    const basePrice = calculateBasePrice();
    const discount = basePrice * (form.discountPercent || 0) / 100;
    return basePrice - discount;
  };

  const updateForm = (field: string, value: any) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate prices
      updated.basePrice = calculateBasePrice();
      updated.finalPrice = calculateFinalPrice();
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const packageData = {
        ...form,
        basePrice: calculateBasePrice(),
        finalPrice: calculateFinalPrice()
      };

      if (editing) {
        await specialPackagesAPI.update(editing.id, packageData);
      } else {
        await specialPackagesAPI.create(packageData);
      }

      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchData();
    } catch (err) {
      setError('Failed to save package');
    }
  };

  const handleEdit = (pkg: SpecialPackage) => {
    setEditing(pkg);
    setForm(pkg);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce forfait ?')) {
      try {
        await specialPackagesAPI.delete(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete package');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800';
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'ARCHIVED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold mb-2">
                  Plan B - Offres Spéciales
                </h1>
                <p className="text-white/90 text-lg">
                  Créez des forfaits exclusifs avec remises
                </p>
              </div>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Créer un forfait</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editing ? 'Modifier le forfait' : 'Créer un forfait spécial'}
                  </h2>
                  <button
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                    <input
                      type="text"
                      value={form.title || ''}
                      onChange={(e) => updateForm('title', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
                    <select
                      value={form.status || 'DRAFT'}
                      onChange={(e) => updateForm('status', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="DRAFT">Brouillon</option>
                      <option value="PUBLISHED">Publié</option>
                      <option value="ARCHIVED">Archivé</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={form.description || ''}
                    onChange={(e) => updateForm('description', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    rows={3}
                    required
                  />
                </div>

                {/* Cities Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Villes *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {cities.map(city => (
                      <div key={city.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`pkg-city-${city.id}`}
                          checked={form.cities?.includes(city.id) || false}
                          onChange={(e) => {
                            const currentCities = form.cities || [];
                            const newCities = e.target.checked
                              ? [...currentCities, city.id]
                              : currentCities.filter(id => id !== city.id);
                            updateForm('cities', newCities);
                          }}
                          className="w-4 h-4 text-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`pkg-city-${city.id}`} className="text-sm text-gray-700 cursor-pointer">
                          {city.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix de base (calculé)</label>
                    <input
                      type="text"
                      value={`${calculateBasePrice()} MAD`}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Remise % *</label>
                    <input
                      type="number"
                      value={form.discountPercent || 0}
                      onChange={(e) => updateForm('discountPercent', Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix final (calculé)</label>
                    <input
                      type="text"
                      value={`${calculateFinalPrice()} MAD`}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl bg-green-50 cursor-not-allowed font-bold text-green-600"
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Devise</label>
                    <select
                      value={form.currency || 'MAD'}
                      onChange={(e) => updateForm('currency', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="MAD">MAD</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mis en avant</label>
                    <select
                      value={form.featured ? 'true' : 'false'}
                      onChange={(e) => updateForm('featured', e.target.value === 'true')}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="false">Non</option>
                      <option value="true">Oui</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editing ? 'Enregistrer' : 'Créer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Packages List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">Forfaits spéciaux</h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-500">Chargement...</p>
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun forfait spécial trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{pkg.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                          {pkg.status}
                        </span>
                      </div>
                      {pkg.featured && (
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                          <Star className="w-3 h-3 inline mr-1" />
                          FEATURED
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {pkg.cities.length} villes incluses
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {Object.values(pkg.cityDates).reduce((total, dates) => total + dates.duration, 0)} jours
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 text-sm">Prix de base:</span>
                        <span className="text-gray-600 line-through">{pkg.basePrice} {pkg.currency}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-600 text-sm font-semibold">Remise {pkg.discountPercent}%:</span>
                        <span className="text-green-600 font-semibold">
                          -{(pkg.basePrice * pkg.discountPercent / 100).toFixed(0)} {pkg.currency}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-purple-200 pt-2">
                        <span className="font-bold text-gray-800">Prix final:</span>
                        <span className="text-xl font-bold text-purple-600">
                          {pkg.finalPrice} {pkg.currency}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SpecialPackages;