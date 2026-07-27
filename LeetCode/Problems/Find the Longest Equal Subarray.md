# 2831. Find the Longest Equal Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-longest-equal-subarray](https://leetcode.com/problems/find-the-longest-equal-subarray)
**Companies:** Google, Mathworks, Microsoft, Palo Alto Networks

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Group Positions + Sliding Window — O(n) ✅](#4-approach-group-positions--sliding-window--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a 0-indexed integer array `nums` and integer `k`, find the longest subarray where all elements are **equal** after deleting at most `k` elements from the subarray.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= nums.length`
- `0 <= k <= nums.length`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,3,2,3,1,3], k = 3
  Output: 3
  Reason: Delete elements at indices 0,2,4 → [3,3,3]. Length 3.

Example 2:
  Input:  nums = [1,1,2,2,1,1], k = 2
  Output: 4
  Reason: Delete the two 2s → [1,1,1,1]. Length 4.
```

---

## 3. Key Insight

> For each value, collect its positions. A sliding window on these positions finds the longest span where the number of "gaps" (deletions needed) is ≤ k. Deletions = `(rightIdx - leftIdx) - (right - left)`.

---

## 4. Approach: Group Positions + Sliding Window — O(n) ✅

```
FUNCTION longestEqualSubarray(nums, k):
    positions = defaultdict(list)
    FOR i, num IN enumerate(nums): positions[num].ADD(i)

    maxLen = 0
    FOR indices IN positions.values():
        left = 0
        FOR right ← 0 TO len(indices) - 1:
            // Window [left..right] in indices, deletions needed:
            WHILE indices[right] - indices[left] - (right - left) > k:
                left += 1
            maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

---

## 5. Walkthrough

```
nums = [1,1,2,2,1,1], k = 2
positions: {1: [0,1,4,5], 2: [2,3]}

Value 1, indices = [0,1,4,5]:
  right=0: window [0,0], gaps=0-0-0=0 ≤ 2, len=1
  right=1: window [0,1], gaps=1-0-1=0 ≤ 2, len=2
  right=2: window [0,4], gaps=4-0-2=2 ≤ 2, len=3
  right=3: window [0,5], gaps=5-0-3=2 ≤ 2, len=4 ← max

Value 2, indices = [2,3]: max len = 2

Result: 4 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — each index visited once across all sliding windows |
| **Space** | O(n) — position lists |

---

## 7. Follow-Up Questions

### 7.1 Why is total time O(n) across all values?

Each index appears in exactly one value's position list. The sum of all sliding window operations is O(n).

### 7.2 What if we need the actual subarray, not just the length?

Track the value and window that achieved the maximum, then reconstruct.

---

## 8. Key Takeaway

> **Group by value + sliding window on positions** elegantly handles "longest equal subarray with k deletions." The gap formula `indices[right] - indices[left] - (right - left)` counts non-matching elements between the two endpoints.
