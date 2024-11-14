import { WorkoutTrackerPageComponent } from './features/workout-tracker-page/workout-tracker-page.component';
import { Routes } from '@angular/router';
import { LandingPageComponent } from './shared/landing-page/landing-page.component';
import { WorkoutDashboardPageComponent } from './features/workout-dashboard-page/workout-dashboard-page.component';

export const routes: Routes = [
    {
        path: '', component: LandingPageComponent
    },
    {
        path: 'workout-tracker', component: WorkoutTrackerPageComponent
    },
    {
        path: 'workout-dashboard' , component: WorkoutDashboardPageComponent
    },
    {
        path: '**', redirectTo: ''
    }
];
