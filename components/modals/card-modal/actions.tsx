"use client";

import { toast } from "sonner";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";

// import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
// import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/type";
import { useCardModal } from "@/components/hooks/use-card-modal";
import { useAction } from "@/components/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import ConfirmDeleteDialog from "@/components/alert/alert-dialog";

interface ActionsProps {
  data: CardWithList;
};

export const Actions = ({
  data,
}: ActionsProps) => {
  const params = useParams();
  const cardModal = useCardModal();

  const {
    execute: executeCopyCard,
    isLoading: isLoadingCopy,
  } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const {
    execute: executeDeleteCard,
    isLoading: isLoadingDelete,
  } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" deleted`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Actions
      </p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="sm"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <ConfirmDeleteDialog
        onDelete={onDelete}
        isLoading={isLoadingDelete}
        title="Warning!"
        description={`Are you sure you want to delete card ${data.title}. This action cannot be undone.`}
      >
        <Button
          disabled={isLoadingDelete}
          variant="gray"
          className="w-full justify-start"
          size="sm"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </ConfirmDeleteDialog>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
