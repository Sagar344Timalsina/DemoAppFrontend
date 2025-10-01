import SharedByMe from "@/components/Shared/SharedByMe"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { FileShareResponseModel } from "@/utils/FileShareResponse"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { getSharedData, updateSharedActiveData } from "@/services/FileShareService"
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}



// async function updateFileShareStatus(fileId: string, isActive: boolean): Promise<Wr> {
//     return new Promise((resolve) => {
//         setTimeout(() => { // Simulate API success/failure
//             if (Math.random() > 0.1) { // 90% success rate
//                 resolve({ success: true, message: "Status updated successfully!" });
//             }
//             else { resolve({ success: false, message: "Failed to update status on server." }); }
//         }, 700); // Simulate network latency 
//     });
// }


const updateFileShareStatus = async (Id: number, isActive: boolean) => {
    try {
        var res = await updateSharedActiveData(Id, isActive);
        if (res.isSuccess && res.value?.status) {
            return { success: true, message: res.value?.messages };
        } else {
            return { success: false, message: res.value?.messages ?? "Unknown error" };
        }
    } catch (err: any) {
        return { success: false, message: err?.Error?.description ?? "Network error" };
    }

}
export const columns: ColumnDef<FileShareResponseModel>[] = [

    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "fileName",
        header: "File Name"
    },
    {
        accessorKey: "fileSize",
        header: "Size",
        cell: ({ row }) => {
            const size = row.getValue("fileSize") as number // Assuming size is in bytes, convert to human-readable format 
            const formatted = new Intl.NumberFormat("en-US", { notation: "compact", style: "unit", unit: "byte", unitDisplay: "short", }).format(size);
            return <div className="text-right font-medium">{formatted}</div>
        },

    },
    {
        accessorKey: "isUsed",
        header: "Seen",
        cell: ({ row }) => {
            const active = row.getValue("isUsed") as boolean
            return (
                <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                >
                    {active ? "Seen" : "Not Seen"}
                </div>
            )
        },
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            const file = row.original; // Get the full file object to access its ID 
            const initialActiveState = row.getValue("isActive") as boolean;
            const [isActive, setIsActive] = useState(initialActiveState);
            const [isUpdating, setIsUpdating] = useState(false);

            const handleSwitchChange = async (checked: boolean) => {
                setIsActive(checked); // Optimistically update the UI setIsUpdating(true); // Disable switch 
                try {
                    const response = await updateFileShareStatus(file.id, checked); // Call your API 
                    if (response.success) {
                        toast.success("File status updated"); // If your table data needs to be re-synced after an update, // you might trigger a table refresh here or update a global state. 
                    } else { // If API call failed, revert the UI switch state 
                        setIsActive(!checked);
                        toast.error("Failed to update file status", { description: response.message || "Please try again.", });
                    }
                }
                catch (error) {
                    console.error("Error updating file status:", error);
                    setIsActive(!checked); // Revert on network error 
                    toast.error("Network error", { description: "Could not connect to the server. Please check your internet connection.", });
                }
                finally {
                    setIsUpdating(false); // Re-enable switch 
                }
            };


            return (<div className="flex items-center" >
                <Switch checked={isActive} onCheckedChange={handleSwitchChange} disabled={isUpdating} />
            </div >);
        },
    },
    {
        accessorKey: "expiresAt",
        header: "Expires At",
        // cell: ({ row }) => {
        //     const expires = new Date(row.getValue("expiresAt") as string)
        //     return <div>{expires.toLocaleDateString()} {expires.toLocaleTimeString()}</div>
        // },
        cell: ({ row }) => {
            const expiresValue = row.getValue("expiresAt") as string; // Ensure expiresValue is a valid date string or Date object 
            const expires = new Date(expiresValue); // Check if the date is valid before formatting
            if (isNaN(expires.getTime())) { return <div>Invalid Date</div>; }
            // Format date and time 
            const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', };
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: '2-digit', minute: '2-digit', hour12: true,
                // Use 12-hour format with AM/PM 
            };
            const formattedDate = expires.toLocaleDateString(undefined, dateOptions); const formattedTime = expires.toLocaleTimeString(undefined, timeOptions);
            return (<div> {formattedDate} {formattedTime} </div>);
        },
    },
    {
        accessorKey: "created",
        header: "Created Date",
        cell: ({ row }) => {
            const expiresValue = row.getValue("created") as string; // Ensure expiresValue is a valid date string or Date object 
            const expires = new Date(expiresValue); // Check if the date is valid before formatting
            if (isNaN(expires.getTime())) { return <div>Invalid Date</div>; }
            // Format date and time 
            const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', };
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: '2-digit', minute: '2-digit', hour12: true,
                // Use 12-hour format with AM/PM 
            };
            const formattedDate = expires.toLocaleDateString(undefined, dateOptions); const formattedTime = expires.toLocaleTimeString(undefined, timeOptions);
            return (<div> {formattedDate} {formattedTime} </div>);
        },
    },
    {
        accessorKey: "userName",
        header: "User Name"
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const file = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(file.id.toString())}>
                            Copy file ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View file details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
export const payments: FileShareResponseModel[] = [
    {
        id: 1,
        fileId: 1,
        expiresAt: new Date().toISOString(),
        created: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        email: "m@example.com",
        isActive: true,
        isUsed: false,
        fileName: "abc.png",
        userName: "Sagar",
        originalName: "sdjdsldsks.png",
        fileSize: 10433434
    },
    {
        id: 1,
        fileId: 101,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day later
        created: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        lastModified: new Date().toISOString(),
        isUsed: false,
        email: "m@example.com",
        isActive: true,
        fileName: "ProjectProposal.pdf",
        originalName: "Proposal_v1.pdf",
        userName: "Alice Johnson",
        fileSize: 245678, // in bytes
    },


]

const SharedPage = () => {
    const [data, setData] = useState<FileShareResponseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = async () => {
        try {
            setLoading(true);
            var res = await getSharedData();
            if (res.isSuccess) {
                setData(res.value!);
            }

        } catch (error: any) {

        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => { getData() }, [])


    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Shared</h1>
            <div className="flex flex-wrap gap-3 mb-6">
                {/* <Tabs defaultValue="SharedByMe" className="w-fit">
                    <TabsList>
                        <TabsTrigger value="SharedByMe">Shared By Me</TabsTrigger>
                        <TabsTrigger value="SharedToMe">Shared To Me</TabsTrigger>
                    </TabsList>
                    <TabsContent value="SharedByMe"><SharedByMe/></TabsContent>
                    <TabsContent value="SharedToMe"><SharedToMe/></TabsContent>
                </Tabs> */}
                {loading || !data ? "" : <SharedByMe columns={columns} data={data} />}

            </div>
        </div>
    )
}

export default SharedPage