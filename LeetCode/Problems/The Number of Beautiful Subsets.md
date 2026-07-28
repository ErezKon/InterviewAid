# 2597. The Number of Beautiful Subsets

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-number-of-beautiful-subsets](https://leetcode.com/problems/the-number-of-beautiful-subsets)
**Companies:** Amazon, Bloomberg, Google, Infosys

---

## Problem Description
Given an integer array `nums` and an integer `k`, a subset of `nums` is called *beautiful* if for every pair of distinct elements `x` and `y` in the subset, `|x - y| != k`. Return the number of non‑empty beautiful subsets of `nums`. The answer may be large; return it modulo `10^9 + 7`.

## Examples
**Example 1:**
```
nums = [2,4,6], k = 2
Output = 4
```
The beautiful subsets are `[2]`, `[4]`, `[6]`, and `[2,6]`.

**Example 2:**
```
nums = [1,2,3], k = 1
Output = 2
```
Only `[1]` and `[3]` are beautiful because any subset containing two consecutive numbers violates the condition.

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
Backtrack while maintaining a frequency map that blocks inclusion of numbers whose `k`‑distance neighbors are already chosen, counting all valid non‑empty subsets.
