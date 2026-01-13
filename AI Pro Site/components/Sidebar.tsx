import React from 'react';
import { TaxDocument } from '../types';
import { DocumentUpload } from './DocumentUpload';

interface SidebarProps {
  documents: TaxDocument[];
  onUpload: (doc: TaxDocument) => void;
  onToggleActive: (id: string) => void;
  onRemove: (id: string) => void;
  onRunIntegrityCheck: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onBack: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  onUpload,
  onToggleActive,
  onRemove,
  onRunIntegrityCheck,
  isSidebarOpen,
  setIsSidebarOpen,
  onBack
}) => {
  
  const repoDocs = documents.filter(d => d.source === 'repo');
  const userDocs = documents.filter(d => d.source !== 'repo');

  const renderDocList = (docs: TaxDocument[], emptyMsg: string, canDelete: boolean) => {
    if (docs.length === 0) {
      return (
        <div className="text-center py-4 text-slate-400">
          <p className="text-xs">{emptyMsg}</p>
        </div>
      );
    }
    return docs.map(doc => (
      <div key={doc.id} className={`p-3 rounded-lg border mb-2 transition-all ${doc.isActive ? 'bg-[#5E265E]/20 border-[#5E265E]/50 shadow-sm' : 'bg-white/5 border-transparent opacity-60'}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <input
              type="checkbox"
              checked={doc.isActive}
              onChange={() => onToggleActive(doc.id)}
              className="w-4 h-4 text-purple-600 rounded border-slate-600 bg-slate-800 focus:ring-purple-500"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-slate-200 truncate" title={doc.name}>
                {doc.name}
              </span>
              <div className="flex items-center gap-2">
                 <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                   doc.type === 'audit' ? 'bg-red-900/40 text-red-200' :
                   doc.type === 'tax_code' ? 'bg-purple-900/40 text-purple-200' :
                   'bg-slate-700 text-slate-300'
                 }`}>
                   {doc.type}
                 </span>
                 <span className="text-xs text-slate-400">&bull; {(doc.content.length / 1000).toFixed(1)}k chars</span>
              </div>
            </div>
          </div>
          {canDelete && (
            <button
              onClick={() => onRemove(doc.id)}
              className="text-slate-400 hover:text-red-400 transition-colors"
              title="Remove document"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-[#06101e]/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <button 
              onClick={onBack}
              className="group flex items-center text-xs font-semibold text-slate-400 hover:text-purple-400 mb-4 transition-colors"
            >
              <svg className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#5E265E] text-white rounded-lg flex items-center justify-center text-lg">T</span>
              TaxIntegrity
            </h1>
            <p className="text-xs text-slate-400 mt-1">RAG-Powered Compliance</p>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            
            {/* Repository Section */}
            <div className="mb-6">
              <h2 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center justify-between">
                <span>Repository Standards</span>
                <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">READ ONLY</span>
              </h2>
              {renderDocList(repoDocs, "No repository files loaded.", false)}
            </div>

            {/* User Uploads Section */}
            <div>
              <h2 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">My Workspace</h2>
              <DocumentUpload onUpload={onUpload} />
              {renderDocList(userDocs, "No personal uploads yet.", true)}
            </div>

          </div>

          <div className="p-4 border-t border-white/10 bg-black/10">
            <button
              onClick={onRunIntegrityCheck}
              disabled={documents.filter(d => d.isActive).length === 0}
              className="w-full py-2.5 px-4 bg-[#5E265E] hover:bg-[#7B2D7B] disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-lg flex items-center justify-center gap-2 border border-white/10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Run Integrity Check
            </button>
          </div>
        </div>
      </div>
    </>
  );
};