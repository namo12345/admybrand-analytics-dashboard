// Component Type: Manual
// Interactive hero page with animated elements and feature showcase

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Zap, 
  Brain, 
  Globe, 
  Users, 
  DollarSign,
  Eye,
  MousePointer,
  ArrowRight,
  Sparkles,
  Bot,
  ChevronRight,
  Play,
  LogIn
} from 'lucide-react';

interface HeroPageProps {
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
}

export default function HeroPage({ onNavigateToDashboard, onNavigateToLogin }: HeroPageProps) {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const metrics = [
    { value: '$2.4M', label: 'Total Ad Spend', icon: DollarSign, color: 'text-green-600' },
    { value: '45.2M', label: 'Impressions', icon: Eye, color: 'text-blue-600' },
    { value: '892K', label: 'Clicks', icon: MousePointer, color: 'text-purple-600' },
    { value: '3.8x', label: 'Average ROI', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analytics',
      description: 'Get intelligent insights and recommendations powered by advanced machine learning algorithms.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: Globe,
      title: 'Omnichannel Management',
      description: 'Manage campaigns across TV, Digital, Outdoor, Radio, Print, and Social media from one platform.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Target,
      title: 'Real-time Optimization',
      description: 'Optimize your campaigns in real-time with automated bidding and budget allocation.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Users,
      title: 'Audience Intelligence',
      description: 'Understand your audience better with detailed demographic and behavioral insights.',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-fade-in-up');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ADmyBRAND
              </h1>
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Features</Button>
              <Button variant="ghost" size="sm">Pricing</Button>
              <Button variant="ghost" size="sm">Contact</Button>
              <Button variant="outline" onClick={onNavigateToLogin}>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
              <Button onClick={onNavigateToDashboard} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Launch Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                  <Bot className="w-3 h-3 mr-1" />
                  AI-Powered Analytics Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                    Ad Campaigns
                  </span>
                  with AI Intelligence
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Manage omnichannel advertising campaigns with AI-powered insights, 
                  real-time optimization, and comprehensive analytics across all media types.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={onNavigateToDashboard}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Watch Demo
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>

            {/* Animated Metrics Dashboard Preview */}
            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Live Campaign Metrics</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {metrics.map((metric, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-500 ${
                        currentMetric === index 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 scale-105' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          currentMetric === index ? 'bg-white shadow-sm' : 'bg-white'
                        }`}>
                          <metric.icon className={`w-4 h-4 ${metric.color}`} />
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${currentMetric === index ? 'text-gray-900' : 'text-gray-700'}`}>
                            {metric.value}
                          </p>
                          <p className="text-xs text-gray-500">{metric.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Campaign Performance</span>
                    <span className="text-sm font-medium text-green-600">+24.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>

              {/* Floating AI Assistant Preview */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">AI Assistant</p>
                    <p className="text-xs text-gray-500">Ready to help!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge className="mb-4">Platform Features</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need 
              to run successful omnichannel advertising campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="animate-on-scroll border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted by leading brands worldwide
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of companies optimizing their ad spend with ADmyBRAND
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-on-scroll">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Active Campaigns</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-4xl font-bold text-white mb-2">$50M+</div>
              <div className="text-blue-100">Ad Spend Managed</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">AI-Powered Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to transform your advertising?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start your free trial today and see how AI can revolutionize your campaign management.
            </p>
            <Button 
              size="lg" 
              onClick={onNavigateToDashboard}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-12 py-6"
            >
              Get Started Now
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ADmyBRAND</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 ADmyBRAND. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
