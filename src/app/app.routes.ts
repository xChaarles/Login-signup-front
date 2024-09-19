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
            },
            {
                path: 'perfil',
                title: 'Perfil',
                loadComponent: () => import('./SistemCofee/perfil/perfil.component'),
            },
            {
                path: 'userlist',
                title: 'Lista Usuarios',
                loadComponent: () => import('./SistemCofee/userlist/userlist.component'),
            },
            {
                path: 'updateuser/:id',
                title: 'Actualizar Usuario',
                loadComponent: () => import('./SistemCofee/updateuser/updateuser.component'),
            },
            {
                path:'', 
                redirectTo: 'Sistemcofee',
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