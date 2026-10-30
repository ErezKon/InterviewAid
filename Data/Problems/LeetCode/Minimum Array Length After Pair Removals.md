# 2856. Minimum Array Length After Pair Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-array-length-after-pair-removals](https://leetcode.com/problems/minimum-array-length-after-pair-removals)
**Companies:** Snowflake

---

## Problem Description

Given an integer array `nums` sorted in non-decreasing order.

You can perform the following operation any number of times:
- Choose **two** indices, `i` and `j`, where `nums[i] < nums[j]`.
- Then, remove the elements at indices `i` and `j` from `nums`. The remaining elements retain their original order, and the array is re-indexed.

Return the **minimum** length of `nums` after applying the operation zero or more times.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `nums` is sorted in **non-decreasing** order.

---

## Examples

```
Example 1:
  Input: nums = [1,2,3,4]
  Output: 0
  Explanation: Remove (1,3) -> [2,4], then remove (2,4) -> []. All elements removed.
```

```
Example 2:
  Input: nums = [1,1,2,2,3,3]
  Output: 0
  Explanation: Remove (1,2) -> [1,2,3,3], remove (1,3) -> [2,3], remove (2,3) -> [].
```

```
Example 3:
  Input: nums = [1000000000,1000000000]
  Output: 2
  Explanation: Since both numbers are equal, they cannot be removed.
```

```
Example 4:
  Input: nums = [2,3,4,4,4]
  Output: 1
  Explanation: Remove (2,4) -> [3,4,4], remove (3,4) -> [4]. One element remains.
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
