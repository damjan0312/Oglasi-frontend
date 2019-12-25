import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule, MatOptionModule, MatSelectModule, MatPaginatorModule } from '@angular/material';
@NgModule({
    imports: [MatSelectModule, MatOptionModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule],
    exports: [MatSelectModule, MatOptionModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatCardModule]
})
export class MaterialModule {

}