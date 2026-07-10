import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MeProfile, UserDto, CreateUser, UpdateUser } from '../../models/user.model';
import { PagedResult } from '../../models/paged-result.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users`;

  // Profil personnel
  getMe(): Observable<MeProfile> {
    return this.http.get<MeProfile>(`${this.baseUrl}/me`);
  }

  // Admin — liste paginée
  getAll(page = 1, pageSize = 10): Observable<PagedResult<UserDto>> {
    return this.http.get<PagedResult<UserDto>>(
      `${this.baseUrl}?page=${page}&pageSize=${pageSize}`
    );
  }

  getById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/${id}`);
  }

  create(user: CreateUser): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.baseUrl, user);
  }

  update(id: string, user: UpdateUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  setRole(id: string, role: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/role`, { role });
  }

  toggleActive(id: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/toggle-active`, {});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  stats(): Observable<{ totalUsers: number }> {
    return this.http.get<{ totalUsers: number }>(`${this.baseUrl}/stats`);
  }
}
