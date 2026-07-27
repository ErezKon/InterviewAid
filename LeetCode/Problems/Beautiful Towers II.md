# 2866. Beautiful Towers II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-towers-ii](https://leetcode.com/problems/beautiful-towers-ii)
**Companies:** Salesforce

---

## 1. Problem Description

Given an array `maxHeights`, choose heights `h[i] ≤ maxHeights[i]` forming a **mountain** (increases then decreases) to maximize the total sum. Return the max sum.

---

## 2. Key Insight

> For each possible peak index `p`, use **monotonic stacks** to compute the max sum of the left increasing part and right decreasing part. Precompute `left[i]` = max sum for increasing sequence ending at `i`, and `right[i]` = max sum for decreasing sequence starting at `i`.

---

## 3. Approach: Monotonic Stack — O(n) ✅

```
FUNCTION maximumSumOfHeights(maxHeights):
    n = len(maxHeights)
    // left[i] = max sum of non-decreasing sequence ending at i
    left = [0] * n; stack = []
    FOR i ← 0 TO n-1:
        WHILE stack AND maxHeights[stack[-1]] >= maxHeights[i]:
            stack.POP()
        IF stack:
            left[i] = left[stack[-1]] + maxHeights[i] * (i - stack[-1])
        ELSE:
            left[i] = maxHeights[i] * (i + 1)
        stack.PUSH(i)

    // right[i] = max sum of non-increasing sequence starting at i
    right = [0] * n; stack = []
    FOR i ← n-1 DOWNTO 0:
        // symmetric to left
        ...

    RETURN MAX(left[i] + right[i] - maxHeights[i] for i in range(n))
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Monotonic stack computes prefix/suffix mountain sums in O(n). For each peak candidate, answer = left sum + right sum - peak height (counted twice). This is the O(n) optimization of the brute-force O(n²) approach in Beautiful Towers I.
