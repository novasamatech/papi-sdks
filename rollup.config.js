import alias from "@rollup/plugin-alias"
import resolve from "@rollup/plugin-node-resolve"
import path from "path"
import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"

const commonOptions = {
  input: "src/index.ts",
  external: (id) => !/^[./]/.test(id) && !/^@\//.test(id),
}

const absoluteAlias = alias({
  entries: [
    {
      find: "@",
      // In tsconfig this would be like `"paths": { "@/*": ["./src/*"] }`
      replacement: path.resolve("./src"),
      customResolver: resolve({
        extensions: [".js", ".ts"],
      }),
    },
  ],
})

export default [
  {
    ...commonOptions,
    plugins: [absoluteAlias, esbuild()],
    output: [
      {
        dir: `dist`,
        format: "es",
        sourcemap: true,
        preserveModules: true,
      },
    ],
  },
  {
    ...commonOptions,
    plugins: [absoluteAlias, dts()],
    output: {
      file: `dist/index.d.ts`,
      format: "es",
    },
  },
]
