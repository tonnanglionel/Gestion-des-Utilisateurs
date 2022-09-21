import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateParserService {
  constructor() {}

  parseToLocalFr(date: Date): string {
    const options: any = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }
}
