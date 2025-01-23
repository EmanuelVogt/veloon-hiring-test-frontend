import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Props = {
  comments: Comment[];
};
interface Comment {
  user: string;
  pictureUrl: string;
  comment: string;
  date: Date;
}

export const RoomComments = ({ comments }: Props) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif text-navy dark:text-gold">
        Comentários
      </h2>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-white dark:bg-navy rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src={comment.pictureUrl} alt={comment.user} />
                <AvatarFallback>{comment.user}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-navy dark:text-gold">
                  {comment.user}
                </h3>
              </div>
              <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                {formatDate(String(comment.date))}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
