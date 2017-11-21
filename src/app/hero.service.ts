import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class HeroService {

  private heroes: Hero[];

  constructor(private restangular: Restangular, private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return this.restangular.all('heroes').getList();
  }

  getHero(id: string): Observable<Hero> {
    console.log('id: ', id);
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.restangular.one('heroes', id).get();
    // return of(HEROES.find(hero => hero.id === id));
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.restangular.one('heroes', hero._id).customPUT(hero);

  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.restangular.all('heroes').post(hero);
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero._id;

    return this.restangular.one('heroes', id).remove();
  }
}

