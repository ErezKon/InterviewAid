# 350. Intersection of Two Arrays II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/intersection-of-two-arrays-ii](https://leetcode.com/problems/intersection-of-two-arrays-ii)
**Companies:** Amazon, Bloomberg, Criteo, Google, Ibm, Meta, Microsoft, Tcs, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Map Counting — O(m+n) ✅](#4-approach-hash-map-counting--omn-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in **both** arrays. Result order doesn't matter.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`

---

## 2. Examples

```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]   (order doesn't matter)
```

---

## 3. Key Insight

Unlike #349 (unique intersection), duplicates matter here. Count frequencies in one array, then iterate the other, consuming counts as you find matches.

---

## 4. Approach: Hash Map Counting — O(m+n) ✅

```
FUNCTION intersect(nums1, nums2):
    count = Counter(nums1)
    result = []
    FOR num IN nums2:
        IF count[num] > 0:
            result.ADD(num)
            count[num] -= 1
    RETURN result
```

---

## 5. Walkthrough

```
nums1 = [1,2,2,1], nums2 = [2,2]
count after nums1: {1:2, 2:2}
```

| num (from nums2) | count[num] | Action |
|-------------------|-----------|--------|
| 2 | 2 > 0 | Add 2, count = {1:2, 2:1} |
| 2 | 1 > 0 | Add 2, count = {1:2, 2:0} |

**Result:** `[2, 2]` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(m + n) | Build map + scan second array |
| Space | O(min(m, n)) | Count the smaller array for optimal space |

---

## 7. Follow-Up Questions

### 7.1 What if the arrays are sorted?

Use **two pointers**: advance the pointer with the smaller value, collect when equal. O(m+n) time, O(1) extra space.

### 7.2 What if nums1 is much larger than nums2?

Count the smaller array, iterate the larger. Or use binary search on the sorted larger array for each element of the smaller.

### 7.3 What if data is too large for memory?

**External sort** both files, then use a two-pointer merge reading chunks from disk. This is a classic external algorithm question.

---

## 8. Key Takeaway

> Hash map counting handles duplicate-aware intersection in O(m+n). The follow-up variations (sorted → two pointers, size disparity → binary search, too large → external sort) are the real interview differentiators.
