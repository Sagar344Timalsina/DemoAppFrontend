import axiosInstance from "@/api/axiosInstance";
import type { ApiResponse } from "@/utils/APIResponse";
import type { Wrapper } from "@/utils/Wrapper";


interface FolderRequest{
    name:string,
    userId:number,
    parentFolderId?:number|null
}
interface FolderResponseDTO{
        id: number
        folderName: string
        userName: string
        userId: number
        parentFolderId?: number
        createdDate: Date
        modifiedDate: Date
}

export const createFolder = async (payload: FolderRequest): Promise<ApiResponse<Wrapper>> => {
    const res = await axiosInstance.post<ApiResponse<Wrapper>>(
        "Folder",
        payload
    );
    return res.data;
};
export const deleteFolder = async (id:number): Promise<ApiResponse<Wrapper>> => {
    const res = await axiosInstance.delete<ApiResponse<Wrapper>>(
        `Folder/${id}`
    );
    return res.data;
};


export const GetAllFolder = async (): Promise<ApiResponse<FolderResponseDTO>> => {
    const res = await axiosInstance.get<ApiResponse<FolderResponseDTO>>(
        "Folder"
    );
    return res.data;
};

export const GetParentFolder = async (): Promise<ApiResponse<FolderResponseDTO[]>> => {
    const res = await axiosInstance.get<ApiResponse<FolderResponseDTO[]>>(
        "Folder/parentFolder"
    );
    return res.data;
};

export const GetParentFolderById = async (Id:number): Promise<ApiResponse<FolderResponseDTO[]>> => {
    const res = await axiosInstance.get<ApiResponse<FolderResponseDTO[]>>(
        `Folder/parent/${Id}`
    );
    return res.data;
};