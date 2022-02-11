export const serverError = {
  message: { error_code: 'SERVER_ERROR', message: 'Unknown error' },
  code: 500,
};

/**
 * @description this function will generate not fount error message to return.
 */
export const notFoundError = (message = 'Could not find any data') => ({
  message: {
    error_code: 'DATA_NOT_FOUND_ERROR',
    message,
  },
  code: 404,
});

/**
 * @description this function will generate validation error message to return.
 */
export const validationError = (message: string) => ({
  message: {
    error_code: 'VALIDATION_ERROR',
    message,
  },
  code: 406,
});

/**
 * @description this function will generate unauthorizrd error message to return.
 */
export const unauthorizedError = (message = "You don't have access to this resource.") => ({
  message: {
    error_code: 'UNAUTHORIZED_ERROR',
    message,
  },
  code: 401,
});
