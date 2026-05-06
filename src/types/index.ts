export type Role = 'donor' | 'student' | 'admin';

export interface User {
  name: string;
  email: string;
  role: Role;
  phone?: string;
  idNumber?: string;
  address?: string;
  institution?: string;
  year?: string;
  avatarUrl?: string;
  totalDonated?: number;
  donations?: any[];
  applications?: any[];
  storedDocuments?: StoredDocument[];
}

export interface StoredDocument {
  name: string;
  type: 'id' | 'matric' | 'transcript' | 'proof_of_income' | 'other';
  fileName: string;
  uploadedAt: string;
}
