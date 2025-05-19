type ApiUrl = `/${string}` | `/${string}/?${string}`;
type ApiUrls = Record<string, ApiUrl | ((...args: string[]) => ApiUrl)>;

const Endpoints = {
	// testing
	test: '/api/v1/ping/',

	// auth
	login: '/api/auth/',
	refresh: '/api/auth/refresh/',
	register: '/api/auth/register/',

	// location
	locations: (searchParams: string): ApiUrl => {
		return `/api/v1/locations/?${searchParams}`;
	},
	location: (id: string) => `/api/v1/locations/${id}/`,

	// specials
	specials: '/api/v1/specials/',
	special: (id: string) => `/api/v1/specials/${id}/`,
	groupedSpecial: (searchParams: string): ApiUrl => {
		return `/api/v1/specials/grouped/?${searchParams}`;
	},
} satisfies ApiUrls;

export { type ApiUrl };
export default Endpoints;
