import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL = 'https://api.github.com';

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

    return this.http.get(`${this.baseURL}/search/users?q=${queryString}`, {
      headers: {
        Authorization: 'Bearer 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',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  }
}
