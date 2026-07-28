# 2760. Longest Even Odd Subarray With Threshold

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-even-odd-subarray-with-threshold](https://leetcode.com/problems/longest-even-odd-subarray-with-threshold)
**Companies:** Meta

---

## 1. Problem Description

Given an integer array `nums` and an integer `threshold`, find the length of the longest contiguous subarray that:
1. Starts with an even number.
2. Alternates between even and odd numbers.
3. Every element is less than or equal to `threshold`.
Return the maximum length; if no such subarray exists, return `0`.

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [1,2,3,4,5,6]`, `threshold = 5` | `3` | Subarray `[2,3,4]` starts with even `2`, alternates parity, all ≤ 5. |
| `nums = [2,4,6]`, `threshold = 5` | `0` | All numbers exceed the threshold, so no valid subarray.
| `nums = [2,5,8,1,4]`, `threshold = 8` | `4` | Subarray `[2,5,8,1]` satisfies all conditions.

## 3. Approach: Linear Scan — O(n) ✅

```text
FUNCTION longestAlternatingSubarray(nums, threshold):
    maxLen ← 0
    i ← 0
    WHILE i < LENGTH(nums):
        IF nums[i] % 2 == 0 AND nums[i] ≤ threshold:
            j ← i
            WHILE j + 1 < LENGTH(nums) AND nums[j+1] % 2 != nums[j] % 2 AND nums[j+1] ≤ threshold:
                j ← j + 1
            maxLen ← MAX(maxLen, j - i + 1)
            i ← j + 1   // skip the examined subarray
        ELSE:
            i ← i + 1
    RETURN maxLen
```

## 4. Walkthrough

Consider `nums = [2,5,8,1,4]`, `threshold = 8`:
1. `i = 0`, `nums[0]` is even and ≤ 8 → start a subarray.
2. Extend while alternating and ≤ 8:
   - `j=0` → check `j+1=1`: `5` is odd ≤ 8 → extend.
   - `j=1` → check `j+1=2`: `8` is even ≤ 8 → extend.
   - `j=2` → check `j+1=3`: `1` is odd ≤ 8 → extend.
   - `j=3` → check `j+1=4`: `4` is even ≤ 8 → extend.
3. No more elements; subarray length = `5`. Update `maxLen = 5`.
4. Move `i` past the subarray; loop ends.

## 5. Complexity Analysis

- **Time:** O(n) – each element is visited at most twice.
- **Space:** O(1) – only a few integer variables.

## 6. Follow-Up Questions

- How would you modify the algorithm to return the actual subarray instead of just its length?
- Can the solution be adapted for a circular array where the subarray may wrap around?
- What changes are needed if the parity alternation requirement is removed?

## 7. Key Takeaway

> A single linear scan that starts from every even, threshold‑valid element and greedily extends while alternating parity yields the optimal length in O(n) time.
