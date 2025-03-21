import { Room } from './RoomInterface';

export interface Booking {
    id: string;
    guest: string;
    orderDate: string;
    checkInDate: string;
    checkInTime: string;
    checkOutDate: string;
    checkOutTime: string;
    specialRequest: string;
    room: Room;
    status: string;
    specialRequestType: string;
}