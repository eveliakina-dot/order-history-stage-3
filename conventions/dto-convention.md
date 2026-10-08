# DTO convention

Compiled from the lesson "Swagger-to-DTO: Reading the API Contract".

## Naming and structure
- Interface: schema name + `Dto` (`OrderSummaryDto`). Every schema object gets its own interface; nested objects are never inlined.
- Field names exactly as in the schema — no camelCasing, no renaming.
- Enums as exported string literal unions, never `string`.
- Nested types declared above the parent that uses them.
- Formats (`date-time`, `date`, `uuid`, `uri`) and `integer` vs `number` go in a JSDoc comment; the TS type stays the wire type (`string` for dates — never `Date`).

## Optionality × nullability — read `required` first

| Schema | TypeScript |
|---|---|
| in `required`, not nullable | `field: T` |
| not in `required`, not nullable | `field?: T` |
| in `required`, `nullable: true` | `field: T \| null` |
| not in `required`, `nullable: true` | `field?: T \| null` |

## Six ways a translation is wrong
dropped field · invented field · wrong optionality · flattened nesting · type coercion · enum loss
