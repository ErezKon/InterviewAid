# 367. Valid Perfect Square

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/valid-perfect-square](https://leetcode.com/problems/valid-perfect-square)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Sap

---

## Problem Description
Given a positive integer `num`, determine whether it is a perfect square, i.e., whether there exists an integer `x` such that `x * x = num`.

## Examples
**Example 1**
```
Input: num = 16
Output: true
Explanation: 4 * 4 = 16
```
**Example 2**
```
Input: num = 14
Output: false
Explanation: No integer square equals 14.
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
- **Time:** O(log num) due to binary search.
- **Space:** O(1) constant extra space.

## Follow-Up Questions
1. How would you implement this using **Newton's method** for faster convergence?
2. How to handle very large numbers that may cause overflow when computing `mid * mid`?
3. Extend to return the integer square root when `num` is not a perfect square.

## Key Takeaway
Binary search efficiently checks perfect squares by repeatedly narrowing the candidate range based on the square comparison.
