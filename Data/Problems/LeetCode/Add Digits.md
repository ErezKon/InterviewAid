# 258. Add Digits

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/add-digits](https://leetcode.com/problems/add-digits)
**Companies:** Adobe, Amazon, Bloomberg, Google, Infosys, Meta, Microsoft, Pega, Uber, Visa

---

## Problem Description
Given an integer `num`, repeatedly add all its digits until the result has only one digit, and return it.

**Constraints:**
- `0 <= num <= 2^31 - 1`

**Follow up:** Could you do it without any loop/recursion in `O(1)` runtime?

## Examples
```
Example 1:
  Input: num = 38
  Output: 2
  Explanation: The process is
  38 --> 3 + 8 --> 11
  11 --> 1 + 1 --> 2
  Since 2 has only one digit, return it.
```
```
Example 2:
  Input: num = 0
  Output: 0
```

## Approach
The repeated digit sum is known as the **digital root**. For any positive integer, the digital root can be computed in O(1) using the formula:
```
digitalRoot = 1 + (num - 1) % 9   (when num > 0)
```
If `num` is `0`, the result is `0`.

### Pseudocode
```text
FUNCTION addDigits(num):
    IF num == 0:
        RETURN 0
    RETURN 1 + (num - 1) % 9
```

## Walkthrough
Take `num = 38`:
1. `num` is not `0`.
2. Compute `1 + (38 - 1) % 9 = 1 + 37 % 9 = 1 + 1 = 2`.
3. Return `2`, which matches the iterative process `38 → 11 → 2`.

## Complexity Analysis
- **Time Complexity:** `O(1)` – constant-time arithmetic.
- **Space Complexity:** `O(1)` – no extra space.

## Follow-Up Questions
- How would you solve the problem without using the modulo trick (i.e., with a loop)?
- Can you extend the solution to work with arbitrarily large numbers represented as strings?

## Key Takeaway
The digital root of a number can be obtained instantly with a simple modulo-9 formula, avoiding any loops.
