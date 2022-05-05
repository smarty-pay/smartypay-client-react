const esbuild = require('esbuild');
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const svgrPlugin = require('esbuild-plugin-svgr');

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
      svgrPlugin(),
      dtsPlugin()
    ]
  });
}


build().catch(() => process.exit(1));

