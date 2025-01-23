import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-navy dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-serif text-navy dark:text-gold cursor-pointer" onClick={() => navigate("/")}>
            Hotéis de Luxo
          </h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-navy hover:text-gold dark:text-gold dark:hover:text-white"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            className="text-navy hover:text-gold dark:text-gold dark:hover:text-white"
            onClick={() => navigate("/reservations")}
          >
            Minhas Reservas
          </Button>
        </nav>
      </div>
    </header>
  );
};