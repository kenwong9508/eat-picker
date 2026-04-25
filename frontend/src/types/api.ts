// Generic success wrapper for API responses
export type ApiSuccess<T> = {
  data: T;
};

// Generic error shape returned by the API
export type ApiError = {
  error: {
    code: string;
    message: string;
  };
};

// Union of success or error
export type ApiResponse<T> = ApiSuccess<T> | ApiError;
