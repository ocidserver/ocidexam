
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}

const UserAvatar = ({ src, name, size = "md" }: UserAvatarProps) => {
  // Size class mapping
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16"
  };
  
  // Get initials from name
  const getInitials = () => {
    if (!name) return "";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Avatar className={sizeClass[size]}>
      <AvatarImage src={src} alt={name || "User"} />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {name ? getInitials() : <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
