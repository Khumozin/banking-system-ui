import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, catchError, throwError } from 'rxjs';
import {
  CreateDeposit,
  CreateTransfer,
  Transaction,
} from '../transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  readonly #http = inject(HttpClient);

  /**
   * Retrieves all transactions from the API.
   *
   * @returns A promise that resolves to an array of transactions
   * @throws Error with the server error message if the request fails
   */
  getAllTransactions(): Promise<Transaction[]> {
    return lastValueFrom(
      this.#http.get<Transaction[]>('/transactions').pipe(
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
  getTransactionById(id: string): Promise<Transaction> {
    return lastValueFrom(
      this.#http.get<Transaction>(`/transactions/${id}`).pipe(
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
  getTransactionsByAccount(accountId: string): Promise<Transaction[]> {
    return lastValueFrom(
      this.#http.get<Transaction[]>(`/transactions/account/${accountId}`).pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }

  getTransactionsByStatus(status: string): Promise<Transaction[]> {
    return lastValueFrom(
      this.#http.get<Transaction[]>(`/transactions?status=${status}`).pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }

  createDeposit(deposit: Partial<CreateDeposit>): Promise<Transaction> {
    return lastValueFrom(
      this.#http.post<Transaction>(`/transactions/deposit`, deposit).pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }

  createTransfer(deposit: Partial<CreateTransfer>): Promise<Transaction> {
    return lastValueFrom(
      this.#http.post<Transaction>(`/transactions/transfer`, deposit).pipe(
        catchError((e: HttpErrorResponse) => {
          return throwError(() => new Error(e.error.message));
        }),
      ),
    );
  }
}
