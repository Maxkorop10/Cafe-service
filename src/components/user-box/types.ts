export interface UserBoxProps {
  id: string;
  userId: string;
  name: string | null;
  email: string;
  createdAt: string;
  fire: boolean;
  make_waiter: boolean;
  make_manager: boolean;
  onRoleChange: (newRole: "USER" | "MANAGER" | "ADMIN") => void;
}
