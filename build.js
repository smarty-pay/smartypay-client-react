const esbuild = require('esbuild');
// const { dtsPlugin } = require('esbuild-plugin-d.ts');
const svgrPlugin = require('esbuild-plugin-svgr');
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const { dependencies } = require('./package.json');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function build() {
  // make react lib
  const result = await esbuild.build({
    logLevel: 'info',
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: 'external',
    outfile: `dist/esbuild/index.js`,
    metafile: true,
    // remove external libs from out file
    external: Object.keys(dependencies),
    plugins: [
      cssModulesPlugin({
        v2: true,
        inject: true,
      }),
      svgrPlugin(),
      // dtsPlugin(), // broken by typescript 5, see next code-block
    ],
  });

  console.log('metafile result', result);

  // make d.ts files
  // old solution with "dtsPlugin()" is not working because of entryPoints, only full mode working now
  await exec('npx tsc  --declaration --emitDeclarationOnly');
}

build().catch((e) => {
  console.error('build error', e);
  process.exit(1);
});
