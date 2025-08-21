import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Trash2, Car, Plane, Bus, MapPin, Clock, Users, X } from 'lucide-react';
import { Transport, TransportType, TransportStatus, User } from '@/models/entities';
import { transportAPI, usersAPI } from '@/services/api';

// Updated defaultForm to match mystig_db.sql columns and backend requirements
const defaultForm: Partial<Transport> = {
  name: "", // backend expects 'name', not 'title'
  description: "",
  type: TransportType.AIRPORT_TRANSFER,
  status: TransportStatus.ACTIVE,
  price: 0,
  currency: "MAD",
  city: "",
  capacity: 1,
  features: [],
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case TransportType.BUS: return <Bus className="w-5 h-5" />;
    case TransportType.PRIVATE_CAR: return <Car className="w-5 h-5" />;
    case TransportType.TAXI: return <Car className="w-5 h-5" />; // Fallback for Taxi
    case TransportType.AIRPORT_TRANSFER: return <Plane className="w-5 h-5" />;
    default: return <Car className="w-5 h-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case TransportType.BUS: return "bg-blue-100 text-blue-800";
    case TransportType.PRIVATE_CAR: return "bg-green-100 text-green-800";
    case TransportType.TAXI: return "bg-yellow-100 text-yellow-800";
    case TransportType.AIRPORT_TRANSFER: return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case TransportStatus.ACTIVE: return "bg-green-100 text-green-800";
    case TransportStatus.INACTIVE: return "bg-red-100 text-red-800";
    case TransportStatus.MAINTENANCE: return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const TransportList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Transport> | null>(null);
  const [form, setForm] = useState<Partial<Transport>>(defaultForm);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Fetch current user profile for ownerId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await usersAPI.getProfile();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const fetchTransports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await transportAPI.getAll();
      // The API returns an object with an items property containing the array
      if (response && response.items && Array.isArray(response.items)) {
        setTransports(response.items);
      } else {
        setTransports([]);
        setError("Received invalid data format from server");
      }
    } catch (err) {
      setError("Failed to fetch transports");
      setTransports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransports(); }, []);

  const handleEdit = (transport: Transport) => {
    setEditing(transport);
    setForm({
      ...transport,
      name: transport.name || "",
      currency: transport.currency || "MAD",
      features: transport.features || [],
      capacity: transport.capacity || 1,
      price: transport.price || 0,
      city: transport.city || "",
      status: transport.status || TransportStatus.ACTIVE,
      type: transport.type || TransportType.AIRPORT_TRANSFER,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce transport ?")) {
      try {
        await transportAPI.delete(id);
        fetchTransports();
      } catch (err) {
        setError("Failed to delete transport");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, ownerId: user?.id };
      if (editing && editing.id) {
        await transportAPI.update(editing.id, payload);
      } else {
        await transportAPI.create(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchTransports();
    } catch (err) {
      setError("Failed to save transport");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Transports
            </h1>
            <p className="text-muted-foreground">
              Ajoutez et gérez les moyens de transport proposés
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un transport</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? "Modifier le transport" : "Ajouter un transport"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Nom *</label>
                    <input
                      type="text"
                      value={form.name || ""}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Type *</label>
                    <select
                      value={form.type || TransportType.AIRPORT_TRANSFER}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as TransportType }))}
                      className="w-full px-4 py-2 border rounded"
                    >
                      {Object.values(TransportType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Description *</label>
                  <textarea
                    value={form.description || ""}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-2 border rounded"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Statut *</label>
                    <select
                      value={form.status || TransportStatus.ACTIVE}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as TransportStatus }))}
                      className="w-full px-4 py-2 border rounded"
                    >
                      {Object.values(TransportStatus).map(stat => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Devise *</label>
                    <select
                      value={form.currency || "MAD"}
                      onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="MAD">MAD</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Prix *</label>
                    <input
                      type="number"
                      value={form.price || 0}
                      onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border rounded"
                      min={0}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Capacité *</label>
                    <input
                      type="number"
                      value={form.capacity || 1}
                      onChange={e => setForm(f => ({ ...f, capacity: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border rounded"
                      min={1}
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Ville</label>
                  <input
                    type="text"
                    value={form.city || ""}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                    className="w-full px-4 py-2 border rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Caractéristiques</label>
                  <input
                    type="text"
                    value={form.features?.join(", ") || ""}
                    onChange={e => setForm(f => ({
                      ...f,
                      features: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                    }))}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Wifi, Climatisation, etc."
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/80"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {editing ? "Enregistrer" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transport List */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Liste des transports</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6 text-center text-muted-foreground">Chargement...</div>
            ) : transports.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Aucun transport trouvé. Cliquez sur "Ajouter un transport" pour commencer.
              </div>
            ) : (
              transports.map(transport => (
                <div key={transport.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{transport.name}</h3>
                      <div className="text-muted-foreground text-sm mt-1">{transport.description}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(transport)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-primary text-primary-foreground"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(transport.id)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-red-500 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded ${getTypeColor(transport.type)}`}>
                        {getTypeIcon(transport.type)}
                        <span className="ml-2">{transport.type}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Statut:</span> 
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transport.status)}`}>
                        {transport.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <span className="font-semibold">Capacité:</span> {transport.capacity} personnes
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Prix:</span> 
                      <span className="font-bold">
                        {transport.price} {transport.currency}
                      </span>
                    </div>
                  </div>
                  
                  {transport.city && (
                    <div className="mt-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>
                          <span className="font-semibold">Ville:</span> {transport.city}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {transport.features && transport.features.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-semibold mb-1">Caractéristiques:</div>
                      <div className="flex flex-wrap gap-2">
                        {transport.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransportList;