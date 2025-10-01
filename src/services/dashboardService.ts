import axiosInstance from "@/api/axiosInstance";
import type { ApiResponse } from "@/utils/APIResponse";


// Interface for Storage Summary
export interface StorageSummary {
  totalUsedGB: number;
  maxStorageGB: number;
}

// Interface for Folder Details
export interface FolderDetail {
  folderId: number;
  folderName: string;
  totalSize: number; // size in bytes
  lastModified: string; // ISO date string
}

// Interface for Latest Folders
export interface LatestFolder {
  id: number;
  name: string;
  parentFolderId: number;
}


export interface StorageData {
  storageSummary: StorageSummary;
  folderDetails: FolderDetail[];
  latestFolders: LatestFolder[];
}


export const getDashboardData = async (): Promise<ApiResponse<StorageData>> => {
    const res = await axiosInstance.get<ApiResponse<StorageData>>(
        `Dashboard`
    );
    return res.data;
};