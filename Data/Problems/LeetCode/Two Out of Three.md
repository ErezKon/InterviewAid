# 2032. Two Out of Three

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Bookingcom, Info Edge

---

## Problem Description
Given three integer arrays `nums1`, `nums2`, and `nums3`, return a list of all distinct integers that appear in at least two of the three arrays. The order of the output does not matter.

## Examples
**Example 1:**
Input: `nums1 = [1,1,3,2]`, `nums2 = [2,3]`, `nums3 = [3]`
Output: `[2,3]`
Explanation: `2` appears in `nums1` and `nums2`; `3` appears in all three arrays.

**Example 2:**
Input: `nums1 = [3,1]`, `nums2 = [2,3]`, `nums3 = [1,2]`
Output: `[1,2,3]`
Explanation: Every number appears in at least two arrays.

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
