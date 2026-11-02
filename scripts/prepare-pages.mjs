import { readFile, writeFile } from 'node:fs/promises';

const readText = (file) => readFile(file, 'utf8');
const writeText = (file, value) => writeFile(file, value, 'utf8');

let app = await readText('src/App.jsx');
if (!app.includes('const assetUrl =')) {
  const anchor = 'const coverImage =';
  if (!app.includes(anchor)) throw new Error('App.jsx image helper anchor was not found');
  app = app.replace(anchor, "const assetUrl = (path) => path ? import.meta.env.BASE_URL + 'images/' + String(path).split('/').pop() : path;\n" + anchor);
}
app = app.replace(/src=\{(?!assetUrl\()([^{}]+)\}/g, 'src={assetUrl($1)}');
await writeText('src/App.jsx', app);

let main = await readText('src/main.jsx');
main = main.replaceAll('BrowserRouter', 'HashRouter');
await writeText('src/main.jsx', main);

const packageJson = JSON.parse(await readText('package.json'));
delete packageJson.scripts.prebuild;
await writeText('package.json', JSON.stringify(packageJson, null, 2) + '\n');

console.log('Prepared the app for GitHub Pages.');
