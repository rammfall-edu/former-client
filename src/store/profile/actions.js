import { FILL_PROFILE, LOADING_PROFILE } from './types';

export const fillProfile = (payload) => ({
  type: FILL_PROFILE,
  ...payload,
});

export const loadingProfile = (isLoading) => {
  return {
    type: LOADING_PROFILE,
    isLoading,
  };
};
