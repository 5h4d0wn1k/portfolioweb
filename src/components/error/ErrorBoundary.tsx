import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">
            {error.status} {error.statusText}
          </h1>
          <p className="text-lg text-foreground/70 mb-8">
            {error.status === 404
              ? "Oops! The page you're looking for doesn't exist."
              : "Sorry, something went wrong."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Sorry, an unexpected error has occurred.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
} 