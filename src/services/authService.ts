import axiosInstance from "@/api/axiosInstance";
import type { ApiResponse } from "@/utils/APIResponse";

interface LoginPayload {
    email: string,
    password: string
}

interface RegisterPayload {
    name: string,
    email: string,
    password: string
}


interface LoginValue {
    token: string;
    refreshToken: string;
}

interface UserDetails {
    id: number,
    userName: string,
    email: string,
    userRoles: [
        roelId: number,
        roleName: string
    ]
}

//{
//   "value": "User registered successfully.",
//   "isSuccess": true,
//   "isFailure": false,
//   "error": {
//     "code": "",
//     "description": "",
//     "type": 0
//   }
// }



export const login = async (payload: LoginPayload): Promise<ApiResponse<LoginValue>> => {
    const res = await axiosInstance.post<ApiResponse<LoginValue>>(
        "Identity/login-user",
        payload
    );
    return res.data;
};

export const register = async (payload: RegisterPayload): Promise<ApiResponse<string>> => {
    var res = await axiosInstance.post<ApiResponse<string>>("Identity/register-user", payload)
    return res.data
}

export const me = async (): Promise<ApiResponse<UserDetails>> => {
    var res = await axiosInstance.get<ApiResponse<UserDetails>>(`Identity/Logged-User-Details`);
    return res.data
}