import { Component } from '@angular/core';
import { ChuckNorrisJoke } from 'src/app/interfaces/ChuckNorrisJoke';
import { ChuckNorrisService } from 'src/app/model/services/chuck-norris.service';
import { TranslationService } from 'src/app/model/services/translation.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-jokes',
  templateUrl: 'jokes.page.html',
  styleUrls: ['jokes.page.scss'],
})
export class JokesPage {
  joke!: any;
  jokes: ChuckNorrisJoke[] = [];
  searchQuery: string = '';

  constructor(
    private chuckNorrisService: ChuckNorrisService,
    private translationService: TranslationService
  ) {}

  searchJokes() {
    this.jokes = [];
    this.joke = undefined;
    if (this.searchQuery) {
      this.translationService.translateText(this.searchQuery, 'en').subscribe((translation) => {
        const translatedQuery = translation.translated_text.en;
    
        this.chuckNorrisService.searchJokes(translatedQuery).subscribe((jokes) => {
          const translations = jokes.map(joke => 
            this.translationService.translateText(joke.value, 'pt').pipe(
              catchError(error => of({ translated_text: { pt: joke.value } }))
            )
          );
            
          forkJoin(translations).subscribe(translatedJokes => {
            this.jokes = jokes.map((joke, index) => {
              const translatedText = translatedJokes[index].translated_text;
              const value = translatedText ? translatedText.pt : joke.value;
              return { ...joke, value: value };
            });
          });
        });
      });
    } else {
      this.getRandomJoke();
    }
  }
  
  getRandomJoke() {
    this.jokes = [];
    this.joke = undefined;
    this.chuckNorrisService.getRandomJoke().subscribe((data) => {
      const jokeValue = data.value;
      this.translationService.translateText(jokeValue, 'pt').subscribe((translation) => {
        this.joke = { ...data, value: translation.translated_text.pt };
      });
    });
  }
  
  
}
