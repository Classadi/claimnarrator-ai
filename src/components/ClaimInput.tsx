
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Send, Loader2, MicOff } from 'lucide-react';

interface ClaimInputProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

const ClaimInput: React.FC<ClaimInputProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (isRecording) {
          // Restart if we're still supposed to be recording
          recognitionRef.current?.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      recognitionRef.current.stop();
    } else {
      // Start recording
      setIsRecording(true);
      setInput(''); // Clear previous input
      recognitionRef.current.start();
    }
  };

  const isSpeechSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

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
            disabled={!isSpeechSupported}
            className={`flex-1 ${
              isRecording 
                ? 'bg-red-50 border-red-200 text-red-600' 
                : isListening 
                ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                : ''
            }`}
          >
            {isRecording ? (
              <MicOff className="w-4 h-4 mr-2 text-red-500" />
            ) : (
              <Mic className="w-4 h-4 mr-2" />
            )}
            {isRecording ? 'Stop Recording' : isListening ? 'Listening...' : 'Voice Input'}
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
        {!isSpeechSupported && (
          <p className="text-sm text-gray-500 text-center">
            Speech recognition is not supported in your browser. Please use Chrome or Edge for voice input.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ClaimInput;
