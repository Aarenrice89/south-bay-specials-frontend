type ApiUrl = `/${string}` | `/${string}/?${string}`;
type ApiUrls = Record<string, ApiUrl | ((...args: string[]) => ApiUrl)>;

const Endpoints = {
	// testing
	test: '/api/v1/ping/',

	// location
	locations: (searchParams: string): ApiUrl => {
		return `/api/v1/locations/?${searchParams}`;
	},
	location: (id: string) => `/api/v1/locations/${id}/`,

	// specials
	specials: '/api/v1/specials/',
	special: (id: string) => `/api/v1/specials/${id}/`,
} satisfies ApiUrls;

export { type ApiUrl };
export default Endpoints;
