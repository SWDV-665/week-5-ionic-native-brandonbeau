import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titlePage = "Grocery List";

  items = [
    {
        name: "blueberries",
        quantity: 2
    },
    {
      name: "mango",
      quantity: 8
    },
    {
      name: "milk",
      quantity: 1
    },
    {
      name: "bread",
      quantity: 2
    },
  ];

  constructor(public alertController: AlertController, public toastController: ToastController, public socialSharing: SocialSharing) {}

  removeItem(item,index){
    console.log('Removing Item ', item, index);
    this.items.splice(index,1);
  }

  editItem(item,index){
    console.log('Edit Item ', item, index);
    this.showEditItemPrompt(item, index);
  }

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: item => {
            console.log('Confirm Cancel', item);
          }
        }, {
          text: 'Ok',
          handler: item => {
            console.log('Confirm Ok', item);
            this.items.push(item);
          }
        }
      ]
    });
    await alert.present();
  }

  async showEditItemPrompt(item, index) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: item => {
            console.log('Confirm Cancel', item);
          }
        }, {
          text: 'Ok',
          handler: item => {
            this.items[index]= item;
            console.log('Saved edited item', item);
          }
        }
      ]
    });
    await alert.present();
  }

  async shareItem(item, index) {
    console.log("Sharing Item", item, index)
    const toast = await this.toastController.create({
      message: 'Share item: ' + item.name + ':' + item.quantity + '...',
      duration: 3000
    });
    toast.present();

    let message = "Gorcery Item: " + item.name + ': ' + item.quantity;
    let subject = "Sharded via Groceries app";

    this.socialSharing.share(message, subject).then(() => {
    //Sharing via email is possible
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing", error);
    });  
  
  }
}