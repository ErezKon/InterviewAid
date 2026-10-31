# 976. Largest Perimeter Triangle

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-perimeter-triangle](https://leetcode.com/problems/largest-perimeter-triangle)
**Companies:** Amazon, Bloomberg, C3 Ai, Google, Meta

---

## 1. Problem Description

Given an integer array `nums`, return *the largest perimeter of a triangle with a non-zero area, formed from three of these lengths*. If it is impossible to form any triangle of a non-zero area, return `0`.

**Constraints:**
- `3 <= nums.length <= 10^4`
- `1 <= nums[i] <= 10^6`

---

## 2. Examples

```
Example 1:
  Input: nums = [2,1,2]
  Output: 5
  Explanation: You can form a triangle with three side lengths: 1, 2, and 2.
```

```
Example 2:
  Input: nums = [1,2,1,10]
  Output: 0
  Explanation:
  You cannot use the side lengths 1, 1, and 2 to form a triangle.
  You cannot use the side lengths 1, 1, and 10 to form a triangle.
  You cannot use the side lengths 1, 2, and 10 to form a triangle.
  As we cannot use any three side lengths to form a triangle of non-zero area, we return 0.
```

```
Additional example (used in the walkthrough):
  Input: nums = [3,6,2,3]
  Output: 8
  Explanation: Choose sides 3, 3, 2 → perimeter 8.
```

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
| O(n log n) for sorting | O(1) extra (in-place sort) |

---

## 6. Follow-Up Questions

- How would the solution change if you needed to return the actual triangle sides?
- Can you solve the problem in linear time using a counting sort for bounded integer ranges?
- What if the input list is streamed and you can only keep O(1) extra memory?

---

## Key Takeaway

> Sort the lengths descending and greedily pick the first triple that satisfies the triangle inequality; this yields the maximum possible perimeter.
