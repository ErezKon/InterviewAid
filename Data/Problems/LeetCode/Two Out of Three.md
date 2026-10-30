# 2032. Two Out of Three

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/two-out-of-three](https://leetcode.com/problems/two-out-of-three)
**Companies:** Amazon, Bookingcom, Info Edge

---

## Problem Description

Given three integer arrays `nums1`, `nums2`, and `nums3`, return *a **distinct** array containing all the values that are present in **at least two** out of the three arrays. You may return the values in **any** order*.

**Constraints:**
- `1 <= nums1.length, nums2.length, nums3.length <= 100`
- `1 <= nums1[i], nums2[j], nums3[k] <= 100`

## Examples

**Example 1:**
```
Input: nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
Output: [3,2]
Explanation: The values that are present in at least two arrays are:
- 3, in all three arrays.
- 2, in nums1 and nums2.
```

**Example 2:**
```
Input: nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
Output: [2,3,1]
Explanation: The values that are present in at least two arrays are:
- 2, in nums2 and nums3.
- 3, in nums1 and nums2.
- 1, in nums1 and nums3.
```

**Example 3:**
```
Input: nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
Output: []
Explanation: No value is present in at least two arrays.
```

## Approach
1. Convert each array to a set to eliminate duplicates.
2. Compute pairwise intersections: `s1 & s2`, `s1 & s3`, `s2 & s3`.
3. Take the union of these three intersections and return it as a list.

## Walkthrough
| Set | Elements |
|-----|----------|
| s1 | {1,2,3}
| s2 | {2,3}
| s3 | {3}
Intersections: `s1&s2 = {2,3}`, `s1&s3 = {3}`, `s2&s3 = {3}`. Union → `{2,3}`.

## Complexity Analysis
- **Time:** `O(n1 + n2 + n3)` to build the sets and compute intersections.
- **Space:** `O(u)` where `u` is the number of unique elements across the three arrays.

## Follow‑Up Questions
1. How would you adapt the solution if the arrays are extremely large and cannot fit into memory?
2. What if you need to return the numbers that appear in exactly two arrays (not three)?
3. Can you solve it in a single pass without using explicit set data structures?

## Key Takeaway
Using set intersections and a union efficiently captures elements that appear in at least two collections.
