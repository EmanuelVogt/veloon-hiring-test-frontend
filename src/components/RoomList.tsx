import { RoomCard } from "./RoomCard";
import { mockRooms } from "@/data/mockData";

export const RoomList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-serif text-navy dark:text-gold mb-8">Quartos Disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};