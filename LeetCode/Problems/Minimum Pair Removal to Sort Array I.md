# 3507. Minimum Pair Removal to Sort Array I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i](https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Simulation — O(n²)](#4-approach-simulation--on²)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an integer array `nums`, in one operation pick the adjacent pair with the **minimum sum**, remove both, and insert their sum at that position. Return the minimum operations to make the array **non-decreasing**.

**Constraints:**
- `1 <= nums.length <= 50`
- `-1000 <= nums[i] <= 1000`

---

## 2. Examples

```
Example 1:
  Input: nums = [5, 2, 3, 1]
  Output: 2
  Explanation: Merge (3,1)→4 → [5,2,4], merge (2,4)→6 → [5,6]. ✅

Example 2:
  Input: nums = [1, 2, 3, 4]
  Output: 0
  Explanation: Already sorted.
```

---

## 3. Key Insight

> With small constraints (n ≤ 50), direct simulation works. Each operation reduces the array by 1 element, so at most ~50 operations. Finding the min-sum pair each time is O(n), giving O(n²) total.

---

## 4. Approach: Simulation — O(n²) ✅

```
FUNCTION minimumPairRemoval(nums):
    ops = 0
    WHILE NOT isSorted(nums):
        // Find pair with minimum sum, merge
        minSum = infinity; minIdx = 0
        FOR i ← 0 TO len(nums) - 2:
            IF nums[i] + nums[i+1] < minSum:
                minSum = nums[i] + nums[i+1]
                minIdx = i
        nums = nums[:minIdx] + [minSum] + nums[minIdx+2:]
        ops += 1
    RETURN ops
```

---

## 5. Walkthrough

```
nums = [5, 2, 3, 1]

Check sorted? 5>2 → NO
  Pairs: (5+2=7), (2+3=5), (3+1=4) → min = 4 at idx 2
  Merge: [5, 2, 4]. ops=1

Check sorted? 5>2 → NO
  Pairs: (5+2=7), (2+4=6) → min = 6 at idx 1
  Merge: [5, 6]. ops=2

Check sorted? 5≤6 → YES
Return 2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — at most n merges, each scanning O(n) |
| **Space** | O(n) — for the array copy during slicing |

---

## 7. Follow-Up Questions

**Q1: How to optimize for large n?**
See Part II (#3510): use a sorted set + doubly linked list for O(n log n).

**Q2: Is the greedy strategy (min sum first) always optimal?**
Yes — merging the smallest sum first creates the smallest possible replacement, minimizing the chance of introducing new violations.

---

## 8. Key Takeaway

> **When constraints are small, simulate directly.** The greedy "merge minimum sum pair" strategy is correct but O(n²). For large inputs, upgrade to sorted set + linked list (Part II).
