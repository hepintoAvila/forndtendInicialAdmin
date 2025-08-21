
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Login/useLogin';
export default function useLogout(){
	const { logout } = useAuth();
	const navigate = useNavigate();

	const performLogout = async () => {
		try {
			await logout();
			navigate('/account/login', { replace: true });
			return true;
		} catch (error) {
			console.error('Error durante logout:', error);
			return false;
		}
	};

	return performLogout;
};