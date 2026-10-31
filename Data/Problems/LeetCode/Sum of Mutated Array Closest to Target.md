# 1300. Sum of Mutated Array Closest to Target

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-mutated-array-closest-to-target](https://leetcode.com/problems/sum-of-mutated-array-closest-to-target)
**Companies:** Bloomberg, Google

---

## Problem Description

Given an integer array `arr` and a target value `target`, return the integer `value` such that when we change all the integers larger than `value` in the given array to be equal to `value`, the sum of the array gets as close as possible (in absolute difference) to `target`.

In case of a tie, return the minimum such integer.

Notice that the answer is not neccesarilly a number from `arr`.

**Constraints:**
- `1 <= arr.length <= 10^4`
- `1 <= arr[i], target <= 10^5`

## Examples

**Example 1:**
```
Input: arr = [4,9,3], target = 10
Output: 3
Explanation: When using 3 arr converts to [3, 3, 3] which sums 9 and that's the optimal answer.
```

**Example 2:**
```
Input: arr = [2,3,5], target = 10
Output: 5
```

**Example 3:**
```
Input: arr = [60864,25176,27249,21296,20204], target = 56803
Output: 11361
```

## Approach
Let `f(v) = Σ min(arr[i], v)` be the array sum after capping at `v`. `f` is non-decreasing in `v`, and for `v ≥ max(arr)` it stays at `sum(arr)`.

Sort `arr` ascending and scan with a running prefix sum. At index `i`, assume the cap lies in `[arr[i-1], arr[i]]`: the first `i` elements stay unchanged (sum `prefix`) and the remaining `m = n − i` elements all become `v`, so `f(v) = prefix + m·v`. The ideal real-valued cap is `x = (target − prefix) / m`.
- If `target − prefix ≤ arr[i]·m` (i.e. `x ≤ arr[i]`), the optimal integer is `x` rounded to the nearest integer, rounding **down** on an exact half (ties → smaller value). Because the previous index failed the test, `x > arr[i-1]`, so the rounded value stays in the valid range.
- Otherwise add `arr[i]` to `prefix` and continue.

If no index satisfies the test, even the uncapped sum is below `target`, so the answer is `max(arr)` (the smallest value achieving `sum(arr)`).

```text
FUNCTION findBestValue(arr, target)
    SORT arr ascending
    n ← length(arr)
    prefix ← 0
    FOR i ← 0 TO n-1
        m ← n - i                      // elements that would be capped
        rem ← target - prefix
        IF rem ≤ arr[i] * m
            q ← rem DIV m
            r ← rem MOD m
            IF 2 * r > m               // fractional part > 0.5 -> round up
                RETURN q + 1
            RETURN q                   // ties (exactly 0.5) go to the smaller value
        prefix ← prefix + arr[i]
    RETURN arr[n-1]                    // sum(arr) < target: no capping
```

## Walkthrough
Example 1: `arr = [4,9,3]`, `target = 10` → sorted `[3,4,9]`.

| i | arr[i] | prefix | m | rem = target − prefix | rem ≤ arr[i]·m ? | Action |
|---|--------|--------|---|-----------------------|------------------|--------|
| 0 | 3 | 0 | 3 | 10 | 10 ≤ 9? no | prefix ← 3 |
| 1 | 4 | 3 | 2 | 7 | 7 ≤ 8? yes | q = 3, r = 1, 2r = 2 > 2? no → return 3 |

Check: with value 3 the array becomes `[3,3,3]`, sum 9, difference 1 (value 4 gives sum 11, also difference 1, but the tie goes to the smaller value). Result: **3**.

## Complexity Analysis
Time: O(n log n) for sorting; the scan is O(n).
Space: O(1) extra (or O(n) if the sort is not in place).

## Follow-Up Questions
- How would you solve it with binary search on `value` instead of the sorted scan? (Find the smallest `v` with `f(v) ≥ target` in `[0, max(arr)]`, then compare `v` and `v − 1`; O(n log C).)
- What if values larger than `value` were changed to `value` only for a chosen subset of positions?
- How would you answer many different `target` queries on the same array? (Precompute sorted prefix sums and binary search the segment per query.)

## Key Takeaway
A capped sum is piecewise linear and monotone in the cap; sorting with prefix sums lets you locate the linear segment containing the target and solve for the best integer directly, taking care with rounding and tie-breaking.
