import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    // Todo: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  //MessageService is a singleton. This is a typical service-in-service
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHero(id: number): Observable<Hero> {
    this.messageService.add('HeroService: fetched hero id = ${id}');
    return of(HEROES.find(hero => hero.id === id))
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message)
  }

}
