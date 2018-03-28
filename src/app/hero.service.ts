import { Injectable } from '@angular/core'
import { Hero } from './hero'
import { HEROES } from './mock-heroes'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      catchError(this.handleError('getHeroes', []))
    )
  }
  
  constructor(
    private http: HttpClient,
    //MessageService is a singleton. This is a typical service-in-service
    private messageService: MessageService
  ) { }

  //**get hero by id. will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }

  /**PUT: update the hero on the serve */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  /**POST: add a new hero to the serve */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  /**DELETE: delete the hero from the serve */
  deleteHero(hero: Hero| number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero :hero.id
    const url = `${this.heroesUrl}/${id}`
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`delete hero id = ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  /**GET heroes whose name contains search term */
  searchHeros(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      //if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`find heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('SearchHeroes', []))
    )
  }
}
