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

Given two 2D arrays `nums1` and `nums2` where each element is `[id, val]` sorted by `id`, merge them. If an id appears in both, sum the values. Return the result sorted by `id`.

**Constraints:**
- `1 ≤ nums1.length, nums2.length ≤ 200`
- Arrays are sorted by id in ascending order
- All ids are unique within each array

---

## Examples

**Example 1:**
```
Input:  nums1 = [[1,2],[2,3],[4,5]], nums2 = [[1,4],[3,2],[4,1]]
Output: [[1,6],[2,3],[3,2],[4,6]]
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
