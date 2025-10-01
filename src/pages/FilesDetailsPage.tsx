import ConfirmPopup from "@/components/ConfirmPopup"
import FileModal from "@/components/Dashboard/Modal/FileModal"
import FolderModal from "@/components/Dashboard/Modal/FolderModal"
import ShareModal from "@/components/Dashboard/Modal/ShareModal"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { viewData } from "@/services/Fileservice"
import { GetParentFolderById, deleteFolder } from "@/services/folderService"
import type { FolderResponseItems } from "@/utils/FolderResponseItems"
import { Dialog } from "@radix-ui/react-dialog"
import { IconPdf } from "@tabler/icons-react"
import { Download, Edit, Folder, Image, MoreVertical, PlusCircle, Share2, Trash, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"


const FilesDetailsPage = () => {
    interface Folder {
        id: number,
        name: string,
        parentId?: number | null
    }

    const navigate = useNavigate();
    const { id } = useParams<string>();

    const numericId = parseInt(id!, 10);

    const [folders, setFolders] = useState<Folder[]>();
    const [popup, setPopup] = useState<boolean>(false);
    const [popupDelete, setPopupDelete] = useState<boolean>(false);
    const [popupName, setPopupName] = useState<string | null>(null);
    const [dropdownFolders, setDropdownFolders] = useState<FolderResponseItems[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
    const [selectedFileId, setSelectedFileId] = useState<number>(0);
    const [previewFile, setPreviewFile] = useState<{ type: "image" | "pdf" | null, url: string | null }>({
        type: null,
        url: null,
    });

    const handleClick = async (id: number, isFile: boolean, fileName: string) => {

        if (!isFile) {

            navigate(`/files/${id}`);
        } else if (fileName.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp)$/)) {
            const url = await viewData(id, isFile);

            setPreviewFile({ type: "image", url: `${url}` });
        } else if (fileName.toLowerCase().endsWith(".pdf")) {

            const url = await viewData(id, isFile);
            setPreviewFile({ type: "pdf", url: `${url}` });
        } else {
            console.warn("Unsupported file type:", fileName);
        }
    }
    interface Folder {
        id: number,
        name: string,
        parentId?: number | null
        isFile: boolean
        isFolder: boolean
    }
    const getData = async () => {
        try {
            setLoading(true);
            setFolders([]);
            if (numericId > 0) {

                const response = await GetParentFolderById(numericId);
                if (response.isSuccess && response.value) {
                    const rawFolder = response.value as FolderResponseItems[];
                    const res = rawFolder.map(folder => ({
                        id: folder.id,
                        name: folder.folderName,
                        parentFolderId: folder.parentFolderId,
                        isFile: folder.isFile,
                        isFolder: folder.isFolder
                    }));
                    setDropdownFolders(rawFolder.filter(x => x.isFolder));
                    setFolders(res);
                }
                else {
                    setFolders([]);
                }
            }
        }
        catch (err) {

        }
        finally {
            setLoading(false);
        }

    }

    const handleEdit = (Id: number) => {
        console.log(Id);
    }
    const handleDelete = async (Id: number) => {
        if (Id > 0) {
            try {
                var response = await deleteFolder(Id);
                if (response.isSuccess && response.value?.status) {
                    toast.success(response.value.messages);
                    getData();
                }
                else {
                    toast.error(response.value?.messages || "Something went wrong!");
                }

            } catch (err: any) {
                toast.error(err.error?.description || "Something went wrong!");
            }
        }
    }


    useEffect(() => {

        getData();
    }, [numericId]);


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Folders/Files Details</h1>
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
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                {folders?.map((item) => (
                    <div
                        key={item.id}
                        className="relative"
                        style={{
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            cursor: "pointer",
                        }}
                        onClick={() => handleClick(item.id, item.isFile, item.name)}
                    >
                        <Card className="@container/card w-3xs h-3xs relative">
                            <div className="absolute top-2 right-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="p-1 rounded hover:bg-gray-100"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-32">
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(item.id);
                                            }}
                                            className="flex items-center gap-2"
                                        >
                                            <Edit size={16} /> Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPopupDelete(true);
                                                setSelectedFolderId(item.id)
                                            }}
                                            className="flex items-center gap-2 text-red-600"
                                        >
                                            <Trash size={16} /> Delete
                                        </DropdownMenuItem>

                                        {item.isFile && (
                                            <>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPopup(true);
                                                        setPopupName("Share File");
                                                        setSelectedFileId(item.id);
                                                    }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Share2 size={16} /> Share
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Trigger download
                                                        const link = document.createElement("a");
                                                        link.href = `/api/File/View/${item.id}`;
                                                        link.download = item.name;
                                                        link.click();
                                                    }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Download size={16} /> Download
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <CardHeader>
                                <CardDescription>
                                    {item.isFile ? (
                                        // If it's a file, check type
                                        item.name.endsWith(".png") || item.name.endsWith(".jpg") ? (
                                            <Image className="h-28 w-28 mb-2 text-blue-300" />
                                        ) : (
                                            <IconPdf className="h-32 w-32 mb-2 text-blue-300" />
                                        )
                                    ) : (
                                        // Otherwise, it's a folder
                                        <Folder className="h-32 w-32 mb-2 text-blue-300" />
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="line-clamp-1 flex gap-2 font-medium">
                                    {item.name}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div>

            <ConfirmPopup
                open={popupDelete}
                onOpenChange={setPopupDelete}
                onConfirm={() => {
                    if (selectedFolderId !== null) {
                        handleDelete(selectedFolderId);
                    }
                }}
                title="Delete"
                desc="Are you sure you want to delete this item?"
            />


            <Dialog open={popup} onOpenChange={setPopup} >
                <DialogContent className=" ">
                    <DialogHeader>
                        <DialogTitle>{popupName}</DialogTitle>
                        <DialogDescription>
                            {popupName === "New Folder" && <span>Create a new folder here</span>}
                            {popupName === "Upload File" && <span>Upload your files here</span>}
                            {popupName === "Share File" && <span>Share your files here</span>}
                        </DialogDescription>

                    </DialogHeader>
                    <div className="py-4">
                        {popupName === "New Folder" && (
                            loading ? (
                                <div className="flex justify-center py-4">
                                    <span>Loading folders…</span>
                                </div>
                            ) : (
                                <FolderModal data={dropdownFolders} onClose={() => setPopup(false)} onSuccess={getData} />
                            )
                        )}
                        {popupName === "Upload File" && (
                            loading ? (
                                <div className="flex justify-center py-4">
                                    <span>Loading folders…</span>
                                </div>
                            ) : (
                                <FileModal onClose={() => setPopup(false)} onSuccess={getData} id={numericId.toString()} />
                            )
                        )}
                        {popupName === "Share File" && (
                            loading ? (
                                <div className="flex justify-center py-4">
                                    <span>Loading....</span>
                                </div>
                            ) : (
                                <ShareModal onClose={() => setPopup(false)} onSuccess={getData} id={selectedFileId} />
                            )
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            {previewFile.url && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-3/4 h-3/4 relative">
                        <button
                            className="absolute top-2 right-2 text-red-600 font-bold"
                            onClick={() => setPreviewFile({ type: null, url: null })}
                        >
                            ✕
                        </button>

                        {previewFile.type === "image" && (
                            <img src={previewFile.url} alt="Preview" className="w-full h-full object-contain" />
                        )}

                        {previewFile.type === "pdf" && (
                            <iframe src={previewFile.url} title="PDF Preview" className="w-full h-full" />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilesDetailsPage