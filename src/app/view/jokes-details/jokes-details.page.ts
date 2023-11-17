import {ChuckNorrisService} from '../../model/services/chuck-norris.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChuckNorrisJoke } from 'src/app/interfaces/ChuckNorrisJoke';
import { TranslationService } from 'src/app/model/services/translation.service';

@Component({
 selector: 'app-jokes-details',
 templateUrl: './jokes-details.page.html',
 styleUrls: ['./jokes-details.page.scss'],
})

export class JokesDetailsPage implements OnInit {
  joke!: ChuckNorrisJoke;
 
  constructor(private route: ActivatedRoute, private ChuckNorrisService : ChuckNorrisService, private translationService: TranslationService) {
   this.joke = { icon_url: '', url: '', value: '', id: '' };
  }
 
  ngOnInit() {
    const jokeId = this.route.snapshot.paramMap.get('joke');
  
    if (jokeId !== null) {
      this.joke.id = jokeId;
  
      this.ChuckNorrisService.getJokeById(this.joke.id).subscribe(joke => {
        this.joke = joke;
  
        this.translationService.translateText(this.joke.value, 'pt').subscribe(translation => {
          this.joke.value = translation.translated_text.pt;
        });
      });
    } else {}
  }
  
 }
