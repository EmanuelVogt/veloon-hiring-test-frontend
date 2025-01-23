import React, { createContext, useContext, useState } from 'react';
import { Room, Reservation } from '@/types/hotel';
import { useToast } from '@/hooks/use-toast';

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (room: Room, startDate: Date, endDate: Date) => Promise<void>;
  isReserved: (roomId: string) => boolean;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const { toast } = useToast();

  const addReservation = async (room: Room, startDate: Date, endDate: Date) => {
    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: room.id,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to make reservation');
      }

      const newReservation: Reservation = {
        id: Date.now().toString(),
        room,
        startDate,
        endDate,
        status: 'Confirmed',
      };

      setReservations(prev => [...prev, newReservation]);
      toast({
        title: "Reserva Confirmada",
        description: `Sua reserva para ${room.name} foi confirmada com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro na Reserva",
        description: "Não foi possível completar sua reserva. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const isReserved = (roomId: string) => {
    return reservations.some(reservation => reservation.room.id === roomId);
  };

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, isReserved }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservations must be used within a ReservationProvider');
  }
  return context;
};