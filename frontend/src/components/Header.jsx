import React from 'react';
import { Microscope, Database } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Microscope className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Banco de Microrganismos
              </h1>
              <p className="text-emerald-100 text-sm">
                Catálogo de bactérias e fungos isolados
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
            <Database className="w-5 h-5" />
            <span className="text-sm font-medium">Sistema de Consulta</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;