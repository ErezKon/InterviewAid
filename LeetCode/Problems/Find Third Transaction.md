# 2986. Find Third Transaction

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-third-transaction](https://leetcode.com/problems/find-third-transaction)
**Companies:** Cisco

---

## Problem Description
You are given an array `transactions` of integers representing monetary transaction amounts in chronological order. Return the amount of the **third** transaction in the array. If the array contains fewer than three transactions, return `-1`.

## Examples
| transactions | Output | Explanation |
|--------------|--------|-------------|
| `[5, 10, 15, 20]` | `15` | The third element (1‑based) is `15`. |
| `[100, 200]` | `-1` | Fewer than three transactions, so return `-1`. |
| `[]` | `-1` | Empty list yields `-1`.

## Approach
A direct index lookup solves the problem. Check the length of the array; if it is at least three, return the element at index `2` (0‑based). Otherwise return `-1`.

```text
FUNCTION thirdTransaction(transactions):
    IF LENGTH(transactions) < 3:
        RETURN -1
    RETURN transactions[2]
```

## Walkthrough
For `transactions = [5, 10, 15, 20]`:
- Length is 4 ≥ 3, so return element at index 2 → `15`.
The function returns `15`.

## Complexity Analysis
- **Time:** O(1) – constant‑time index access.
- **Space:** O(1) – no extra data structures.

## Follow‑Up Questions
1. How would you modify the solution to return the *k*‑th transaction for any given `k`?
2. What if the transactions are streamed and you cannot store the entire list?
3. How would you handle 1‑based indexing conventions in the input?

## Key Takeaway
When the required element position is fixed, a simple length check and direct index access provide an O(1) solution.
