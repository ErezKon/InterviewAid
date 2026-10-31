# 201. Bitwise AND of Numbers Range

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bitwise-and-of-numbers-range](https://leetcode.com/problems/bitwise-and-of-numbers-range)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given two integers `left` and `right` that represent the range `[left, right]`, return *the bitwise AND of all numbers in this range, inclusive*.

**Constraints:**
- `0 ≤ left ≤ right ≤ 2³¹ - 1`

## Examples
```
Example 1:
  Input: left = 5, right = 7
  Output: 4

Example 2:
  Input: left = 0, right = 0
  Output: 0

Example 3:
  Input: left = 1, right = 2147483647
  Output: 0
```

## Approach
Repeatedly right-shift both numbers until they become equal; count the shifts. The common prefix (now equal) is the answer; left-shift it back by the shift count.

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
- Time: O(log N) – number of shifts equals the number of differing high bits.
- Space: O(1) – constant extra variables.

## Follow-Up Questions
- How would you solve the problem using Brian Kernighan’s algorithm to clear set bits?
- Can you extend the method to compute the bitwise OR of a range?
- What changes if the range is extremely large (e.g., up to 2³¹-1) and you need to avoid overflow?

## Key Takeaway
Finding the common binary prefix of the range endpoints by right-shifting yields the bitwise AND of all numbers in that range.
