import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Search, Filter, X } from 'lucide-react';

const SearchFilter = ({ onSearch, onFilter, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilter('category', value);
  };

  const handleAvailabilityChange = (value) => {
    setSelectedAvailability(value);
    onFilter('availability', value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedAvailability('');
    onClearFilters();
  };

  return (
    <Card className="mb-6 border-t-4 border-t-emerald-500">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar por nome, gênero, espécie ou código..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Filtrar por:</span>
            </div>
            
            <div className="flex flex-wrap gap-3 flex-1">
              <Select value={selectedCategory || ""} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bactéria">Bactéria</SelectItem>
                  <SelectItem value="Fungo">Fungo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedAvailability || ""} onValueChange={handleAvailabilityChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Disponibilidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Disponível">Disponível</SelectItem>
                  <SelectItem value="Indisponível - Em análise">Indisponível</SelectItem>
                </SelectContent>
              </Select>

              {(searchTerm || selectedCategory || selectedAvailability) && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleClearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilter;