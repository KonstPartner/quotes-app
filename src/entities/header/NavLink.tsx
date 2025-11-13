import { Link } from '@tanstack/react-router';

const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      className="text-muted-foreground hover:text-primary text-base transition-colors"
      activeProps={{
        className: 'text-primary hover:text-primary border-b border-primary',
        'aria-current': 'page',
      }}
    >
      {label}
    </Link>
  );
};

export default NavLink;
