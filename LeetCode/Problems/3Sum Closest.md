# 16. 3Sum Closest

**Difficulty:** 🟡 Medium
**Acceptance:** 48.6%
**LeetCode:** [https://leetcode.com/problems/3sum-closest](https://leetcode.com/problems/3sum-closest)
**Companies:** Amazon, Bloomberg, Bytedance, Dream11, Flipkart, Google, Harness, Meta, Microsoft, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Two Pointers — O(n²) ✅](#4-approach-sort--two-pointers--on²-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is **closest** to `target`. Return the sum.

You may assume that each input has exactly one solution.

**Constraints:**
- `3 ≤ nums.length ≤ 500`
- `-1000 ≤ nums[i] ≤ 1000`
- `-10⁴ ≤ target ≤ 10⁴`

---

## 2. Examples

```
Example 1:
  Input:  nums = [-1, 2, 1, -4], target = 1
  Output: 2
  Explanation: The triplet [-1, 2, 1] has sum = 2, closest to target 1.

Example 2:
  Input:  nums = [0, 0, 0], target = 1
  Output: 0
  Explanation: Only possible sum is 0.
```

---

## 3. Key Insight

> Same structure as 3Sum, but instead of checking for exact zero, **track the minimum distance** `|sum - target|`. Sort first, then for each fixed element, use two pointers to explore the remaining pairs — move left pointer up if sum < target, right pointer down if sum > target.

---

## 4. Approach: Sort + Two Pointers — O(n²) ✅

```
FUNCTION threeSumClosest(nums, target):
    SORT nums
    closest = nums[0] + nums[1] + nums[2]

    FOR i ← 0 TO n - 3:
        lo = i + 1
        hi = n - 1
        WHILE lo < hi:
            sum = nums[i] + nums[lo] + nums[hi]
            IF ABS(sum - target) < ABS(closest - target):
                closest = sum
            IF sum < target: lo += 1
            ELSE IF sum > target: hi -= 1
            ELSE: RETURN sum      // exact match

    RETURN closest
```

---

## 5. Walkthrough

```
nums = [-1, 2, 1, -4], target = 1
sorted = [-4, -1, 1, 2]
closest = -4 + -1 + 1 = -4

i=0: nums[0]=-4
  lo=1, hi=3: -4 + -1 + 2 = -3, |−3−1|=4 > |−4−1|=5? Yes → closest = -3
  sum < target → lo=2
  lo=2, hi=3: -4 + 1 + 2 = -1, |−1−1|=2 < |−3−1|=4 → closest = -1
  sum < target → lo=3, lo >= hi → done

i=1: nums[1]=-1
  lo=2, hi=3: -1 + 1 + 2 = 2, |2−1|=1 < |−1−1|=2 → closest = 2
  sum > target → hi=2, lo >= hi → done

i=2: only one element left → skip

Result: 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²) — O(n log n) sort + O(n²) two-pointer scan |
| **Space** | O(1) extra (excluding sort space) |

---

## 7. Follow-Up Questions

### 7.1 How does this differ from exact 3Sum?

3Sum collects all triplets summing to 0. 3Sum Closest finds the single triplet with minimum distance to target. The pointer logic is the same; only the tracking changes.

### 7.2 Can we prune the search?

Yes — if `sum == target`, return immediately. Also, skip duplicate values for `i` if we only care about the closest sum (not required, but speeds up practice).

### 7.3 Related problems in the family?

| Problem | Objective |
|---------|-----------|
| **3Sum** (#15) | Find all triplets summing to 0 |
| **3Sum Closest** (#16) | Closest sum to target |
| **3Sum Smaller** (#259) | Count triplets with sum < target |
| **4Sum** (#18) | Find all quadruplets summing to target |

---

## 8. Key Takeaway

> Same structure as 3Sum but track closest instead of exact matches. Sort + two pointers is the standard O(n²) approach. The pointer movement logic (left++ if too small, right-- if too big) is the universal two-pointer recipe for sum problems on sorted arrays.
