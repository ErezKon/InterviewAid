# 280. Wiggle Sort

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/wiggle-sort](https://leetcode.com/problems/wiggle-sort)
**Companies:** Amazon, Google, Myntra, Tiktok

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

Given an integer array `nums`, reorder it such that `nums[0] <= nums[1] >= nums[2] <= nums[3]...`.

You may assume the input array always has a valid answer.

**Constraints:**
- `1 <= nums.length <= 5 * 10^4`
- `0 <= nums[i] <= 10^4`
- It is guaranteed that there will be an answer for the given input `nums`.

**Follow up:** Could you solve the problem in `O(n)` time complexity?

## Examples

**Example 1:**
```
Input: nums = [3,5,2,1,6,4]
Output: [3,5,1,6,2,4]
Explanation: [1,6,2,5,3,4] is also accepted.
```

**Example 2:**
```
Input: nums = [6,6,5,6,3,8]
Output: [6,6,5,6,3,8]
```

## Approach
Iterate through the array. At each index `i`:
- If `i` is odd, ensure `nums[i] ≥ nums[i-1]`; otherwise swap.
- If `i` is even, ensure `nums[i] ≤ nums[i-1]`; otherwise swap.
This greedy correction guarantees the wiggle condition for all processed elements.

```text
FUNCTION wiggleSort(nums):
    FOR i ← 1 TO LENGTH(nums)-1:
        IF i MOD 2 = 1 AND nums[i] < nums[i-1]:
            SWAP(nums[i], nums[i-1])
        ELSE IF i MOD 2 = 0 AND nums[i] > nums[i-1]:
            SWAP(nums[i], nums[i-1])
```

## Walkthrough
| i | nums before | Condition | Action |
|---|-------------|-----------|--------|
| 1 (odd) | [3,5,…] | 5 ≥ 3 ✅ | no swap |
| 2 (even) | [3,5,2,…] | 2 ≤ 5 ✅ | no swap |
| 3 (odd) | [3,5,2,1,…] | 1 ≥ 2 ❌ → swap 1↔2 |
| … | … | … | … |
Resulting array satisfies the wiggle pattern.

## Complexity Analysis
- Time: O(n) – single linear scan.
- Space: O(1) – only constant-time swaps.

## Follow-Up Questions
- How would you extend this to the stricter wiggle sort (`<` and `>` instead of `≤`/`≥`)?
- Can you prove that this greedy pass always yields a correct ordering?
- What if the array is read-only and you must output a new wiggle-sorted array?

## Key Takeaway
A single left-to-right pass with conditional swaps enforces the alternating ≤/≥ relationship using only constant extra space.
