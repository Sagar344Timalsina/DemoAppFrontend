import axiosInstance from "@/api/axiosInstance";
import type { ApiResponse } from "@/utils/APIResponse";
import type { Wrapper } from "@/utils/Wrapper";


export const uploadFile = async (
    file: File,
    folder?: string|null,
    onProgress?: (percent: number) => void
) :Promise<ApiResponse<Wrapper>>=> {

  
    const formData = new FormData();
    formData.append("file", file);
    console.log(folder);
    const response = await axiosInstance.post<ApiResponse<Wrapper>>(
        `/File/upload?Folder=${folder}`,
        formData,
        {
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    if (onProgress) onProgress(percent);
                }
            },
        }
    );
    return response.data;

}

export const viewData = async (id: number,isFile:boolean): Promise<string> => {
  const response = await axiosInstance.get<Blob>(`/File/View/${id}?IsFile=${isFile}`, {
    responseType: "blob",
  });
  const fileUrl = URL.createObjectURL(response.data);

  return fileUrl;
};