# 201. Bitwise AND of Numbers Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-and-of-numbers-range](https://leetcode.com/problems/bitwise-and-of-numbers-range)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given two non‑negative integers `left` and `right` where `left ≤ right`, compute the bitwise AND of all numbers in the inclusive range `[left, right]`. The result is the common high‑order bits of `left` and `right`.

## Examples
| left | right | Output | Explanation |
|------|-------|--------|-------------|
| 5 | 7 | 4 | Binary: 101, 110, 111 → AND = 100 (4).
| 0 | 1 | 0 | Any range containing 0 yields 0.
| 12 | 15 | 12 | 1100‑1111 → common prefix `1100` (12).

## Approach
Repeatedly right‑shift both numbers until they become equal; count the shifts. The common prefix (now equal) is the answer; left‑shift it back by the shift count.

```text
FUNCTION rangeBitwiseAnd(left, right):
    shift ← 0
    WHILE left != right:
        left ← left >> 1
        right ← right >> 1
        shift ← shift + 1
    RETURN left << shift
```

## Walkthrough
For `left=5 (101)` and `right=7 (111)`:
1. Shift both: `2 (10)`, `3 (11)`, shift=1.
2. Shift again: `1 (1)`, `1 (1)`, shift=2.
3. Numbers equal → `1 << 2 = 4`.

## Complexity Analysis
- Time: O(log N) – number of shifts equals the number of differing high bits.
- Space: O(1) – constant extra variables.

## Follow-Up Questions
- How would you solve the problem using Brian Kernighan’s algorithm to clear set bits?
- Can you extend the method to compute the bitwise OR of a range?
- What changes if the range is extremely large (e.g., up to 2³¹‑1) and you need to avoid overflow?

## Key Takeaway
Finding the common binary prefix of the range endpoints by right‑shifting yields the bitwise AND of all numbers in that range.
