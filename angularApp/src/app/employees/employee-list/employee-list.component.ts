import { Component, OnInit } from '@angular/core';

// add code
import { EmployeeService } from '../shared/employee.service';

// add code
import { Employee } from '../shared/employee.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();
  }

  showForUpdate(emp: Employee) {
    this.employeeService.selectEmployee = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm("Are you sure to delete this record ?") == true) {
      this.employeeService.deleteEmployee(id)
        .subscribe(x => {
          this.employeeService.getEmployeeList();
          this.toastr.warning("Deleted Successfuly", "Employee Register");
        })
    }

  }
}
