import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Save, University } from 'lucide-react';

const MicroorganismForm = ({ microorganism, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    codigoInterno: '',
    genero: '',
    especie: '',
    nomeCompleto: '',
    categoriaTaxonomica: '',
    fonteIsolamento: '',
    hospedeiro: '',
    localGeografico: '',
    dataIsolamento: '',
    identificacaoMALDI: '',
    disponibilidade: '',
    tipoConservacao: '',
    observacoesAdicionais: ''
  });

  useEffect(() => {
    if (microorganism) {
      setFormData(microorganism);
    }
  }, [microorganism]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.codigoInterno || !formData.nomeCompleto || !formData.categoriaTaxonomica) {
      alert('Por favor, preencha os campos obrigatórios: Código Interno, Nome Completo e Categoria Taxonômica.');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <div className="bg-blue-600 p-2 rounded-lg mr-4">
              <University className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {microorganism ? 'Editar Registro' : 'Novo Registro'}
              </h1>
              <p className="text-sm text-gray-600">
                MICROTECA DE SAÚDE - Universidade Federal da Bahia
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Painel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Identificação Básica */}
          <Card>
            <CardHeader>
              <CardTitle>Identificação Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoInterno">
                    Código Interno <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="codigoInterno"
                    value={formData.codigoInterno}
                    onChange={(e) => handleChange('codigoInterno', e.target.value)}
                    placeholder="Ex: BCT-001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoriaTaxonomica">
                    Categoria Taxonômica <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.categoriaTaxonomica} 
                    onValueChange={(value) => handleChange('categoriaTaxonomica', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bactéria">Bactéria</SelectItem>
                      <SelectItem value="Fungo">Fungo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genero">Gênero</Label>
                  <Input
                    id="genero"
                    value={formData.genero}
                    onChange={(e) => handleChange('genero', e.target.value)}
                    placeholder="Ex: Escherichia"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="especie">Espécie</Label>
                  <Input
                    id="especie"
                    value={formData.especie}
                    onChange={(e) => handleChange('especie', e.target.value)}
                    placeholder="Ex: coli"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="nomeCompleto">
                    Nome Completo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={(e) => handleChange('nomeCompleto', e.target.value)}
                    placeholder="Ex: Escherichia coli"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Origem do Isolamento */}
          <Card>
            <CardHeader>
              <CardTitle>Origem do Isolamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fonteIsolamento">Fonte de Isolamento</Label>
                  <Input
                    id="fonteIsolamento"
                    value={formData.fonteIsolamento}
                    onChange={(e) => handleChange('fonteIsolamento', e.target.value)}
                    placeholder="Ex: Urina, Sangue, Solo..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataIsolamento">Data de Isolamento</Label>
                  <Input
                    id="dataIsolamento"
                    value={formData.dataIsolamento}
                    onChange={(e) => handleChange('dataIsolamento', e.target.value)}
                    placeholder="Ex: 15/03/2024"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="hospedeiro">Hospedeiro/Matriz</Label>
                  <Input
                    id="hospedeiro"
                    value={formData.hospedeiro}
                    onChange={(e) => handleChange('hospedeiro', e.target.value)}
                    placeholder="Ex: Humano - Paciente feminino, 45 anos"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="localGeografico">Local Geográfico</Label>
                  <Input
                    id="localGeografico"
                    value={formData.localGeografico}
                    onChange={(e) => handleChange('localGeografico', e.target.value)}
                    placeholder="Ex: Salvador, BA, Brasil"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="identificacaoMALDI">Identificação (MALDI-TOF)</Label>
                  <Input
                    id="identificacaoMALDI"
                    value={formData.identificacaoMALDI}
                    onChange={(e) => handleChange('identificacaoMALDI', e.target.value)}
                    placeholder="Ex: 99.8% confiança - Escherichia coli"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="disponibilidade">Disponibilidade</Label>
                  <Select 
                    value={formData.disponibilidade} 
                    onValueChange={(value) => handleChange('disponibilidade', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a disponibilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Disponível">Disponível</SelectItem>
                      <SelectItem value="Indisponível - Em análise">Indisponível - Em análise</SelectItem>
                      <SelectItem value="Indisponível - Esgotado">Indisponível - Esgotado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipoConservacao">Tipo de Conservação</Label>
                  <Input
                    id="tipoConservacao"
                    value={formData.tipoConservacao}
                    onChange={(e) => handleChange('tipoConservacao', e.target.value)}
                    placeholder="Ex: Criopreservação a -80°C"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="observacoesAdicionais">Observações Adicionais</Label>
                  <Textarea
                    id="observacoesAdicionais"
                    value={formData.observacoesAdicionais}
                    onChange={(e) => handleChange('observacoesAdicionais', e.target.value)}
                    placeholder="Informações relevantes sobre resistência, características especiais, etc."
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {microorganism ? 'Atualizar Registro' : 'Salvar Registro'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MicroorganismForm;