# 3375. Minimum Operations to Make Array Values Equal to K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k](https://leetcode.com/problems/minimum-operations-to-make-array-values-equal-to-k)
**Companies:** Bloomberg, Google, Lowe, Microsoft

---

## Problem Description
Given an integer array `nums` and an integer `k`, you may perform the following operation any number of times: choose an element `x` such that `x > k` and replace it with any integer `y` where `y ≤ k`. Return the minimum number of operations required to make **every** element of the array equal to `k`. If it is impossible, return `-1`.

Constraints typically include `1 ≤ nums.length ≤ 10⁵` and `1 ≤ nums[i], k ≤ 10⁹`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `nums = [3,2,2,4,5]`, `k = 2` | `2` | Elements greater than `2` are `{3,4,5}` – three distinct values. Each distinct value requires one operation, so answer is `3`. However, the element `2` is already equal to `k`, and we can change all `3,4,5` to `2` in two operations by first converting `3` → `2` and `4` → `2`, then `5` → `2`. The minimal distinct count is `2`. |
| `nums = [1,2,3]`, `k = 2` | `-1` | The element `1` is less than `k`; we can never increase it, so making all values `2` is impossible. |
| `nums = [2,2,2]`, `k = 2` | `0` | All elements already equal `k`; no operations needed. |

## Approach
The key insight is that any element larger than `k` can be turned into `k` in a single operation, regardless of its original value. Therefore, the number of required operations equals the count of **distinct** values greater than `k`. If any element is smaller than `k`, the task is impossible.

**Algorithm**
1. Scan the array to find the minimum value. If it is `< k`, return `-1`.
2. Use a hash set to collect all distinct numbers `> k`.
3. The answer is the size of this set.

**Pseudocode**
```text
FUNCTION minOperations(nums, k):
    SET minVal ← MINIMUM(nums)
    IF minVal < k:
        RETURN -1
    SET greaterSet ← EMPTY SET
    FOR each num IN nums:
        IF num > k:
            ADD num TO greaterSet
    RETURN SIZE(greaterSet)
```

## Walkthrough
Consider `nums = [3,2,2,4,5]`, `k = 2`.
| Step | num | Action | greaterSet |
|------|-----|--------|------------|
| 1 | 3 | 3 > 2 → add to set | {3} |
| 2 | 2 | 2 ≤ 2 → ignore | {3} |
| 3 | 2 | ignore | {3} |
| 4 | 4 | 4 > 2 → add | {3,4} |
| 5 | 5 | 5 > 2 → add | {3,4,5} |
After the scan, `greaterSet` size is `3`. Since no element is `< 2`, the answer is `3` operations.

## Complexity Analysis
- **Time:** `O(n)` – one pass through the array.
- **Space:** `O(m)` where `m` is the number of distinct values greater than `k` (at most `n`).

## Follow-Up Questions
1. What if each operation has a cost equal to the difference `x - k`? How would you minimize total cost?
2. How would the solution change if you could only decrease elements by 1 per operation?
3. Can you extend the approach to handle multiple target values instead of a single `k`?

## Key Takeaway
The minimum number of operations equals the count of distinct values greater than `k`; any smaller element makes the task impossible.
