import { ReactNode } from 'react';
import { Role } from '@/generated/graphql';
import { useRoleBasedAccess } from '@/util/auth';

interface ProtectedComponentProps {
  /**
   * Required roles to access this component
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
   * Component to render if user doesn't have access
   * @default null (renders nothing)
   */
  fallback?: ReactNode;
  /**
   * Whether to show fallback only when logged in but without access
   * If false, shows fallback even when not logged in
   * @default true
   */
  showFallbackOnlyWhenLoggedIn?: boolean;
}

/**
 * Component that conditionally renders children based on user roles
 * 
 * @example
 * <ProtectedComponent roles={['ADMIN']}>
 *   <AdminPanel />
 * </ProtectedComponent>
 * 
 * @example
 * <ProtectedComponent 
 *   roles={['LIST_EXERCISES']} 
 *   fallback={<div>You need LIST_EXERCISES permission</div>}
 * >
 *   <ExerciseList />
 * </ProtectedComponent>
 */
export default function ProtectedComponent({
  roles,
  children,
  requireAll = false,
  fallback = null,
  showFallbackOnlyWhenLoggedIn = true,
}: ProtectedComponentProps) {
  const { isLoggedIn, hasRole, hasAllRoles } = useRoleBasedAccess();

  // If user is not logged in
  if (!isLoggedIn) {
    return showFallbackOnlyWhenLoggedIn ? null : fallback;
  }

  // Check if user has required roles
  const hasAccess = requireAll 
    ? hasAllRoles(roles)
    : hasRole(roles);

  if (hasAccess) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}