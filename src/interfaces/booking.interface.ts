export interface Booking {
    id: string;
    guest: string;
    orderDate: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    specialRequest: string;
    roomType: string; //relacionarlo q sea un objeto con rooms
    status: string;
    specialRequestType: string;
  }