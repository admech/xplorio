import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


export class Updatable<T> {
  private subject = new Subject<T>();
  private observable = this.subject
      .switchMap(next => Observable.of(next));

  constructor(
    private initial: T
  ) {
    this.set(initial);
  }

  set(value: T): void {
    this.subject.next(value);
  }

  get(): Observable<T> {
    return this.observable;
  }

}