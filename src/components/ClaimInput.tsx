
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Send, Loader2 } from 'lucide-react';

interface ClaimInputProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

const ClaimInput: React.FC<ClaimInputProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    // Placeholder for voice input functionality
    setIsRecording(!isRecording);
    // In a real implementation, this would use Web Speech API
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Send className="w-5 h-5" />
          Describe Your Claim
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tell us what happened... For example: 'I fell from stairs in my office at 6pm on Thursday. It was raining outside and the stairs were slippery. My knee is injured badly.'"
          className="min-h-32 resize-none"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleVoiceInput}
            variant="outline"
            className={`flex-1 ${isRecording ? 'bg-red-50 border-red-200' : ''}`}
          >
            <Mic className={`w-4 h-4 mr-2 ${isRecording ? 'text-red-500' : ''}`} />
            {isRecording ? 'Stop Recording' : 'Voice Input'}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Generate Narrative
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimInput;
