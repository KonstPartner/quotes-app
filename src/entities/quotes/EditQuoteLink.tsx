import { Link } from '@tanstack/react-router';
import { Pencil } from 'lucide-react';

import { Quote } from '@features/quotes/model';

const EditQuoteLink = ({ id }: { id: Quote['id'] }) => {
  return (
    <Link
      to="/user-quotes/$id/edit"
      params={{ id: String(id) }}
      aria-label={`Edit quote #${id}`}
      className="border-border bg-card/80 hover:bg-muted/80 text-muted-foreground hover:text-foreground absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs shadow-sm transition"
    >
      <Pencil className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
};

export default EditQuoteLink;
