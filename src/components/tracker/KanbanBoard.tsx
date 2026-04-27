"use client";
import { COLUMNS } from "@/lib/constants";
import { useDeleteJobMutation, useUpdateJobMutation } from "@/services/tracker/mutations";
import { useGetJobsQuery } from "@/services/tracker/queries";
import { Job, JobStatus } from "@/types";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import EditJobModal from "./EditJobModal";
import JobDetailModal from "./JobDetailModal";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard() {
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJobId, setViewingJobId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useGetJobsQuery();
  const { updateJobMutation } = useUpdateJobMutation();
  const { deleteJobMutation } = useDeleteJobMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id as string;
    const newStatus = over.id as JobStatus;
    const job = jobs.find((j) => j.id === jobId);
    if (!job || job.status === newStatus) return;

    queryClient.setQueryData(["tracker-jobs"], (old: Job[] | undefined) =>
      old?.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)) ?? old
    );

    updateJobMutation({ id: jobId, data: { status: newStatus } }).catch(() => {
      queryClient.invalidateQueries({ queryKey: ["tracker-jobs"] });
      toast.error("Failed to move job");
    });
  }

  function handleDelete(id: string) {
    deleteJobMutation(id)
      .then(() => toast.success("Job deleted"))
      .catch(() => toast.error("Failed to delete job"));
  }

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              jobs={jobs.filter((j) => j.status === col.id)}
              isLoading={isLoading}
              onView={setViewingJobId}
              onEdit={setEditingJob}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DndContext>
      {editingJob && <EditJobModal job={editingJob} onClose={() => setEditingJob(null)} />}
      {viewingJobId && <JobDetailModal jobId={viewingJobId} onClose={() => setViewingJobId(null)} />}
    </>
  );
}
