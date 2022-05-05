const esbuild = require('esbuild');
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const svgrPlugin = require('esbuild-plugin-svgr');
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const { dependencies } = require("./package.json");

async function build(){

  // make react lib
  await esbuild.build({
    logLevel: 'info',
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: 'external',
    outdir: 'dist',
    // remove external libs from out file
    external: Object.keys(dependencies),
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

