import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


export default function ConfirmPopup({
  open,
  onOpenChange,
  onConfirm,
  title,
  desc
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title:string
  desc:string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription>
           {desc}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm() // Call your delete function
              onOpenChange(false)
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
