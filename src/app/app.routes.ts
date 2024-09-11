import { Routes } from '@angular/router';
import { LandmarksComponent } from './page/landmarks/landmarks.component';
import { ShowComponent } from './page/show/show.component';

export const routes: Routes = [
{path : '', component:LandmarksComponent},
{path : 'show', component:ShowComponent}
];
