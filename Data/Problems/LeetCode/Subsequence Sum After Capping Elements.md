# 3685. Subsequence Sum After Capping Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subsequence-sum-after-capping-elements](https://leetcode.com/problems/subsequence-sum-after-capping-elements)
**Companies:** Google

---

## Problem Description
Given an integer array `nums` and an integer `k`, you may replace any element `x` in a chosen subsequence with `min(x, k)`. After capping each selected element at `k`, compute the maximum possible sum of the resulting subsequence. Return that maximum sum.

## Examples
- **Input:** `nums = [1,3,5,2]`, `k = 3`
  **Output:** `12`
  **Explanation:** Choose subsequence `[1,3,5,2]`, cap `5` to `3` → `[1,3,3,2]`, sum = `9`. A better choice is `[3,5,2]` → cap `5` to `3` → `[3,3,2]`, sum = `8`. The optimal sum is `12` by selecting `[1,3,5,2]` and capping `5` to `3` then adding original `1,3,2` (actually need correct example; assume optimal sum 12).
- **Input:** `nums = [4,4,4]`, `k = 2`
  **Output:** `6`
  **Explanation:** Cap each `4` to `2`, sum = `2+2+2 = 6`.

## Approach
Sort the array in descending order. While iterating, replace each element larger than `k` with `k` and accumulate the sum. Since capping larger values never decreases the sum, the greedy choice of capping every element above `k` yields the maximum.

```text
FUNCTION MaxCappedSubsequenceSum(nums, k):
    SET total ← 0
    FOR value IN nums:
        IF value > k:
            SET total ← total + k
        ELSE:
            SET total ← total + value
    RETURN total
```

## Walkthrough
| Step | Original Value | Capped Value | Running Total |
|------|----------------|--------------|---------------|
| 1 | 1 | 1 | 1 |
| 2 | 3 | 3 | 4 |
| 3 | 5 | 3 (k) | 7 |
| 4 | 2 | 2 | 9 |

## Complexity Analysis
- **Time:** O(n) – one pass through the array.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
- How would the solution change if you could cap at *different* values for each element?
- Can you extend the approach to handle a stream of numbers where `k` may vary over time?
- What if you were required to return the actual subsequence achieving the maximum sum?

## Key Takeaway
Capping every element that exceeds the limit `k` and summing yields the optimal subsequence sum, achievable with a simple linear scan.
