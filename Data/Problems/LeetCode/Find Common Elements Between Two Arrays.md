# 2956. Find Common Elements Between Two Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-common-elements-between-two-arrays](https://leetcode.com/problems/find-common-elements-between-two-arrays)
**Companies:** Amazon, Bloomberg, Google, Meta, Yandex

---

## Problem Description

Return `[count1, count2]` where `count1` = number of elements in `nums1` that also appear in `nums2`, and `count2` = number of elements in `nums2` that also appear in `nums1`. Duplicates are counted each time they occur.

---

## Approach: Set Lookup — O(n + m) ✅

```text
FUNCTION findIntersectionValues(nums1, nums2):
    s1 ← SET(nums1)
    s2 ← SET(nums2)
    count1 ← SUM(1 FOR x IN nums1 IF x IN s2)
    count2 ← SUM(1 FOR x IN nums2 IF x IN s1)
    RETURN [count1, count2]
```

---

## Examples

| nums1 | nums2 | Output | Explanation |
|-------|-------|--------|-------------|
| `[1,2,3,4]` | `[3,4,5,6]` | `[2,2]` | `3` and `4` appear in both arrays, counted once in each direction. |
| `[1,1,2,2]` | `[2,2,3,3]` | `[2,2]` | In `nums1`, two `2`s match elements in `nums2`; in `nums2`, two `2`s match elements in `nums1`. |

---

## Walkthrough

1. Build `s1 = {1,2,3,4}` and `s2 = {3,4,5,6}`.
2. Iterate `nums1`: `1` not in `s2`, `2` not in `s2`, `3` in `s2` → increment `count1`, `4` in `s2` → increment `count1`. Result `count1 = 2`.
3. Iterate `nums2`: `3` in `s1` → increment `count2`, `4` in `s1` → increment `count2`, others not. Result `count2 = 2`.
4. Return `[2,2]`.

---

## Complexity Analysis

- **Time:** O(n + m) where *n* and *m* are lengths of `nums1` and `nums2` (building sets and scanning each array once).
- **Space:** O(u + v) for the two sets, where *u* and *v* are the numbers of unique elements in each array.

---

## Follow-Up Questions

- How would you modify the solution to return the actual intersecting elements instead of counts?
- Can you solve the problem without extra space (i.e., O(1) additional memory)?
- How would the approach change if the arrays were sorted?

---

## Key Takeaway

> **Build sets for O(1) lookup, count matching elements in each array.**