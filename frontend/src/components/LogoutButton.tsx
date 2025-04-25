import { Pressable } from 'react-native';
import { useAuth } from '../stores/auth';
import { Icon } from './Icon';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Pressable onPress={logout}>
      <Icon name="log-out" size={32} />
    </Pressable>
  );
};
