import { Header } from "@/components/Header";
import { RoomList } from "@/components/RoomList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <RoomList />
    </div>
  );
};

export default Index;