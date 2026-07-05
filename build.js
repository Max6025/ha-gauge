import esbuild from 'esbuild';

const watch = process.argv.includes('--watch');
const minify = process.argv.includes('--minify');

const options = {
  entryPoints: ['src/ha-gauge-card.ts'],
  outfile: 'dist/ha-gauge-card.js',
  bundle: true,
  format: 'iife',
  target: 'es2019',
  minify,
  sourcemap: !minify,
  logLevel: 'info',
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(options);
}
