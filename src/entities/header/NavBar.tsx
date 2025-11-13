import { NavLink } from '@entities/header';
import { NAV_LINKS } from '@constants';

const NavBar = () => {
  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center text-sm font-medium"
    >
      <ul className="flex items-center gap-6">
        {NAV_LINKS.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} label={label} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
