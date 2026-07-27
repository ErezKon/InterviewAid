# 3133. Minimum Array End

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-end](https://leetcode.com/problems/minimum-array-end)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Key Insight

> The array must have AND = `x`, so all elements must have `x`'s bits set. To minimize the last element of a sorted array of size `n`, fill the **zero-bit positions** of `x` with the binary representation of `n-1` (the (n-1)-th smallest number that has all of `x`'s bits).

---

## Approach: Bit Filling — O(64) ✅

```
FUNCTION minEnd(n, x):
    // Fill the zero-bits of x with the binary representation of (n-1)
    result ← x
    bit ← 0
    val ← n - 1
    FOR b ← 0 TO 63 DO
        IF NOT (x AND (1 << b)) THEN
            IF val AND (1 << bit) THEN
                result ← result OR (1 << b)
            bit ← bit + 1
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bit manipulation | **O(64)** | **O(1)** |

---

## Key Takeaway

> **Embed counter into zero-bits** — the minimum n-th value with AND = x is found by inserting `n-1` into the positions where `x` has 0-bits.

---
