import axiosInstance from "@/api/axiosInstance";
import type { ApiResponse } from "@/utils/APIResponse";
import type { Wrapper } from "@/utils/Wrapper";
import { type FileShareResponseModel } from "@/utils/FileShareResponse";


export const generateLink = async (fileId:number,email:string): Promise<ApiResponse<Wrapper>> => {
    const res = await axiosInstance.post<ApiResponse<Wrapper>>(
        `FileShare/generate?fileId=${fileId}&email=${email}`
    );
    return res.data;
};



export const getSharedData = async (): Promise<ApiResponse<FileShareResponseModel[]>> => {
    const res = await axiosInstance.get<ApiResponse<FileShareResponseModel[]>>(
        `FileShare`
    );
    return res.data;
};

export const updateSharedActiveData = async (Id:number,IsActive:boolean): Promise<ApiResponse<Wrapper>> => {
    const res = await axiosInstance.put<ApiResponse<Wrapper>>(
        `FileShare/revoke?Id=${Id}&IsActive=${IsActive}`
    );
    return res.data;
};