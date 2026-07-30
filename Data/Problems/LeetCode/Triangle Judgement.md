# 610. Triangle Judgement

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/triangle-judgement](https://leetcode.com/problems/triangle-judgement)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given three integer side lengths `x`, `y`, and `z` stored in a database table `Triangle`, determine for each row whether the three lengths can form a valid triangle. A triangle is valid if the sum of any two sides is strictly greater than the third side. Return a result column containing "Yes" for a valid triangle and "No" otherwise.

## Examples
**Example 1:**
```
Input table:
| x | y | z |
|---|---|---|
| 3 | 4 | 5 |
| 1 | 2 | 3 |
Output:
| x | y | z | triangle |
|---|---|---|----------|
| 3 | 4 | 5 | Yes |
| 1 | 2 | 3 | No |
```
Explanation: 3‑4‑5 satisfies triangle inequality; 1‑2‑3 does not because 1+2 = 3.

## Approach
The triangle inequality must hold for all three pairs. In SQL, compute the condition directly in a `CASE` expression. The same logic can be expressed in pseudocode for other languages.

**Pseudocode**
```text
FUNCTION isValidTriangle(x, y, z):
    IF x + y > z AND x + z > y AND y + z > x:
        RETURN "Yes"
    ELSE:
        RETURN "No"
```

## Walkthrough
| x | y | z | x+y>z | x+z>y | y+z>x | Result |
|---|---|---|-------|-------|-------|--------|
| 3 | 4 | 5 | true  | true  | true  | Yes |
| 1 | 2 | 3 | false | false | true  | No |

## Complexity Analysis
- Time: O(1) per row – a constant number of arithmetic checks.
- Space: O(1) – no additional data structures.

## Follow‑Up Questions
1. How would you modify the query to handle floating‑point side lengths with tolerance for precision errors?
2. Can you extend the solution to return the type of triangle (acute, right, obtuse) based on side lengths?
3. What if the table contains millions of rows—how would you ensure the query scales efficiently?

## Key Takeaway
A triangle is valid iff every pair of sides sums to more than the remaining side; this simple check can be expressed directly in SQL or any language.
