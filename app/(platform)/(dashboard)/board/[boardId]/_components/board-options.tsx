"use client";

import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

// import { deleteBoard } from "@/actions/delete-board";
// import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useAction } from "@/components/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";
interface BoardOptionsProps {
  id: string;
};

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="h-auto w-auto p-2" variant="transparent">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="px-0 pt-3 pb-3"
          side="bottom"
          align="start"
        >
          <div className="text-sm font-medium text-center text-neutral-600 pb-4">
            Board actions
          </div>
          <PopoverClose asChild>
            <Button
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
              >
                Delete this board
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Warning!</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this board? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={isLoading}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </PopoverContent>
      </Popover>

    </>
  );
};
