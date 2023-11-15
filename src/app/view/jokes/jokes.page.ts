import { Component } from '@angular/core';
import { ChuckNorrisService } from 'src/app/model/services/chuck-norris.service';
import { TranslationService } from 'src/app/model/services/translation.service';

@Component({
  selector: 'app-jokes',
  templateUrl: 'jokes.page.html',
  styleUrls: ['jokes.page.scss'],
})
export class JokesPage {
  joke: any;

  constructor(
    private chuckNorrisService: ChuckNorrisService,
    private translationService: TranslationService
  ) {}

  getRandomJoke() {
    this.chuckNorrisService.getRandomJoke().subscribe((data) => {
      const jokeValue = data.value;
      this.translationService.translateText(jokeValue, 'pt').subscribe((translation) => {
        this.joke = { ...data, value: translation.translated_text.pt };
      });
    });
  }
  
}
