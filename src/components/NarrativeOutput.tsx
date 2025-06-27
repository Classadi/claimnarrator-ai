
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <FileText className="w-5 h-5" />
          Generated Claim Narrative
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Structured Narrative */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Structured Report</h3>
          <p className="text-gray-700 leading-relaxed">{narrative.structuredText}</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Emotions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Heart className="w-4 h-4" />
              Emotional Context
            </div>
            <div className="flex flex-wrap gap-2">
              {narrative.emotions.map((emotion, index) => (
                <Badge key={index} variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Tag className="w-4 h-4" />
              Claim Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {narrative.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Time & Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Clock className="w-4 h-4" />
              Incident Time
            </div>
            <p className="text-gray-700">{narrative.timestamp}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <MapPin className="w-4 h-4" />
              Location
            </div>
            <p className="text-gray-700">{narrative.location}</p>
          </div>
        </div>

        {/* Severity Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Severity Level:</span>
          <Badge className={getSeverityColor(narrative.severity)}>
            {narrative.severity.charAt(0).toUpperCase() + narrative.severity.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default NarrativeOutput;
