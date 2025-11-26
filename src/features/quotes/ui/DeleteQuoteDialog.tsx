import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@shadcn';
import { useDeleteLocalQuote } from '@features/quotes/api';
import type { LocalQuote } from '@features/quotes/model';

const DeleteQuoteDialog = ({ localQuote }: { localQuote: LocalQuote }) => {
  const { id, userId } = localQuote;
  const [open, setOpen] = useState(false);
  const { mutate, isPending, error } = useDeleteLocalQuote();

  const handleConfirm = () => {
    mutate(
      { id, userId },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="border-border bg-card/80 text-destructive hover:bg-destructive/10 absolute right-2 bottom-2 inline-flex h-8 w-8 items-center justify-center rounded-full border text-[0.7rem] disabled:opacity-50"
          aria-label="Delete this quote"
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this quote?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-muted-foreground text-sm">
              <p>
                This action cannot be undone. This quote will be permanently
                removed.
              </p>
              {error && (
                <p className="text-destructive mt-2" role="alert">
                  {error.message}
                </p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </AlertDialogCancel>

          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? 'Deleting…' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteQuoteDialog;
