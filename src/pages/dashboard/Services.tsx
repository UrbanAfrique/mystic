import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Trash2, Briefcase, DollarSign, User, X, Save } from 'lucide-react';
import { Service, ServiceType } from '@/models/travel-programs';
import { servicesAPI } from '@/services/travel-programs-api';

const defaultForm: Partial<Service> = {
  name: '',
  type: ServiceType.GUIDE,
  provider: '',
  price: 0,
  currency: 'MAD',
  description: ''
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await servicesAPI.getAll();
      setServices(data);
    } catch (err) {
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await servicesAPI.update(editing.id, form);
      } else {
        await servicesAPI.create(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchServices();
    } catch (err) {
      setError('Failed to save service');
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setForm(service);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        await servicesAPI.delete(id);
        fetchServices();
      } catch (err) {
        setError('Failed to delete service');
      }
    }
  };

  const getTypeColor = (type: ServiceType) => {
    switch (type) {
      case ServiceType.GUIDE: return 'bg-blue-100 text-blue-800';
      case ServiceType.TRANSPORT_GUIDE: return 'bg-green-100 text-green-800';
      case ServiceType.CULTURAL_VISIT: return 'bg-purple-100 text-purple-800';
      case ServiceType.ADVENTURE_ACTIVITY: return 'bg-orange-100 text-orange-800';
      case ServiceType.WELLNESS: return 'bg-pink-100 text-pink-800';
      case ServiceType.PHOTOGRAPHY: return 'bg-indigo-100 text-indigo-800';
      case ServiceType.CULINARY: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Services
            </h1>
            <p className="text-muted-foreground">
              Ajoutez et gérez les services avec prestataires
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un service</span>
          </button>
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
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editing ? 'Modifier le service' : 'Ajouter un service'}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                    <input
                      type="text"
                      value={form.name || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                    <select
                      value={form.type || ServiceType.GUIDE}
                      onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value as ServiceType }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    >
                      {Object.values(ServiceType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prestataire *</label>
                  <input
                    type="text"
                    value={form.provider || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={form.description || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix *</label>
                    <input
                      type="number"
                      value={form.price || 0}
                      onChange={(e) => setForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Devise</label>
                    <select
                      value={form.currency || 'MAD'}
                      onChange={(e) => setForm(prev => ({ ...prev, currency: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    >
                      <option value="MAD">MAD</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
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
                    className="flex items-center space-x-2 px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editing ? 'Enregistrer' : 'Créer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-green-100 to-blue-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">Liste des services</h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <p className="mt-4 text-gray-500">Chargement...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun service trouvé</p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{service.name}</h3>
                        <div className="flex items-center space-x-4 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(service.type)}`}>
                            {service.type}
                          </span>
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-1" />
                            {service.provider}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-green-600 font-bold text-lg mb-2">
                          <DollarSign className="w-5 h-5 mr-1" />
                          {service.price} {service.currency}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(service)}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
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

export default Services;