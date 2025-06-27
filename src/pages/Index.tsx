
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Shield, FileText, Zap } from 'lucide-react';
import ClaimInput from '@/components/ClaimInput';
import NarrativeOutput from '@/components/NarrativeOutput';
import ReportDownload from '@/components/ReportDownload';
import { processClaimInput } from '@/utils/claimProcessor';

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

  const handleClaimSubmit = async (input: string) => {
    setIsLoading(true);
    try {
      const result = await processClaimInput(input);
      setNarrative(result);
    } catch (error) {
      console.error('Error processing claim:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ClaimNarrator AI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform raw claim descriptions into structured, emotion-aware narratives 
            that accelerate insurance processing and improve claim clarity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Shield className="w-5 h-5" />
                Emotion-Aware
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detects emotional context and tone to provide empathetic, human-centered claim processing.
              </p>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <FileText className="w-5 h-5" />
                Structured Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Converts unstructured input into professional, insurance-ready documentation.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Zap className="w-5 h-5" />
                Instant Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Real-time analysis and narrative generation to reduce claim processing time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Interface */}
        <div className="space-y-8">
          <ClaimInput onSubmit={handleClaimSubmit} isLoading={isLoading} />
          
          {narrative && (
            <>
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
                <CardTitle className="text-blue-800">Try This Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">
                  "I fell from stairs in my office at 6pm on Thursday. It was raining outside and the stairs were slippery. My knee is injured badly and I need medical attention."
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
