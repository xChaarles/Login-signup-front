import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'SistemCofee',
        loadComponent: () => import('./SistemCofee/SistemCofee.component'),
        children:[
            {
                path: 'login',
                title: 'Inicio de Sesion',
                loadComponent: () => import('./SistemCofee/login/login.component'),
            },
            {
                path: 'singup',
                title: 'Registrate',
                loadComponent: () => import('./SistemCofee/singup/singup.component'),
            }
            {
                path:'', 
                redirectTo: 'login',
                pathMatch:'full',
            }
        ]
    },
    {
        path: '',
        redirectTo: '/SistemCofee',
        pathMatch: 'full'
    }
];