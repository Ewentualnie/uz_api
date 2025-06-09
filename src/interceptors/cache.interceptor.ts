import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const key = this.generateCacheKey(request);
    const ttl = 60;
    console.log('Ключ кешу:', key);

    const cached = await this.cacheManager.get(key);
    console.log(cached);

    if (cached) {
      return of(cached);
    }

    return next.handle().pipe(
      tap((response) => {
        this.cacheManager.set(key, response, ttl);
      }),
    );
  }

  private generateCacheKey(req: any): string {
    const { method, url, body } = req;
    const bodyString = JSON.stringify(body ?? {});
    return `${method}:${url}:${bodyString}`;
  }
}
