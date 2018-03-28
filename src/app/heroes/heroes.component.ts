import { Component, OnInit } from '@angular/core'
import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes()
  }

  getHeroes(): void {
    //subscribe in HeroesComponent
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

  /**
   * funtion add a hero to heroes
  */
  add(name: string): void {
    name = name.trim()
    if(!name) { return }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }
  /**
   *delete a hero from heroes
   */
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
