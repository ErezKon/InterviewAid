# 2865. Beautiful Towers I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/beautiful-towers-i](https://leetcode.com/problems/beautiful-towers-i)
**Companies:** Meta, Salesforce

---

## 1. Problem Description

Given an array `maxHeights`, choose heights `h[i] ≤ maxHeights[i]` forming a **mountain** shape to maximize total sum. Same as Beautiful Towers II but with smaller constraints allowing O(n²).

---

## 2. Approach: Brute Force — O(n²) ✅

```
FUNCTION maximumSumOfHeights(maxHeights):
    n = len(maxHeights)
    ans = 0
    FOR peak ← 0 TO n-1:
        total = maxHeights[peak]
        // Extend left (non-increasing from peak)
        curMin = maxHeights[peak]
        FOR j ← peak-1 DOWNTO 0:
            curMin = MIN(curMin, maxHeights[j])
            total += curMin
        // Extend right (non-increasing from peak)
        curMin = maxHeights[peak]
        FOR j ← peak+1 TO n-1:
            curMin = MIN(curMin, maxHeights[j])
            total += curMin
        ans = MAX(ans, total)
    RETURN ans
```

| Time | Space |
|------|-------|
| O(n²) | O(1) |

---

## Key Takeaway

> For each peak candidate, greedily extend left/right taking min with running minimum. O(n²) is fine for small n. See Beautiful Towers II for the O(n) monotonic stack optimization.
