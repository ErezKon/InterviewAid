# 2443. Sum of Number and Its Reverse

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-number-and-its-reverse](https://leetcode.com/problems/sum-of-number-and-its-reverse)
**Companies:** Amazon

---

## Problem Description

Given a **non-negative** integer `num`, return `true` *if* `num` *can be expressed as the sum of any **non-negative** integer and its reverse, or* `false` *otherwise.*

**Constraints:**
- `0 <= num <= 10^5`

## Examples

**Example 1:**
```
Input: num = 443
Output: true
Explanation: 172 + 271 = 443 so we return true.
```

**Example 2:**
```
Input: num = 63
Output: false
Explanation: 63 cannot be expressed as the sum of a non-negative integer and its reverse so we return false.
```

**Example 3:**
```
Input: num = 181
Output: true
Explanation: 140 + 041 = 181 so we return true. Note that when a number is reversed, there may be leading zeros.
```

## Approach
If `num = k + reverse(k)` with `k ≥ 0`, then `reverse(k) ≥ 0` implies `k ≤ num`. Since `num ≤ 10^5`, we can simply try every `k` in `[0, num]`, reverse it digit by digit (leading zeros of the reverse vanish automatically, e.g. reverse(140) = 41), and check the sum.

```text
FUNCTION sumOfNumberAndReverse(num)
    FOR k ← 0 TO num
        IF k + reverse(k) = num
            RETURN true
    RETURN false

FUNCTION reverse(k)
    rev ← 0
    WHILE k > 0
        rev ← rev * 10 + (k MOD 10)
        k ← k DIV 10
    RETURN rev
```

## Walkthrough
Example 1: `num = 443`.

| k | reverse(k) | k + reverse(k) | equals 443? |
|---|------------|----------------|-------------|
| 0 | 0 | 0 | no |
| 1 | 1 | 2 | no |
| … | … | … | no |
| 100 | 1 | 101 | no |
| 150 | 51 | 201 | no |
| 171 | 171 | 342 | no |
| 172 | 271 | 443 | yes → return |

Result: **true** (172 + 271 = 443).

## Complexity Analysis
Time: O(num · d), where d ≤ 6 is the number of digits — about 6·10^5 operations at most.
Space: O(1).

## Follow-Up Questions
- How would you solve it for `num` up to 10^18, where brute force is impossible? (Digit DP / two-pointer construction over the digit pairs `(a_i, a_{L−1−i})` with carries, trying both lengths `L = len(num)` and `len(num) − 1`.)
- How would you count how many `k` satisfy `k + reverse(k) = num`?
- Can the search range be pruned? (Only `k` with the same number of digits as `num` or one fewer can work.)

## Key Takeaway
When the input bound is small and the candidate space is bounded by the input itself (`k ≤ num`), a straightforward enumeration with an O(digits) check is the simplest correct solution.
