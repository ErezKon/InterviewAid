# 2570. Merge Two 2D Arrays by Summing Values

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values](https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Yandex

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two **2D** integer arrays `nums1` and `nums2.`

- `nums1[i] = [id_i, val_i]` indicate that the number with the id `id_i` has a value equal to `val_i`.
- `nums2[i] = [id_i, val_i]` indicate that the number with the id `id_i` has a value equal to `val_i`.

Each array contains **unique** ids and is sorted in **ascending** order by id.

Merge the two arrays into one array that is sorted in ascending order by id, respecting the following conditions:

- Only ids that appear in at least one of the two arrays should be included in the resulting array.
- Each id should be included **only once** and its value should be the sum of the values of this id in the two arrays. If the id does not exist in one of the two arrays, then assume its value in that array to be `0`.

Return *the resulting array*. The returned array must be sorted in ascending order by id.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 200`
- `nums1[i].length == nums2[j].length == 2`
- `1 <= id_i, val_i <= 1000`
- Both arrays contain unique ids.
- Both arrays are in strictly ascending order by id.

---

## Examples

**Example 1:**
```
Input: nums1 = [[1,2],[2,3],[4,5]], nums2 = [[1,4],[3,2],[4,1]]
Output: [[1,6],[2,3],[3,2],[4,6]]
Explanation: The resulting array contains the following:
- id = 1, the value of this id is 2 + 4 = 6.
- id = 2, the value of this id is 3.
- id = 3, the value of this id is 2.
- id = 4, the value of this id is 5 + 1 = 6.
```

**Example 2:**
```
Input: nums1 = [[2,4],[3,6],[5,5]], nums2 = [[1,3],[4,3]]
Output: [[1,3],[2,4],[3,6],[4,3],[5,5]]
Explanation: There are no common ids, so we just include each id with its value in the resulting list.
```

---

## Key Insight

> Since both arrays are sorted by `id`, use **two pointers** (like merge sort) for an O(n+m) solution. Alternatively, a hash map approach also works simply.

---

## Approach

```
FUNCTION mergeArrays(nums1, nums2):
    // Hash map approach (simple)
    merged ← defaultdict(int)
    FOR [id, val] IN nums1 DO
        merged[id] ← merged[id] + val
    FOR [id, val] IN nums2 DO
        merged[id] ← merged[id] + val
    RETURN SORTED([[k, v] FOR (k, v) IN merged])
```

**Two-pointer alternative (O(1) extra space):**
```
FUNCTION mergeArrays(nums1, nums2):
    result ← []
    i ← 0, j ← 0
    WHILE i < LEN(nums1) AND j < LEN(nums2) DO
        IF nums1[i][0] < nums2[j][0] THEN
            result.ADD(nums1[i]); i ← i + 1
        ELSE IF nums1[i][0] > nums2[j][0] THEN
            result.ADD(nums2[j]); j ← j + 1
        ELSE
            result.ADD([nums1[i][0], nums1[i][1] + nums2[j][1]])
            i ← i + 1; j ← j + 1
    // Append remaining
    WHILE i < LEN(nums1) DO result.ADD(nums1[i]); i ← i + 1
    WHILE j < LEN(nums2) DO result.ADD(nums2[j]); j ← j + 1
    RETURN result
```

---

## Walkthrough

```
nums1 = [[1,2],[2,3],[4,5]], nums2 = [[1,4],[3,2],[4,1]]

Two-pointer:
i=0,j=0: id 1 = 1 → sum: [1, 2+4=6]. i=1,j=1
i=1,j=1: id 2 < 3 → add [2,3]. i=2
i=2,j=1: id 4 > 3 → add [3,2]. j=2
i=2,j=2: id 4 = 4 → sum: [4, 5+1=6]. i=3,j=3

Result: [[1,6],[2,3],[3,2],[4,6]] ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two pointers | **O(n + m)** | **O(1)** extra |
| Hash map | O((n+m) log(n+m)) | O(n+m) |

---

## Key Takeaway

> **Merge sorted lists** — when both inputs are sorted by the same key, two pointers give O(n+m) with minimal space. Hash map is simpler but needs sorting at the end.

---
