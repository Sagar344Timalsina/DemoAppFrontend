import { Button } from "@/components/ui/button";
import { useState } from "react";
import { uploadFile } from "@/services/Fileservice";
import { toast } from "sonner";

interface FileModalProps {
  onClose: () => void;       // close popup
  onSuccess: () => void;
  id?:string|null
}
const FileModal: React.FC<FileModalProps> = ({ onClose, onSuccess,id }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.info("Please select a file first.");
      return;
    }

    try {
      const result = await uploadFile(selectedFile,id,(percent)=>{
        console.log(`Upload ${percent} completed`)
      });
      if (result.isSuccess && result.value?.status) {
        toast.success(result.value?.messages)
      }
      else {
        toast.error(result.error.description);
      }
    } catch (err: any) {
      toast.error(err.error?.description || "Something went wrong!");
    }

    onSuccess();
    onClose();
  }


  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div className="p-6 w-full bg-white rounded-lg shadow-lg flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">Upload File</h2>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <p className="text-gray-500">
          Drag & Drop file here or click to select
        </p>
      </div>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="text-sm text-gray-600">
        Selected file: {selectedFile ? selectedFile.name : "None"}
      </div>

      <Button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition" onClick={handleUpload}>
        Upload
      </Button>
      <Button className="bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700 transition" onClick={() => {
        setSelectedFile(null);
        onClose();
      }}>
        Cancel
      </Button>
    </div>
  );
};

export default FileModal;
