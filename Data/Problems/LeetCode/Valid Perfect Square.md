# 367. Valid Perfect Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-perfect-square](https://leetcode.com/problems/valid-perfect-square)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Sap

---

## Problem Description

Given a positive integer num, return `true` *if* `num` *is a perfect square or* `false` *otherwise*.

A **perfect square** is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as `sqrt`.

**Constraints:**
- `1 <= num <= 2^31 - 1`

## Examples

**Example 1:**
```
Input: num = 16
Output: true
Explanation: We return true because 4 * 4 = 16 and 4 is an integer.
```

**Example 2:**
```
Input: num = 14
Output: false
Explanation: We return false because 3.742 * 3.742 = 14 and 3.742 is not an integer.
```

## Approach
Use **binary search** on the range `[1, num]` to find an integer whose square equals `num`. Adjust the search bounds based on the comparison of `mid * mid` with `num`.

### Pseudocode
```text
FUNCTION isPerfectSquare(num):
    lo ← 1
    hi ← num
    WHILE lo ≤ hi:
        mid ← (lo + hi) / 2
        sq ← mid * mid
        IF sq == num:
            RETURN true
        ELSE IF sq < num:
            lo ← mid + 1
        ELSE:
            hi ← mid - 1
    RETURN false
```

## Walkthrough
| Step | lo | hi | mid | sq | Action |
|------|----|----|-----|----|--------|
| 1    | 1  | 16 | 8   | 64 | sq > num → hi = 7 |
| 2    | 1  | 7  | 4   | 16 | sq == num → return true |

## Complexity Analysis
- **Time:** O(log num) due to binary search.
- **Space:** O(1) constant extra space.

## Follow-Up Questions
1. How would you implement this using **Newton's method** for faster convergence?
2. How to handle very large numbers that may cause overflow when computing `mid * mid`?
3. Extend to return the integer square root when `num` is not a perfect square.

## Key Takeaway
Binary search efficiently checks perfect squares by repeatedly narrowing the candidate range based on the square comparison.
