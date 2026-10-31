# 3452. Sum of Good Numbers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sum-of-good-numbers](https://leetcode.com/problems/sum-of-good-numbers)
**Companies:** Bcg, Google

---

## Problem Description

> *Note: statement checked against the official text with verify.py.*

Given an array of integers `nums` and an integer `k`, an element `nums[i]` is considered **good** if it is **strictly** greater than the elements at indices `i - k` and `i + k` (if those indices exist). If neither of these indices *exists*, `nums[i]` is still considered **good**.

Return the **sum** of all the **good** elements in the array.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`
- `1 <= k <= floor(nums.length / 2)`

## Examples

**Example 1:**
```
Input: nums = [1,3,2,1,5,4], k = 2
Output: 12
Explanation:
The good numbers are nums[1] = 3, nums[4] = 5, and nums[5] = 4 because they are strictly greater than the numbers at indices i - k and i + k.
```

**Example 2:**
```
Input: nums = [2,1], k = 1
Output: 2
Explanation:
The only good number is nums[0] = 2 because it is strictly greater than nums[1].
```

## Approach
Each element only needs to be compared with at most two other elements: `nums[i - k]` and `nums[i + k]`. A missing neighbor (index out of range) imposes no condition. So a single linear scan decides goodness for every index and sums the good values.

```text
FUNCTION sumOfGoodNumbers(nums, k)
    n ← length(nums)
    total ← 0
    FOR i ← 0 TO n-1
        leftOk ← (i - k < 0) OR (nums[i] > nums[i - k])
        rightOk ← (i + k ≥ n) OR (nums[i] > nums[i + k])
        IF leftOk AND rightOk
            total ← total + nums[i]
    RETURN total
```

## Walkthrough
Example 1: `nums = [1,3,2,1,5,4]`, `k = 2`.

| i | nums[i] | nums[i-k] | nums[i+k] | Good? | total |
|---|---------|-----------|-----------|-------|-------|
| 0 | 1 | — | 2 | no (1 ≤ 2) | 0 |
| 1 | 3 | — | 1 | yes | 3 |
| 2 | 2 | 1 | 5 | no (2 ≤ 5) | 3 |
| 3 | 1 | 3 | 4 | no | 3 |
| 4 | 5 | 2 | — | yes | 8 |
| 5 | 4 | 1 | — | yes | 12 |

Result: **12**.

## Complexity Analysis
Time: O(n) — each index is checked with at most two comparisons.
Space: O(1) extra space.

## Follow-Up Questions
* What if an element must be strictly greater than all elements within distance `k` (a window), not just the two at exactly distance `k`? (Use a sliding-window maximum with a monotonic deque.)
* How would you answer many queries with different values of `k` efficiently?
* What changes if "greater or equal" is allowed instead of strictly greater?

## Key Takeaway
When the condition for each element depends on a constant number of fixed positions, a direct single pass with careful boundary handling is optimal.
