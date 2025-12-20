import { STATIC_AUTH } from '../config/constants';
import type { LoginCredentials } from '../types';

export const authenticate = (credentials: LoginCredentials): boolean => {
  return (
    credentials.login === STATIC_AUTH.login &&
    credentials.password === STATIC_AUTH.password
  );
};
