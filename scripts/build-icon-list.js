'use strict'; // eslint-disable-line

const {promisify} = require('util');
const readFile = promisify(require('fs').readFile);
const writeFile = promisify(require('fs').writeFile);

runScript();

async function runScript() {
	const {images} = await loadJson(`${__dirname}/../bower_components/fticons/imageset.json`);
	await writeDemoData(images, `${__dirname}/../demos/src/data.json`);
	await writeSassIconList(images, `${__dirname}/../scss/_icon-list.scss`);
}

async function loadJson(filePath) {
	return JSON.parse(await readFile(filePath, 'utf-8'));
}

async function writeDemoData(images, filePath) {
	const icons = images.map(simplifyImageForDemoData);
	await writeFile(filePath, JSON.stringify({icons}, null, '\t'));
}

function simplifyImageForDemoData(image) {
	return {
		name: image.name
	};
}

async function writeSassIconList(images, filePath) {
	const iconNames = images.map(image => image.name);
	const paddedIconNames = iconNames.map(name => `\t${name}`);
	const sass = `$o-icons-list: (\n${paddedIconNames.join(',\n')}\n);\n`;
	await writeFile(filePath, sass);
}
