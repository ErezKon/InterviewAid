# 760. Find Anagram Mappings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-anagram-mappings](https://leetcode.com/problems/find-anagram-mappings)
**Companies:** Google

---

## Problem Description

You are given two integer arrays `nums1` and `nums2` where `nums2` is **an anagram** of `nums1`. Both arrays may contain duplicates.

Return *an index mapping array* `mapping` *from* `nums1` *to* `nums2` *where* `mapping[i] = j` *means the* `i^th` *element in* `nums1` *appears in* `nums2` *at index* `j`. If there are multiple answers, return **any of them**.

An array `a` is **an anagram** of an array `b` means `b` is made by randomizing the order of the elements in `a`.

**Constraints:**

- `1 <= nums1.length <= 100`
- `nums2.length == nums1.length`
- `0 <= nums1[i], nums2[i] <= 10^5`
- `nums2` is an anagram of `nums1`.

---

## Examples

```
Example 1:
  Input: nums1 = [12,28,46,32,50], nums2 = [50,12,32,46,28]
  Output: [1,4,3,2,0]
  Explanation: As mapping[0] = 1 because the 0th element of nums1 appears at nums2[1], and mapping[1] = 4 because the 1st element of nums1 appears at nums2[4], and so on.
```

```
Example 2:
  Input: nums1 = [84,46], nums2 = [84,46]
  Output: [0,1]
```

---

## Approach: HashMap — O(n) ✅

```
FUNCTION anagramMappings(nums1, nums2):
    indexMap = {}
    FOR i ← 0 TO LENGTH(nums2) - 1:
        SET indexMap[nums2[i]] ← i
    result = []
    FOR num IN nums1:
        APPEND indexMap[num] TO result
    RETURN result
```

---

## Walkthrough

For `nums1 = [12,28,46,32,50]` and `nums2 = [50,12,32,46,28]`:

1. Build `indexMap`: {50→0, 12→1, 32→2, 46→3, 28→4}
2. Map each `nums1` element using the map → [1,4,3,2,0]

---

## Complexity Analysis

- **Time:** O(n) – one pass to build the map and one pass to create the result.
- **Space:** O(n) – storage for the hashmap and the output array.

---

## Follow-Up Questions

1. How would you handle duplicate values if the mapping must be one‑to‑one?
2. Can you solve it without extra space by modifying `nums2` in‑place?
3. What if the arrays are extremely large and don’t fit in memory?

---

## Key Takeaway

> **Build a value→index hashmap from the second array, then look up each element of the first array. Simple O(n) solution.**