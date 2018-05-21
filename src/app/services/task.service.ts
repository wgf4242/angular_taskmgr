import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task, TaskList} from '../domain';
import {Observable} from 'rxjs/Observable';

@Injectable()
export  class TaskService {

  private readonly domain = 'tasks';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) {
  }

  // POST
  add(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post<Task>(uri, JSON.stringify(task), {headers: this.headers});
  }

  // PUT
  update(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    const toUpdate = {
      name: task.desc,
      desc: task.priority,
      coverImg: task.dueDate,
      reminder: task.reminder,
      ownerId: task.ownerId,
      participantIds: task.participantIds,
      remark: task.remark
    };
    return this.http
      .patch<Task>(uri, JSON.stringify(toUpdate), {headers: this.headers});
  }

  // DELETE
  del(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete(uri)
      .mapTo(task);
  }

  // GET
  get(taskListId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get<Task[]>(uri, {params: {'taskListId': taskListId}});
  }

  getByLists(lists: TaskList[]): Observable<Task[]> {
    return Observable.from(lists)
      .mergeMap(list => this.get(list.id) )
      .reduce((tasks: Task[], t: Task[] ) => [...tasks, ...t], []);
  }

  complete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http
      .patch<Task>(uri, JSON.stringify({completed: !task.completed}), {headers: this.headers});
  }

  move(taskId: string, taskListId: string): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${taskId}`;
    return this.http
      .patch<Task>(uri, JSON.stringify({taskListId: taskListId}), {headers: this.headers});
  }

  moveAll(srcListId: string, targetListId: string): Observable<Task[]> {
    return this.get(srcListId)
      .mergeMap(tasks => Observable.from(tasks))
      .mergeMap(task => this.move(task.id, targetListId))
      .reduce((arr, x) => [...arr, x], []);

  }

  getUserTasks(userId: string): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri, {params: {ownerId: userId}});
  }
}
