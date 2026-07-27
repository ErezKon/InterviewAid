# 3570. Find Books with No Available Copies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-books-with-no-available-copies](https://leetcode.com/problems/find-books-with-no-available-copies)
**Companies:** Meta

---

## Problem Description

Given a `library` table with book info and `available_copies`, find books with no available copies.

---

## Approach: SQL Filter ✅

```sql
SELECT book_id, title
FROM library
WHERE available_copies = 0
ORDER BY book_id;
```

---

## Key Takeaway

> **Simple WHERE filter on zero availability. Straightforward SQL query.**
