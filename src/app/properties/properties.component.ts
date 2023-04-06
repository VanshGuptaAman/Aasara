import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropertyService } from '../shared/property.service';
import { property } from './properties.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {

  allPrperty:any;
  formValue!:FormGroup;
  propertyModelObj:property = new property();

  constructor(private fb:FormBuilder, private api:PropertyService){}

  ngOnInit():void{
    this.formValue = this.fb.group({
      p_title:[''],
      P_price:[''],
      p_location:[''],
      P_details:[''],
    })
    this.getAllProperty()
  }

  getAllProperty(){
    this.api.getAllProp().subscribe((res)=>{
      this.allPrperty = res;
    })
  }


  addProp(){
    this.propertyModelObj.p_title = this.formValue.value.p_title;
    this.propertyModelObj.P_price = this.formValue.value.P_price;
    this.propertyModelObj.p_location = this.formValue.value.p_location;
    this.propertyModelObj.P_details = this.formValue.value.P_details;
    this.api.addListing(this.propertyModelObj).subscribe((res)=>{
      console.log(res);
      alert("Property Added Successfully.")
      this.formValue.reset();
      this.getAllProperty();
    }, err=> {
      alert("Something went wrong !!!")
    })
  }


  deleteProp(data:any){
    this.api.deleteProp(data.id).subscribe((res)=>{
      alert('Deletion Successful...');
      this.getAllProperty();
    })
  }
}

