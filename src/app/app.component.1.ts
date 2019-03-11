import { Component, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import theiaEntry from './theia';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit  {

  title = 'ang-theia2';
  @ViewChild('theia') theiaRef: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
          theiaEntry(this.theiaRef.nativeElement);
    });
}
}
