# 845. Longest Mountain in Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-mountain-in-array](https://leetcode.com/problems/longest-mountain-in-array)
**Companies:** Amazon, Databricks, Faire, Google, Ibm, Meta, Microsoft, Oracle, Sofi, Tiktok

---

## 1. Problem Description

Find the longest mountain subarray (strictly increases then strictly decreases, length ≥ 3).

---

## 2. Approach: Two Pass — O(n) ✅

`up[i]` = length of increasing run ending at i. `down[i]` = length of decreasing run starting at i.

```
FUNCTION longestMountain(arr):
    n = len(arr)
    up = [0] * n
    down = [0] * n

    FOR i ← 1 TO n - 1:
        IF arr[i] > arr[i-1]: up[i] = up[i-1] + 1

    FOR i ← n - 2 DOWN TO 0:
        IF arr[i] > arr[i+1]: down[i] = down[i+1] + 1

    maxLen = 0
    FOR i ← 0 TO n - 1:
        IF up[i] > 0 AND down[i] > 0:
            maxLen = MAX(maxLen, up[i] + down[i] + 1)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Precompute up[] and down[] arrays. A peak at index `i` has `up[i] > 0` and `down[i] > 0`. Mountain length = `up[i] + down[i] + 1`. Can also be done in O(1) space with a single pass.
