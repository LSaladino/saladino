import { Component, OnInit } from '@angular/core';

// add code
import { EmployeeService } from '../shared/employee.service';

// add code
import { NgForm } from '@angular/forms';

// add code
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  // add code
  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    // add code
    this.resetForm();
  }

  // add code, allow null in the parameter
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();

    // add code
    this.employeeService.selectEmployee = {
      EmployeeId: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    }
  }

  // add code
  onSubmit(form: NgForm) {
    if (form.value.EmployeeId == null) {
      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form); // clear fields
          this.employeeService.getEmployeeList(); // prepare for update
          // add code
          this.toastr.success('New Record Added Successfully', 'Employee Register');
        })
    } 
    else {
      // update
      this.employeeService.putEmployee(form.value.EmployeeId, form.value)
        .subscribe(data => {
          this.resetForm(form); // clear fields
          this.employeeService.getEmployeeList(); // prepare for update
          // add code
          this.toastr.info('Record Updated Successfully', 'Employee Register');
        });
    }
  }

}
