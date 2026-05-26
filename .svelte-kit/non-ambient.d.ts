
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/compile" | "/api/documents" | "/api/documents/[...path]" | "/api/snippets" | "/api/snippets/[...path]";
		RouteParams(): {
			"/api/documents/[...path]": { path: string };
			"/api/snippets/[...path]": { path: string }
		};
		LayoutParams(): {
			"/": { path?: string | undefined };
			"/api": { path?: string | undefined };
			"/api/compile": Record<string, never>;
			"/api/documents": { path?: string | undefined };
			"/api/documents/[...path]": { path: string };
			"/api/snippets": { path?: string | undefined };
			"/api/snippets/[...path]": { path: string }
		};
		Pathname(): "/" | "/api/compile" | `/api/documents/${string}` & {} | `/api/snippets/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | string & {};
	}
}