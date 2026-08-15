export type Role = 'seeker' | 'student' | 'founder' | 'donor' | 'admin';
export type Gender = 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
export type DonorType = 'individual' | 'company';

export interface CompanyProfile {
  companyName: string;
  registrationNumber: string;   // hashed server-side
  vatNumber?: string;           // hashed server-side
  companyAddress: string;
  authorisedRepresentative: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  role: Role;
  gender?: Gender;
  phone?: string;
  idNumber?: string;            // hashed server-side
  address?: string;
  institution?: string;
  year?: string;
  countryCode?: string;
  city?: string;
  emailVerified?: boolean;
  interests?: unknown[];
  consents?: Record<string, boolean>;
  avatarUrl?: string;
  // donor-specific
  donorType?: DonorType;
  company?: CompanyProfile;
  totalDonated?: number;
  donations?: any[];
  // student-specific
  applications?: any[];
  storedDocuments?: StoredDocument[];
}

export interface StoredDocument {
  name: string;
  type: 'id' | 'matric' | 'transcript' | 'proof_of_income' | 'other';
  fileName: string;
  uploadedAt: string;
}

export interface StoredDocument {
  name: string;
  type: 'id' | 'matric' | 'transcript' | 'proof_of_income' | 'other';
  fileName: string;
  uploadedAt: string;
}
