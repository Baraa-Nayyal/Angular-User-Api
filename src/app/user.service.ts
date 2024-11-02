import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  UserDetailResponse,
  User as UserDto,
  UsersResponse,
} from './store/user/user.dto';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getUsers(page: number): Observable<UsersResponse> {
    const cacheKey = `users-page-${page}`;
    const cachedData = this.cacheService.get(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    return this.http.get<UsersResponse>(`${this.baseUrl}?page=${page}`).pipe(
      tap((response) => this.cacheService.set(cacheKey, response)) // ℹ️ Cache the response
    );
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http
      .get<UserDetailResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data));
  }
}
