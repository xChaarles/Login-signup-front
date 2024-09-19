import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '../Shared/Sidemenu/sidemenu.component';

@Component({
  selector: 'app-SistemCoffe',
  standalone: true,
  imports: [RouterModule, SidemenuComponent],
  templateUrl: './SistemCofee.component.html',
  styles: ``
})
export default class SistemCofeeComponent {

}
