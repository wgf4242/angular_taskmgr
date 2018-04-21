import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../domain';
import {Observable} from 'rxjs/Observable';

@Injectable()
export  class ProjectService {

  private readonly domain = 'project';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  // POST
  add(project: Project): Observable<Project> {
    project.id = null;
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post<Project>(uri, JSON.stringify(project), {headers: this.headers});
  }

  // PUT
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      desc: project.desc,
      coverImg: project.coverImg,
    }
    return this.http
      .patch<Project>(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  // DELETE
  del(project: Project): Observable<Project> {
    const delTasks$ = Observable.from(project.taskLists)
      .mergeMap(listId => this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return delTasks$
      .switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`))
      .mapTo(project);
  }

  // GET
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<Project[]>(uri, {params: {'members_like': userId}});
  }


}
