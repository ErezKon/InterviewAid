# 2998. Minimum Number of Operations to Make X and Y Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-x-and-y-equal](https://leetcode.com/problems/minimum-number-of-operations-to-make-x-and-y-equal)
**Companies:** Groww, Microsoft

---

## Problem Description
You are given two positive integers `x` and `y`. In one operation you may choose **one** of the numbers that is even and replace it with its half (integer division by 2). The operation can be applied repeatedly. Return the minimum number of operations required to make `x` and `y` equal. If it is impossible, return `-1`.

## Examples
**Example 1:**
```
Input: x = 8, y = 4
Output: 1
Explanation: Halve 8 → 4. Now x == y.
```
**Example 2:**
```
Input: x = 7, y = 3
Output: -1
Explanation: Both numbers are odd, no operation can be performed, and they are different.
```

## Approach
The only way to change a number is to halve it while it is even. Therefore the optimal strategy is greedy:
1. While `x` ≠ `y`:
   - If the larger of the two numbers is even, halve it.
   - If the larger number is odd, the transformation is impossible → return `-1`.
2. Count each halving as one operation.
The process terminates because each halving strictly reduces the larger value.

## Walkthrough
| Step | x | y | Action | Operations |
|------|---|---|--------|------------|
| 1 | 24 | 6 | Halve larger (24 → 12) | 1 |
| 2 | 12 | 6 | Halve larger (12 → 6) | 2 |
| 3 | 6 | 6 | Equal – stop | — |

## Complexity Analysis
- **Time:** O(log max(x, y)) – each operation at least halves a number.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. What if you could also increment an odd number by 1 before halving?
2. How would the solution change if the cost of halving depended on the current value?
3. Can you extend the problem to make *k* numbers equal using the same operation?

## Key Takeaway
Repeatedly halving the larger even number greedily yields the minimum number of steps, and the process fails as soon as the larger number becomes odd while the two values differ.
