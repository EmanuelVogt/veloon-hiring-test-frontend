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
  reviews: Reviews[]
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
}

export interface Reviews {
  user: string
  pictureUrl: string
  comment: string
  date: Date
}