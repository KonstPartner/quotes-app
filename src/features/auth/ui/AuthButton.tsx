import { Link } from '@tanstack/react-router';

import { Button } from '@shadcn';
import { useAuth } from '@features/auth/model';

const AuthButton = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span
          className="text-muted-foreground w-8 truncate text-xs lg:w-15"
          title={user.username}
        >
          {user.username}
        </span>
        <Button
          className="cursor-pointer"
          type="button"
          size="sm"
          variant="outline"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <Button asChild size="sm" variant="outline">
      <Link to="/login">Login</Link>
    </Button>
  );
};

export default AuthButton;
