import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ConflictException,
  UnauthorizedException
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    const errorDetails = {
      name: exception?.name || 'Error',
      message: exception?.message || message,
      stack: exception?.stack || null,
    };

    // 👇 Log the full error for server logs
    console.error('🚨 Exception caught:', errorDetails);

    if (exception instanceof ConflictException) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    } else if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message || 'Unauthorized access';
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    response.status(status).json({
      statusCode: status,
      success: false,
      message: typeof message === 'string' ? message : (message as any).message,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: errorDetails, // 👈 added detailed error field
    });
  }
}
