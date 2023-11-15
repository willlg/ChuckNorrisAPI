import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://nlp-translation.p.rapidapi.com/v1/translate';
  private apiKey = '58b8b12807msh6213093d2e0be22p184bc5jsn97dbfdcf09af';
  private apiHost = 'nlp-translation.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLanguage: string, sourceLanguage?: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.apiHost
    });

    let params = new HttpParams()
      .set('text', text)
      .set('to', targetLanguage);

    if (sourceLanguage) {
      params = params.set('from', sourceLanguage); // Correção aqui
    }

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

}
