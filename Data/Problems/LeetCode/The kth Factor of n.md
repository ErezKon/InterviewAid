# 1492. The kth Factor of n

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-kth-factor-of-n](https://leetcode.com/problems/the-kth-factor-of-n)
**Companies:** Amazon, Bloomberg, Expedia, Google, Meta, Microsoft, Oracle, Tcs

---

## Problem Description

You are given two positive integers `n` and `k`. A factor of an integer `n` is defined as an integer `i` where `n % i == 0`.

Consider a list of all factors of `n` sorted in **ascending order**, return *the *`k^th`* factor* in this list or return `-1` if `n` has less than `k` factors.

**Follow up:**

Could you solve this problem in less than O(n) complexity?

**Constraints:**
- `1 <= k <= n <= 1000`

## Examples

**Example 1:**
```
Input: n = 12, k = 3
Output: 3
Explanation: Factors list is [1, 2, 3, 4, 6, 12], the 3^rd factor is 3.
```

**Example 2:**
```
Input: n = 7, k = 2
Output: 7
Explanation: Factors list is [1, 7], the 2^nd factor is 7.
```

**Example 3:**
```
Input: n = 4, k = 4
Output: -1
Explanation: Factors list is [1, 2, 4], there is only 3 factors. We should return -1.
```

## Approach
We can find factors in O(√n) by iterating up to the square root, storing small factors, and later using their complementary large factors.

```text
FUNCTION kthFactor(n, k):
    small = []
    large = []
    FOR i FROM 1 TO FLOOR(SQRT(n)):
        IF n MOD i == 0:
            small.APPEND(i)
            IF i != n / i:
                large.PREPEND(n / i)   // store large factors in reverse order
    allFactors = CONCAT(small, large)
    IF k > LENGTH(allFactors):
        RETURN -1
    RETURN allFactors[k-1]
```
The `small` list holds factors ≤ √n, while `large` holds the matching > √n factors in descending order, allowing a single combined list.

## Walkthrough
| i | n % i == 0? | small | large (prepend) |
|---|------------|-------|-----------------|
| 1 | yes | [1] | [12]
| 2 | yes | [1,2] | [12,6]
| 3 | yes | [1,2,3] | [12,6,4]
| 4 | no (already covered) |
Combined → [1,2,3,4,6,12]; k=3 → 3.

## Complexity Analysis
- **Time:** O(√n) – we only iterate to the square root.
- **Space:** O(√n) – to store the factor lists.

## Follow-Up Questions
1. How would you modify the algorithm to return the `k`-th largest factor instead?
2. Can you compute the `k`-th factor without storing all factors, using a two-pointer technique?
3. How would you handle very large `n` (up to 10^12) where √n may be costly?

## Key Takeaway
Iterating only to √n and pairing each divisor with its complement yields all factors efficiently, enabling direct access to the `k`-th one.
