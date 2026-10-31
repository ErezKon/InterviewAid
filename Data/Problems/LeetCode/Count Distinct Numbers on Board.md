# 2549. Count Distinct Numbers on Board

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-distinct-numbers-on-board](https://leetcode.com/problems/count-distinct-numbers-on-board)
**Companies:** Oracle

---

## 1. Problem Description

You are given a positive integer `n`, that is initially placed on a board. Every day, for `10^9` days, you perform the following procedure:

- For each number `x` present on the board, find all numbers `1 <= i <= n` such that `x % i == 1`.
- Then, place those numbers on the board.

Return *the number of **distinct** integers present on the board after* `10^9` *days have elapsed*.

**Note:**
- Once a number is placed on the board, it will remain on it until the end.
- `%` stands for the modulo operation. For example, `14 % 3` is `2`.

**Constraints:**
- `1 <= n <= 100`

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

```
Example 1:
  Input: n = 5
  Output: 4
  Explanation: Initially, 5 is present on the board.
  The next day, 2 and 4 will be added since 5 % 2 == 1 and 5 % 4 == 1.
  After that day, 3 will be added to the board because 4 % 3 == 1.
  At the end of a billion days, the distinct numbers on the board will be 2, 3, 4, and 5.
```

```
Example 2:
  Input: n = 3
  Output: 2
  Explanation:
  Since 3 % 2 == 1, 2 will be added to the board.
  After a billion days, the only two distinct numbers on the board are 2 and 3.
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

> The process creates a chain that adds every integer from `2` up to `n`; thus the distinct count is `n-1` (or `1` when `n` is `1`).
