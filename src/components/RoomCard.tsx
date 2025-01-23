import { useState } from "react";
import { Star } from "lucide-react";
import { Room } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useReservations } from "@/contexts/ReservationContext";
import { ReservationDialog } from "./ReservationDialog";

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const { isReserved } = useReservations();
  const reserved = isReserved(room.id);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-navy dark:border-gray-800">
        <Link to={`/room/${room.id}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={room.imageUrl}
              alt={room.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-serif text-navy dark:text-gold mb-2">{room.name}</h3>
            <div className="flex items-center mb-2">
              {[...Array(room.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p>Capacidade: {room.capacity} hóspedes</p>
              <p>Camas: {room.numberOfBeds}</p>
              <p className="text-lg font-semibold text-navy dark:text-white">
                R${room.pricePerNight} <span className="text-sm font-normal">por noite</span>
              </p>
            </div>
          </CardContent>
        </Link>
        <CardFooter className="p-4 pt-0">
          <Button
            className={`w-full ${
              reserved
                ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-600'
                : 'bg-gold hover:bg-navy text-white dark:bg-gold dark:hover:bg-navy dark:text-white'
            }`}
            onClick={() => !reserved && setDialogOpen(true)}
            disabled={reserved}
          >
            {reserved ? 'Reservado' : 'Reservar Agora'}
          </Button>
        </CardFooter>
      </Card>
      <ReservationDialog
        room={room}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};