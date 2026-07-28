# 760. Find Anagram Mappings

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-anagram-mappings](https://leetcode.com/problems/find-anagram-mappings)
**Companies:** Google

---

## Problem Description

Given two arrays `nums1` and `nums2` where `nums2` is an anagram of `nums1`, return a mapping array where `mapping[i]` is an index `j` such that `nums1[i] == nums2[j]`.

---

## Examples

**Example 1:**
```
Input: nums1 = [12,28,46,32,50], nums2 = [50,12,32,46,28]
Output: [1,4,3,2,0]
Explanation: nums1[0] = 12 matches nums2[1]; nums1[1] = 28 matches nums2[4]; etc.
```

**Example 2:**
```
Input: nums1 = [84,84], nums2 = [84,84]
Output: [0,1]
Explanation: Both elements are identical; any valid mapping is acceptable.
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