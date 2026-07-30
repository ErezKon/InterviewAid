# 2971. Find Polygon With the Largest Perimeter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-polygon-with-the-largest-perimeter](https://leetcode.com/problems/find-polygon-with-the-largest-perimeter)
**Companies:** Airtel

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Prefix Sum — O(n log n) ✅](#4-approach-sort--prefix-sum--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of positive integers `nums`, find the **largest perimeter** of a polygon that can be formed using some (or all) of the elements as side lengths. A polygon with `k` sides is valid if the **longest side** is strictly less than the sum of all other sides.

Return the largest possible perimeter, or `-1` if no valid polygon can be formed.

**Constraints:**
- `3 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  nums = [5, 5, 5]
  Output: 15
  Reason: Triangle with sides 5,5,5. 5 < 5+5 = 10 ✓. Perimeter = 15.

Example 2:
  Input:  nums = [1, 12, 1, 2, 5, 50, 3]
  Output: 12
  Reason: Polygon with sides [1,1,2,3,5] → perimeter=12. 5 < 1+1+2+3=7? No.
          Try [1,2,3,5] → 5 < 1+2+3=6 ✓. Perimeter=11.
          Actually [2,3,5] → 5 < 2+3=5? No (not strictly less).
          Best: [1,1,2,3,5] → 5 < 7 ✓ → perimeter = 12.

Example 3:
  Input:  nums = [5, 5, 50]
  Output: -1
  Reason: 50 ≥ 5+5=10. No valid polygon possible.
```

---

## 3. Key Insight

> Sort the array. For each index `i` from right to left, check if `nums[i] < prefix_sum[0..i-1]`. The **first** (largest) `i` where this holds gives the maximum perimeter. A polygon with more sides always has a larger perimeter, so we want to include as many elements as possible.

---

## 4. Approach: Sort + Prefix Sum — O(n log n) ✅

```
FUNCTION largestPerimeter(nums):
    SORT(nums)
    prefixSum ← SUM(nums)

    FOR i ← LENGTH(nums) - 1 DOWNTO 2 DO
        prefixSum -= nums[i]
        IF nums[i] < prefixSum THEN
            RETURN prefixSum + nums[i]

    RETURN -1
```

---

## 5. Walkthrough

```
nums = [1, 12, 1, 2, 5, 50, 3]
sorted = [1, 1, 2, 3, 5, 12, 50]
prefixSum = 74

i=6: nums[6]=50, prefixSum=74-50=24, 50 < 24? No
i=5: nums[5]=12, prefixSum=24-12=12, 12 < 12? No (not strictly less)
i=4: nums[4]=5,  prefixSum=12-5=7,   5 < 7? Yes ✅
     RETURN 7 + 5 = 12

Result: 12 ✅ (polygon with sides [1,1,2,3,5])
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(1) — in-place sort, single variable |

---

## 7. Follow-Up Questions

### 7.1 Why iterate from the largest side?

The largest side is the bottleneck — it's the one that might violate the polygon inequality. By checking from largest down, the first valid one gives the max perimeter.

### 7.2 Why include all smaller sides?

More sides = larger sum of remaining sides = easier to satisfy `longest < sum(rest)`. So including all sides up to index `i` is always optimal.

### 7.3 How is this different from the triangle case?

For 3 sides, you check `a + b > c` for sorted sides. This generalizes: for k sides, check `sum(all except largest) > largest`.

---

## 8. Key Takeaway

> **Sort + greedy scan from the right**: after sorting, check each element as the potential longest side against the prefix sum of all smaller elements. The polygon inequality generalizes the triangle inequality to k sides.
