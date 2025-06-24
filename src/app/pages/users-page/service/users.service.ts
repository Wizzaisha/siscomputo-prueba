import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersResponse } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UsersResponse[]> {
    return this.http.get<UsersResponse[]>('users');
  }

  getUserByName(name: string): Observable<UsersResponse[]> {
    return this.http.get<UsersResponse[]>(`users?name=${name}`);
  }
}
