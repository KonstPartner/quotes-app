import { Dispatch, SetStateAction } from 'react';
import { Menu } from 'lucide-react';

const Burger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      type="button"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-controls="mobile-nav"
      onClick={() => setIsOpen((prev) => !prev)}
      className="border-border text-foreground hover:bg-muted flex cursor-pointer items-center justify-center rounded-md"
    >
      <Menu className="h-8 w-8" aria-hidden="true" />
    </button>
  );
};

export default Burger;
