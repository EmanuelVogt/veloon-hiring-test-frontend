import { Room, Reservation } from "../types/hotel";

export const mockRooms: Room[] = [
  {
    id: "1",
    name: "Deluxe Ocean Suite",
    capacity: 2,
    numberOfBeds: 1,
    stars: 5,
    pricePerNight: 450,
    imageUrl: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60"
    ],
    availability: [],
  },
  {
    id: "2",
    name: "Garden View Room",
    capacity: 2,
    numberOfBeds: 2,
    stars: 4,
    pricePerNight: 280,
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60"
    ],
    availability: [],
  },
  {
    id: "3",
    name: "Family Suite",
    capacity: 4,
    numberOfBeds: 2,
    stars: 4,
    pricePerNight: 550,
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60"
    ],
    availability: [],
  },
];

export const mockReservations: Reservation[] = [
  {
    id: "1",
    room: mockRooms[0],
    startDate: new Date("2024-03-20"),
    endDate: new Date("2024-03-25"),
    status: "Confirmed",
  },
];