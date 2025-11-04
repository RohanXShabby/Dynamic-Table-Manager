import { TableRow } from '@/types/table';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAge = (age: number): boolean => {
  return age > 0 && age < 150;
};

export const validateRow = (row: Partial<TableRow>): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!row.name || row.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!row.email || !validateEmail(row.email)) {
    errors.push('Valid email is required');
  }

  if (row.age === undefined || !validateAge(row.age)) {
    errors.push('Age must be between 1 and 149');
  }

  if (!row.role || row.role.trim() === '') {
    errors.push('Role is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
