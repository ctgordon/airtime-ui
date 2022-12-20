import {Injectable} from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() {
  }

  hoursMinutesSeconds(total: string) {
    const dur = moment.duration(total, 'hours');
    const hours = Math.floor(dur.asHours());
    const mins = Math.floor(dur.asMinutes()) - hours * 60;
    const sec = Math.floor(dur.asSeconds()) - hours * 60 * 60 - mins * 60;
    return hours + ":" + ((mins > 9) ? mins : ("0" + mins)) + ":" + ((sec > 9) ? sec : ("0" + sec));
  }
}
