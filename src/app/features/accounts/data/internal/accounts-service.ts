import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, catchError, throwError } from 'rxjs';
import { Account, AccountBalance } from '../account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  readonly #http = inject(HttpClient);

  /**
   * Retrieves all accounts from the API.
   *
   * @returns A promise that resolves to an array of accounts
   * @throws Error with the server error message if the request fails
   */
  getAllAccounts(): Promise<Account[]> {
    return lastValueFrom(
      this.#http.get<Account[]>('/accounts').pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }

  /**
   * Retrieves a single account by its ID.
   *
   * @param id - The unique identifier of the account to retrieve
   * @returns A promise that resolves to the account
   * @throws Error with the server error message if the request fails
   */
  getAccount(id: string): Promise<Account> {
    return lastValueFrom(
      this.#http.get<Account>(`/accounts/${id}`).pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }

    /**
   * Retrieves a account balance by its ID.
   *
   * @param id - The unique identifier of the account to retrieve
   * @returns A promise that resolves to the account
   * @throws Error with the server error message if the request fails
   */
  getAccountBalance(id: string): Promise<AccountBalance> {
    return lastValueFrom(
      this.#http.get<Account>(`/accounts/${id}/balance`).pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }

  /**
   * Creates a new account.
   *
   * @param account - The partial account data to create
   * @returns A promise that resolves to the created account
   * @throws Error with the server error message if the request fails
   */
  addAccount(account: Partial<Account>): Promise<Account> {
    return lastValueFrom(
      this.#http.post<Account>(`/accounts`, account).pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }
}
