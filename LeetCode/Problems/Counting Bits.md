# 338. Counting Bits

**Difficulty:** 🟢 Easy
**Acceptance:** 79.0%
**LeetCode:** [https://leetcode.com/problems/counting-bits](https://leetcode.com/problems/counting-bits)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle, Qualcomm

---

## 1. Problem Description

Given an integer `n`, return an array `ans` where `ans[i]` is the number of 1-bits in `i`, for `0 ≤ i ≤ n`.

---

## 2. Approach: DP — O(n) ✅

```
FUNCTION countBits(n):
    ans = [0] * (n + 1)
    FOR i ← 1 TO n:
        ans[i] = ans[i >> 1] + (i & 1)
    RETURN ans
```

### Why `ans[i >> 1] + (i & 1)`?

Right-shifting `i` by 1 drops the last bit. The count of 1-bits in `i` = count in `i >> 1` + the last bit.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> DP using the relationship `bits(i) = bits(i/2) + (i % 2)`. Each result depends on a previously computed value.
