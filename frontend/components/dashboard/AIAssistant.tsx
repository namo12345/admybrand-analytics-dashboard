// Component Type: Manual
// AI Assistant component for interactive help and insights

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bot, 
  X, 
  Send, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  DollarSign,
  Sparkles,
  BarChart3,
  Zap
} from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you analyze campaign performance, optimize budgets, and provide insights. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "Show me top performing campaigns",
        "How can I improve ROI?",
        "Analyze budget allocation",
        "Suggest campaign optimizations"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { icon: TrendingUp, label: 'Performance Analysis', color: 'bg-green-50 text-green-600' },
    { icon: Target, label: 'Optimization Tips', color: 'bg-blue-50 text-blue-600' },
    { icon: DollarSign, label: 'Budget Insights', color: 'bg-purple-50 text-purple-600' },
    { icon: BarChart3, label: 'Campaign Metrics', color: 'bg-orange-50 text-orange-600' }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    let response = "";
    let suggestions: string[] = [];

    if (input.includes('performance') || input.includes('top')) {
      response = "Based on your current data, your top 3 campaigns are:\n\n1. **Social Media Blitz** - 5.2x ROI, $35K spend\n2. **TV Prime Time Spots** - 4.1x ROI, $120K spend\n3. **Digital Display Network** - 3.7x ROI, $60K spend\n\nThe Social Media campaign is performing exceptionally well due to high engagement rates and precise targeting.";
      suggestions = ["How to scale Social Media campaign?", "Compare channel performance", "Budget reallocation suggestions"];
    } else if (input.includes('roi') || input.includes('improve')) {
      response = "Here are 3 key strategies to improve your ROI:\n\n🎯 **Audience Refinement**: Your Digital campaigns show 40% better performance with 25-34 age group\n\n📊 **Budget Optimization**: Shift 15% budget from Radio to Social for potential 2.1x ROI increase\n\n⏰ **Timing Optimization**: TV campaigns perform 60% better during 7-9 PM slots";
      suggestions = ["Show audience insights", "Create budget optimization plan", "Analyze timing patterns"];
    } else if (input.includes('budget') || input.includes('allocation')) {
      response = "Your current budget allocation analysis:\n\n💰 **Total Budget**: $405K\n📈 **Best Performing**: Social (5.2x ROI) - Consider increasing by 25%\n⚠️ **Underperforming**: Radio (2.1x ROI) - Reduce by 20%\n🎯 **Opportunity**: Outdoor campaigns show potential for 15% budget increase";
      suggestions = ["Apply budget recommendations", "See detailed breakdown", "Compare with industry benchmarks"];
    } else if (input.includes('optimize') || input.includes('suggestions')) {
      response = "🚀 **Optimization Recommendations**:\n\n1. **Increase Social Media budget** by $10K (projected +$52K revenue)\n2. **Pause Radio Morning Drive** campaign (low ROI)\n3. **Expand Digital Display** to mobile inventory\n4. **Test video creative** for TV campaigns\n5. **Geographic expansion** for Outdoor campaigns";
      suggestions = ["Implement recommendations", "See impact projections", "Schedule optimization"];
    } else {
      response = "I can help you with campaign analysis, performance optimization, budget allocation, and strategic insights. What specific aspect of your advertising campaigns would you like to explore?";
      suggestions = ["Campaign performance review", "ROI improvement strategies", "Budget optimization", "Market opportunities"];
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleQuickAction = (label: string) => {
    const actionMap: Record<string, string> = {
      'Performance Analysis': 'Show me detailed performance analysis for all campaigns',
      'Optimization Tips': 'What are the best optimization strategies for my campaigns?',
      'Budget Insights': 'Analyze my budget allocation and suggest improvements',
      'Campaign Metrics': 'Show me key metrics and KPIs for campaign evaluation'
    };
    
    handleSendMessage(actionMap[label] || label);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <p className="text-sm text-gray-500">Powered by advanced analytics</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Quick Actions */}
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickAction(action.label)}
                  className="justify-start h-auto p-2"
                >
                  <div className={`w-6 h-6 rounded ${action.color} flex items-center justify-center mr-2`}>
                    <action.icon className="w-3 h-3" />
                  </div>
                  <span className="text-xs">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    </div>
                    
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-7 mr-1 mb-1"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2 order-0 flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your campaigns..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
