export interface ApiErrorResponse {
  message: string | string[];
  statusCode: number;
}

export interface ApiError {
  message: string[];
  statusCode?: number;
}
