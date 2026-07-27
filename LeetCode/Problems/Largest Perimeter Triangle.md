# 976. Largest Perimeter Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-perimeter-triangle](https://leetcode.com/problems/largest-perimeter-triangle)
**Companies:** Amazon, Bloomberg, C3 Ai, Google, Meta

---

## 1. Problem Description

Return the largest perimeter of a triangle formed from any three lengths in `nums`. Return 0 if no valid triangle exists.

---

## 2. Approach: Sort + Greedy — O(n log n) ✅

Sort descending. The first triple `(a, b, c)` where `a < b + c` (triangle inequality) gives the largest perimeter.

```
FUNCTION largestPerimeter(nums):
    SORT nums in descending order
    FOR i ← 0 TO n - 3:
        IF nums[i] < nums[i+1] + nums[i+2]:
            RETURN nums[i] + nums[i+1] + nums[i+2]
    RETURN 0
```

| Time | Space |
|------|-------|
| O(n log n) | O(1) |

---

## 3. Key Takeaway

> Sort descending and check consecutive triples. If the largest side < sum of the other two, it's valid. Greedy works because larger sides maximize perimeter.
