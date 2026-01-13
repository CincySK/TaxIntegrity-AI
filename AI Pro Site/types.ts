export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface TaxDocument {
  id: string;
  name: string;
  content: string;
  type: 'policy' | 'record' | 'tax_code' | 'audit' | 'other';
  source: 'repo' | 'user'; // Distinguish between pre-loaded repo files and user uploads
  uploadDate: Date;
  isActive: boolean;
}

export interface IntegrityReport {
  status: 'compliant' | 'warning' | 'violation';
  summary: string;
  issues: string[];
}