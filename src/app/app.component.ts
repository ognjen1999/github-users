import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

interface FormSearch {
  search1: FormControl<string | null>;
  search2: FormControl<string | null>;
  search3: FormControl<string | null>;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Github-Users';

  formSearch: FormGroup<FormSearch>;

  users: IUser[] = [];

  constructor(private usersService: UsersService, private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      search1: this.fb.control({ value: '', disabled: false }),
      search2: this.fb.control({ value: '', disabled: false }),
      search3: this.fb.control({ value: '', disabled: false }),
    });
  }

  ngOnInit(): void {
    this.formSearch.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((values) => this.usersService.searchUsers(values))
      )
      .subscribe((result) => {
        this.users = (result as any)?.items ?? [];
      });
  }

  onClickUser(url?: string) {
    if (!url) {
      return;
    }
    window.open(url);
  }
}
