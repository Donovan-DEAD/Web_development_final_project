// Permission strings from environment variables
const ADMIN_PERM = process.env.ADMIN_PERM_STR || 'admin_perm';
const USER_PERM = process.env.USER_PERM_STR || 'user_perm';
const EDITOR_PERM = process.env.EDITOR_PERM_STR || 'editor_perm';

type PermLabel = 'admin' | 'user' | 'editor';

/**
 * Converts a permission label (e.g., 'admin') to the corresponding
 * permission string stored in the environment variables.
 * @param perm The permission label.
 * @returns The permission string or null if the label is invalid.
 */
export const getPermStringFromLabel = (perm: PermLabel): string | null => {
  switch (perm) {
    case 'admin':
      return ADMIN_PERM;
    case 'user':
      return USER_PERM;
    case 'editor':
      return EDITOR_PERM;
    default:
      return null;
  }
};
