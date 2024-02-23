/**
 * @description Check if the user has the required permissions
 * @param permissions permissions to check
 * @param userPermissions user permissions
 * @returns boolean
 */

export const checkPermissions = (
  permissions: string[],
  userPermissions: string[]
): boolean => {
  if (!userPermissions) return false;
  return permissions.every((permission) =>
    userPermissions.includes(permission)
  );
};
