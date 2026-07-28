# 869. Reordered Power of 2

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reordered-power-of-2](https://leetcode.com/problems/reordered-power-of-2)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a positive integer `n`, you may reorder its digits arbitrarily (leading zeros are allowed). Return `true` if you can form a power of two after reordering, otherwise return `false`.

## Examples
**Example 1:**
```
Input: n = 46
Output: true
Explanation: Reorder to "64", which is 2⁶.
```
**Example 2:**
```
Input: n = 10
Output: false
Explanation: The only reorderings are "10" and "01" (1), none are powers of two.
```

## Approach
Compute the sorted digit string of `n`. Pre‑compute the sorted digit strings of all powers of two up to 2³⁰ (since 2³⁰ > 10⁹). If any pre‑computed string matches the target, a reordering exists.

```text
FUNCTION reorderedPowerOf2(n):
    SET target ← SORT(STRING(n))
    FOR i ← 0 TO 30:
        SET powerStr ← STRING(1 << i)
        IF SORT(powerStr) = target:
            RETURN true
    RETURN false
```

## Walkthrough
| i | 2ⁱ | powerStr | sorted(powerStr) | match? |
|---|----|----------|------------------|--------|
| 0 | 1  | "1"     | "1"             | no |
| 1 | 2  | "2"     | "2"             | no |
| ... | ... | ... | ... | ... |
| 6 | 64 | "64"    | "46"            | **yes** → return true |

## Complexity Analysis
- Time: O(1) – constant 31 iterations, each sorting at most 10 digits.
- Space: O(1) – only a few temporary strings.

## Follow-Up Questions
1. How would you adapt the solution for very large numbers beyond 32‑bit range?
2. Can you solve the problem without sorting, using a digit‑count frequency array instead?
3. What changes are needed if the reordering must not produce leading zeros?

## Key Takeaway
By comparing the digit‑multiset of the given number with those of all feasible powers of two, you can decide reorderability in constant time.