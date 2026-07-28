# 3570. Find Books with No Available Copies

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-books-with-no-available-copies](https://leetcode.com/problems/find-books-with-no-available-copies)
**Companies:** Meta

---

## Problem Description

Given a `library` table with columns `book_id`, `title`, and `available_copies`, return the `book_id` and `title` of books that have zero available copies.

---

## Approach: SQL Filter ✅

```sql
SELECT book_id, title
FROM library
WHERE available_copies = 0
ORDER BY book_id;
```

---

## Examples

**Example 1:**
```
Input: library = [
  {book_id: 1, title: "A", available_copies: 3},
  {book_id: 2, title: "B", available_copies: 0},
  {book_id: 3, title: "C", available_copies: 0}
]
Output: [{book_id: 2, title: "B"}, {book_id: 3, title: "C"}]
Explanation: Books 2 and 3 have no copies left.
```

---

## Walkthrough

1. Scan each row of `library`.
2. Keep rows where `available_copies = 0`.
3. Project `book_id` and `title`.
4. Sort results by `book_id` for deterministic order.

---

## Complexity Analysis

- **Time:** O(n) where n is the number of rows in the table (single scan).
- **Space:** O(k) for k matching rows returned.

---

## Follow-Up Questions

1. How would you modify the query to also include books that are out of stock for more than 30 days?
2. If the table is huge, what indexing strategy would improve performance?

---

## Key Takeaway

> **Simple WHERE filter on zero availability. Straightforward SQL query.**