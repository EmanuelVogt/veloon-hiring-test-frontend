export interface Room {
  id: string;
  name: string;
  capacity: number;
  numberOfBeds: number;
  stars: number;
  pricePerNight: number;
  imageUrl: string;
  images?: string[];
  availability: Availability[];
}

export interface Availability {
  date: Date;
  isAvailable: boolean;
}

export interface Reservation {
  id: string;
  room: Room;
  startDate: Date;
  endDate: Date;
  status: "Confirmed" | "Pending" | "Cancelled";
}