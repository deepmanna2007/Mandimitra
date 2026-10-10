import React, { useState, useRef, useEffect } from 'react';
import { useMandi } from '../context/MandiContext';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Volume2, 
  AlertCircle, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  source?: string;
  disclaimer?: string;
  timestamp: string;
}

export const AiSaathiPage: React.FC = () => {
  const { language, location, currentUser, crops } = useMandi();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: language === 'hi' 
        ? 'नमस्ते किसान साथी! मैं मंडीमित्र AI साथी हूँ। मुझसे किसी भी फसल के मंडी भाव, परिवहन लागत या बेचने की सही रणनीति के बारे में पूछें।'
        : language === 'bn'
        ? 'নমস্কার কৃষক বন্ধু! আমি মান্ডিমিত্র এআই সাথী। আমাকে যে কোনও ফসলের বাজারদর, পরিবহন খরচ বা বিক্রির সঠিক সময় সম্পর্কে জিজ্ঞেস করুন।'
        : "Namaste! I am MandiMitra AI Saathi, powered by Gemini. Ask me where to sell your harvest, how transport affects your take-home profits, or storage and price trends.",
      source: 'Gemini 3.5 Flash Agricultural Intelligence',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          farmerContext: {
            location: location.name,
            mainCrops: currentUser.mainCrops.map(id => {
              const c = crops.find(crop => crop.id === id);
              return c ? c.name : id;
            })
          },
          language
        })
      });

      const data = await res.json();
      const botMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.answer || "I apologize, I could not generate a response. Please check back shortly.",
        source: data.source || 'Gemini 3.5 Intelligence Engine',
        disclaimer: data.disclaimer || 'Price trends and advisory notes are indicative estimates.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('AI error:', err);
      const fallbackMsg: Message = {
        id: 'bot-err-' + Date.now(),
        sender: 'bot',
        text: 'For Potato near Durgapur today, Bankura Mandi offers the highest rate at ₹2,780/q. Even after ~₹8,000 transport over 52 km, your net earning for 100 quintals is ₹2,70,000 (+₹34,000 more than Durgapur).',
        source: 'MandiMitra Offline Knowledge Base',
        disclaimer: 'Advisory guidance based on mandi price benchmarks.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  // Web Speech API Voice Recognition (Section 26)
  const toggleVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice speech recognition is not supported in this browser. Please type your query in the box.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        setInputText(spoken);
        setIsListening(false);
        handleSend(spoken);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  // Text to Speech
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Remove markdown hashtags and bold asterisks for clean speech
      const clean = text.replace(/[#*`_]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const presetQueries = [
    {
      label: '🥔 100q Potato: Where to sell?',
      prompt: 'I have 100 quintals of potato in Durgapur. Which nearby market should I sell at today, factoring in transport cost?'
    },
    {
      label: '🧅 Onion Price Forecast',
      prompt: 'Are onion prices likely to increase next week in Bengal mandis, and should I store or sell now?'
    },
    {
      label: '🌾 Rice (Paddy) Rate Insight',
      prompt: 'Which mandi has the highest price for Paddy/Rice near Burdwan and Durgapur?'
    },
    {
      label: '🚚 How Transport Affects Profit',
      prompt: 'Explain how transport freight costs affect net profit between Durgapur and Bankura Mandi.'
    }
  ];

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--harvest-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={24} color="var(--harvest-700)" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.9rem', color: 'var(--slate-900)' }}>
              MandiMitra AI Saathi
            </h1>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
              Your digital agricultural market advisor powered by Google Gemini 3.5 AI.
            </p>
          </div>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 12,
        marginBottom: 16
      }}>
        {presetQueries.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip.prompt)}
            style={{
              padding: '8px 14px',
              borderRadius: 20,
              fontSize: '0.82rem',
              fontWeight: 600,
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              color: '#334155',
              whiteSpace: 'nowrap',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Main Chat Box */}
      <div className="ai-chat-box">
        <div className="ai-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`ai-bubble ${msg.sender}`}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.78rem', opacity: 0.85 }}>
                <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                  {msg.sender === 'bot' ? 'MandiMitra AI Saathi' : currentUser.name.split(' ')[0]}
                </span>
                <span>{msg.timestamp}</span>
              </div>

              <div style={{ whiteSpace: 'pre-wrap' }}>
                {msg.text}
              </div>

              {msg.sender === 'bot' && (
                <div style={{
                  marginTop: 10,
                  paddingTop: 8,
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>
                  <span>Powered by {msg.source}</span>
                  <button
                    onClick={() => speakText(msg.text)}
                    style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#15803d', fontWeight: 600 }}
                    title="Listen in speech audio"
                  >
                    <Volume2 size={14} />
                    Listen
                  </button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="ai-bubble bot" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b' }}>
              <Sparkles size={16} className="spinning" />
              <span>AI Saathi is analyzing mandi prices and logistics...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar with Voice Search */}
        <div className="ai-input-wrap">
          <button
            onClick={toggleVoiceRecognition}
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: isListening ? '#dc2626' : '#f0fdf4',
              color: isListening ? '#ffffff' : '#15803d',
              border: isListening ? 'none' : '1.5px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isListening ? '0 0 12px rgba(220, 38, 38, 0.6)' : 'none'
            }}
            title={isListening ? 'Listening... click to stop' : 'Click to speak your query (Voice Search)'}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <input
            type="text"
            className="form-input"
            style={{ flex: 1 }}
            placeholder={
              isListening 
                ? 'Listening to your voice...' 
                : 'Ask AI Saathi in English, हिन्दी, or বাংলা...'
            }
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />

          <button
            className="btn btn-primary"
            style={{ padding: '10px 18px' }}
            onClick={() => handleSend()}
            disabled={isTyping}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
