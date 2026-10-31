# 3827. Count Monobit Integers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-monobit-integers](https://leetcode.com/problems/count-monobit-integers)
**Companies:** Zoho

---

## 1. Problem Description

You are given an integer `n`.

An integer is called **Monobit** if all bits in its binary representation are the same.

Return the count of **Monobit** integers in the range `[0, n]` (inclusive).

**Constraints:**
- `0 <= n <= 1000`

---

## 2. Approach: Iterate and Popcount — O(n) ✅

```text
FUNCTION countMonobit(n):
    count ← 0
    FOR i FROM 1 TO n:
        IF POPCOUNT(i) MOD 2 = 1:
            count ← count + 1
    RETURN count
```

---

## 3. Examples

```
Example 1:
  Input: n = 1
  Output: 2
  Explanation:
  - The integers in the range [0, 1] have binary representations "0" and "1".
  - Each representation consists of identical bits. Thus, the answer is 2.
```

```
Example 2:
  Input: n = 4
  Output: 3
  Explanation:
  - The integers in the range [0, 4] include binaries "0", "1", "10", "11", and "100".
  - Only 0, 1 and 3 satisfy the Monobit condition. Thus, the answer is 3.
```

---

## 4. Walkthrough

Take Example 1 (`n = 5`):
1. Initialise `count = 0`.
2. Iterate `i = 1` → POPCOUNT(1)=1 (odd) → `count = 1`.
3. `i = 2` → POPCOUNT(2)=1 (odd) → `count = 2`.
4. `i = 3` → POPCOUNT(3)=2 (even) → `count` unchanged.
5. `i = 4` → POPCOUNT(4)=1 (odd) → `count = 3`.
6. `i = 5` → POPCOUNT(5)=2 (even).
7. Final `count = 3` (but note the problem may ask for range `[0, n]` or `[1, n]`; adjust accordingly). The example output reflects the intended range.

---

## 5. Complexity Analysis

- **Time:** O(n) – one popcount per integer.
- **Space:** O(1) – only a few scalar variables.

---

## 6. Follow-Up Questions

1. How can you compute the answer for `n` up to 10^18 without iterating over every number?
2. Can you extend the solution to count numbers with an even number of set bits?
3. How would you adapt the algorithm for a range `[L, R]` instead of `[1, n]`?

---

## Key Takeaway

> Check if the popcount (number of set bits) is odd for each number. For larger ranges, digit DP can compute this in O(log n).
