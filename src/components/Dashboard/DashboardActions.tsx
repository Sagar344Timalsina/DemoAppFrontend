
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import FolderModal from "./Modal/FolderModal";
import FileModal from "./Modal/FileModal";
// import ShareModal from "./Modal/ShareModal";
import type { FolderResponseItems } from "@/utils/FolderResponseItems";
import { GetParentFolder } from "@/services/folderService";

export function DashboardActions() {
  const [popup, setPopup] = useState<boolean>(false);
  const [popupName, setPopupName] = useState<string | null>(null);
  const [folders, setFolders] = useState<FolderResponseItems[]>([]);
  const [loading, setLoading] = useState(false);




   const fetchFolders = async () => {
      try {
        setLoading(true);
        const response = await GetParentFolder();
        if (response.isSuccess && response.value) {
          const rawFolder = response.value as FolderResponseItems[];

          setFolders(rawFolder);
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
        setFolders([]);
      }
      finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button className="flex items-center gap-2" onClick={() => {
          setPopupName("New Folder");
          setPopup(true);
        }}>
          <PlusCircle size={16} /> New Folder
        </Button>
        <Button variant="secondary" className="flex items-center gap-2" onClick={() => {
          setPopupName("Upload File");
          setPopup(true);
        }}>
          <Upload size={16} /> Upload File
        </Button>
        {/* <Button variant="outline" className="flex items-center gap-2" onClick={() => {
          setPopupName("Share Link");
          setPopup(true);
        }}>
          <Share2 size={16} /> Share Link
        </Button> */}
      </div>

      <Dialog open={popup} onOpenChange={setPopup} >
        <DialogContent className=" ">
          <DialogHeader>
            <DialogTitle>{popupName}</DialogTitle>
            <DialogDescription>
              {popupName === "New Folder" && <span>Create a new folder here</span>}
              {popupName === "Upload File" && <span>Upload your files here</span>}
              {popupName === "Share Link" && <span>Generate a shareable link</span>}
            </DialogDescription>

          </DialogHeader>
          <div className="py-4">
            {popupName === "New Folder" && (
              loading ? (
                <div className="flex justify-center py-4">
                  <span>Loading folders…</span>
                </div>
              ) : (
                <FolderModal data={folders} onClose={() => setPopup(false)}
                  onSuccess={fetchFolders}/>
              )
              // <input placeholder="Folder name..." className="border rounded p-2 w-full" />
              // <FolderModal data={folders}/>
            )}
            {popupName === "Upload File" && (
              // <input type="file" className="w-full" />
              <FileModal onClose={() => setPopup(false)} onSuccess={fetchFolders} />
            )}
            {/* {popupName === "Share Link" && (
              // <input placeholder="Enter email to share..." className="border rounded p-2 w-full" />
              <ShareModal />
            )} */}
          </div>
        </DialogContent>
      </Dialog>


    </>
  );
}
