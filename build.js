const esbuild = require('esbuild');
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const fs = require('fs');

const svgFile = 'src/assets/icon.svg';
const svgFileMin = 'src/assets/icon.min.svg';
const svgFileInit = 'src/assets/icon.init.svg';

async function build(){

  try {

    // minify svg
    fs.writeFileSync(svgFileMin, fs.readFileSync(svgFile, 'utf-8').split('\n').join(''));
    fs.renameSync(svgFile, svgFileInit);
    fs.renameSync(svgFileMin, svgFile);

    // make react lib
    await esbuild.build({
      logLevel: 'info',
      entryPoints: ['src/index.tsx'],
      bundle: true,
      minify: true,
      format: 'esm',
      sourcemap: 'external',
      outfile: `dist/esbuild/index.jsx`,
      loader: {
        '.css': 'text',
        '.svg': 'text',
      },
      plugins: [
        dtsPlugin()
      ]
    });

  } finally {

    // replace svg back
    if(fs.existsSync(svgFileInit)){
      if(fs.existsSync(svgFile)){
        fs.unlinkSync(svgFile);
      }
      fs.renameSync(svgFileInit, svgFile);
    }
  }
}


build().catch(() => process.exit(1));

