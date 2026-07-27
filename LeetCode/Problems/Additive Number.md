# 306. Additive Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/additive-number](https://leetcode.com/problems/additive-number)
**Companies:** Epic Systems, Google, Meta

---

## Problem Description
Given a string `num` containing only digits, determine if it can form an **additive sequence**. An additive sequence is a list of at least three numbers where each number is the sum of the two preceding numbers. Numbers in the sequence cannot have leading zeros unless the number itself is zero.

## Examples
**Example 1**
Input: `num = "112358"`
Output: `true`
Explanation: The sequence 1, 1, 2, 3, 5, 8 is additive.

**Example 2**
Input: `num = "199100199"`
Output: `true`
Explanation: The sequence 1, 99, 100, 199 is additive.

## Approach
**Algorithm:** Backtracking – try every possible split for the first two numbers and recursively verify the rest.
1. Iterate possible lengths for the first number `a` (1 → n/2).
2. For each `a`, iterate possible lengths for the second number `b` (starting after `a`).
3. Skip splits where `a` or `b` have leading zeros.
4. Recursively check whether the remaining string starts with the sum `c = a + b` and continue with `(b, c)`.
5. Return true if any split validates the whole string.

## Walkthrough
| Step | a | b | c = a+b | Remaining string after matching c |
|------|---|---|--------|-----------------------------------|
| 1 | "1" | "1" | "2" | "2358" |
| 2 | "1" | "2" | "3" | "58" |
| 3 | "2" | "3" | "5" | "8" |
| 4 | "3" | "5" | "8" | "" → success |

## Complexity Analysis
- **Time:** O(n³) in the worst case due to trying all splits and string addition.
- **Space:** O(n) recursion depth for the backtracking calls.

## Follow‑Up Questions
1. How would you modify the algorithm to return the actual additive sequence?
2. Can the solution be optimized using memoization of previously computed sums?
3. How would you handle very large numbers that exceed standard integer ranges?

## Key Takeaway
Backtracking enumerates possible first two numbers, then the additive property forces the rest of the sequence, allowing a simple recursive verification.

---

```text
FUNCTION isAdditiveNumber(num):
    n ← len(num)
    FOR i ← 1 TO n/2:
        FOR j ← i+1 TO n-1:
            a ← num[0:i]
            b ← num[i:j]
            IF (len(a) > 1 AND a[0] = '0') OR (len(b) > 1 AND b[0] = '0'): CONTINUE
            IF isValid(a, b, num[j:]): RETURN true
    RETURN false

FUNCTION isValid(a, b, rest):
    IF rest = "": RETURN true
    c ← STRING(INTEGER(a) + INTEGER(b))
    IF NOT rest.startswith(c): RETURN false
    RETURN isValid(b, c, rest[len(c):])
```