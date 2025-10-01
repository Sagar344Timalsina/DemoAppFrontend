// components/dashboard/RecentFolders.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {  LatestFolder } from "@/services/dashboardService";
import { Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface RecentFolderProp {
  FolderDetails?: LatestFolder[]
}



export function RecentFolders({ FolderDetails }: RecentFolderProp) {

const navigate = useNavigate();
const navigateToFolder = (id: number) => {
  navigate(`/files/${id}`)
}
  return (
    <Card className="mb-6" >
      <CardHeader>
        <CardTitle>Recent Folders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FolderDetails?.map((folder) => (
            <div onClick={() => navigateToFolder(folder.id)}
              key={folder.name}
              className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4 hover:bg-gray-200 cursor-pointer"
            >
              <Folder className="h-6 w-6 mb-2 text-blue-500" />
              <span className="text-sm">{folder.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
