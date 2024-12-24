import { Navigate } from 'react-router-dom';
import { paths } from 'enums';

interface ErrorBoundaryProps {
	redirectTo?: string;
}

export default function ErrorBoundary({
	redirectTo = paths.error,
}: ErrorBoundaryProps) {
	return <Navigate to={redirectTo} replace />;
}
