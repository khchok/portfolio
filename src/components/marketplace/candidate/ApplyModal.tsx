"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApplyMutation } from "@/services/marketplace/candidates/candidates-mutations";
import { useState } from "react";
import { toast } from "sonner";

interface ApplyModalProps {
  listingId: string | null;
  listingTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplyModal({ listingId, listingTitle, onClose, onSuccess }: ApplyModalProps) {
  const [coverText, setCoverText] = useState("");
  const { applyMutation, isPending } = useApplyMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!listingId) return;
    try {
      await applyMutation({ jobId: listingId, coverText });
      toast.success("Application submitted!");
      setCoverText("");
      onSuccess();
    } catch {
      toast.error("Failed to submit application. You may have already applied.");
    }
  }

  return (
    <Dialog open={!!listingId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Apply — {listingTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cover-text">Cover Letter / Note</Label>
            <Textarea
              id="cover-text"
              placeholder="Tell the employer why you're a great fit..."
              value={coverText}
              onChange={(e) => setCoverText(e.target.value)}
              rows={5}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
