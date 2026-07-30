# 2119. A Number After a Double Reversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/a-number-after-a-double-reversal](https://leetcode.com/problems/a-number-after-a-double-reversal)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
Given a non‑negative integer `num`, you reverse its decimal representation twice. Return `true` if the final value equals the original `num`, otherwise return `false`. Leading zeros are dropped after each reversal.

## Examples
**Example 1**
```
Input: num = 123
Output: true
Explanation: Reversing 123 gives 321, reversing again gives 123.
```
**Example 2**
```
Input: num = 120
Output: false
Explanation: Reversing 120 gives 21 (leading zero removed), reversing again gives 12.
```

## Approach
The key insight is that a number changes after double reversal only when it ends with a zero (except the number 0 itself). Therefore we can solve the problem in O(1) time by checking the last digit.

```text
FUNCTION isSameAfterReversals(num):
    // If num is 0, double reversal yields 0
    IF num == 0:
        RETURN true
    // If the last digit is 0, a leading zero will be dropped after first reversal
    RETURN (num % 10) != 0
```

## Walkthrough
| Step | num | num % 10 | Decision | Result |
|------|-----|----------|----------|--------|
| 1 | 123 | 3 | != 0 → true | true |
| 2 | 120 | 0 | == 0 → false | false |
| 3 | 0   | 0 (special case) | return true | true |

## Complexity Analysis
- **Time:** O(1) – only a constant‑time modulo operation.
- **Space:** O(1) – no extra data structures.

## Follow‑Up Questions
1. How would you handle very large numbers that do not fit in standard integer types?
2. What if the number is given as a string? Would the same insight apply?
3. Can you extend the solution to detect if a number becomes a palindrome after a single reversal?

## Key Takeaway
A double reversal only changes a number when it ends with a zero (excluding zero itself), allowing an O(1) solution by checking the last digit.