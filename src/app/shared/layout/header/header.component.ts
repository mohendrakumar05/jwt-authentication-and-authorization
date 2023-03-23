import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isMenuOpened: boolean = false;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();
  public user_name: any;

  constructor(private auths: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // console.log('this.auths.currentUser: ', this.auths.currentUser);
    this.user_name = this.auths.currentUser.first_name + ' ' + this.auths.currentUser.last_name;

  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

  // public signOut(): void {
  //   // this.userService.signOut();

  //   // this.router.navigate([this.routers.LOGIN]);
  // }

  public signOutEmit(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      heightAuto: false
    }).then((result) => {

      if (result.isConfirmed) {
        this.signOut.emit();
        this.auths.logout();
      }
    })
  }

  openChangePasswordForm() {
    //   const dialogRef = this.dialog.open(LoginPasswordUpdateComponent, {
    //     disableClose: true,
    //     data: {formType: 'change-password'}
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     location.reload();
    //   });
  }

}
