# 976. Largest Perimeter Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-perimeter-triangle](https://leetcode.com/problems/largest-perimeter-triangle)
**Companies:** Amazon, Bloomberg, C3 Ai, Google, Meta

---

## 1. Problem Description

Return the largest perimeter of a triangle formed from any three lengths in `nums`. Return 0 if no valid triangle exists.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[2,1,2]` | `5` | The triangle with sides 2,2,1 has perimeter 5. |
| `[1,2,1]` | `0` | No three lengths satisfy the triangle inequality. |
| `[3,6,2,3]` | `8` | Choose sides 3,3,2 → perimeter 8.

---

## 3. Approach: Sort + Greedy — O(n log n) ✅

```text
FUNCTION largestPerimeter(nums):
    // Sort numbers in descending order
    SET nums ← SORT(nums) DESCENDING
    FOR i ← 0 TO LENGTH(nums) - 3:
        // Check triangle inequality on the current triple
        IF nums[i] < nums[i+1] + nums[i+2]:
            RETURN nums[i] + nums[i+1] + nums[i+2]
    RETURN 0
```

---

## 4. Walkthrough

Consider `nums = [3,6,2,3]`:

1. Sort descending → `[6,3,3,2]`.
2. i=0: check 6 < 3+3? **False** (6 = 6, not <).
3. i=1: check 3 < 3+2? **True** → perimeter = 3+3+2 = 8.
4. Return 8.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n log n) for sorting | O(1) extra (in‑place sort) |

---

## 6. Follow‑Up Questions

- How would the solution change if you needed to return the actual triangle sides?
- Can you solve the problem in linear time using a counting sort for bounded integer ranges?
- What if the input list is streamed and you can only keep O(1) extra memory?

---

## Key Takeaway

> Sort the lengths descending and greedily pick the first triple that satisfies the triangle inequality; this yields the maximum possible perimeter.
