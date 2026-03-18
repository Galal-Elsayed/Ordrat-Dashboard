import { SystemSetting } from '@/app/models/system';

/**
 * Checks if a record is unique.
 * Mock implementation - always returns true (unique).
 */
export async function isUnique(
  _table: string,
  _fields: Record<string, unknown>,
  _exclude?: Record<string, unknown>,
): Promise<boolean> {
  return true;
}

/**
 * Fetches system settings.
 * Mock implementation - returns null.
 */
export async function getSettings(): Promise<SystemSetting | null> {
  return null;
}
