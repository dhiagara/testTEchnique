import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../entity/User';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiUsersService {
  URL = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.URL}`)
  }
  addUser(user): Observable<User> {

    return this.http.post<any>(`${this.URL}`, user)
  }
  updatUser(user, id): Observable<User> {
    return this.http.put<any>(`${this.URL}/${id}`, user).pipe(
      catchError(this.handleError)
    )
  }
  getUserById(id): Observable<User> {
    return this.http.get<any>(`${this.URL}/${id}`)
  }
  deleteUser(id) {
    return this.http.delete<any>(`${this.URL}/${id}`).pipe(
      catchError(this.handleError)
    )

  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
