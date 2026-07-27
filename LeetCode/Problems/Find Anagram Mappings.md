# 760. Find Anagram Mappings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-anagram-mappings](https://leetcode.com/problems/find-anagram-mappings)
**Companies:** Google

---

## Problem Description

Given two arrays `nums1` and `nums2` where `nums2` is an anagram of `nums1`, return a mapping array where `mapping[i]` is an index `j` such that `nums1[i] == nums2[j]`.

---

## Approach: HashMap — O(n) ✅

```
FUNCTION anagramMappings(nums1, nums2):
    indexMap = {val: i for i, val in enumerate(nums2)}
    RETURN [indexMap[num] for num in nums1]
```

---

## Key Takeaway

> **Build value→index map from nums2, then look up each nums1 element. O(n) time and space.**
