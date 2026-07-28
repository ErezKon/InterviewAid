# 1674. Minimum Moves to Make Array Complementary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-moves-to-make-array-complementary](https://leetcode.com/problems/minimum-moves-to-make-array-complementary)
**Companies:** Amazon, Curefit, Google, Meta, Microsoft

---

## Problem Description

Given an even‑length array `nums` where each element is in the range `[1, limit]`, you may change any element to any value within `[1, limit]` in one move. After the moves, for every index `i` the sum `nums[i] + nums[n‑1‑i]` must be the same for all pairs. Return the **minimum number of moves** required.

## Key Insight

> For each pair `(a, b)` we can achieve any target sum `T` with 0, 1, or 2 moves. Using a **difference array** we can add the cost contribution of each pair to all possible `T` in O(1) and then sweep to find the global minimum.

## Approach

1. Initialise a difference array `diff` of size `2*limit + 2`.
2. For each pair `(a, b)`:
   - The sum `a+b` needs 0 moves.
   - Any sum in `[min(a,b)+1, max(a,b)+limit]` needs 1 move.
   - All other sums need 2 moves.
   - Update `diff` accordingly.
3. Perform a prefix sum over `diff` to compute total moves for each possible target sum `T` and keep the minimum.

```text
FUNCTION minMoves(nums, limit):
    n ← LEN(nums)
    diff ← ARRAY[0 .. 2*limit+1] ← 0
    FOR i ← 0 TO n/2 - 1:
        a ← nums[i]
        b ← nums[n-1-i]
        lo ← MIN(a, b) + 1
        hi ← MAX(a, b) + limit
        // default 2 moves for all sums
        diff[2] ← diff[2] + 2
        // subtract 1 move for range [lo, hi]
        diff[lo] ← diff[lo] - 1
        diff[hi+1] ← diff[hi+1] + 1
        // subtract another 1 move for exact sum a+b (0 moves total)
        diff[a+b] ← diff[a+b] - 1
        diff[a+b+1] ← diff[a+b+1] + 1
    result ← n
    curr ← 0
    FOR t ← 2 TO 2*limit:
        curr ← curr + diff[t]
        result ← MIN(result, curr)
    RETURN result
```

## Examples

| nums | limit | Minimum Moves |
|------|-------|---------------|
| [1,2,2,1] | 2 | 0 |
| [1,2,3,4] | 5 | 2 |
| [2,2,2,2] | 3 | 0 |

*Explanation*: In the first case each pair already sums to `3`. In the second case, changing the `1` to `4` and the `4` to `1` makes all pairs sum to `5` with 2 moves.

## Walkthrough

Consider `nums = [1,2,3,4]`, `limit = 5`.
1. Pairs: `(1,4)` and `(2,3)`.
2. For pair `(1,4)`:
   - `a+b = 5` → 0 moves.
   - `lo = MIN(1,4)+1 = 2`, `hi = MAX(1,4)+5 = 9` → sums `2..9` need 1 move.
3. For pair `(2,3)`:
   - `a+b = 5` → 0 moves.
   - `lo = 3`, `hi = 8` → sums `3..8` need 1 move.
4. Using the difference array we accumulate costs for each possible sum `T` from `2` to `10`.
5. After prefix‑summing, the minimum total moves is `2` at target sum `5`.

## Complexity Analysis

- **Time:** O(n + limit) – one pass over the array plus a linear sweep over the possible sums.
- **Space:** O(limit) – the difference array of size `2*limit + 2`.

## Follow‑Up Questions

- How would the solution change if the array length could be odd?
- Can you adapt the algorithm to return the actual target sum(s) achieving the minimum moves?
- What if each move could change an element by at most `k` instead of any value in `[1, limit]`?

## Key Takeaway

> When optimizing over a range of possible target values, a **difference array** lets you encode each pair’s cost contribution in O(1) and find the global optimum with a single linear sweep.
