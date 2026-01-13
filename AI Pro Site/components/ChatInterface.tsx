import React, { useRef, useEffect } from 'react';
import { Message, Role } from '../types';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  setInput: (s: string) => void;
  isLoading: boolean;
  onSend: () => void;
  onOpenSidebar: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  setInput,
  isLoading,
  onSend,
  onOpenSidebar
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent relative">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#06101e] border-b border-white/10 p-4 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-bold text-white">TaxIntegrity</h2>
        <button onClick={onOpenSidebar} className="text-slate-300 p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
            <svg className="w-20 h-20 mb-4 text-[#5E265E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium text-slate-200">Ready to analyze tax documents</p>
            <p className="text-sm">Upload a policy or financial record to begin.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 md:p-6 shadow-md ${
                  msg.role === Role.USER
                    ? 'bg-[#5E265E] text-white rounded-br-none'
                    : 'bg-[#0a1d38]/90 border border-white/10 text-slate-200 rounded-bl-none'
                } ${msg.isError ? 'bg-red-900/50 border-red-800 text-red-200' : ''}`}
              >
                {msg.role === Role.MODEL && (
                  <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
                    <div className="w-5 h-5 bg-[#7B2D7B] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                       TaxIntegrity Analysis
                    </span>
                  </div>
                )}
                <div className={`prose ${msg.role === Role.USER ? 'prose-invert' : 'prose-invert'} max-w-none text-sm md:text-base leading-relaxed`}>
                   <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#06101e]/80 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about compliance, specific codes, or integrity checks..."
            className="w-full pl-4 pr-14 py-3 bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-[#5E265E] focus:border-transparent resize-none overflow-hidden min-h-[50px] max-h-[150px] transition-all"
            style={{ height: inputRef.current ? `${inputRef.current.scrollHeight}px` : 'auto' }}
            disabled={isLoading}
          />
          <button
            onClick={onSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 bottom-2.5 p-2 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? 'bg-[#5E265E] text-white hover:bg-[#7B2D7B] shadow-sm'
                : 'bg-white/10 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-center text-xs text-slate-500 mt-2">
          AI can make mistakes. Verify important tax information with official sources.
        </p>
      </div>
    </div>
  );
};