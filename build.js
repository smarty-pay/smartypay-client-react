const esbuild = require('esbuild');
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const svgrPlugin = require('esbuild-plugin-svgr');
const cssModulesPlugin = require('esbuild-css-modules-plugin')

async function build(){
  // make react lib
  await esbuild.build({
    logLevel: 'info',
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: 'external',
    outfile: `dist/esbuild/index.jsx`,
    plugins: [
      cssModulesPlugin(),
      svgrPlugin(),
      dtsPlugin()
    ]
  });
}


build().catch(() => process.exit(1));

