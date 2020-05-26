import { Injectable } from '@angular/core';
import { PreparationTime } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TimeService {

  constructor() {
  }

  calculatePreparationTime(time: number, format: string = ''): PreparationTime|number {
    const convertedTime = {
      hours: Math.trunc(time / 60),
      minutes: time % 60,
    };

    if (!format) {
      return convertedTime;
    }

    format = format.toLowerCase();

    if (format === 'h') {
      return convertedTime.hours;
    }

    if (format === 'm') {
      return convertedTime.minutes;
    }

    return convertedTime;
  }
}
