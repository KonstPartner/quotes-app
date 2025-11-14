import { ReactNode, Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-destructive">Something went wrong.</p>
              <button
                onClick={() => resetErrorBoundary()}
                className="bg-primary text-primary-foreground rounded-md px-4 py-2"
              >
                Try again
              </button>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <p className="text-muted-foreground text-lg font-medium">
                  Loading...
                </p>
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Loader;
