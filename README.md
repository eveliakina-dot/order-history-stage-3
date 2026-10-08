# Order History, Stage 3: DTOs from the API Contract

⌨️ **Stage 3 of 4.** The order-history page gets its data from `GET /orders`. Your tests will assert against that response, so they need to know its exact shape — and "exact" is the whole game here. A `?` in the wrong place is a DTO that accepts a payload the API would never send, and a test that stays green while the API is broken.

**You'll need:** a fork of `order-history-stage-3` · `api/orders-list.yaml` · `conventions/dto-convention.md` · `prompts/03-dto.md` · `samples/post-orders.yaml` + `samples/post-orders-ai-draft.ts` · a new Claude conversation.


### 1. Read the `required` arrays first

Open `api/orders-list.yaml`. Before you read a single property, find every `required:` block and list its fields in `review-notes.md › Stage 3 › Before generating`. Then, for each schema object, note the fields that are `nullable: true`.

Two questions to answer there, before generating:
- Which field is **required and nullable**? (Not optional. Required. It is always present, and it can be `null`.)
- Which field looks required when you read the properties but isn't in the `required` array?

Those two are where a translation goes wrong, and a model reading the properties top to bottom will get at least one of them wrong.

### 2. Let Claude draft it

New conversation. Paste `prompts/03-dto.md` with the full schema in the slot. No hints. Send.

Save the exchange, untouched, as `claude-runs/03-dto.md`.

### 3. Review the draft — six ways to be wrong

Go field by field, schema on one side, draft on the other. Every mismatch is one of six: **dropped** field · **invented** field · **wrong optionality** · **flattened nesting** · **type coercion** · **enum loss**. Plus the convention: `Dto` suffix, schema field names preserved (no camelCasing), enum as a literal union, nested types as their own interfaces.

Each finding goes in `Stage 3 › Defects found`: *field · category · correct representation*. Check your two trap fields from step 1 first.

### 4. Deliver

`src/dto/OrdersListDto.ts`, with every nested object as its own `*Dto` interface in the same file or its own, and the status enum as a named type. Convention table, for the four states that matter:

| Schema says | TypeScript |
|---|---|
| required, not nullable | `field: T` |
| optional, not nullable | `field?: T` |
| required **and** nullable | `field: T \| null` |
| optional and nullable | `field?: T \| null` |

Nothing you flagged survives. Every field in the files is in the schema; every field in the schema is in the files.

### 5. Control pass

`samples/post-orders-ai-draft.ts` is a model's DTO for `samples/post-orders.yaml` — the schema from the previous chapter's practice. Six seeded defects, across the six categories and the convention. Find them, list them in `Stage 3 › Control pass` as *field · category · correct representation*. No rewrite.

### 6. One sentence

`Stage 3 › Hardest call`: the field in `GET /orders` most likely to be mistranslated — and what a test built on the wrong translation would accept that the API would never send.

### Submit

Commit, push, submit the repo link. The reviewer reads `src/dto/`, `claude-runs/03-dto.md` and your Stage 3 notes.

### ✅ Before you submit

- `claude-runs/03-dto.md` — exact prompt, full response, untouched
- Notes › Before generating — every `required` array listed; the required-nullable field and the looks-required-but-optional field named
- `src/dto/` — `Dto` suffix everywhere; schema field names preserved; enum as a literal union; nested objects as their own interfaces; optionality and nullability per the table
- Every schema field present, nothing invented
- Notes › Defects found — each with field · category · correct form; each fixed in the files
- Notes › Control pass — the seeded defects found, categorised
- Notes › Hardest call — one field, what the wrong translation would let through
