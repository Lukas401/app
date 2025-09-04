import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Calendar, MapPin, User, Beaker, Archive, Eye } from 'lucide-react';

const MicroorganismCard = ({ microorganism }) => {
  return (
    <Card className="mb-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-emerald-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {microorganism.nomeCompleto}
          </CardTitle>
          <Badge 
            variant={microorganism.categoriaTaxonomica === 'Bactéria' ? 'default' : 'secondary'}
            className="text-sm"
          >
            {microorganism.categoriaTaxonomica}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Identificação Básica */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Identificação Básica
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium text-gray-600">Código interno:</span>
              <span className="ml-2 font-mono bg-white px-2 py-1 rounded">
                {microorganism.codigoInterno}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Gênero:</span>
              <span className="ml-2 italic">{microorganism.genero}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Espécie:</span>
              <span className="ml-2 italic">{microorganism.especie}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Nome:</span>
              <span className="ml-2 font-medium italic">{microorganism.nomeCompleto}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Origem do Isolamento */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Origem do Isolamento
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Fonte de isolamento:</span>
              <span className="ml-2">{microorganism.fonteIsolamento}</span>
            </div>
            <div className="flex items-start">
              <User className="w-4 h-4 mt-0.5 text-gray-500 mr-1" />
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Hospedeiro/matriz:</span>
              <span className="ml-2">{microorganism.hospedeiro}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mt-0.5 text-gray-500 mr-1" />
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Local geográfico:</span>
              <span className="ml-2">{microorganism.localGeografico}</span>
            </div>
            <div className="flex items-start">
              <Calendar className="w-4 h-4 mt-0.5 text-gray-500 mr-1" />
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Data de isolamento:</span>
              <span className="ml-2">{microorganism.dataIsolamento}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Dados Adicionais */}
        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <Beaker className="w-4 h-4 mr-2" />
            Dados Adicionais
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Identificação (MALDI-TOF):</span>
              <span className="ml-2">{microorganism.identificacaoMALDI}</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Disponibilidade:</span>
              <Badge 
                variant={microorganism.disponibilidade === 'Disponível' ? 'default' : 'destructive'}
                className="ml-2 text-xs"
              >
                {microorganism.disponibilidade}
              </Badge>
            </div>
            <div className="flex items-start">
              <Archive className="w-4 h-4 mt-0.5 text-gray-500 mr-1" />
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Tipo de conservação:</span>
              <span className="ml-2">{microorganism.tipoConservacao}</span>
            </div>
            <div className="flex items-start">
              <span className="font-medium text-gray-600 w-32 flex-shrink-0">Observações adicionais:</span>
              <span className="ml-2 text-gray-700">{microorganism.observacoesAdicionais}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MicroorganismCard;