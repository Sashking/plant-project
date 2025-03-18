// import type { Config } from 'tailwindcss';

// export default {
// 	content: ['./src/**/*.{html,js,svelte,ts}'],

// 	theme: {
// 		extend: {}
// 	},

// 	plugins: []
// } as Config;

import { withUt } from 'uploadthing/tw';

export default withUt({
	content: ['./src/**/*.{html,js,svelte,ts,tsx,mdx}', './node_modules/@uploadthing/svelte/dist**'],

	theme: {
		extend: {}
	},

	plugins: []
});
