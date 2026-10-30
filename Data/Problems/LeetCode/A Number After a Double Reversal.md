# 2119. A Number After a Double Reversal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/a-number-after-a-double-reversal](https://leetcode.com/problems/a-number-after-a-double-reversal)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description
**Reversing** an integer means to reverse all its digits.

- For example, reversing `2021` gives `1202`. Reversing `12300` gives `321` as the **leading zeros are not retained**.

Given an integer `num`, **reverse** `num` to get `reversed1`, **then reverse** `reversed1` to get `reversed2`. Return `true` *if* `reversed2` *equals* `num`. Otherwise return `false`.

**Constraints:**
- `0 <= num <= 10^6`

## Examples
```
Example 1:
  Input: num = 526
  Output: true
  Explanation: Reverse num to get 625, then reverse 625 to get 526, which equals num.
```
```
Example 2:
  Input: num = 1800
  Output: false
  Explanation: Reverse num to get 81, then reverse 81 to get 18, which does not equal num.
```
```
Example 3:
  Input: num = 0
  Output: true
  Explanation: Reverse num to get 0, then reverse 0 to get 0, which equals num.
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