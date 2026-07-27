# 1658. Minimum Operations to Reduce X to Zero

**Difficulty:** 🟡 Medium
**Acceptance:** 37.0%
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero)
**Companies:** Amazon, Google, Meta, Morgan Stanley

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Find Longest Middle Subarray — O(n)](#4-approach-find-longest-middle-subarray--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums` and an integer `x`, in one operation you remove either the **leftmost** or **rightmost** element and subtract its value from `x`.

Return the **minimum number of operations** to reduce `x` to exactly `0`, or `-1` if not possible.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁴`
- `1 <= x <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,1,4,2,3], x = 5
  Output: 2
  Explanation: Remove 3 (right), remove 2 (right) → 5-3-2 = 0.

Example 2:
  Input: nums = [5,6,7,8,9], x = 4
  Output: -1
  Explanation: No combination of end elements sums to 4.

Example 3:
  Input: nums = [3,2,20,1,1,3], x = 10
  Output: 5
  Explanation: Remove 3,2 from left and 1,1,3 from right → 3+2+1+1+3=10.
```

---

## 3. Key Insight

> **Complement reframing**: removing elements from both ends totaling `x` means the **middle subarray** sums to `total - x`. Maximize the middle length → minimize removals.

This transforms a hard "choose from two ends" problem into a standard sliding window on positive integers.

---

## 4. Approach: Find Longest Middle Subarray — O(n) ✅

Reframe: find the longest subarray with sum = `total - x`. Then answer = `n - maxLen`.

```
FUNCTION minOperations(nums, x):
    target = SUM(nums) - x
    IF target < 0: RETURN -1
    IF target == 0: RETURN len(nums)

    maxLen = -1
    left = 0, currSum = 0

    FOR right ← 0 TO n - 1:
        currSum += nums[right]
        WHILE currSum > target:
            currSum -= nums[left]
            left += 1
        IF currSum == target:
            maxLen = MAX(maxLen, right - left + 1)

    RETURN n - maxLen IF maxLen != -1 ELSE -1
```

---

## 5. Walkthrough

```
nums = [1, 1, 4, 2, 3], x = 5
total = 11, target = 11 - 5 = 6

right=0: curSum=1
right=1: curSum=2
right=2: curSum=6 == target → maxLen=3 (subarray [1,1,4], indices 0-2)
right=3: curSum=8 > 6 → shrink left: 8-1=7 (left=1), 7-1=6 (left=2)
         curSum=6 == target → maxLen=max(3,2)=3
right=4: curSum=9 > 6 → shrink: 9-4=5 (left=3), 5 < 6

maxLen = 3, Answer = 5 - 3 = 2 ✅
(Middle = [1,1,4], removed = [2,3] from right)
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element visited at most twice (right pointer + left pointer) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

**Q1: Why does sliding window work here?**
All elements are positive, so expanding the window only increases the sum and shrinking only decreases it. This monotonicity guarantees correctness.

**Q2: What if elements could be negative?**
Sliding window wouldn't work. You'd need prefix sums with a hash map (similar to subarray sum equals K) — O(n) time, O(n) space.

**Q3: What if you could remove from any position, not just ends?**
Then it becomes subset sum (NP-hard in general). The "ends only" constraint is what enables the complement trick.

---

## 8. Key Takeaway

> **"Remove from ends" ↔ "keep the middle"** — this complement reframing is a powerful technique. Whenever a problem restricts operations to array ends, think about what the untouched middle subarray must look like.
