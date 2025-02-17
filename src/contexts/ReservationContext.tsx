import React, { createContext, useContext, useState } from 'react';
import { Room, Reservation } from '@/types/hotel';
import { useToast } from '@/hooks/use-toast';

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (room: Room, startDate: Date, endDate: Date) => Promise<void>;
  isReserved: (roomId: string) => boolean;
  removeReservation: (id: string) => void;
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
      const data = await response.json()
      const newReservation: Reservation = {
        id: data.id,
        room,
        startDate,
        endDate,
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

  const removeReservation = (id: string) => {
    setReservations(prev => prev.filter(reservation => reservation.id !== id));
  };

  const isReserved = (roomId: string) => {
    return reservations.some(reservation => reservation.room.id === roomId);
  };

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, isReserved, removeReservation }}>
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