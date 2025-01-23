import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { RoomCarousel } from "@/components/RoomCarousel";
import { RoomComments } from "@/components/RoomComments";
import { Button } from "@/components/ui/button";
import { useReservations } from "@/contexts/ReservationContext";
import { ReservationDialog } from "@/components/ReservationDialog";
import { Room } from "@/types/hotel";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isReserved } = useReservations();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(`http://localhost:3000/room/${id}`);

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const data: Room = await response.json();
        setRoom(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocorreu um erro desconhecido.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl text-gray-700 dark:text-gray-300">Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl text-red-500">Erro: {error}</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl text-gray-700 dark:text-gray-300">Sala não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif text-navy dark:text-gold mb-6">
          {room.name}
        </h1>
        <RoomCarousel images={room.images || [room.imageUrl]} />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-navy dark:text-gold">
              Detalhes do Quarto
            </h2>
            <div className="bg-white dark:bg-navy rounded-lg p-6 shadow-lg">
              <p className="text-gray-700 dark:text-gray-300">
                Capacidade: {room.capacity} hóspedes
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Camas: {room.numberOfBeds}
              </p>
              <p className="text-2xl font-semibold text-navy dark:text-gold mt-4">
                R${room.pricePerNight.toFixed(2)}{" "}
                <span className="text-sm font-normal">por noite</span>
              </p>
              <Button
                onClick={() => !isReserved(room.id) && setDialogOpen(true)}
                disabled={isReserved(room.id)}
                className={`w-full mt-4 ${
                  isReserved(room.id)
                    ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed dark:bg-gray-600 dark:hover:bg-gray-600"
                    : "bg-gold hover:bg-navy text-white dark:bg-gold dark:hover:bg-navy dark:text-white"
                }`}
              >
                {isReserved(room.id) ? "Reservado" : "Reservar Agora"}
              </Button>
            </div>
          </div>
          <RoomComments comments={room.reviews} />
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
