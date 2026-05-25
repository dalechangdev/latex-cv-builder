export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico"]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.CSwVFaVY.js",app:"_app/immutable/entry/app.BLmjD2Wh.js",imports:["_app/immutable/entry/start.CSwVFaVY.js","_app/immutable/chunks/DQ3xZBc7.js","_app/immutable/chunks/DF_Zawxt.js","_app/immutable/chunks/CJ2uwvXK.js","_app/immutable/entry/app.BLmjD2Wh.js","_app/immutable/chunks/C3Kzn10D.js","_app/immutable/chunks/DF_Zawxt.js","_app/immutable/chunks/DDNP0bAP.js","_app/immutable/chunks/CnuogJGj.js","_app/immutable/chunks/ChJdINjd.js","_app/immutable/chunks/CJ2uwvXK.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/compile",
				pattern: /^\/api\/compile\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/compile/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";