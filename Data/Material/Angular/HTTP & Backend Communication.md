# 1. HTTP & Backend Communication

## Table of Contents

- [1.1 HttpClient Setup & Usage](#11-httpclient-setup-usage)
- [1.2 Service Pattern](#12-service-pattern)
- [1.3 Functional Interceptors (Angular 15+)](#13-functional-interceptors-angular-15)

---


## 1.1 HttpClient Setup & Usage

```typescript
// app.config.ts (standalone)
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor, loggingInterceptor]),
      withFetch(),              // Use fetch API instead of XMLHttpRequest
      withRequestsMadeViaParent(), // For micro-frontends
    ),
  ],
};
```

## 1.2 Service Pattern

```typescript
@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly http = inject(HttpClient);

  getAll(params?: { page?: number; size?: number; sort?: string }): Observable<PaginatedResponse<User>> {
    return this.http.get<PaginatedResponse<User>>(`${this.baseUrl}/users`, {
      params: new HttpParams({ fromObject: params as any }),
    });
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  create(user: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  update(id: string, user: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  patch(id: string, patch: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${id}`, patch);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  uploadAvatar(id: string, file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.post(`${this.baseUrl}/users/${id}/avatar`, formData, {
      reportProgress: true,         // Track upload progress
      observe: 'events',            // Get HttpEvent stream
    });
  }
}
```

## 1.3 Functional Interceptors (Angular 15+)

```typescript
// Auth interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};

// Error interceptor with retry and refresh
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => {
        if (error.status === 0 || error.status >= 500) {
          return timer(1000 * retryCount);  // Exponential backoff
        }
        throw error;  // Don't retry client errors
      },
    }),
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          return authService.refreshToken().pipe(
            switchMap(newToken => {
              const retryReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next(retryReq);
            }),
            catchError(() => {
              authService.logout();
              router.navigate(['/login']);
              return EMPTY;
            }),
          );
        case 403:
          router.navigate(['/forbidden']);
          break;
        case 404:
          // Could be handled at component level
          break;
      }
      return throwError(() => error);
    }),
  );
};

// Logging interceptor
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log(`${req.method} ${req.urlWithParams} → ${event.status} (${Date.now() - started}ms)`);
        }
      },
      error: (error) => {
        console.error(`${req.method} ${req.urlWithParams} → FAILED (${Date.now() - started}ms)`, error);
      },
    }),
  );
};

// Caching interceptor
export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cache = inject(HttpCacheService);

  if (req.method !== 'GET') {
    return next(req);
  }

  const cached = cache.get(req.urlWithParams);
  if (cached) {
    return of(cached);
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, event, 60_000); // Cache for 60 seconds
      }
    }),
  );
};
```
