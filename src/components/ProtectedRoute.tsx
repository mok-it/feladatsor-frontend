import { ReactNode } from 'react';
import { Role } from '@/generated/graphql';
import { useRoleBasedAccess } from '@/util/auth';
import { Alert, Box, Typography } from '@mui/material';

interface ProtectedRouteProps {
  /**
   * Required roles to access this route
   * User must have at least one of these roles (ADMIN bypasses all checks)
   */
  roles: Role[];
  /**
   * Children to render if user has access
   */
  children: ReactNode;
  /**
   * Whether to require ALL roles instead of just one
   * @default false
   */
  requireAll?: boolean;
  /**
   * Custom access denied message
   */
  accessDeniedMessage?: string;
  /**
   * Whether to show role requirements in the access denied message
   * @default true
   */
  showRequiredRoles?: boolean;
}

/**
 * Route wrapper that checks user roles before rendering children
 * Shows an access denied message if user doesn't have required permissions
 * 
 * @example
 * <ProtectedRoute roles={['ADMIN']}>
 *   <AdminPage />
 * </ProtectedRoute>
 * 
 * @example
 * <ProtectedRoute 
 *   roles={['LIST_EXERCISES', 'CHECK_EXERCISE']} 
 *   requireAll={true}
 *   accessDeniedMessage="You need both LIST_EXERCISES and CHECK_EXERCISE permissions"
 * >
 *   <ExerciseManagement />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({
  roles,
  children,
  requireAll = false,
  accessDeniedMessage,
  showRequiredRoles = true,
}: ProtectedRouteProps) {
  const { isLoggedIn, userRoles, hasRole, hasAllRoles } = useRoleBasedAccess();

  // If user is not logged in, this should be handled by the main App auth guard
  if (!isLoggedIn) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          <Typography variant="h6">Authentication Required</Typography>
          <Typography>You must be logged in to access this page.</Typography>
        </Alert>
      </Box>
    );
  }

  // Check if user has required roles
  const hasAccess = requireAll 
    ? hasAllRoles(roles)
    : hasRole(roles);

  if (hasAccess) {
    return <>{children}</>;
  }

  // Access denied - show error message
  const defaultMessage = requireAll
    ? `You need all of the following roles: ${roles.join(', ')}`
    : `You need at least one of the following roles: ${roles.join(', ')}`;

  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error">
        <Typography variant="h6">Access Denied</Typography>
        <Typography sx={{ mt: 1 }}>
          {accessDeniedMessage || 'You do not have permission to access this page.'}
        </Typography>
        {showRequiredRoles && !accessDeniedMessage && (
          <Typography sx={{ mt: 1, fontStyle: 'italic' }}>
            {defaultMessage}
          </Typography>
        )}
        {userRoles.length > 0 && (
          <Typography sx={{ mt: 1, fontSize: '0.875rem', color: 'text.secondary' }}>
            Your current roles: {userRoles.join(', ')}
          </Typography>
        )}
      </Alert>
    </Box>
  );
}