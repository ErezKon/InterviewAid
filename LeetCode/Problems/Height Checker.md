# 1051. Height Checker

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/height-checker](https://leetcode.com/problems/height-checker)
**Companies:** Amazon, Bloomberg, Google, Ibm, Microsoft, Salesforce

---

## 1. Problem Description

Count how many students are not standing in the correct position when sorted by height.

## 2. Approach: Sort + Compare — O(n log n) ✅

```
FUNCTION heightChecker(heights):
    expected = sorted(heights)
    RETURN SUM(1 for h, e in zip(heights, expected) if h != e)
```

## Key Takeaway

> Sort to get expected order, count mismatches. O(n log n) time.
