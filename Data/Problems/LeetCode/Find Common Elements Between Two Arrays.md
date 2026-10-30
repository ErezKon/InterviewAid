# 2956. Find Common Elements Between Two Arrays

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-common-elements-between-two-arrays](https://leetcode.com/problems/find-common-elements-between-two-arrays)
**Companies:** Amazon, Bloomberg, Google, Meta, Yandex

---

## Problem Description

You are given two integer arrays `nums1` and `nums2` of sizes `n` and `m`, respectively. Calculate the following values:

- `answer1` : the number of indices `i` such that `nums1[i]` exists in `nums2`.
- `answer2` : the number of indices `i` such that `nums2[i]` exists in `nums1`.

Return `[answer1,answer2]`.

**Constraints:**

- `n == nums1.length`
- `m == nums2.length`
- `1 <= n, m <= 100`
- `1 <= nums1[i], nums2[i] <= 100`

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

```
Example 1:
  Input: nums1 = [2,3,2], nums2 = [1,2]
  Output: [2,1]
  Explanation: (official explanation is an image) The elements at indices 0 and 2 in nums1 (value 2) exist in nums2, so answer1 is 2.
  The element at index 1 in nums2 (value 2) exists in nums1, so answer2 is 1.
```

```
Example 2:
  Input: nums1 = [4,3,2,3,1], nums2 = [2,2,5,2,3,6]
  Output: [3,4]
  Explanation: The elements at indices 1, 2, and 3 in nums1 exist in nums2 as well. So answer1 is 3.
  The elements at indices 0, 1, 3, and 4 in nums2 exist in nums1. So answer2 is 4.
```

```
Example 3:
  Input: nums1 = [3,4,2,3], nums2 = [1,5]
  Output: [0,0]
  Explanation: No numbers are common between nums1 and nums2, so answer is [0,0].
```

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