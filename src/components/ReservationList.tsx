import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useReservations } from "@/contexts/ReservationContext";

export const ReservationList = () => {
  const { toast } = useToast();
  const { reservations, removeReservation } = useReservations();

  const handleCancel = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }

      removeReservation(id);
      toast({
        title: "Reserva Cancelada",
        description: "Sua reserva foi cancelada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao Cancelar",
        description: "Não foi possível cancelar sua reserva. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-serif text-navy dark:text-gold mb-8">Minhas Reservas</h2>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white dark:bg-navy rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 dark:border dark:border-gray-800"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-serif text-navy dark:text-gold mb-2">
                  {reservation.room.name}
                </h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    Check-in: {format(reservation.startDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                  <p>
                    Check-out: {format(reservation.endDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                  <p className="text-lg font-semibold text-navy dark:text-white">
                    R${reservation.room.pricePerNight} por noite
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(reservation.id)}
                  className="block ml-auto"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};