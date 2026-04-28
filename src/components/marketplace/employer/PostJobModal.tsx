"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateListingMutation, useUpdateListingMutation } from "@/services/marketplace/employer/employer-mutations";
import { MarketplaceListing } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

interface PostJobModalProps {
  open: boolean;
  onClose: () => void;
  editListing?: MarketplaceListing | null;
}

export default function PostJobModal({ open, onClose, editListing }: PostJobModalProps) {
  const [title, setTitle] = useState(editListing?.title ?? "");
  const [description, setDescription] = useState(editListing?.description ?? "");
  const [requirements, setRequirements] = useState(editListing?.requirements ?? "");
  const [salaryMin, setSalaryMin] = useState(String(editListing?.salaryMin ?? ""));
  const [salaryMax, setSalaryMax] = useState(String(editListing?.salaryMax ?? ""));
  const [location, setLocation] = useState(editListing?.location ?? "");
  const [category, setCategory] = useState(editListing?.category ?? "");

  const { createListingMutation, isPending: isCreating } = useCreateListingMutation();
  const { updateListingMutation, isPending: isUpdating } = useUpdateListingMutation();
  const isPending = isCreating || isUpdating;

  function handleClose() {
    setTitle(""); setDescription(""); setRequirements("");
    setSalaryMin(""); setSalaryMax(""); setLocation(""); setCategory("");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      title,
      description,
      requirements,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      location,
      category,
    };
    try {
      if (editListing) {
        await updateListingMutation({ id: editListing.id, payload });
        toast.success("Listing updated");
      } else {
        await createListingMutation(payload);
        toast.success("Job posted");
      }
      handleClose();
    } catch {
      toast.error(editListing ? "Failed to update listing" : "Failed to post job");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editListing ? "Edit Listing" : "Post a Job"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pj-title">Job Title</Label>
            <Input id="pj-title" placeholder="e.g. Senior Software Engineer" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pj-description">Description</Label>
            <Textarea id="pj-description" placeholder="Role responsibilities and overview..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pj-requirements">Requirements</Label>
            <Textarea id="pj-requirements" placeholder="Required skills and qualifications..." value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={3} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pj-salary-min">Salary Min (USD)</Label>
              <Input id="pj-salary-min" type="number" min={0} placeholder="60000" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pj-salary-max">Salary Max (USD)</Label>
              <Input id="pj-salary-max" type="number" min={0} placeholder="100000" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pj-location">Location</Label>
              <Input id="pj-location" placeholder="e.g. Kuala Lumpur" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pj-category">Category</Label>
              <Input id="pj-category" placeholder="e.g. Engineering" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : editListing ? "Save Changes" : "Post Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
