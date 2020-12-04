const { install } = require('esinstall');
const fs = require('fs');
const path = require('path');
const glob = require('tiny-glob/sync');

let pkg = process.argv[2];

if (!pkg) {
	glob('**', { cwd: 'repro' }).forEach(file => {
		const dest = `node_modules/repro/${file}`;
		try { fs.mkdirSync(path.dirname(dest), { recursive: true }); } catch {}

		fs.copyFileSync(`repro/${file}`, dest);
	});

	pkg = 'repro';
}

async function main() {
	await install([pkg], {
		logger: {
			debug: (...args) => console.log(...args),
			log: (...args) => console.log(...args),
			warn: (...args) => console.log(...args),
			error: (...args) => console.log(...args),
		},
		packageLookupFields: [ 'svelte' ],
		rollup: {
			plugins: [require('rollup-plugin-svelte')()]
		}
	});

	glob('web_modules/**', { filesOnly: true }).forEach(file => {
		console.log(file);
	});
}

main();