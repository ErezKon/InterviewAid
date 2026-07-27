# 978. Longest Turbulent Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-turbulent-subarray](https://leetcode.com/problems/longest-turbulent-subarray)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Find the longest subarray that is "turbulent" — alternating between `>` and `<` comparisons.

---

## 2. Approach: Two Counters — O(n) ✅

```
FUNCTION maxTurbulenceSize(arr):
    inc = dec = 1; maxLen = 1
    FOR i ← 1 TO len(arr) - 1:
        IF arr[i] > arr[i-1]: inc = dec + 1; dec = 1
        ELSE IF arr[i] < arr[i-1]: dec = inc + 1; inc = 1
        ELSE: inc = dec = 1
        maxLen = MAX(maxLen, inc, dec)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Track `inc` (ending with increase) and `dec` (ending with decrease). On increase: `inc = dec + 1` (extends a previous decrease). On decrease: `dec = inc + 1`. This captures the alternating pattern.
