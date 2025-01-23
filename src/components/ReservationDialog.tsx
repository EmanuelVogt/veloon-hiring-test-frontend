import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Room } from "@/types/hotel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useReservations } from "@/contexts/ReservationContext";
import { DateRange } from "react-day-picker";

interface ReservationDialogProps {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReservationDialog = ({ room, open, onOpenChange }: ReservationDialogProps) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const { addReservation } = useReservations();

  const handleReserve = async () => {
    if (date?.from && date?.to && room) {
      await addReservation(room, date.from, date.to);
      onOpenChange(false);
    }
  };

  const disabledDays = [
    ...room.availability
      .filter(availability => !availability.isAvailable)
      .map(availability => availability.date),
    { before: new Date() }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden rounded-lg">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-navy/5 to-gold/5 dark:from-navy dark:to-navy/90">
          <DialogTitle className="text-2xl font-serif text-navy dark:text-gold">
            Reservar {room.name}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium text-lg text-navy dark:text-gold">
                Selecione o período da reserva
              </h4>
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                disabled={disabledDays}
                numberOfMonths={1}
                className="rounded-xl border shadow-lg bg-white dark:bg-navy/50 dark:border-gray-700 w-full"
                classNames={{
                  months: "space-y-4 w-full",
                  month: "space-y-4 w-full",
                  caption: "flex justify-center pt-2 relative items-center dark:text-gold",
                  caption_label: "text-base font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-8 w-8 bg-transparent p-0 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gold dark:hover:text-white rounded-full transition-colors duration-200",
                  nav_button_previous: "absolute left-2",
                  nav_button_next: "absolute right-2",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.9rem] dark:text-gray-400 flex-1",
                  row: "flex w-full mt-2",
                  cell: "flex-1 relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/20 dark:text-gray-300",
                  day: "h-9 w-9 p-0 font-normal rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 mx-auto flex items-center justify-center",
                  day_range_end: "day-range-end",
                  day_selected: "bg-navy text-white hover:bg-navy/90 hover:text-white dark:bg-gold dark:text-navy dark:hover:bg-gold/90 font-medium",
                  day_today: "bg-accent text-accent-foreground font-medium border-2 border-navy/20 dark:border-gold/20",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                }}
              />
            </div>
            {date?.from && date?.to && (
              <div className="space-y-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                  <span className="font-medium text-navy dark:text-gold">
                    {format(date.from, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Check-out:</span>
                  <span className="font-medium text-navy dark:text-gold">
                    {format(date.to, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="p-6 pt-0">
          <Button
            onClick={handleReserve}
            disabled={!date?.from || !date?.to}
            className="w-full bg-gold hover:bg-navy text-white dark:bg-gold dark:hover:bg-navy dark:text-white transition-colors duration-200 font-medium text-base py-6"
          >
            Confirmar Reserva
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};