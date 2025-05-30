import React, {
	createContext,
	useState,
	useEffect,
	useMemo,
	type ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { postLoginUser } from 'src/services/api/methods';
import { type User, type LoginUser, type LoginUserResponse } from 'types';
import { paths } from 'enums';

interface IAuthContext {
	isAuthenticated: boolean;
	login: (data: LoginUser) => void;
	logout: () => void;
	user: User | null;
	authTokens: LoginUserResponse | null;
}

const initialContext: IAuthContext = {
	isAuthenticated: false,
	login: () => undefined,
	logout: () => undefined,
	user: null,
	authTokens: null,
};

export const AuthContext = createContext<IAuthContext>(initialContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(() =>
		localStorage.getItem('authTokens')
			? jwtDecode(localStorage.getItem('authTokens') as string)
			: null,
	);
	const [authTokens, setAuthTokens] = useState<LoginUserResponse | null>(
		() =>
			localStorage.getItem('authTokens')
				? JSON.parse(localStorage.getItem('authTokens') as string)
				: null,
	);

	const authData: IAuthContext = useMemo(() => {
		const isAuthenticated = !!localStorage.getItem('authTokens');

		const login = ({ username, password }: LoginUser) => {
			postLoginUser({ username, password })
				.then((response) => {
					const responseData = response.data;
					setUser(jwtDecode(responseData.access));
					setAuthTokens(responseData);
					localStorage.setItem(
						'authTokens',
						JSON.stringify(responseData),
					);
					window.location.href = paths.root;
				})
				.catch((error) => {
					return Promise.reject(error);
				});
		};

		const logout = () => {
			setAuthTokens(null);
			setUser(null);
			localStorage.removeItem('authTokens');
			window.location.href = paths.root;
		};

		return { isAuthenticated, login, logout, user, authTokens };
	}, [authTokens, user]);

	useEffect(() => {
		if (authTokens) {
			setUser(jwtDecode(authTokens.access));
		}
	}, [authTokens]);

	return (
		<AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
	);
}
