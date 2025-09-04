import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import MicroorganismCard from './components/MicroorganismCard';
import SearchFilter from './components/SearchFilter';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { mockMicroorganisms } from './data/mock';
import { Toaster } from './components/ui/toaster';
import { useState, useMemo } from 'react';

const PublicSite = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    availability: ''
  });

  const filteredMicroorganisms = useMemo(() => {
    return mockMicroorganisms.filter(microorganism => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        microorganism.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.genero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.codigoInterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.fonteIsolamento.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const categoryMatch = filters.category === '' || 
        microorganism.categoriaTaxonomica === filters.category;

      // Availability filter
      const availabilityMatch = filters.availability === '' || 
        microorganism.disponibilidade.includes(filters.availability);

      return searchMatch && categoryMatch && availabilityMatch;
    });
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      availability: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Catálogo de Microrganismos
          </h2>
          <p className="text-gray-600">
            Consulte informações detalhadas sobre bactérias e fungos isolados de animais e humanos. 
            Use os filtros abaixo para encontrar microrganismos específicos.
          </p>
        </div>

        <SearchFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onClearFilters={handleClearFilters}
        />

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Resultados da busca
            </h3>
            <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
              {filteredMicroorganisms.length} microrganismo(s) encontrado(s)
            </span>
          </div>
        </div>

        {filteredMicroorganisms.length > 0 ? (
          <div className="space-y-6">
            {filteredMicroorganisms.map(microorganism => (
              <MicroorganismCard 
                key={microorganism.id} 
                microorganism={microorganism} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <p className="text-gray-500 text-lg">
                Nenhum microrganismo encontrado com os critérios de busca.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Tente ajustar os filtros ou termos de busca.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2024 MICROTECA DE SAÚDE - Universidade Federal da Bahia
          </p>
        </div>
      </footer>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<PublicSite />} 
        />
        <Route 
          path="/admin" 
          element={isAuthenticated ? <AdminDashboard /> : <AdminLogin />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </div>
  );
}

export default App;