import { Link } from '@tanstack/react-router';

const NotFound = () => {
  return (
    <div>
      <p>Not found!</p>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFound;
