import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import dotenv from 'rollup-plugin-dotenv';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: 'dist/esm/index.js',
        assetFileNames: '[name][extname]',
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      dotenv.default(),
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
    ],
    external: ['react', 'react-dom'],
    watch: {
      include: './src',
      clearScreen: true,
      buildDelay: 5000,
    },
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.scss$/, /\.css$/],
    plugins: [dts()],
  },
];
