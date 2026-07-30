# 338. Counting Bits

**Difficulty:** 🟢 Easy
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/counting-bits](https://leetcode.com/problems/counting-bits)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle, Qualcomm

---

## Problem Description

Given an integer `n`, return an array `ans` where `ans[i]` is the number of `1`‑bits in the binary representation of `i`, for every `0 ≤ i ≤ n`.

---

## Examples

| Input | Output |
|-------|--------|
| `2` | `[0,1,1]` |
| `5` | `[0,1,1,2,1,2]` |
| `0` | `[0]` |

*Explanation:* For each index `i`, count the set bits in `i`.

---

## Approach

```
FUNCTION countBits(n):
    ans ← ARRAY[0 .. n] FILLED WITH 0
    FOR i ← 1 TO n:
        ans[i] ← ans[i >> 1] + (i AND 1)
    RETURN ans
```

The recurrence uses the fact that shifting right drops the least‑significant bit; the count for `i` equals the count for `i/2` plus the last bit.

---

## Walkthrough

Take `n = 5`.

1. Initialise `ans = [0,0,0,0,0,0]`.
2. `i = 1`: `1 >> 1 = 0`, `1 AND 1 = 1` → `ans[1] = 0 + 1 = 1`.
3. `i = 2`: `2 >> 1 = 1`, `2 AND 1 = 0` → `ans[2] = ans[1] + 0 = 1`.
4. `i = 3`: `3 >> 1 = 1`, `3 AND 1 = 1` → `ans[3] = ans[1] + 1 = 2`.
5. `i = 4`: `4 >> 1 = 2`, `4 AND 1 = 0` → `ans[4] = ans[2] + 0 = 1`.
6. `i = 5`: `5 >> 1 = 2`, `5 AND 1 = 1` → `ans[5] = ans[2] + 1 = 2`.

Result: `[0,1,1,2,1,2]`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Follow-Up Questions

- How would you compute the result for multiple queries of different `n` efficiently?
- Can you derive a formula to compute the total number of set bits from `0` to `n` without building the array?

---

## Key Takeaway

> DP using `bits(i) = bits(i/2) + (i % 2)` lets you compute bit counts for all numbers up to `n` in linear time.