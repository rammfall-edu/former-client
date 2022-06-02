import { FILL_PROFILE, LOADING_PROFILE } from './types';

export const profile = (state = { isLoading: true }, { type, ...payload }) => {
  switch (type) {
    case FILL_PROFILE:
      return {
        ...state,
        ...payload,
      };
    case LOADING_PROFILE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
