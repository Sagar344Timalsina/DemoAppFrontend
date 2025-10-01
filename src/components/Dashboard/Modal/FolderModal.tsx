import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"; // Adjust path according to your project
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { SelectContent, Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createFolder } from '@/services/folderService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { type FolderResponseItems, type Folder } from '@/utils/FolderResponseItems';
import { useLocation } from 'react-router-dom';


interface FolderModalProps {
    data: FolderResponseItems[];
    onClose: () => void;       // close popup
    onSuccess: () => void;
}

const FolderModal: React.FC<FolderModalProps> = ({ data, onClose, onSuccess }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [folderName, setFolderName] = useState("");
    const [parentFolderId, setParentFolderId] = useState<number | null>(null);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(false);

    interface FolderRequest {
        name: string,
        userId: number,
        parentFolderId?: number | null
    }



    useEffect(() => {

        const fetchFolders = async () => {
            try {
                setLoading(true);

                const rawFolder = data;
                const res = rawFolder.map(folder => ({
                    id: folder.id,
                    name: folder.folderName
                }));
                setFolders(res);


            } catch (error) {
                console.error("Error fetching folders:", error);
                setFolders([]);
            }
            finally {
                setLoading(false);
            }
        };

        fetchFolders();
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            var data: FolderRequest = {
                name: folderName,
                userId: user.id,
                parentFolderId: parentFolderId
            }
            console.log(data);
            const response = await createFolder(data);
            console.log(response);
            if (response.isSuccess && response.value?.status) {
                toast.success(response.value?.messages);
                onSuccess();
                onClose();
            }
            else {
                toast.error(response.value?.messages);
            }
        }
        catch (err: any) {
            toast.error(err.error?.description || "Something went wrong!");
        }
        finally {
            setLoading(false);
        }
        navigate(location.pathname);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 w-80">
            {/* <h2 className="text-xl font-semibold">Create New Folder</h2> */}

            <div>
                <Label htmlFor="folderName" className='pb-2'>Folder Name</Label>
                <Input
                    id="folderName"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Folder Name"
                />
            </div>

            <div>
                <Label htmlFor="parentFolder" className='pb-2'>{folders && folders.length ? "Parent Folder" : ""}</Label>
                {folders && folders.length > 0 ? (
                    <Select
                        value={parentFolderId == null ? "NO_PARENT" : parentFolderId.toString()}
                        onValueChange={(value) => {
                            if (value === "NO_PARENT") {
                                setParentFolderId(null);
                            } else {
                                setParentFolderId(parseInt(value));
                            }
                        }}
                    >
                        <SelectTrigger id="parentFolder">
                            <SelectValue placeholder="— No Parent (Root) —">
                                {parentFolderId === null
                                    ? "— No Parent (Root) —"
                                    : folders.find((f) => f.id === parentFolderId)?.name || "Select Folder"}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="NO_PARENT">— No Parent (Root) —</SelectItem>
                            {folders.map((folder) => (
                                <SelectItem key={folder.id} value={folder.id.toString()}>
                                    {folder.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    ""
                    // <p></p> // optional loading message
                )}
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Folder"}
            </Button>
        </form>
    )
}

export default FolderModal