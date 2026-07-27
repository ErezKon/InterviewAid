# 2967. Minimum Cost to Make Array Equalindromic

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-make-array-equalindromic](https://leetcode.com/problems/minimum-cost-to-make-array-equalindromic)
**Companies:** Google

---

## Key Insight

> Make all elements equal to some **palindromic** number. The optimal target is the palindrome closest to the **median** of the array. Check the nearest palindromes above and below the median.

---

## Approach: Median + Nearest Palindrome ✅

```
FUNCTION minimumCost(nums):
    SORT nums
    median ← nums[n / 2]
    // Find nearest palindromes to median
    cand1 ← nearest palindrome ≤ median
    cand2 ← nearest palindrome ≥ median
    
    cost1 ← SUM(ABS(num - cand1) FOR num IN nums)
    cost2 ← SUM(ABS(num - cand2) FOR num IN nums)
    
    RETURN MIN(cost1, cost2)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + palindrome search | **O(n log n)** | **O(1)** |

---

## Key Takeaway

> **Median + nearest palindrome** — the optimal target is near the median. Find the closest palindromes in both directions and pick the cheaper one.

---
