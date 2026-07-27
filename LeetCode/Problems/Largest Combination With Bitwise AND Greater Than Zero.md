# 2275. Largest Combination With Bitwise AND Greater Than Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero)
**Companies:** Adobe, Amazon, Google, Jump Trading, Microsoft

---

## 1. Problem Description

Find the largest subset of `candidates` whose bitwise AND is greater than 0.

---

## 2. Key Insight

AND > 0 iff there's at least one bit position set in ALL selected numbers. For each bit, count how many numbers have it set. The answer is the max count across all bits.

---

## 3. Approach: Bit Counting — O(24·n) ✅

```
FUNCTION largestCombination(candidates):
    maxCount = 0
    FOR bit ← 0 TO 23:
        count = SUM(1 for c in candidates if c & (1 << bit))
        maxCount = MAX(maxCount, count)
    RETURN maxCount
```

| Time | Space |
|------|-------|
| O(24·n) = O(n) | O(1) |

---

## 4. Key Takeaway

> Reduce bitwise AND to per-bit counting. The largest combination sharing a common set bit = the max bit frequency. No need to enumerate subsets.
