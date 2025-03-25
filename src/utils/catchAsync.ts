import ApiError from "./ApiError";

// A function that wraps around an async function to provide easier error handling
export default function catchAsync<T extends any[], R>(fn: (...args: T) => Promise<R>) {
    return async (...args: T): Promise<R> => {
        try {
            return await fn(...args);
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                throw error; // re-throw, nothing more to do 
            }
            // something occured out of our control
            throw new Error('Something went wrong!');
        }
    }
}