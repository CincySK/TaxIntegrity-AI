import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatInterface } from './ChatInterface';
import { Message, Role, TaxDocument } from '../types';
import { generateTaxAnalysis, checkIntegrity } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

interface WorkspaceProps {
  initialDocuments: TaxDocument[];
  onBack: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ initialDocuments, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<TaxDocument[]>(initialDocuments);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: Role.USER,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateTaxAnalysis(messages, documents, userMsg.text);
      
      const modelMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: "I encountered an error analyzing your request. Please ensure you have configured your API key correctly.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunIntegrityCheck = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setIsSidebarOpen(false); // Close sidebar on mobile to show results

    const systemMsg: Message = {
      id: uuidv4(),
      role: Role.MODEL,
      text: "Running comprehensive integrity check on active documents...",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, systemMsg]);

    try {
      const report = await checkIntegrity(documents);
       const reportMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: `**Integrity Check Results**\n\n${report}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reportMsg]);
    } catch (e) {
       const errorMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: "Failed to run integrity check.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = (doc: TaxDocument) => {
    setDocuments(prev => [...prev, doc]);
  };

  const handleToggleActive = (id: string) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, isActive: !d.isActive } : d));
  };

  const handleRemove = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  // Uses transparent background to show the underlying body gradient
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full overflow-hidden text-[#eaf2ff]">
      <Sidebar 
        documents={documents}
        onUpload={handleUpload}
        onToggleActive={handleToggleActive}
        onRemove={handleRemove}
        onRunIntegrityCheck={handleRunIntegrityCheck}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onBack={onBack}
      />
      <main className="flex-1 h-full relative">
        <ChatInterface 
          messages={messages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          onSend={handleSendMessage}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      </main>
    </div>
  );
};