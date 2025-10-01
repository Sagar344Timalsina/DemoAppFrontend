export  interface FolderResponseItems {
    id: number
    folderName: string
    userName: string
    userId: number
    parentFolderId?: number
    createdDate: Date
    modifiedDate: Date
    isFile :boolean
    isFolder :boolean
    FileSize :number
    FilePath :string
}

export interface Folder {
    id: number;
    name: string;
}