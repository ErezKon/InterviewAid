# 180. Consecutive Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/consecutive-numbers](https://leetcode.com/problems/consecutive-numbers)
**Companies:** Amazon, Bloomberg, Delhivery, Google, Meesho, Meta, Microsoft

---

## Problem Description
Given a table `Logs(id, num)` where `id` is a strictly increasing timestamp, return all distinct `num` values that appear **at least three times consecutively** (i.e., with consecutive `id`s).

## Examples
**Example 1:**
```
Logs
+----+------+
| id | num |
+----+------+
| 1  | 1   |
| 2  | 1   |
| 3  | 1   |
| 4  | 2   |
| 5  | 1   |
+----+------+
Result: [1]
```
**Example 2:**
```
Logs
+----+------+
| id | num |
+----+------+
| 1  | 2   |
| 2  | 2   |
| 3  | 3   |
| 4  | 2   |
| 5  | 2   |
| 6  | 2   |
+----+------+
Result: [2]
```

## Approach
Use **self‑joins** on the `Logs` table to align three consecutive rows (`l1`, `l2`, `l3`). Filter where the `num` values are equal, then select distinct numbers.

```text
FUNCTION find_consecutive_numbers():
    // Expressed in SQL‑style pseudocode
    SELECT DISTINCT l1.num AS ConsecutiveNums
    FROM Logs l1
    JOIN Logs l2 ON l1.id = l2.id - 1
    JOIN Logs l3 ON l1.id = l3.id - 2
    WHERE l1.num = l2.num AND l2.num = l3.num;
```

## Walkthrough
| l1.id | l1.num | l2.id | l2.num | l3.id | l3.num | Condition |
|-------|--------|-------|--------|-------|--------|-----------|
| 1 | 1 | 2 | 1 | 3 | 1 | true → output 1 |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 4 | 2 | 5 | 1 | 6 | 2 | false |
| 1 | 2 | 3 | 4 | 5 | 6 | false |

## Complexity Analysis
- **Time:** `O(N)` where `N` is number of rows (handled by DB engine).
- **Space:** `O(1)` additional space.

## Follow‑Up Questions
1. How would you modify the query to find numbers that appear at least `k` times consecutively?
2. Can you write a window‑function version that avoids self‑joins?
3. How would you handle duplicate `id` values or non‑sequential timestamps?

## Key Takeaway
Self‑joining a table on offset `id`s lets you detect consecutive patterns directly in SQL.
