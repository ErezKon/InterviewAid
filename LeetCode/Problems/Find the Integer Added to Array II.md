# 3132. Find the Integer Added to Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-integer-added-to-array-ii](https://leetcode.com/problems/find-the-integer-added-to-array-ii)
**Companies:** Mitsogo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + Try 3 Candidates — O(n log n) ✅](#4-approach-sort--try-3-candidates--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `nums1` (length n) and `nums2` (length n-2), find the minimum integer `x` such that after removing 2 elements from `nums1` and adding `x` to each remaining element, the result equals `nums2` (in some order).

**Constraints:**
- `3 <= nums1.length <= 200`
- `1 <= nums1[i], nums2[i] <= 1000`

---

## 2. Examples

```
Example 1:
  Input:  nums1 = [4, 20, 16, 12, 8], nums2 = [14, 18, 10]
  Output: -2
  Reason: Remove 4 and 20, add -2: [16-2, 12-2, 8-2] = [14, 10, 6]... (sorted match)
```

---

## 3. Key Insight

> Sort both arrays. The two removed elements from `nums1` are unknown, but the minimum of `nums2` must match one of the first 3 elements of sorted `nums1` (plus x). Try each candidate `x` value and verify.

---

## 4. Approach: Sort + Try 3 Candidates — O(n log n) ✅

```
FUNCTION minimumAddedInteger(nums1, nums2):
    SORT(nums1)
    SORT(nums2)
    // x = nums2[0] - nums1[i] for i in {0, 1, 2}
    FOR i ← 2 DOWNTO 0 DO
        x ← nums2[0] - nums1[i]
        IF canMatch(nums1, nums2, x) THEN
            RETURN x

FUNCTION canMatch(nums1, nums2, x):
    j ← 0; skipped ← 0
    FOR i ← 0 TO LENGTH(nums1) - 1 DO
        IF j < LENGTH(nums2) AND nums1[i] + x == nums2[j] THEN
            j += 1
        ELSE
            skipped += 1
        IF skipped > 2 THEN RETURN false
    RETURN j == LENGTH(nums2)
```

---

## 5. Walkthrough

```
nums1 = [4, 8, 12, 16, 20] (sorted), nums2 = [10, 14, 18] (sorted)

Try i=2: x = 10 - 12 = -2
  canMatch: 4+(-2)=2≠10 skip, 8+(-2)=6≠10 skip, 12+(-2)=10=10 ✓,
           16+(-2)=14=14 ✓, 20+(-2)=18=18 ✓. skipped=2 ≤ 2 → valid!
RETURN -2 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorting + 3 linear scans |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Try at most 3 candidate values of x** based on the first 3 elements of sorted `nums1`. For each, a two-pointer scan verifies if the match works with at most 2 removals.
