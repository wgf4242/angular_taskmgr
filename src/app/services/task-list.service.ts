import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskList} from '../domain';
import {Observable} from 'rxjs/Observable';

@Injectable()
export  class TaskListService {

  private readonly domain = 'taskLists';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  // POST
  add(taskList: TaskList): Observable<TaskList> {
    taskList.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post<TaskList>(uri, JSON.stringify(taskList), {headers: this.headers});
  }

  // PUT
  update(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    const toUpdate = {
      name: taskList.name
    }
    return this.http
      .patch<TaskList>(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  // DELETE
  del(taskList: TaskList): Observable<TaskList> {
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http.delete(uri)
      .mapTo(taskList);
  }

  // GET
  get(projectId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<TaskList[]>(uri, {params: {'projectId': projectId}});
  }

  swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    const drag$ = this.http.patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers});
    const drop$ = this.http.patch(dropUri, JSON.stringify({order: target.order}), {headers: this.headers});
    return Observable.concat<TaskList>(drag$, drop$).reduce((arrs, list) => [...arrs, list], []);
    // return (Observable.concat(drag$, drop$).reduce((arrs, list) => [...arrs, list], [])) as Observable<TaskList[]>;
  }


}
