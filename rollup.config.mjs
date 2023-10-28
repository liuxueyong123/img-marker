import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import cleanup from 'rollup-plugin-cleanup'

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: './lib/index.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [
      typescript(),
      terser(),
      cleanup()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: './lib/index.esm.js',
        format: 'esm'
      }
    ],
    plugins: [
      typescript(),
      terser(),
      cleanup()
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'lib/index.d.ts', format: 'esm' }],
    plugins: [dts()]
  }
]
export default config
