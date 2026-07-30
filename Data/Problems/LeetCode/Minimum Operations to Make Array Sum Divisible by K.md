# 3512. Minimum Operations to Make Array Sum Divisible by K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-sum-divisible-by-k](https://leetcode.com/problems/minimum-operations-to-make-array-sum-divisible-by-k)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given an integer array `nums` and an integer `k`, you may remove any number of elements from the array. Return the minimum number of elements that must be removed so that the sum of the remaining elements is divisible by `k`. It is guaranteed that a solution exists.

## Examples
**Example 1:**
Input: `nums = [3,1,4,2]`, `k = 6`
Output: `1`
Explanation: Removing `4` leaves sum `6`, which is divisible by `6`.

**Example 2:**
Input: `nums = [1,2,3]`, `k = 3`
Output: `0`
Explanation: The sum is already `6`, divisible by `3`.

## Approach
The sum of the whole array modulo `k` tells how far we are from a multiple of `k`. Removing a single element with the same remainder fixes the sum. If such an element does not exist, we need to remove two elements whose remainders add up to the needed offset. Since we only need the minimal count, we check for a single‑element solution first, otherwise answer is `2` (or `0` if already divisible).

```text
FUNCTION minOperations(nums, k):
    SET total ← SUM of nums
    SET remainder ← total MOD k
    IF remainder = 0:
        RETURN 0
    CREATE set remaindersSeen
    FOR each num IN nums:
        SET r ← num MOD k
        IF r = remainder:
            RETURN 1
        ADD r TO remaindersSeen
    // No single element fixes it; two elements will always suffice
    RETURN 2
```

## Walkthrough
| Step | num | total sum | remainder | Action |
|------|-----|-----------|-----------|--------|
| Start | - | 10 | 4 (10 mod 6) | Need to remove remainder 4 |
| Check 3 | 3 mod 6 = 3 | - | - | not 4 |
| Check 1 | 1 mod 6 = 1 | - | - | not 4 |
| Check 4 | 4 mod 6 = 4 | - | - | matches → remove `4` (1 operation) |

## Complexity Analysis
Time: **O(n)** – one pass to compute sum and check remainders.
Space: **O(k)** in the worst case for the set of remainders (bounded by `k`).

## Follow-Up Questions
1. How would the solution change if you could also add elements instead of only removing?
2. What if each removal has a different cost?
3. Can you extend the approach to handle multiple queries with different `k` values efficiently?

## Key Takeaway
The minimal removals depend only on the total sum modulo `k`; a single matching remainder solves it, otherwise two removals always suffice.
