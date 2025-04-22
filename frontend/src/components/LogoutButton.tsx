import { Pressable } from 'react-native';
import { useAuth } from '../stores/auth';
import { LogOut } from 'lucide-react-native';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Pressable onPress={logout}>
      <LogOut size={32} color='#4F46E5' />
    </Pressable>
  );
};
