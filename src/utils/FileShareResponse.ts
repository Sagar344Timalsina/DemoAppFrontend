export interface FileShareResponseModel {
  id: number;
  fileId: number;
  expiresAt: string;        // ISO date string from API
  created: string;          // ISO date string from API
  lastModified: string; 
  email:string,    // ISO date string from API
  isUsed: boolean;
  isActive: boolean;
  fileName: string;
  userName: string;
  originalName: string;
  fileSize: number;         // decimal maps to number in TS
}
