# 2549. Count Distinct Numbers on Board

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-distinct-numbers-on-board](https://leetcode.com/problems/count-distinct-numbers-on-board)
**Companies:** Oracle

---

## 1. Problem Description

Start with number `n` on a board. Each day, for every number `x` on the board, if any `1 <= i <= n` satisfies `x % i == 1`, add `i` to the board. After 10^9 days, how many distinct numbers are on the board?

---

## 2. Key Insight

> After the first step, `n % (n-1) == 1`, so `n-1` gets added. Then `(n-1) % (n-2) == 1`, so `n-2` gets added, and so on. Eventually all numbers from `2` to `n` appear. Special case: if `n == 1`, only `1` is on the board.

---

## 3. Approach: Math — O(1) ✅

```text
FUNCTION distinctNumbers(n):
    IF n == 1:
        RETURN 1
    ELSE:
        RETURN n - 1
```

---

## Examples

**Example 1:**
```
Input: n = 5
Output: 4
Explanation: Numbers added are 4,3,2,5 (distinct count = 4).
```

**Example 2:**
```
Input: n = 1
Output: 1
Explanation: Only the initial number 1 remains.
```

---

## Walkthrough

For `n = 5`:
| Step | Board before | New numbers added |
|------|--------------|-------------------|
| 0    | {5}          | —                 |
| 1    | {5}          | 4 (5 % 4 == 1)    |
| 2    | {5,4}        | 3 (4 % 3 == 1)    |
| 3    | {5,4,3}      | 2 (3 % 2 == 1)    |
| 4    | {5,4,3,2}    | — (no new)        |
All numbers {2,3,4,5} are present, count = 4.

---

## Complexity Analysis

- **Time:** O(1) – direct formula based on `n`.
- **Space:** O(1) – only constant extra variables.

---

## Follow-Up Questions

1. How would the answer change if the condition were `x % i == 0`?
2. What if the board could also remove numbers that no longer satisfy the condition?
3. Can this reasoning be extended to a range of starting numbers instead of a single `n`?

---

## Key Takeaway

> The process creates a chain that adds every integer from `2` up to `n`; thus the distinct count is `n‑1` (or `1` when `n` is `1`).
