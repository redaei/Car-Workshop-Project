# Car Workshop System

Cars Workshop system to manage the work flow in the workshop and record the customers/ cars information and the pending / done jops for each worker.

### Screenshots

Here are some screenshots from the system:

![Alt text](./screenshots/admin-cars.JPG 'Cars list on admin side screenshot')
_Cars list on admin side_


![Alt text](./screenshots/admin-view%20service.JPG 'View service on admin side screenshot')
_View service on admin side_


![Alt text](./screenshots/admin-edit%20service.JPG 'Edit service on admin side screenshot')
_Edit service on admin side_

![Alt text](./screenshots/supervisor%20-%20bills.JPG 'Bills list classified by payment status on supervisor side screenshot')
_Bills list classified by payment status on supervisor side_

![Alt text](./screenshots/supervisor-%20pay%20bill.JPG 'Pay a bill on supervisor side screenshot')
_Pay a bill on supervisor side_

![Alt text](./screenshots/worker-services.JPG 'Services list on worker side screenshot')
_Services list on worker side_

### Tech/Framework used

#### This System was developed using:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB (mongoose)
- EJS
- jQuery

### Features

This system provides full monitor on all works are going in the workshop. the pending / done jobs. and to know the effort done by each employee.
   
Moreover there are tow types of popup alerts were added to give the user an idea about what's done and what's not.

### Process Flow

when a car came to the workshop, the dedicated worker will select the service he will provide, then he can search for the car from the existing cars list. Otherwise, he will enter it's information like: car number, make, model, color, owner name, and contact number. 

After that, a new bill will be created containing car, worker, and service information.

Then, the user with Supervisor role will be able to see the bills and he can update the payment status for the pending bills either Pay or Cancel the bill.

If supervisor click on Pay, an pop-up box wl show asking him to enter the amount for that bill.


### User Roles:

- **Admin:** can manage users, cars, services.
- **Supervisor** can manage the payments and the bills.
- **Worker** can select the services and the cars, and enter the cars if not exist.
  > **_Note:_** the worker can be assigned to more than one service.

### Contribute

Many thanks to Saad, Ali, Ahlam for there guide and support.
Also, thanks to my colleagues Jasim and Mohsen for there feedback and suggestions.

### Credits

SVG logo source: [svgrepo.com](https://www.svgrepo.com/svg/245376/car-repair?edit=true)