import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { TranslationService } from './translation.service';

interface ChuckNorrisJoke {
  icon_url: string;
  id: string;
  url: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChuckNorrisService {
  private apiUrl = 'https://api.chucknorris.io/jokes';

  constructor(
    private http: HttpClient,
    private translationService: TranslationService
  ) {}

  getRandomJoke(targetLanguage: string = 'en'): Observable<ChuckNorrisJoke> {
    return this.http.get<ChuckNorrisJoke>(`${this.apiUrl}/random`).pipe(
      switchMap((res) => {
        const jokeValue = res.value;
        return this.translationService.translateText(jokeValue, targetLanguage).pipe(
          map((translationResponse) => {
            return { ...res, value: translationResponse.translated_text[targetLanguage] };
          })
        );
      })
    );
  }

  getRandomJokeByCategory(category: string): Observable<ChuckNorrisJoke> {
    return this.http.get<ChuckNorrisJoke>(`${this.apiUrl}/random?category=${category}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  searchJokes(query: string): Observable<ChuckNorrisJoke[]> {
    return this.http.get<any>(`${this.apiUrl}/search?query=${query}`).pipe(
      map((res) => res.result)
    );
  }
}