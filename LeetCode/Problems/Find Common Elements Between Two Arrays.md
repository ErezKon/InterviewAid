# 2956. Find Common Elements Between Two Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-common-elements-between-two-arrays](https://leetcode.com/problems/find-common-elements-between-two-arrays)
**Companies:** Amazon, Bloomberg, Google, Meta, Yandex

---

## Problem Description

Return `[count1, count2]` where `count1` = elements in `nums1` that exist in `nums2`, and `count2` = elements in `nums2` that exist in `nums1` (with duplicates).

---

## Approach: Set Lookup — O(n + m) ✅

```
FUNCTION findIntersectionValues(nums1, nums2):
    s1, s2 = SET(nums1), SET(nums2)
    RETURN [SUM(1 for x in nums1 if x in s2), SUM(1 for x in nums2 if x in s1)]
```

---

## Key Takeaway

> **Build sets for O(1) lookup, count matching elements in each array.**
