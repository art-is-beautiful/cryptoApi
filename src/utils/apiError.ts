export const defaultHttpErrorMessages = {
    notFound: 'Not found',
    badRequest: 'Something went wrong',
    notAvailable: 'No available',
    
  };
  
  export class ApiError extends Error {
    isCustom: boolean;
    status: number;
  
    constructor(status: number, message: string) {
      super(message);
      this.isCustom = true;
      this.status = status;
      Error.captureStackTrace(this, ApiError);
    }
  }