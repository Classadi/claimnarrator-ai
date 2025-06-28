
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Shield, FileText, Zap } from 'lucide-react';
import ClaimInput from '@/components/ClaimInput';
import NarrativeOutput from '@/components/NarrativeOutput';
import ReportDownload from '@/components/ReportDownload';
import ClaimVisualization from '@/components/ClaimVisualization';
import LanguageSelector from '@/components/LanguageSelector';
import { processClaimInput } from '@/utils/claimProcessor';
import { translations, Language, TranslationKey } from '@/utils/translations';

interface ClaimNarrative {
  structuredText: string;
  emotions: string[];
  tags: string[];
  timestamp: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
}

const Index = () => {
  const [narrative, setNarrative] = useState<ClaimNarrative | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: TranslationKey) => translations[language][key];

  const handleClaimSubmit = async (input: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await processClaimInput(input);
      setNarrative(result);
    } catch (error) {
      console.error('Error processing claim:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while processing your claim.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t('title')}
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
          <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Shield className="w-5 h-5" />
                {t('emotionAware')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {t('emotionAwareDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <FileText className="w-5 h-5" />
                {t('structuredReports')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {t('structuredReportsDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Zap className="w-5 h-5" />
                {t('browserBasedAI')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {t('browserBasedAIDesc')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <div className="space-y-8">
          {error && (
            <Card className="w-full max-w-2xl mx-auto bg-red-50 border-red-200">
              <CardContent className="pt-6">
                <p className="text-red-700 text-center">{error}</p>
              </CardContent>
            </Card>
          )}
          
          <ClaimInput onSubmit={handleClaimSubmit} isLoading={isLoading} />
          
          {narrative && (
            <>
              <ClaimVisualization narrative={narrative} language={language} />
              <NarrativeOutput narrative={narrative} />
              <ReportDownload narrative={narrative} />
            </>
          )}
        </div>

        {/* Example */}
        {!narrative && (
          <div className="mt-16 text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">{t('tryExample')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">
                  "{t('exampleText')}"
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
