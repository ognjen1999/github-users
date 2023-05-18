import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  searchUsers({
    search1,
    search2,
    search3,
  }: {
    search1?: string | null;
    search2?: string | null;
    search3?: string | null;
  } = {}) {
    const queryString = encodeURIComponent(
      [search1, search2, search3]?.filter((e) => e)?.join(' ')
    );

    return this.http.get(
      `${environment.baseURL}/search/users?q=${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${environment.accessToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
    );
  }
}
