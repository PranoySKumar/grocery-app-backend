export class RequestError {
  statusCode: number;
  message?: string;
  body?: any;
  constructor(statusCode: number, messge?: string, body?: any) {
    this.statusCode = statusCode;
    this.message = messge;
    this.body = body;
  }
}
