import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Stats} from '../models/stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private serviceUrl = 'http://localhost:8080/VodafoneZiggoApi-1.2/services/rest/statistics';

  constructor(private http: HttpClient) {
  }


  getStats(): Observable<Stats> {
    return this.http.get(this.serviceUrl)
      .pipe(map(data => data as Stats));
  }
}
