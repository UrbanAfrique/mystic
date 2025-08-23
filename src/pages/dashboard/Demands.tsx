import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Clock, 
  Edit, 
  Trash2, 
  Send, 
  ChevronDown, 
  ChevronUp,
  X,
  Eye,
  DollarSign
} from 'lucide-react';
import { ClientDemand, DemandStatus, City, Activity } from '@/models/travel-programs';
import { demandsAPI, citiesAPI, activitiesAPI, hotelsAPI, transportAPI, servicesAPI } from '@/services/travel-programs-api';

const Demands = () => {
  const [demands, setDemands] = useState<ClientDemand[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [transports, setTransports] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDemand, setExpandedDemand] = useState<string | null>(null);
  const [editingDemand, setEditingDemand] = useState<ClientDemand | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [demandsData, citiesData, activitiesData, hotelsData, transportsData, servicesData] = await Promise.all([
        demandsAPI.getAll(),
        citiesAPI.getAll(),
        activitiesAPI.getAll(),
        hotelsAPI.getAll(),
        transportAPI.getAll(),
        servicesAPI.getAll()
      ]);

      setDemands(demandsData);
      setCities(citiesData);
      setActivities(activitiesData);
      setHotels(hotelsData.content || hotelsData || []);
      setTransports(transportsData.items || transportsData || []);
      setServices(servicesData);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const updateDemandStatus = async (demandId: string, status: DemandStatus) => {
    try {
      await demandsAPI.update(demandId, { status });
      fetchData();
    } catch (err) {
      setError('Failed to update demand status');
    }
  };

  const updateCitySelection = async (demandId: string, cityId: string, field: string, value: any) => {
    const demand = demands.find(d => d.id === demandId);
    if (!demand) return;

    const updatedCities = demand.cities.map(city => 
      city.cityId === cityId ? { ...city, [field]: value } : city
    );

    // Recalculate total price
    const totalPrice = calculateTotalPrice(updatedCities);

    try {
      await demandsAPI.update(demandId, { 
        cities: updatedCities,
        totalPrice 
      });
      fetchData();
    } catch (err) {
      setError('Failed to update city selection');
    }
  };

  const calculateTotalPrice = (citySelections: any[]): number => {
    return citySelections.reduce((total, selection) => {
      const hotel = hotels.find(h => h.id === selection.hotelId);
      const transport = transports.find(t => t.id === selection.transportId);
      const selectedServices = services.filter(s => selection.services?.includes(s.id));
      const selectedActivities = activities.filter(a => selection.activities?.includes(a.id));

      const hotelCost = hotel ? (hotel.basePrice || hotel.price || 0) * selection.duration : 0;
      const transportCost = transport ? (transport.price || 0) * selection.duration : 0;
      const servicesCost = selectedServices.reduce((sum, service) => sum + (service.price || 0), 0);
      const activitiesCost = selectedActivities.reduce((sum, activity) => sum + (activity.price || 0), 0);

      return total + hotelCost + transportCost + servicesCost + activitiesCost;
    }, 0);
  };

  const handleSendEmail = async (demandId: string) => {
    try {
      await demandsAPI.sendEmail(demandId);
      alert('Email envoyé avec succès!');
    } catch (err) {
      setError('Failed to send email');
    }
  };

  const handleDelete = async (demandId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      try {
        await demandsAPI.delete(demandId);
        fetchData();
      } catch (err) {
        setError('Failed to delete demand');
      }
    }
  };

  const getStatusColor = (status: DemandStatus) => {
    switch (status) {
      case DemandStatus.PENDING: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case DemandStatus.VALIDATED: return 'bg-blue-100 text-blue-800 border-blue-200';
      case DemandStatus.SENT: return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCityName = (cityId: string) => {
    return cities.find(c => c.id === cityId)?.name || 'Ville inconnue';
  };

  const getActivityName = (activityId: string) => {
    return activities.find(a => a.id === activityId)?.name || 'Activité inconnue';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative z-10 flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold mb-2">
                Demandes Clients
              </h1>
              <p className="text-white/90 text-lg">
                Gérez les demandes de programmes personnalisés
              </p>
            </div>
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

        {/* Demands Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">Liste des demandes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Voyageurs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Période</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Statut</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Prix Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      Chargement...
                    </td>
                  </tr>
                ) : demands.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      Aucune demande trouvée
                    </td>
                  </tr>
                ) : (
                  demands.map((demand) => (
                    <>
                      <tr key={demand.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {demand.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-800">{demand.clientName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-3 h-3 mr-1" />
                              {demand.email}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-3 h-3 mr-1" />
                              {demand.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-1" />
                            {demand.numberOfTravelers}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            {demand.tripPeriod} jours
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={demand.status}
                            onChange={(e) => updateDemandStatus(demand.id, e.target.value as DemandStatus)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(demand.status)}`}
                          >
                            {Object.values(DemandStatus).map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-green-600 font-bold">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {demand.totalPrice?.toFixed(0) || '0'} MAD
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setExpandedDemand(
                                expandedDemand === demand.id ? null : demand.id
                              )}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            >
                              {expandedDemand === demand.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleSendEmail(demand.id)}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(demand.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expandable Details */}
                      {expandedDemand === demand.id && (
                        <tr>
                          <td colSpan={7} className="px-6 py-6 bg-gray-50">
                            <div className="space-y-4">
                              <h4 className="font-bold text-gray-800 mb-4">Détails du programme</h4>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full border border-gray-200 rounded-lg">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ville</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Dates</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Durée</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Activités</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Hôtel</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Transport</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Services</th>
                                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prix</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {demand.cities.map((citySelection, index) => {
                                      const city = cities.find(c => c.id === citySelection.cityId);
                                      const selectedActivities = activities.filter(a => 
                                        citySelection.activities.includes(a.id)
                                      );
                                      const cityHotels = hotels.filter(h => h.city === city?.name);
                                      const cityTransports = transports.filter(t => t.city === city?.name);

                                      return (
                                        <tr key={index} className="hover:bg-gray-50">
                                          <td className="px-4 py-3">
                                            <div className="font-medium text-gray-800">{city?.name}</div>
                                          </td>
                                          <td className="px-4 py-3">
                                            <div className="text-sm text-gray-600">
                                              {new Date(citySelection.startDate).toLocaleDateString('fr-FR')} - 
                                              {new Date(citySelection.endDate).toLocaleDateString('fr-FR')}
                                            </div>
                                          </td>
                                          <td className="px-4 py-3">
                                            <div className="text-sm text-gray-600">{citySelection.duration} jours</div>
                                          </td>
                                          <td className="px-4 py-3">
                                            <div className="space-y-1">
                                              {selectedActivities.map(activity => (
                                                <span key={activity.id} className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs mr-1">
                                                  {activity.name}
                                                </span>
                                              ))}
                                            </div>
                                          </td>
                                          <td className="px-4 py-3">
                                            <select
                                              value={citySelection.hotelId || ''}
                                              onChange={(e) => updateCitySelection(demand.id, citySelection.cityId, 'hotelId', e.target.value)}
                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                              <option value="">Sélectionner un hôtel</option>
                                              {cityHotels.map(hotel => (
                                                <option key={hotel.id} value={hotel.id}>
                                                  {hotel.name} ({hotel.basePrice || hotel.price || 0} MAD/nuit)
                                                </option>
                                              ))}
                                            </select>
                                          </td>
                                          <td className="px-4 py-3">
                                            <select
                                              value={citySelection.transportId || ''}
                                              onChange={(e) => updateCitySelection(demand.id, citySelection.cityId, 'transportId', e.target.value)}
                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                              <option value="">Sélectionner transport</option>
                                              {cityTransports.map(transport => (
                                                <option key={transport.id} value={transport.id}>
                                                  {transport.name} ({transport.price || 0} MAD)
                                                </option>
                                              ))}
                                            </select>
                                          </td>
                                          <td className="px-4 py-3">
                                            <select
                                              multiple
                                              value={citySelection.services || []}
                                              onChange={(e) => {
                                                const selectedServices = Array.from(e.target.selectedOptions, option => option.value);
                                                updateCitySelection(demand.id, citySelection.cityId, 'services', selectedServices);
                                              }}
                                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                              size={3}
                                            >
                                              {services.map(service => (
                                                <option key={service.id} value={service.id}>
                                                  {service.name} ({service.price} MAD)
                                                </option>
                                              ))}
                                            </select>
                                          </td>
                                          <td className="px-4 py-3">
                                            <div className="text-sm font-bold text-green-600">
                                              {citySelection.price?.toFixed(0) || '0'} MAD
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <div className="text-lg font-bold text-gray-800">
                                  Prix Total: {demand.totalPrice?.toFixed(0) || '0'} MAD
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleSendEmail(demand.id)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                  >
                                    <Send className="w-4 h-4" />
                                    <span>Envoyer par email</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Demands;