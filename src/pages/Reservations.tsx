import { Header } from "@/components/Header";
import { ReservationList } from "@/components/ReservationList";

const Reservations = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <ReservationList />
    </div>
  );
};

export default Reservations;