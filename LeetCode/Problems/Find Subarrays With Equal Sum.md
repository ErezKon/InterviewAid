# 2395. Find Subarrays With Equal Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-subarrays-with-equal-sum](https://leetcode.com/problems/find-subarrays-with-equal-sum)
**Companies:** Bloomberg, Morgan Stanley

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Set — O(n) ✅](#4-approach-hash-set--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a 0-indexed integer array `nums`, determine if there exist two subarrays of length 2 that start at **different** indices and have the **same sum**. Return `true` if such a pair exists, `false` otherwise.

**Constraints:**
- `2 <= nums.length <= 1000`
- `-10⁹ <= nums[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  nums = [4, 2, 4]
  Output: true
  Reason: nums[0]+nums[1] = 6, nums[1]+nums[2] = 6.

Example 2:
  Input:  nums = [1, 2, 3, 4, 5]
  Output: false
  Reason: All consecutive pair sums are distinct: 3, 5, 7, 9.
```

---

## 3. Key Insight

> Compute the sum of each consecutive pair. If any sum appears **twice**, return `true`. A hash set detects duplicates in O(1) per check.

---

## 4. Approach: Hash Set — O(n) ✅

```
FUNCTION findSubarrays(nums):
    seen ← SET()
    FOR i ← 0 TO LENGTH(nums) - 2 DO
        s ← nums[i] + nums[i + 1]
        IF s IN seen THEN
            RETURN true
        seen.ADD(s)
    RETURN false
```

---

## 5. Walkthrough

```
nums = [4, 2, 4]

i=0: s = 4+2 = 6, seen={}, 6 not in seen → add. seen={6}
i=1: s = 2+4 = 6, seen={6}, 6 in seen → RETURN true ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(n) — hash set |

---

## 7. Follow-Up Questions

### 7.1 What if we need subarrays of length k instead of 2?

Use a sliding window sum of size `k` and check for duplicates in a hash set.

### 7.2 What if we need to find the actual subarrays?

Store the index alongside the sum in a hash map instead of a set.

---

## 8. Key Takeaway

> **Hash set for duplicate detection** on sliding window sums is O(n) and avoids the O(n²) brute-force comparison of all pairs.
