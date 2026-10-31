# 2597. The Number of Beautiful Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-beautiful-subsets](https://leetcode.com/problems/the-number-of-beautiful-subsets)
**Companies:** Amazon, Bloomberg, Google, Infosys

---

## Problem Description
You are given an array `nums` of positive integers and a **positive** integer `k`.

A subset of `nums` is **beautiful** if it does not contain two integers with an absolute difference equal to `k`.

Return *the number of **non-empty beautiful** subsets of the array* `nums`.

A **subset** of `nums` is an array that can be obtained by deleting some (possibly none) elements from `nums`. Two subsets are different if and only if the chosen indices to delete are different.

**Constraints:**
- `1 <= nums.length <= 18`
- `1 <= nums[i], k <= 1000`

## Examples
```
Example 1:
  Input: nums = [2,4,6], k = 2
  Output: 4
  Explanation: The beautiful subsets of the array nums are: [2], [4], [6], [2, 6].
  It can be proved that there are only 4 beautiful subsets in the array [2,4,6].
```
```
Example 2:
  Input: nums = [1], k = 1
  Output: 1
  Explanation: The beautiful subset of the array nums is [1].
  It can be proved that there is only 1 beautiful subset in the array [1].
```

## Approach
Use backtracking with a frequency map to decide for each element whether to include it. An element can be included only if neither `num - k` nor `num + k` has been chosen earlier. Count all valid subsets and subtract the empty set.

```text
FUNCTION beautifulSubsets(nums, k):
    MOD ← 1_000_000_007
    count ← 0
    freq ← MAP FROM integer TO integer DEFAULT 0
    n ← LENGTH(nums)
    
    FUNCTION backtrack(idx):
        IF idx = n:
            SET count ← (count + 1) MOD MOD
            RETURN
        // Option 1: skip current number
        backtrack(idx + 1)
        // Option 2: take current number if safe
        val ← nums[idx]
        IF freq[val - k] = 0 AND freq[val + k] = 0:
            INCREMENT freq[val]
            backtrack(idx + 1)
            DECREMENT freq[val]
    
    backtrack(0)
    // Subtract the empty subset counted once
    RETURN (count - 1 + MOD) MOD MOD
```
The recursion explores all inclusion/exclusion choices while respecting the beautiful condition.

## Walkthrough
| Step | idx | Decision | freq keys | count |
|------|-----|----------|-----------|-------|
| 1 | 0 | skip 2 | {} | 0 |
| 2 | 1 | take 4 (no conflict) | {4:1} | 0 |
| 3 | 2 | take 6 (no conflict with 4) | {4:1,6:1} | 0 |
| 4 | end | record subset `[4,6]` | — | 1 |
| … | … | explore all branches, finally count = 5 (including empty) → return 4 |

## Complexity Analysis
- **Time:** In the worst case, each element leads to two recursive calls, giving O(2^n) time.
- **Space:** O(n) recursion stack plus O(m) for the frequency map where `m` is the number of distinct values.

## Follow-Up Questions
1. How would you modify the solution to handle large `nums` with many duplicate values more efficiently?
2. Can the problem be solved using dynamic programming on the value range instead of backtracking?
3. How would the approach change if the condition were `|x - y| > k` instead of `!= k`?

## Key Takeaway
Backtrack while maintaining a frequency map that blocks inclusion of numbers whose `k`-distance neighbors are already chosen, counting all valid non-empty subsets.
