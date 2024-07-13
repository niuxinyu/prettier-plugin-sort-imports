run_spec(__dirname, ["typescript"], {
  importOrder: [
      "^react$",
      "<THIRD_PARTY_MODULES>",
      "^@server/(.*)$",
      "^@core/(.*)$",
      "^@ui/(.*)$",
      "^[./]"
      ],
  importOrderSeparation: true,
  importOrderParserPlugins: ['typescript', "jsx"]
});
