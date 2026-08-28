import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http:HttpClient) { }
  private apiUrl='https://jsonplaceholder.typicode.com/users';

  getUser(id:string){
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }
}
