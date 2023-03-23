import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import MENUS from '../../../../assets/menu.json';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() sidenav: EventEmitter<any> = new EventEmitter();
  public mainmenu: any = [];
  selectedPath: any;
  public user_name: any;
  MENUS = {
    "1": [
      {
        "label": "Home",
        "route": "/user/home",
        "icon": "home",
        "child": []
      }
    ]
  }

  constructor( private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event: any) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
     this.mainmenu = this.MENUS[1];
    this.user_name = this.authService.currentUser.first_name + ' ' + this.authService.currentUser.last_name ;
  }

///implement for passwordupdate 
  openChangePasswordForm(){  
  }

  toggleSideBar(){
    if(window.innerWidth < 1024){
      this.sidenav.emit();
    }
  }

}
