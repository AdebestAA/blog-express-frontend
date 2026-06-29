import type { AxiosError } from "axios";

export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof Error) {
    // Check if it's an Axios error with a backend message
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || error.message || fallback;
  }
  return fallback;
}
