import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  info_array: Array<object>;
  edit_index: number;
  selected_info: object;

  gridOptions = {
    columnDefs: "columnDefs",
    rowData: "rowData",
    rowSelection: "single",
    getSelectedRows: "getSelectedRows",
    onSelectionChanged: "onSelectionChanged"
  };

  columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "User Name", field: "username" },
    { headerName: "Email", field: "email" }
  ];

  rowData = [];

  constructor(private httpClient: HttpClient) {
    this.info_array = [];
    this.edit_index = -1;
  }

  fetchData() {
    this.httpClient
      .get("https://jsonplaceholder.typicode.com/users")
      .subscribe(res => {
        for (let i = 0; i < res["length"]; i++) {
          this.rowData.push(res[i]);
        }
        this.rowData = this.rowData.slice();
      });
  }
  onRowSelected(event) {
    if (event.node.selected) {
      this.edit_index = event.node.childIndex;
      this.selected_info = {
        name: this.rowData[this.edit_index].name,
        username: this.rowData[this.edit_index].username,
        street: this.rowData[this.edit_index].address.street,
        city: this.rowData[this.edit_index].address.city
      };
    }
  }
  ngOnInit() {
    this.fetchData();
  }
}
