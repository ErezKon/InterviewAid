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

You are given a **1-indexed** array of integers `nums` of length `n`.

We define a function `greaterCount` such that `greaterCount(arr, val)` returns the number of elements in `arr` that are **strictly greater** than `val`.

You need to distribute all the elements of `nums` between two arrays `arr1` and `arr2` using `n` operations. In the first operation, append `nums[1]` to `arr1`. In the second operation, append `nums[2]` to `arr2`. Afterwards, in the `i^th` operation:

- If `greaterCount(arr1, nums[i]) > greaterCount(arr2, nums[i])`, append `nums[i]` to `arr1`.
- If `greaterCount(arr1, nums[i]) < greaterCount(arr2, nums[i])`, append `nums[i]` to `arr2`.
- If `greaterCount(arr1, nums[i]) == greaterCount(arr2, nums[i])`, append `nums[i]` to the array with a **lesser** number of elements.
- If there is still a tie, append `nums[i]` to `arr1`.

The array `result` is formed by concatenating the arrays `arr1` and `arr2`. For example, if `arr1 == [1,2,3]` and `arr2 == [4,5,6]`, then `result = [1,2,3,4,5,6]`.

Return *the integer array* `result`.

**Constraints:**
- `3 <= n <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [2,1,3,3]
Output: [2,3,1,3]
Explanation: After the first 2 operations, arr1 = [2] and arr2 = [1].
In the 3^rd operation, the number of elements greater than 3 is zero in both arrays. Also, the lengths are equal, hence, append nums[3] to arr1.
In the 4^th operation, the number of elements greater than 3 is zero in both arrays. As the length of arr2 is lesser, hence, append nums[4] to arr2.
After 4 operations, arr1 = [2,3] and arr2 = [1,3].
Hence, the array result formed by concatenation is [2,3,1,3].
```

**Example 2:**
```
Input: nums = [5,14,3,1,2]
Output: [5,3,1,2,14]
Explanation: After the first 2 operations, arr1 = [5] and arr2 = [14].
In the 3^rd operation, the number of elements greater than 3 is one in both arrays. Also, the lengths are equal, hence, append nums[3] to arr1.
In the 4^th operation, the number of elements greater than 1 is greater in arr1 than arr2 (2 > 1). Hence, append nums[4] to arr1.
In the 5^th operation, the number of elements greater than 2 is greater in arr1 than arr2 (2 > 1). Hence, append nums[5] to arr1.
After 5 operations, arr1 = [5,3,1,2] and arr2 = [14].
Hence, the array result formed by concatenation is [5,3,1,2,14].
```

**Example 3:**
```
Input: nums = [3,3,3,3]
Output: [3,3,3,3]
Explanation: At the end of 4 operations, arr1 = [3,3] and arr2 = [3,3].
Hence, the array result formed by concatenation is [3,3,3,3].
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
