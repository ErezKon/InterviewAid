# 873. Length of Longest Fibonacci Subsequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-longest-fibonacci-subsequence](https://leetcode.com/problems/length-of-longest-fibonacci-subsequence)
**Companies:** Amazon, Baidu, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## 1. Problem Description

Given a strictly increasing array, find the length of the longest Fibonacci-like subsequence (each element = sum of previous two). Return 0 if length < 3.

---

## 2. Approach: DP with Hash Map — O(n²) ✅

`dp[(i, j)]` = length of Fibonacci sequence ending at `(arr[i], arr[j])`. For each pair, look up `arr[j] - arr[i]` in the map.

```
FUNCTION lenLongestFibSubseq(arr):
    indexMap = {v: i for i, v in enumerate(arr)}
    dp = {}    // (i, j) → length of fib seq ending at arr[i], arr[j]
    maxLen = 0

    FOR j ← 0 TO n - 1:
        FOR i ← 0 TO j - 1:
            prev = arr[j] - arr[i]
            IF prev < arr[i] AND prev IN indexMap:
                k = indexMap[prev]
                dp[(i, j)] = dp.get((k, i), 2) + 1
                maxLen = MAX(maxLen, dp[(i, j)])

    RETURN maxLen IF maxLen >= 3 ELSE 0
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## 3. Key Takeaway

> DP on pairs: `dp[(i, j)]` extends from `dp[(k, i)]` where `arr[k] = arr[j] - arr[i]`. Hash map enables O(1) predecessor lookup.
