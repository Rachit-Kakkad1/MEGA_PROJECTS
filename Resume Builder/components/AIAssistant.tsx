import React, { useState } from 'react';
import { Button } from './Button';
import { optimizeText } from '../services/geminiService';
import { Wand2, Sparkles, Check } from 'lucide-react';

interface AIAssistantProps {
  initialText: string;
  onAccept: (text: string) => void;
  context?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ initialText, onAccept, context = "resume content" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const handleOptimize = async () => {
    if (!initialText) return;
    setIsLoading(true);
    try {
      const result = await optimizeText(initialText, context);
      setSuggestion(result);
      setIsOpen(true);
    } catch (error) {
      alert("Failed to generate AI suggestion. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      {!isOpen ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleOptimize}
          disabled={!initialText || isLoading}
          className="text-accent hover:text-blue-700 hover:bg-blue-50"
        >
          {isLoading ? (
            'Optimizing...'
          ) : (
            <>
              <Wand2 className="w-3 h-3 mr-2" />
              AI Optimize
            </>
          )}
        </Button>
      ) : (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 mb-2 text-blue-800 font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            <span>AI Suggestion</span>
          </div>
          <p className="text-sm text-slate-700 mb-3 bg-white p-2 rounded border border-blue-100">
            {suggestion}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                onAccept(suggestion);
                setIsOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Check className="w-3 h-3 mr-1" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
