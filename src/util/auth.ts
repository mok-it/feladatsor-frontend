import { Role } from "@/generated/graphql";
import { useAuth } from "@/pages/AuthContext";
import { useMemo } from "react";

/**
 * Role-based access control utility functions
 */

/**
 * Check if user has any of the specified roles
 * ADMIN role bypasses all other role checks
 */
export function hasRole(userRoles: Role[], requiredRoles: Role[]): boolean {
  if (userRoles.includes("ADMIN")) return true;
  return requiredRoles.some((role) => userRoles.includes(role));
}

/**
 * Check if user has all of the specified roles
 * ADMIN role bypasses all other role checks
 */
export function hasAllRoles(userRoles: Role[], requiredRoles: Role[]): boolean {
  if (userRoles.includes("ADMIN")) return true;
  return requiredRoles.every((role) => userRoles.includes(role));
}

/**
 * Check if user is admin
 */
export function isAdmin(userRoles: Role[]): boolean {
  return userRoles.includes("ADMIN");
}

/**
 * Specific role checking functions based on access control guide
 */

export function canListExercises(userRoles: Role[]): boolean {
  return hasRole(userRoles, ["LIST_EXERCISES"]);
}

export function canCheckExercises(userRoles: Role[]): boolean {
  return hasRole(userRoles, ["CHECK_EXERCISE"]);
}

export function canCloneExercises(userRoles: Role[]): boolean {
  return hasRole(userRoles, ["CLONE_EXERCISE"]);
}

export function canFinalizeExercises(userRoles: Role[]): boolean {
  return hasRole(userRoles, ["FINALIZE_EXERCISE"]);
}

export function canManageExerciseSheets(userRoles: Role[]): boolean {
  return hasRole(userRoles, ["EXERCISE_SHEET"]);
}

export function canProofreadExerciseSheets(userRoles: Role[]): boolean {
  return hasRole(userRoles, ["PROOFREAD_EXERCISE_SHEET"]);
}

export function canCreateExercises(userRoles: Role[]): boolean {
  return hasRole(userRoles, ["USER"]);
}

export function canAccessAdminPanel(userRoles: Role[]): boolean {
  return isAdmin(userRoles);
}

/**
 * React hook for role-based access control
 */
export function useRoleBasedAccess() {
  const { user, isLoggedIn } = useAuth();

  const permissions = useMemo(() => {
    const userRoles = user?.roles || [];
    return {
      isLoggedIn: isLoggedIn || false,
      isAdmin: isAdmin(userRoles),
      canListExercises: canListExercises(userRoles),
      canCheckExercises: canCheckExercises(userRoles),
      canCloneExercises: canCloneExercises(userRoles),
      canFinalizeExercises: canFinalizeExercises(userRoles),
      canManageExerciseSheets: canManageExerciseSheets(userRoles),
      canProofreadExerciseSheets: canProofreadExerciseSheets(userRoles),
      canCreateExercises: canCreateExercises(userRoles),
      canAccessAdminPanel: canAccessAdminPanel(userRoles),
      userRoles,
      hasRole: (requiredRoles: Role[]) => hasRole(userRoles, requiredRoles),
      hasAllRoles: (requiredRoles: Role[]) =>
        hasAllRoles(userRoles, requiredRoles),
    };
  }, [isLoggedIn, user?.roles]);

  return permissions;
}

/**
 * React hook for checking specific roles
 */
export function useHasRole(requiredRoles: Role[]): boolean {
  const { user } = useAuth();

  return useMemo(() => {
    const userRoles = user?.roles || [];
    return hasRole(userRoles, requiredRoles);
  }, [user?.roles, requiredRoles]);
}

/**
 * React hook for checking if user is admin
 */
export function useIsAdmin(): boolean {
  const { user } = useAuth();

  return useMemo(() => {
    const userRoles = user?.roles || [];
    return isAdmin(userRoles);
  }, [user?.roles]);
}
