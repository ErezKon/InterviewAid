# 1533. Find the Index of the Large Integer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-index-of-the-large-integer](https://leetcode.com/problems/find-the-index-of-the-large-integer)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search with Comparator API — O(log n) ✅](#4-approach-binary-search-with-comparator-api--olog-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a sorted array of integers accessed through an `ArrayReader` API, one element is larger than the rest (which are all equal). Find its index. You can only call `reader.compareSub(l1, r1, l2, r2)` which compares subarrays by sum and returns -1, 0, or 1.

**Constraints:**
- `2 <= arr.length <= 5 * 10⁵`
- At most `O(log n)` calls to `compareSub`.

---

## 2. Examples

```
Example 1:
  Input:  arr = [7, 7, 7, 7, 10, 7, 7, 7]
  Output: 4

Example 2:
  Input:  arr = [6, 6, 12]
  Output: 2
```

---

## 3. Key Insight

> Binary search: split the range in half, compare the two halves using the API. The half with the larger sum contains the special element. If the halves are equal-sized and sums are equal, the middle element (if odd length) is the answer.

---

## 4. Approach: Binary Search with Comparator API — O(log n) ✅

```
FUNCTION getIndex(reader):
    lo ← 0
    hi ← reader.length() - 1

    WHILE lo < hi DO
        mid ← (lo + hi) / 2
        // Make even-length halves
        IF (hi - lo + 1) % 2 == 1 THEN
            // Odd length: compare [lo..mid-1] vs [mid+1..hi]
            cmp ← reader.compareSub(lo, mid-1, mid+1, hi)
            IF cmp == 0 THEN RETURN mid
            ELSE IF cmp > 0 THEN hi ← mid - 1
            ELSE lo ← mid + 1
        ELSE
            // Even length: compare [lo..mid] vs [mid+1..hi]
            cmp ← reader.compareSub(lo, mid, mid+1, hi)
            IF cmp > 0 THEN hi ← mid
            ELSE lo ← mid + 1

    RETURN lo
```

---

## 5. Walkthrough

```
arr = [7, 7, 7, 7, 10, 7, 7, 7], n=8

lo=0, hi=7, mid=3 (even length)
  compare [0..3] vs [4..7]: sum 28 vs 31 → right is bigger → lo=4

lo=4, hi=7, mid=5 (even length)
  compare [4..5] vs [6..7]: sum 17 vs 14 → left is bigger → hi=5

lo=4, hi=5, mid=4 (even length)
  compare [4..4] vs [5..5]: sum 10 vs 7 → left is bigger → hi=4

lo=4 == hi=4 → RETURN 4 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(log n) API calls |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Binary search with comparison oracle** — when you can compare two subarrays by sum, the larger half contains the outlier. Handle odd/even lengths carefully to avoid off-by-one errors.
