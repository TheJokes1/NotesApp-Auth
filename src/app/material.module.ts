import {NgModule} from '@angular/core'
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    imports: [MatButtonModule, MatInputModule, MatMenuModule, MatIconModule, MatDialogModule, MatTooltipModule],
    exports: [MatButtonModule, MatInputModule, MatMenuModule, MatIconModule, MatDialogModule, MatTooltipModule]
})
export class MaterialModule {}
