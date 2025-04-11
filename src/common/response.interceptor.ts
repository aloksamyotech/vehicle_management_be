import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const responseObject = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          success: true,
          data,
          message: 'Request successful',
        };
        console.info('✅ Response sent:', responseObject);
        return responseObject;
      }),
    );
  }
}
