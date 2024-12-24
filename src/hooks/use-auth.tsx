import { useContext } from 'react';

import { AuthContext } from 'providers/auth';

export default function useAuthContext() {
	return useContext(AuthContext);
}
