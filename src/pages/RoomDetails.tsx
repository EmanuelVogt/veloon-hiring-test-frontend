import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { RoomCarousel } from "@/components/RoomCarousel";
import { RoomComments } from "@/components/RoomComments";
import { mockRooms } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useReservations } from "@/contexts/ReservationContext";
import { ReservationDialog } from "@/components/ReservationDialog";

const RoomDetails = () => {
  const { id } = useParams();
  const room = mockRooms.find((r) => r.id === id);
  const { isReserved } = useReservations();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!room) {
    return <div>Quarto não encontrado</div>;
  }

  const reserved = isReserved(room.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-navy dark:text-gold mb-6">{room.name}</h1>
        <RoomCarousel images={room.images || [room.imageUrl]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-navy dark:text-gold">Detalhes do Quarto</h2>
            <div className="bg-white dark:bg-navy rounded-lg p-6 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300">Capacidade: {room.capacity} hóspedes</p>
              <p className="text-gray-700 dark:text-gray-300">Camas: {room.numberOfBeds}</p>
              <p className="text-2xl font-semibold text-navy dark:text-gold mt-4">
                R${room.pricePerNight} <span className="text-sm font-normal">por noite</span>
              </p>
              <Button
                onClick={() => !reserved && setDialogOpen(true)}
                disabled={reserved}
                className={`w-full mt-4 ${
                  reserved
                    ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-600'
                    : 'bg-gold hover:bg-navy text-white dark:bg-gold dark:hover:bg-navy dark:text-white'
                }`}
              >
                {reserved ? 'Reservado' : 'Reservar Agora'}
              </Button>
            </div>
          </div>
          <RoomComments roomId={room.id} />
        </div>
      </div>
      <ReservationDialog
        room={room}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default RoomDetails;