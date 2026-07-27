# 526. Beautiful Arrangement

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/beautiful-arrangement
**Companies:** Amazon, Bloomberg, Google, Hashedin, Microsoft, Visa
---

## Problem Description
Given an integer `n`, count the number of permutations of the numbers `1` to `n` such that for the `i`‑th position (1‑indexed) the number at that position is either divisible by `i` or `i` is divisible by the number. Return the total count of such beautiful arrangements.

## Examples
**Example 1**
```
Input: n = 2
Output: 2
Explanation: The valid permutations are [1,2] and [2,1].
```
**Example 2**
```
Input: n = 1
Output: 1
Explanation: Only one permutation exists.
```

## Approach
Use backtracking with a bitmask to represent which numbers have been placed. At position `pos`, try every unused number `num` that satisfies `num % pos == 0` or `pos % num == 0`. Recurse to the next position, accumulating the count when `pos > n`.

```text
FUNCTION countArrangement(n):
    count ← 0
    ALL ← (1 << n) - 1   // bitmask with n bits set
    FUNCTION backtrack(pos, usedMask):
        IF pos > n:
            count ← count + 1
            RETURN
        FOR num ← 1 TO n:
            bit ← 1 << (num - 1)
            IF (usedMask AND bit) == 0 AND (num MOD pos == 0 OR pos MOD num == 0):
                backtrack(pos + 1, usedMask OR bit)
    END FUNCTION
    backtrack(1, 0)
    RETURN count
```

## Walkthrough
For `n = 2`:
- Position 1: try `1` (valid) → recurse with usedMask `01`.
  - Position 2: only `2` left, `2 % 2 == 0` → count++.
- Position 1: try `2` (valid) → recurse with usedMask `10`.
  - Position 2: only `1` left, `2 % 1 == 0` → count++.
Total count = 2.

## Complexity Analysis
*Time*: O(n·2ⁿ) – each state defined by position and usedMask is visited once.
*Space*: O(n) – recursion stack depth.

## Follow‑Up Questions
1. How would you adapt the solution to return all valid permutations instead of just the count?
2. Can you improve the runtime using DP memoization on `(pos, usedMask)`?
3. What changes are needed if the divisibility condition is replaced by a custom predicate?

## Key Takeaway
Backtracking with a bitmask efficiently explores all placements while pruning invalid choices based on the divisibility rule.
