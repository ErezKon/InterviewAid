# 2856. Minimum Array Length After Pair Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-length-after-pair-removals](https://leetcode.com/problems/minimum-array-length-after-pair-removals)
**Companies:** Snowflake

---

## Problem Description

You are given an integer array `nums`. In one operation you may choose two distinct indices `i` and `j` such that `nums[i] < nums[j]` and remove both elements from the array. Return the minimum possible length of the array after performing any number of such operations.

Constraints:
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: 0
Explanation: Remove (1,4) then (2,3). All elements removed.
```

**Example 2:**
```
Input: nums = [1,1,1,2,2]
Output: 1
Explanation: Remove (1,2) twice, one `1` remains.
```

---

## Approach

**Algorithm:** Count frequencies of each value. Let `maxFreq` be the highest frequency and `n` the array length.
- If `maxFreq > n/2`, the majority element cannot be fully paired; the minimal length is `2*maxFreq - n`.
- Otherwise, all elements can be paired except possibly one leftover, so the answer is `n % 2`.

Pseudocode:
```text
FUNCTION minLengthAfterRemovals(nums):
    n ← LEN(nums)
    CREATE hashmap freq
    FOR x IN nums DO
        freq[x] ← freq.get(x, 0) + 1
    maxFreq ← MAX_VALUE(freq)
    IF maxFreq > n / 2 THEN
        RETURN 2 * maxFreq - n
    ELSE
        RETURN n MOD 2
```
---

## Walkthrough

For `nums = [1,1,1,2,2]`:
1. Frequencies: `1→3`, `2→2`; `n = 5`, `maxFreq = 3`.
2. `maxFreq > n/2` (3 > 2.5) → answer `2*3 - 5 = 1`.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Frequency map | O(n) | O(n) |
---

## Follow‑Up Questions

1. How would the solution change if the removal condition required `nums[i] + nums[j]` to be even?
2. Can you extend the method to handle multi‑set removal where more than two elements are removed per operation?
3. What is the impact on complexity if the array is streamed and cannot be stored entirely?
---

## Key Takeaway

> The bottleneck is the majority element: if it exceeds half the array size, leftover elements equal `2*maxFreq - n`; otherwise at most one element remains.
