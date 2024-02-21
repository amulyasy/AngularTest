import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../services/contacts.service";
import {Contact} from "./contact";
import {updatePlaceholderMap} from "@angular/compiler/src/render3/view/i18n/util";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  public contacts: any = [];
  contact: Contact;

  constructor(private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.readAll();
  }

  private readAll() {
    return this.contactService.loadAll().subscribe((list) => {
      this.contacts = list;
      console.log(this.contacts)
    });
  }

  edit(contact) {
    contact.isEditable = true
  }

  delete(contact_) {
    this.contactService.deleteContact(contact_.id).subscribe((list) => {
      this.contacts = list;
      console.log(this.contacts)
    })
  }

  update(contact) {
    this.contactService.putContact(contact).subscribe((res) => {
      if(res) {
        this.readAll();
      }
    })
    contact.isEditable = false;
  }

  cancel(contact) {
    contact.isEditable = false;
  }
}
