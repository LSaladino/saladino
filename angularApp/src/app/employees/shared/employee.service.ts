import { Injectable } from '@angular/core';

// add code
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// here, import the class Employee.cs from model in webapi project visual studio
import { Employee } from './employee.model'

@Injectable()
export class EmployeeService {

  // add code
  selectEmployee: Employee; // class Employee.cs
  employeeList: Employee[]; 

  constructor(private http: Http) { } // add code

  // add code
  postEmployee(emp: Employee) {
    var body = JSON.stringify(emp);
    var headersOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headersOptions });
    return this.http.post('http://localhost:14869/api/Employee', body, requestOptions).map(x => x.json());
  }

  putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headersOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headersOptions });
    return this.http.put('http://localhost:14869/api/Employee/' + id,
      body, requestOptions).map(res => res.json());
  }

  // add code
  getEmployeeList() {
    this.http.get('http://localhost:14869/api/Employee')
      .map((data: Response) => {
        return data.json() as Employee[];
      }).toPromise().then(x => {
        this.employeeList = x;
      })
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:14869/api/Employee/' + id).map(res => res.json());
  }
}
