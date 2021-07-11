import { Component, OnInit } from '@angular/core';
import { ApartmentFilter, ApartmentModel } from '../models/apartment';
import { ApartmentService } from '../services/apartment.service';

@Component({
  selector: 'app-my-apartments',
  templateUrl:'./my-apartments.component.html' ,
  styleUrls: ['./my-apartments.component.css'  ]
})
export class MyApartmentsComponent implements OnInit {

  apartments: ApartmentModel[] = [];
  currentModel: ApartmentModel = new ApartmentModel(); 
  constructor(private apartmentService: ApartmentService) { }

  ngOnInit(): void {
    this.loadApartments();
  }

  loadApartments(){
    this.apartmentService.getMine().subscribe(data=>{
      this.apartments = data;
    })
  }

  save(model:ApartmentModel){
 
  if(!model.id ) this.performSave(model);
  else this.performUpdate(model);
  }

  performSave(model:ApartmentModel){
    this.apartmentService.insert(model).subscribe(data=>{
      this.loadApartments();
      alert("apartment saved");
    })
  }
  performUpdate(model:ApartmentModel){
    this.apartmentService.update(model).subscribe(data=>{
      this.loadApartments();
      alert("apartment updated");
    })
  }
  delete(model:ApartmentModel){
    this.apartmentService.delete(model.id).subscribe(data=>{
      this.loadApartments();
      alert("apartment deleted");
    })
  }

}
