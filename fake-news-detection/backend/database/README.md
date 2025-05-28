# Database Folder - fake-news-detection

## Folders:
- `/schema/` → Initial table creation SQLs
- `/migrations/` → Alterations to existing tables
- `/seeds/` → Example inserts to populate tables

## How to Apply:

1. Apply all `/schema/*.sql` in order.
2. Apply `/migrations/*.sql` if needed later.
3. Use `/seeds/*.sql` to insert dummy/test data.

## Migration Order:
- schema/001 -> schema/002 -> schema/003 -> etc.
- migrations/001 -> migrations/002

**Tip:** Always backup production DB before applying migrations!