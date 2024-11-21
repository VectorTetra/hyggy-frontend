import axios from 'axios';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

class JwtPayload {
	nameid: string;
	email: string;
	given_name: string;
	role: string;
	nbf: number;
	exp: number;
	iat: number;
	iss: string;
	aud: string;
}

class UserForAuthenticationDto {
	Email: string;
	Password: string;
}

class UserForRegistrationDto {
	Name: string;
	Surname: string;
	Email: string;
	Role: string;
	Password: string;
	ConfirmPassword: string;
}

class AuthResponseDto {
	isAuthSuccessfull: boolean;
	error: string | null;
	token: string | null;
}

/** Перевіряємо, чи ми в браузері */
function isBrowser(): boolean {
	return typeof window !== 'undefined';
}

export function validateToken() {
	if (!isBrowser()) {
		return { status: 401, message: 'Токен недоступний на сервері' };
	}

	const token = localStorage.getItem('token');
	if (!token) {
		return { status: 401, message: 'Неавторизований' };
	}

	try {
		const decodedToken = jwtDecode<JwtPayload>(token);
		const currentTime = Math.floor(Date.now() / 1000);

		if (!decodedToken || !decodedToken.exp) {
			return { status: 401, message: 'Ви не авторизовані' };
		}

		if (decodedToken.exp < currentTime) {
			return { status: 401, message: 'Ваш токен прострочений!' };
		} else {
			return { status: 200, message: 'Токен дійсний' };
		}
	} catch (error) {
		return { status: 500, message: 'Помилка при обробці токена' };
	}
}

export function removeToken() {
	if (isBrowser()) {
		localStorage.removeItem('token');
	}
}

export function setToken(token: string) {
	if (isBrowser()) {
		localStorage.setItem('token', token);
	}
}

export function getToken(): string | null {
	if (isBrowser()) {
		return localStorage.getItem('token');
	}
	return null;
}

export function getDecodedToken(): JwtPayload | null {
	if (!isBrowser()) {
		return null;
	}

	const token = getToken();
	if (!token) {
		return null;
	}
	if (validateToken().status !== 200) {
		removeToken();
		return null;
	}

	return jwtDecode<JwtPayload>(token);
}

export function checkRole(role: string): boolean {
	const token = getDecodedToken();
	return token?.role === role;
}

export function isAdmin() {
	return checkRole('Admin');
}

export function isUser() {
	return checkRole('User');
}

export function isStorekeeper() {
	return checkRole('Storekeeper');
}

export function isOwner() {
	return checkRole('Owner');
}

export function isGeneralAccountant() {
	return checkRole('General Accountant');
}

export function isAccountant() {
	return checkRole('Accountant');
}

export function isSaler() {
	return checkRole('Saler');
}

export async function Authorize(params: UserForAuthenticationDto) {
	try {
		const response = await axios.post('http://www.hyggy.somee.com/api/shopemployee/authenticate', params);

		if (response.data.isAuthSuccessfull) {
			setToken(response.data.token);
		} else {
			removeToken();
			toast.error(response.data.error);
		}
		return response.data;

	} catch (error) {
		removeToken();
		if (error.response && error.response.data) {
			toast.error('Помилка авторизації: ' + error.response.data);
		} else {
			toast.error('Невідома помилка авторизації');
		}
	}
}

export async function RegisterAsWorker(params: UserForRegistrationDto) {
	try {
		const response = await axios.post('http://www.hyggy.somee.com/api/shopemployee/register', params);

		if (response.data.message) {
			toast.info(response.data.message, { autoClose: false, closeOnClick: true });
		}

	} catch (error) {
		if (error.response && error.response.data) {
			toast.error('Помилка реєстрації: ' + error.response.data);
		} else {
			toast.error('Невідома помилка реєстрації');
		}
	}
}

export async function RegisterAsClient(params: UserForRegistrationDto) {
	try {
		const response = await axios.post('http://www.hyggy.somee.com/api/Customer/register', params);

		if (response.data.message) {
			toast.info(response.data.message, { autoClose: false, closeOnClick: true });
		}

	} catch (error) {
		if (error.response && error.response.data) {
			toast.error('Помилка реєстрації: ' + error.response.data);
		} else {
			toast.error('Невідома помилка реєстрації');
		}
	}
}
