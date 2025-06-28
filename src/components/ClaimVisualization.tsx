
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ScatterChart, Scatter, Cell, PieChart, Pie, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface ClaimNarrative {
  structuredText: string;
  emotions: string[];
  tags: string[];
  timestamp: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
}

interface ClaimVisualizationProps {
  narrative: ClaimNarrative;
  language: string;
}

const ClaimVisualization: React.FC<ClaimVisualizationProps> = ({ narrative, language }) => {
  const translations = {
    en: {
      dataVisualization: 'Data Visualization',
      emotionalAnalysis: 'Emotional Analysis',
      severityDistribution: 'Severity Distribution',
      claimCategories: 'Claim Categories',
      riskAssessment: 'Risk Assessment'
    },
    es: {
      dataVisualization: 'Visualización de Datos',
      emotionalAnalysis: 'Análisis Emocional',
      severityDistribution: 'Distribución de Severidad',
      claimCategories: 'Categorías de Reclamos',
      riskAssessment: 'Evaluación de Riesgo'
    },
    fr: {
      dataVisualization: 'Visualisation des Données',
      emotionalAnalysis: 'Analyse Émotionnelle',
      severityDistribution: 'Distribution de Sévérité',
      claimCategories: 'Catégories de Réclamations',
      riskAssessment: 'Évaluation des Risques'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Prepare emotion data for bar chart
  const emotionData = narrative.emotions.map((emotion, index) => ({
    emotion: emotion,
    intensity: Math.random() * 100 + 50, // Mock intensity data
    color: `hsl(${index * 60}, 70%, 50%)`
  }));

  // Prepare severity data for pie chart
  const severityData = [
    { name: 'Current Case', value: narrative.severity === 'high' ? 3 : narrative.severity === 'medium' ? 2 : 1, fill: '#ef4444' },
    { name: 'Remaining', value: 3 - (narrative.severity === 'high' ? 3 : narrative.severity === 'medium' ? 2 : 1), fill: '#e5e7eb' }
  ];

  // Prepare category data for scatter plot
  const categoryData = narrative.tags.map((tag, index) => ({
    category: tag,
    frequency: Math.random() * 50 + 10,
    impact: Math.random() * 100 + 20,
    x: index + 1,
    y: Math.random() * 100 + 20
  }));

  const chartConfig = {
    emotions: { label: 'Emotions' },
    severity: { label: 'Severity' },
    categories: { label: 'Categories' }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <BarChart3 className="w-5 h-5" />
            {t.dataVisualization}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Emotional Analysis Bar Chart */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">{t.emotionalAnalysis}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <BarChart data={emotionData}>
                    <XAxis dataKey="emotion" fontSize={10} />
                    <YAxis fontSize={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="intensity" radius={4}>
                      {emotionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Severity Pie Chart */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">{t.severityDistribution}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="text-center mt-2">
                  <span className={`text-lg font-bold ${
                    narrative.severity === 'high' ? 'text-red-600' : 
                    narrative.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {narrative.severity.toUpperCase()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Category Scatter Plot */}
            <Card className="bg-white/80 backdrop-blur-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t.riskAssessment}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[250px]">
                  <ScatterChart data={categoryData}>
                    <XAxis dataKey="frequency" name="Frequency" />
                    <YAxis dataKey="impact" name="Impact" />
                    <ChartTooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={<ChartTooltipContent />}
                    />
                    <Scatter dataKey="impact" fill="#3b82f6" />
                  </ScatterChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimVisualization;
