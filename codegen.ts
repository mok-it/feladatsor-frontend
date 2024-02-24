import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.VITE_APP_GRAPHQL_ENDPOINT,
  debug: true,
  verbose: true,
  documents: "src/**/*.graphql",
  generates: {
    "./src/generated/graphql.schema.json": {
      schema: "./schema.graphql",
      plugins: ["introspection"],
    },
    "src/generated/graphql.tsx": {
      schema: "./schema.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        enumsAsTypes: true,
        useImplementingTypes: true,
        nonOptionalTypename: true,
      },
    },
  },
};

export default config;
