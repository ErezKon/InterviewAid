# 3072. Distribute Elements Into Two Arrays II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/distribute-elements-into-two-arrays-ii](https://leetcode.com/problems/distribute-elements-into-two-arrays-ii)
**Companies:** Autodesk, Capital One

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BIT / Fenwick Tree for greaterCount](#approach-bit--fenwick-tree-for-greatercount)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` of length `n`, distribute elements one by one into two arrays `arr1` and `arr2`:
- `arr1` starts with `nums[0]`, `arr2` starts with `nums[1]`.
- For each subsequent element, compare `greaterCount(arr1, nums[i])` vs `greaterCount(arr2, nums[i])` where `greaterCount` = number of elements in the array strictly greater than the given value. Place in the array with the higher count (ties go to `arr1`).

Return `arr1 + arr2` concatenated.

**Constraints:**
- `3 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples

```
Input: nums = [2,1,3,3]
Output: [2,3,1,3]
```

---

## Key Insight

> The bottleneck is computing `greaterCount` efficiently. Brute force is O(n) per query → O(n²) total. Use a **Fenwick Tree (BIT)** with coordinate compression to answer "how many elements > val" in O(log n) per query.

---

## Approach: BIT / Fenwick Tree for greaterCount ✅

```
FUNCTION resultArray(nums):
    // Coordinate compress values
    sorted_unique ← sorted(set(nums))
    rank ← {v: i+1 for i, v in enumerate(sorted_unique)}

    bit1, bit2 ← two Fenwick Trees of size len(sorted_unique)+1
    arr1 ← [nums[0]]; arr2 ← [nums[1]]
    bit1.UPDATE(rank[nums[0]], 1)
    bit2.UPDATE(rank[nums[1]], 1)

    FOR i ← 2 TO n-1 DO
        r ← rank[nums[i]]
        gc1 ← len(arr1) - bit1.QUERY(r)    // elements > nums[i] in arr1
        gc2 ← len(arr2) - bit2.QUERY(r)    // elements > nums[i] in arr2

        IF gc1 > gc2 OR (gc1 = gc2) THEN
            arr1.ADD(nums[i]); bit1.UPDATE(r, 1)
        ELSE
            arr2.ADD(nums[i]); bit2.UPDATE(r, 1)

    RETURN arr1 + arr2
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n log n) | Each element: O(log n) BIT query + update |
| **Space** | O(n) | Two BITs + arrays |

---

## Key Takeaway

> **When you need dynamic "count of elements > x" queries, use a Fenwick Tree with coordinate compression — each update and query is O(log n), enabling efficient online processing.**
