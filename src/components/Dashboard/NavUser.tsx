import {
    IconLogout
} from "@tabler/icons-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"



import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react"
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner";



export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {

    const [popup, setPopup] = useState<boolean>(false);
    const {signOut} =useAuth();

    const handleLogout = () => {
        setPopup(false); // close dialog after logout
        signOut();
        toast.success("Successfully logged Out!");
    }
    return (
        <>

            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="h-8 w-8 rounded-lg grayscale">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{user.name}</span>
                            <span className="text-muted-foreground truncate text-xs">
                                {user.email}
                            </span>
                        </div>

                    </SidebarMenuButton>
                    <div className="flex items-center justify-between w-full p-4 hover:bg-gray-300 rounded-[8px] cursor-pointer" onClick={() => setPopup(true)}>
                        <p>Log out</p>
                        <IconLogout className=" size-4 flex justify-center items-center" />
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>

            <Dialog open={popup} onOpenChange={setPopup}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure to logout?</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 justify-end">
                        <Button variant="outline" className="cursor-pointer" onClick={() => setPopup(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive"className="cursor-pointer" onClick={handleLogout}>
                            Confirm Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    )
}