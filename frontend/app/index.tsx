import { Redirect } from 'expo-router';
import { useAuth } from '../src/stores/auth';

export default function Index() {
  const { isAuthenticated, role } = useAuth();

  return (
    <Redirect href={isAuthenticated && role ? `/${role}/home` : '/login'} />
  );
}
