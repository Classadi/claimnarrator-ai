
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Heart, Tag, Clock, MapPin } from 'lucide-react';

interface ClaimNarrative {
  structuredText: string;
  emotions: string[];
  tags: string[];
  timestamp: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
}

interface NarrativeOutputProps {
  narrative: ClaimNarrative | null;
}

const NarrativeOutput: React.FC<NarrativeOutputProps> = ({ narrative }) => {
  if (!narrative) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Generated Claim Narrative
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Structured Narrative */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <h3 className="font-semibold text-blue-800 mb-3 text-lg">📋 Structured Report</h3>
          <p className="text-gray-700 leading-relaxed text-justify">{narrative.structuredText}</p>
        </div>

        {/* Enhanced Metadata Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Emotions */}
          <div className="bg-pink-50 p-5 rounded-xl border border-pink-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-pink-700 mb-3">
              <Heart className="w-5 h-5" />
              💝 Emotional Context
            </div>
            <div className="flex flex-wrap gap-2">
              {narrative.emotions.map((emotion, index) => (
                <Badge key={index} className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-purple-700 mb-3">
              <Tag className="w-5 h-5" />
              🏷️ Claim Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {narrative.tags.map((tag, index) => (
                <Badge key={index} className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Time & Location */}
          <div className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-green-700 mb-3">
              <Clock className="w-5 h-5" />
              ⏰ Incident Time
            </div>
            <p className="text-gray-700 font-medium">{narrative.timestamp}</p>
          </div>

          <div className="bg-orange-50 p-5 rounded-xl border border-orange-200 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-orange-700 mb-3">
              <MapPin className="w-5 h-5" />
              📍 Location
            </div>
            <p className="text-gray-700 font-medium">{narrative.location}</p>
          </div>
        </div>

        {/* Enhanced Severity Indicator */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">🚨 Severity Assessment:</span>
            <Badge className={`${getSeverityColor(narrative.severity)} text-lg px-4 py-2 font-bold shadow-md transform hover:scale-105 transition-transform`}>
              {narrative.severity.charAt(0).toUpperCase() + narrative.severity.slice(1)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NarrativeOutput;
