const ErrorSection = ({ callback }: { callback: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="text-destructive">Something went wrong.</p>
      <button
        onClick={callback}
        className="bg-primary text-primary-foreground rounded-md px-4 py-2"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorSection;
