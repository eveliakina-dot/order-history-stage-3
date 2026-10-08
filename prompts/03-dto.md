Generate TypeScript DTO interfaces for this OpenAPI schema.
Follow this convention strictly:
- Interface names: PascalCase + "Dto" suffix. Every schema object gets its own interface.
- Enums: exported string literal union type aliases — never `string`.
- Optionality: a property NOT in the `required` array gets `?`. Nothing else does.
- Nullability: `nullable: true` adds `| null` — independent of `required`.
- Formats: add a JSDoc comment for uuid, date-time, date, uri, integer and float.
- Never add a field that is not in the schema.

[paste the full YAML excerpt here]
