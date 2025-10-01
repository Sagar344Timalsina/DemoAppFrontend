export const setToken=(token:string)=>localStorage.setItem("AppToken",token);
export const getToken=():string|null=>localStorage.getItem("AppToken");
export const removeToken=()=>localStorage.removeItem("AppToken");