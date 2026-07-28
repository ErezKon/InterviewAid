# 2408. Design SQL

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-sql](https://leetcode.com/problems/design-sql)
**Companies:** Amazon, Openai

---

## Problem Description

Design a simple SQL-like system: `createTable(name, columns)`, `insertRow(name, values)`, `deleteRow(name, rowId)`, `selectCell(name, rowId, colId)`.

---

## Examples

| Operation | Result |
|-----------|--------|
| `createTable("users", 3)` | — |
| `insertRow("users", ["Alice", 30, "NY"])` | rowId `1` |
| `insertRow("users", ["Bob", 25, "SF"])` | rowId `2` |
| `selectCell("users", 1, 2)` | `30` |
| `deleteRow("users", 1)` | — |
| `selectCell("users", 2, 1)` | `"Bob"` |

---

## Walkthrough

1. **Create table** `users` with 3 columns → internal map entry `{nextId:1, rows:{}}`.
2. **Insert first row** → assign `rowId=1`, store list `['Alice',30,'NY']`.
3. **Insert second row** → `rowId=2`, store `['Bob',25,'SF']`.
4. **Select cell** `(users,1,2)` → retrieve row `1`, column index `2-1=1` → value `30`.
5. **Delete row** `1` → remove key `1` from rows map.
6. **Select cell** `(users,2,1)` → retrieve `'Bob'`.

The design uses nested hash maps: table name → {auto‑increment ID, rows map}. Row map stores each row's values list, enabling O(1) insert, delete, and select by ID.

---

## Approach

```
CLASS SQL:
    CONSTRUCTOR():
        tables = {}
        nextTableId = 1

    FUNCTION createTable(name, numCols):
        tables[name] = {nextId: 1, rows: {}, cols: numCols}

    FUNCTION insertRow(name, values):
        id = tables[name].nextId
        tables[name].nextId += 1
        tables[name].rows[id] = values
        RETURN id

    FUNCTION deleteRow(name, rowId):
        DELETE tables[name].rows[rowId]

    FUNCTION selectCell(name, rowId, columnId):
        RETURN tables[name].rows[rowId][columnId - 1]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) for create, insert, delete, select |
| **Space** | O(total rows * columns) |

---

## Follow-Up Questions

- How would you add support for `SELECT` with `WHERE` clauses?
- How can you implement indexing on a column to speed up range queries?
- What changes are needed to support transaction rollback?

---

## Key Takeaway

> **Nested hash maps: table name → {auto‑increment ID, row map}. Row map = rowId → list of column values. Delete by removing key, select by indexing.**