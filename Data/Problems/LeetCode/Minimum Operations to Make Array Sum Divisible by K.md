# 3512. Minimum Operations to Make Array Sum Divisible by K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-array-sum-divisible-by-k](https://leetcode.com/problems/minimum-operations-to-make-array-sum-divisible-by-k)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
You are given an integer array `nums` and an integer `k`. You can perform the following operation any number of times:

- Select an index `i` and replace `nums[i]` with `nums[i] - 1`.

Return the **minimum** number of operations required to make the sum of the array divisible by `k`.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- `1 <= k <= 100`

## Examples

```
Example 1:
  Input: nums = [3,9,7], k = 5
  Output: 4
  Explanation:
  - Perform 4 operations on nums[1] = 9. Now, nums = [3, 5, 7].
  - The sum is 15, which is divisible by 5.
```

```
Example 2:
  Input: nums = [4,1,3], k = 4
  Output: 0
  Explanation:
  - The sum is 8, which is already divisible by 4. Hence, no operations are needed.
```

```
Example 3:
  Input: nums = [3,2], k = 6
  Output: 5
  Explanation:
  - Perform 3 operations on nums[0] = 3 and 2 operations on nums[1] = 2. Now, nums = [0, 0].
  - The sum is 0, which is divisible by 6.
```

## Approach
The sum of the whole array modulo `k` tells how far we are from a multiple of `k`. Removing a single element with the same remainder fixes the sum. If such an element does not exist, we need to remove two elements whose remainders add up to the needed offset. Since we only need the minimal count, we check for a single-element solution first, otherwise answer is `2` (or `0` if already divisible).

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
