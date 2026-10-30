# 2760. Longest Even Odd Subarray With Threshold

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-even-odd-subarray-with-threshold](https://leetcode.com/problems/longest-even-odd-subarray-with-threshold)
**Companies:** Meta

---

## 1. Problem Description

You are given a **0-indexed** integer array `nums` and an integer `threshold`.

Find the length of the **longest subarray** of `nums` starting at index `l` and ending at index `r` `(0 <= l <= r < nums.length)` that satisfies the following conditions:

- `nums[l] % 2 == 0`
- For all indices `i` in the range `[l, r - 1]`, `nums[i] % 2 != nums[i + 1] % 2`
- For all indices `i` in the range `[l, r]`, `nums[i] <= threshold`

Return *an integer denoting the length of the longest such subarray.*

**Note:** A **subarray** is a contiguous non-empty sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 100 `
- `1 <= nums[i] <= 100 `
- `1 <= threshold <= 100`

## 2. Examples

**Example 1:**
```
Input: nums = [3,2,5,4], threshold = 5
Output: 3
Explanation: In this example, we can select the subarray that starts at l = 1 and ends at r = 3 => [2,5,4]. This subarray satisfies the conditions.
Hence, the answer is the length of the subarray, 3. We can show that 3 is the maximum possible achievable length.
```

**Example 2:**
```
Input: nums = [1,2], threshold = 2
Output: 1
Explanation: In this example, we can select the subarray that starts at l = 1 and ends at r = 1 => [2].
It satisfies all the conditions and we can show that 1 is the maximum possible achievable length.
```

**Example 3:**
```
Input: nums = [2,3,4,5], threshold = 4
Output: 3
Explanation: In this example, we can select the subarray that starts at l = 0 and ends at r = 2 => [2,3,4].
It satisfies all the conditions.
Hence, the answer is the length of the subarray, 3. We can show that 3 is the maximum possible achievable length.
```

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
