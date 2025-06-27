
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = () => {
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      localStorage.setItem('openrouter_api_key', apiKey.trim());
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-yellow-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-700">
          <Key className="w-5 h-5" />
          OpenRouter API Key Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">
          To use the AI-powered claim processing, please enter your OpenRouter API key. 
          It will be stored locally in your browser.
        </p>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-v1-..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <Button onClick={handleSubmit} disabled={!apiKey.trim()}>
            Set API Key
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Get your API key from{' '}
          <a 
            href="https://openrouter.ai/keys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            OpenRouter
          </a>
        </p>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
