# 2856. Minimum Array Length After Pair Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-length-after-pair-removals](https://leetcode.com/problems/minimum-array-length-after-pair-removals)
**Companies:** Snowflake

---

## Key Insight

> In a sorted array, we can remove pairs `(a, b)` where `a < b`. The maximum pairs we can remove is limited by the majority element. If the most frequent element count > n/2, the answer is `2*maxFreq - n`. Otherwise, the answer is `n % 2`.

---

## Approach

```
FUNCTION minLengthAfterRemovals(nums):
    maxFreq ← MAX frequency of any element
    n ← LEN(nums)
    IF maxFreq > n / 2 THEN
        RETURN 2 * maxFreq - n
    ELSE
        RETURN n % 2
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Frequency count | **O(n)** | **O(n)** |

---

## Key Takeaway

> **Majority element determines the bottleneck** — if one element dominates (>n/2), it limits pairing. Otherwise, everything pairs up leaving at most 1.

---
