

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { generateLink } from "@/services/FileShareService";
interface FileModalProps {
  onClose: () => void;       // close popup
  onSuccess: () => void;
  id: number
}

const ShareModal: React.FC<FileModalProps> = ({ onClose, onSuccess, id }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleShare = async () => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      var response = await generateLink(id!, email);
      if (response.isSuccess) {
        toast.success(response.value?.messages);
      }
      else {
        toast.error(response.value?.messages);
      }


      onClose();
      onSuccess();

    } catch (err: any) {
      toast.error(err.error?.description || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Share File</h1>

      <div className="mb-4">
        <Label htmlFor="email" className='pb-2'>Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button onClick={handleShare} disabled={loading} className="w-full">
        {loading ? "Sharing..." : "Share"}
      </Button>
    </div>
  );
};



export default ShareModal




