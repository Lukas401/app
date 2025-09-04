import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from '../contexts/AuthContext';
import { mockMicroorganisms } from '../data/mock';
import { 
  LogOut, 
  Plus, 
  Search, 
  Download, 
  Upload, 
  Edit3, 
  Trash2, 
  University,
  Microscope,
  BarChart3,
  Users,
  Database
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import MicroorganismForm from './MicroorganismForm';
import { Badge } from './ui/badge';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [microorganisms, setMicroorganisms] = useState(mockMicroorganisms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Estatísticas
  const stats = useMemo(() => {
    const total = microorganisms.length;
    const bacteria = microorganisms.filter(m => m.categoriaTaxonomica === 'Bactéria').length;
    const fungi = microorganisms.filter(m => m.categoriaTaxonomica === 'Fungo').length;
    const available = microorganisms.filter(m => m.disponibilidade === 'Disponível').length;
    
    return { total, bacteria, fungi, available };
  }, [microorganisms]);

  // Filtros
  const filteredMicroorganisms = useMemo(() => {
    return microorganisms.filter(microorganism => {
      const searchMatch = searchTerm === '' || 
        microorganism.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.genero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.especie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.codigoInterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        microorganism.hospedeiro.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch = selectedCategory === '' || 
        microorganism.categoriaTaxonomica === selectedCategory;

      return searchMatch && categoryMatch;
    });
  }, [searchTerm, selectedCategory, microorganisms]);

  const handleEdit = (microorganism) => {
    setEditingItem(microorganism);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este registro?')) {
      setMicroorganisms(prev => prev.filter(m => m.id !== id));
      toast({
        title: "Registro excluído",
        description: "O microrganismo foi removido com sucesso.",
      });
    }
  };

  const handleSave = (data) => {
    if (editingItem) {
      // Editar
      setMicroorganisms(prev => 
        prev.map(m => m.id === editingItem.id ? { ...data, id: editingItem.id } : m)
      );
      toast({
        title: "Registro atualizado",
        description: "O microrganismo foi atualizado com sucesso.",
      });
    } else {
      // Criar novo
      const newItem = {
        ...data,
        id: Math.max(...microorganisms.map(m => m.id)) + 1
      };
      setMicroorganisms(prev => [...prev, newItem]);
      toast({
        title: "Registro criado",
        description: "Novo microrganismo adicionado com sucesso.",
      });
    }
    
    setShowForm(false);
    setEditingItem(null);
  };

  const handleExportCSV = () => {
    const headers = [
      'Código Interno', 'Gênero', 'Espécie', 'Nome Completo', 'Categoria Taxonômica',
      'Fonte de Isolamento', 'Hospedeiro', 'Local Geográfico', 'Data de Isolamento',
      'Identificação MALDI-TOF', 'Disponibilidade', 'Tipo de Conservação', 'Observações'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredMicroorganisms.map(m => [
        m.codigoInterno, m.genero, m.especie, m.nomeCompleto, m.categoriaTaxonomica,
        m.fonteIsolamento, m.hospedeiro, m.localGeografico, m.dataIsolamento,
        m.identificacaoMALDI, m.disponibilidade, m.tipoConservacao, m.observacoesAdicionais
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `microteca_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast({
      title: "Exportação concluída",
      description: `${filteredMicroorganisms.length} registros exportados para CSV.`,
    });
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        // Mapear automaticamente as colunas
        const mappedData = lines.slice(1).filter(line => line.trim()).map((line, index) => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          
          return {
            id: Math.max(...microorganisms.map(m => m.id)) + index + 1,
            codigoInterno: values[0] || '',
            genero: values[1] || '',
            especie: values[2] || '',
            nomeCompleto: values[3] || '',
            categoriaTaxonomica: values[4] || '',
            fonteIsolamento: values[5] || '',
            hospedeiro: values[6] || '',
            localGeografico: values[7] || '',
            dataIsolamento: values[8] || '',
            identificacaoMALDI: values[9] || '',
            disponibilidade: values[10] || '',
            tipoConservacao: values[11] || '',
            observacoesAdicionais: values[12] || ''
          };
        });

        setMicroorganisms(prev => [...prev, ...mappedData]);
        
        toast({
          title: "Importação concluída",
          description: `${mappedData.length} registros importados com sucesso.`,
        });
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Verifique o formato do arquivo CSV.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  if (showForm) {
    return (
      <MicroorganismForm
        microorganism={editingItem}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingItem(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <University className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  MICROTECA DE SAÚDE
                </h1>
                <p className="text-sm text-gray-600">
                  Universidade Federal da Bahia - Painel Administrativo
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bem-vindo, {user?.name}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <Database className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-gray-600">Total de Registros</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Microscope className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.bacteria}</p>
                <p className="text-gray-600">Bactérias</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <BarChart3 className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.fungi}</p>
                <p className="text-gray-600">Fungos</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="w-8 h-8 text-emerald-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.available}</p>
                <p className="text-gray-600">Disponíveis</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controles */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Painel de Controle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Ações principais */}
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Registro
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleExportCSV}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
              
              <label htmlFor="csvImport">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  asChild
                >
                  <span>
                    <Upload className="w-4 h-4" />
                    Importar CSV
                  </span>
                </Button>
                <input
                  id="csvImport"
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                />
              </label>
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por código, nome, gênero, espécie ou hospedeiro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  <SelectItem value="Bactéria">Bactéria</SelectItem>
                  <SelectItem value="Fungo">Fungo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Registros */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Registros de Microrganismos</CardTitle>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredMicroorganisms.length} registro(s)
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {filteredMicroorganisms.length > 0 ? (
              <div className="space-y-4">
                {filteredMicroorganisms.map(microorganism => (
                  <div 
                    key={microorganism.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {microorganism.nomeCompleto}
                        </h3>
                        <p className="text-gray-600">
                          Código: {microorganism.codigoInterno} | 
                          Hospedeiro: {microorganism.hospedeiro}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={microorganism.categoriaTaxonomica === 'Bactéria' ? 'default' : 'secondary'}
                        >
                          {microorganism.categoriaTaxonomica}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(microorganism)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(microorganism.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Fonte:</span> {microorganism.fonteIsolamento}
                      </div>
                      <div>
                        <span className="font-medium">Local:</span> {microorganism.localGeografico}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <Badge 
                          variant={microorganism.disponibilidade === 'Disponível' ? 'default' : 'destructive'}
                          className="ml-2 text-xs"
                        >
                          {microorganism.disponibilidade}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhum registro encontrado com os critérios de busca.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">
              Cultivo e manutenção de uma microteca especializada principalmente em patógenos humanos e animais.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-sm">
              <div>
                <h4 className="font-semibold mb-2">Missão:</h4>
                <p className="text-gray-300">
                  Fornecimento de linhagens para realização de trabalhos de conclusão de curso, 
                  dissertações e tese, e a criação de conteúdo de aprendizagem para a comunidade.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Coordenadores:</h4>
                <p className="text-gray-300">
                  Dra. Ana Rita Sokolonski Antón e Dr. Ricardo Wagner Dias Portela
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                <strong>Financiadores:</strong> Universidade Federal da Bahia - Auxílio financeiro
              </p>
              <p className="text-gray-400 text-sm mt-2">
                <strong>Contato:</strong> anton@ufba.br
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;