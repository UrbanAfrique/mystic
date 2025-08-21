import { useState, useEffect } from "react";
import { Event, EventType, EventStatus, User } from '@/models/entities';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { eventsAPI } from '@/services/api';
import { Plus, Edit, Trash2, Calendar, MapPin, Clock, Tag, X, Sparkles, Users, Star } from 'lucide-react';

const defaultForm: Partial<Event> = {
  title: "",
  description: "",
  type: EventType.FESTIVAL,
  category: "CEREMONY",
  dateRange: { start: "", end: "" },
  timeRange: { start: "", end: "" },
  venue: "",
  address: "",
  city: "",
  status: EventStatus.DRAFT,
  featured: false,
  tags: [],
};

const EVENT_CATEGORIES = [
  "CEREMONY",
  "BASKETBALL", 
  "CONCERT",
  "WORKSHOP",
  "FOOTBALL",
  "EXHIBITION",
  "COMPETITION",
];

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Event> | null>(null);
  const [form, setForm] = useState<Partial<Event>>(defaultForm);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await eventsAPI.getAll();
      if (response && response.content && Array.isArray(response.content)) {
        setEvents(response.content);
      } else {
        setEvents([]);
        setError("Received invalid data format from server");
      }
    } catch (err) {
      setError("Failed to fetch events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleEdit = (event: Event) => {
    setEditing(event);
    setForm({
      ...event,
      dateRange: event.dateRange || { start: "", end: "" },
      timeRange: event.timeRange || { start: "", end: "" },
      tags: event.tags || [],
      category: event.category || "CEREMONY",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await eventsAPI.delete(id);
        fetchEvents();
      } catch (err) {
        setError("Failed to delete event");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing && editing.id) {
        await eventsAPI.update(editing.id, form);
      } else {
        await eventsAPI.create(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchEvents();
    } catch (err) {
      setError("Failed to save event");
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return "Non spécifié";
    return timeString;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'from-green-500 to-emerald-600 text-white';
      case 'DRAFT': return 'from-gray-400 to-gray-500 text-white';
      case 'CANCELLED': return 'from-red-500 to-red-600 text-white';
      default: return 'from-gray-400 to-gray-500 text-white';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Moroccan styling */}
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold mb-2">
                  Gestion des Événements
                </h1>
                <p className="text-white/90 text-lg">
                  Organisez des expériences culturelles authentiques
                </p>
              </div>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Ajouter un événement</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300/50 text-red-700 px-6 py-4 rounded-xl relative flex justify-between items-center shadow-lg">
            <span className="font-medium">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-4 p-1 hover:bg-red-200/50 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form Modal with Moroccan Design */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-orange-200/50">
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editing ? "Modifier l'événement" : "Ajouter un événement"}
                    </h2>
                  </div>
                  <button
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-orange-500" />
                      Titre *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={form.title || ""}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg focus:scale-105"
                        placeholder="Nom de l'événement"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-orange-500" />
                      Type *
                    </label>
                    <select
                      value={form.type || EventType.FESTIVAL}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as EventType }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    >
                      {Object.values(EventType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <Edit className="w-4 h-4 mr-2 text-orange-500" />
                    Description *
                  </label>
                  <div className="relative">
                    <textarea
                      value={form.description || ""}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg resize-none"
                      rows={4}
                      placeholder="Décrivez votre événement..."
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
                    <select
                      value={form.category || "CEREMONY"}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    >
                      {EVENT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
                    <select
                      value={form.status || EventStatus.DRAFT}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as EventStatus }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    >
                      {Object.values(EventStatus).map(stat => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      Date de début
                    </label>
                    <input
                      type="date"
                      value={form.dateRange?.start || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        dateRange: { ...f.dateRange, start: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      Date de fin
                    </label>
                    <input
                      type="date"
                      value={form.dateRange?.end || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        dateRange: { ...f.dateRange, end: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      Heure de début
                    </label>
                    <input
                      type="time"
                      value={form.timeRange?.start || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        timeRange: { ...f.timeRange, start: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      Heure de fin
                    </label>
                    <input
                      type="time"
                      value={form.timeRange?.end || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        timeRange: { ...f.timeRange, end: e.target.value }
                      }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      Lieu
                    </label>
                    <input
                      type="text"
                      value={form.venue || ""}
                      onChange={e => setForm(f => ({ ...f, venue: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      placeholder="Nom du lieu"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      Ville
                    </label>
                    <input
                      type="text"
                      value={form.city || ""}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      placeholder="Ville"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    Adresse complète
                  </label>
                  <input
                    type="text"
                    value={form.address || ""}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    placeholder="Adresse complète du lieu"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-orange-500" />
                      Mis en avant
                    </label>
                    <select
                      value={form.featured ? "true" : "false"}
                      onChange={e => setForm(f => ({ ...f, featured: e.target.value === "true" }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                    >
                      <option value="false">Non</option>
                      <option value="true">Oui</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-orange-500" />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={form.tags?.join(", ") || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      placeholder="Festival, Musique, Culture..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-orange-200/50">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                  >
                    {editing ? "Enregistrer" : "Ajouter"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events List with Moroccan Cards */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200/50 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Liste des événements</h2>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-red-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                </div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-gray-600 text-lg">Aucun événement trouvé</p>
                <p className="text-gray-500 text-sm">Cliquez sur "Ajouter un événement" pour commencer</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {events.map((event, index) => (
                  <div 
                    key={event.id} 
                    className="relative bg-gradient-to-r from-white to-orange-50/50 rounded-xl border-2 border-orange-200/30 p-6 hover:shadow-xl transition-all duration-500 hover:scale-102 group overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Moroccan decorative elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-xl text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                              {event.title}
                            </h3>
                            {event.featured && (
                              <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                                <Star className="w-3 h-3" />
                                <span>VEDETTE</span>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Tag className="w-4 h-4 text-orange-500" />
                              <span className="font-medium text-gray-700">Type:</span>
                              <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-lg text-xs font-medium">
                                {event.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-700">Catégorie:</span>
                              <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-lg text-xs font-medium">
                                {event.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-700">Statut:</span>
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200/50">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <span className="font-semibold text-gray-700">Dates:</span>
                            <span className="ml-2 text-gray-600">{formatDate(event.dateRange?.start)} - {formatDate(event.dateRange?.end)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/50">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <div>
                            <span className="font-semibold text-gray-700">Heures:</span>
                            <span className="ml-2 text-gray-600">{formatTime(event.timeRange?.start)} - {formatTime(event.timeRange?.end)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/50 text-sm">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-green-600 mt-0.5" />
                          <div>
                            <span className="font-semibold text-gray-700">Lieu:</span>
                            <span className="ml-2 text-gray-600">{event.venue || "Non spécifié"} | {event.city || "Non spécifié"}</span>
                            {event.address && (
                              <div className="text-gray-500 mt-1">{event.address}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {event.tags && event.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {event.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-xs font-medium border border-orange-200/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
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

export default Events;