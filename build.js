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
    minify: false,
    format: 'esm',
    sourcemap: 'external',
    outdir: 'dist',
    plugins: [
      cssModulesPlugin({
        v2: true,
        inject: true,
      }),
      svgrPlugin(),
      dtsPlugin()
    ]
  });
}


build().catch(() => process.exit(1));

