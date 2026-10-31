# 2998. Minimum Number of Operations to Make X and Y Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-x-and-y-equal](https://leetcode.com/problems/minimum-number-of-operations-to-make-x-and-y-equal)
**Companies:** Groww, Microsoft

---

## Problem Description

> *Note: the Approach below halves even numbers (invented). Officially the operations are `÷11`, `÷5`, `−1`, `+1` on `x`. Use a memoized recursion: `f(x) = y − x` if `x ≤ y`, else `min(x − y, x%5 + 1 + f(x//5), 5 − x%5 + 1 + f(x//5 + 1), x%11 + 1 + f(x//11), 11 − x%11 + 1 + f(x//11 + 1))`. BFS over `[0, x + 11]` also works.*

You are given two positive integers `x` and `y`.

In one operation, you can do one of the four following operations:

- Divide `x` by `11` if `x` is a multiple of `11`.
- Divide `x` by `5` if `x` is a multiple of `5`.
- Decrement `x` by `1`.
- Increment `x` by `1`.

Return *the **minimum** number of operations required to make * `x` *and* `y` equal.

**Constraints:**
- `1 <= x, y <= 10^4`

## Examples

**Example 1:**
```
Input: x = 26, y = 1
Output: 3
Explanation: We can make 26 equal to 1 by applying the following operations:
1. Decrement x by 1
2. Divide x by 5
3. Divide x by 5
It can be shown that 3 is the minimum number of operations required to make 26 equal to 1.
```

**Example 2:**
```
Input: x = 54, y = 2
Output: 4
Explanation: We can make 54 equal to 2 by applying the following operations:
1. Increment x by 1
2. Divide x by 11
3. Divide x by 5
4. Increment x by 1
It can be shown that 4 is the minimum number of operations required to make 54 equal to 2.
```

**Example 3:**
```
Input: x = 25, y = 30
Output: 5
Explanation: We can make 25 equal to 30 by applying the following operations:
1. Increment x by 1
2. Increment x by 1
3. Increment x by 1
4. Increment x by 1
5. Increment x by 1
It can be shown that 5 is the minimum number of operations required to make 25 equal to 30.
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
- **Time:** O(log max(x, y)) – each operation at least halves a number.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. What if you could also increment an odd number by 1 before halving?
2. How would the solution change if the cost of halving depended on the current value?
3. Can you extend the problem to make *k* numbers equal using the same operation?

## Key Takeaway
Repeatedly halving the larger even number greedily yields the minimum number of steps, and the process fails as soon as the larger number becomes odd while the two values differ.
