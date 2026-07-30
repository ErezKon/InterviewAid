# 219. Contains Duplicate II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/contains-duplicate-ii](https://leetcode.com/problems/contains-duplicate-ii)
**Companies:** Accenture, Adobe, Airbnb, Amazon, Apple, Arista Networks, Bloomberg, Google, Meta, Microsoft, Netflix, Palantir, Tcs, Zoho

---

## Problem Description
Given an integer array `nums` and an integer `k`, determine whether there are two distinct indices `i` and `j` such that `nums[i] == nums[j]` and `abs(i - j) <= k`. Return `true` if such a pair exists, otherwise `false`.

## Examples
- Input: `nums = [1,2,3,1], k = 3` → Output: `true` (duplicate `1` within distance 3).
- Input: `nums = [1,0,1,1], k = 1` → Output: `true` (duplicate `1` at indices 2 and 3).
- Input: `nums = [1,2,3,4,5], k = 2` → Output: `false`.

## Approach
**Algorithm:** Sliding window with a hash set (O(n))
Maintain a set containing the last `k` elements. While iterating, if the current element already exists in the set, a duplicate within distance `k` is found. After processing each element, add it to the set and, if the set size exceeds `k`, remove the element that fell out of the window.

```text
FUNCTION containsNearbyDuplicate(nums, k):
    SET window ← empty set
    FOR i ← 0 TO LENGTH(nums) - 1:
        IF nums[i] IN window:
            RETURN true
        ADD nums[i] TO window
        IF SIZE(window) > k:
            REMOVE nums[i - k] FROM window
    RETURN false
```

## Walkthrough
For `nums = [1,2,3,1]`, `k = 3`:
1. i=0, window={1}
2. i=1, window={1,2}
3. i=2, window={1,2,3}
4. i=3, `nums[3]=1` is already in window → return `true`.

## Complexity Analysis
- **Time:** O(n) – each element is processed once.
- **Space:** O(k) – the set stores at most `k` elements.

## Follow‑Up Questions
- How would you modify the solution to return the indices of the duplicate pair?
- What changes are needed if the distance constraint is based on value difference rather than index distance?
- Can this be extended to handle a stream of numbers with limited memory?

## Key Takeaway
A sliding‑window set efficiently tracks recent elements, enabling O(1) duplicate checks within a bounded index distance.