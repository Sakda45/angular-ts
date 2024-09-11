import { Component } from '@angular/core';
import jsonData from '../../../assets/landmark.json';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppdataService } from '../../service/appdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landmarks',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})
export class LandmarksComponent {

  landmarks = jsonData;
  landmark: any;
  countrySet = new Set<string>();
  countries: any;
  country = '';
  landmarksByCountry = new Array<any>();
  isMultiple = false;
  filteredLandmarks = new Array<any>();

  constructor(private router: Router, private data: AppdataService) {
    // Load saved states from service
    this.landmarksByCountry = this.data.landmarksByCountry;
    this.isMultiple = this.data.isMultiple;
    this.landmark = this.data.landmark;

    if (!this.landmark || this.landmark.idx == 0) {
      this.landmark = this.landmarks[0];
    }

    this.landmarks.forEach(element => {
      this.countrySet.add(element.country);
    });
    this.countries = Array.from(this.countrySet);
  }

  // ค้นหาสถานที่ตามประเทศ
  searchByCountry() {
    this.isMultiple = true;
    this.landmarksByCountry = this.landmarks.filter(element => element.country === this.country);
    this.landmark = this.landmarksByCountry[0] || null;
  }

  // ค้นหาสถานที่ตามหมายเลขสถานที่
  Search(id: any) {
    this.isMultiple = false;
    this.landmark = this.landmarks.find(element => element.idx == id) || null;
  }

  // ฟังก์ชันค้นหาสถานที่จากชื่อ
  searchByPlaceName(placeName: string) {
    this.isMultiple = true;
    this.filteredLandmarks = this.landmarks.filter(element => element.name.includes(placeName));
    this.landmarksByCountry = this.filteredLandmarks.length > 0 ? this.filteredLandmarks : this.landmarks;
    this.landmark = this.landmarksByCountry[0] || null;
  }

  // ฟังก์ชันที่ถูกเรียกเมื่อกดปุ่มค้นหา
  onSearch(placeName: string) {
    this.searchByPlaceName(placeName);
  }

  // ฟังก์ชันเลือกสถานที่
  selectCountry(selectedLandmark: any) {
    this.data.landmark = selectedLandmark;
    this.data.landmarksByCountry = this.landmarksByCountry;
    this.data.isMultiple = this.isMultiple;
    this.router.navigateByUrl('/show');
  }
}