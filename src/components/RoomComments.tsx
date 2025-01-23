import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "João Silva",
    avatar: "https://i.pravatar.cc/150?u=1",
    rating: 5,
    content: "Excelente quarto! Muito confortável e com uma vista incrível.",
    date: "15/03/2024"
  },
  {
    id: "2",
    author: "Maria Santos",
    avatar: "https://i.pravatar.cc/150?u=2",
    rating: 4,
    content: "Ótima experiência, apenas alguns detalhes poderiam ser melhorados.",
    date: "10/03/2024"
  }
];

interface RoomCommentsProps {
  roomId: string;
}

export const RoomComments = ({ roomId }: RoomCommentsProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-navy dark:text-gold">Comentários</h2>
      <div className="space-y-4">
        {mockComments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-navy rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-navy dark:text-gold">{comment.author}</h3>
                <div className="flex items-center gap-1">
                  {[...Array(comment.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};