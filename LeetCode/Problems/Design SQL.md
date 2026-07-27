# 2408. Design SQL

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-sql](https://leetcode.com/problems/design-sql)
**Companies:** Amazon, Openai

---

## Problem Description

Design a simple SQL-like system: `createTable(name, columns)`, `insertRow(name, values)`, `deleteRow(name, rowId)`, `selectCell(name, rowId, colId)`.

---

## Approach

```
CLASS SQL:
    CONSTRUCTOR(names, columns):
        tables = {}
        FOR name, numCols IN zip(names, columns):
            tables[name] = {nextId: 1, rows: {}}

    FUNCTION insertRow(name, row):
        id = tables[name].nextId++
        tables[name].rows[id] = row

    FUNCTION deleteRow(name, rowId):
        DELETE tables[name].rows[rowId]

    FUNCTION selectCell(name, rowId, columnId):
        RETURN tables[name].rows[rowId][columnId - 1]
```

---

## Key Takeaway

> **Nested hash maps: table name → {auto-increment ID, row map}. Row map = rowId → list of column values. Delete by removing key, select by indexing.**
