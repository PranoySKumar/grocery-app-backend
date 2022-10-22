export class RequestError {
  statusCode: number;
  message?: string;
  body?: any;
  constructor(statusCode: number, messge?: string, data?: any) {
    this.statusCode = statusCode;
    this.message = messge;
    this.statusCode = statusCode;
  }
}
