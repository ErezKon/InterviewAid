# 2438. Range Product Queries of Powers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-product-queries-of-powers](https://leetcode.com/problems/range-product-queries-of-powers)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Trilogy
---

## Problem Description

Given a positive integer `n`, there exists a **0-indexed** array called `powers`, composed of the **minimum** number of powers of `2` that sum to `n`. The array is sorted in **non-decreasing** order, and there is **only one** way to form the array.

You are also given a **0-indexed** 2D integer array `queries`, where `queries[i] = [left_i, right_i]`. Each `queries[i]` represents a query where you have to find the product of all `powers[j]` with `left_i <= j <= right_i`.

Return* an array *`answers`*, equal in length to *`queries`*, where *`answers[i]`* is the answer to the *`i^th`* query*. Since the answer to the `i^th` query may be too large, each `answers[i]` should be returned **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 10^9`
- `1 <= queries.length <= 10^5`
- `0 <= start_i <= end_i < powers.length`

## Examples

**Example 1:**
```
Input: n = 15, queries = [[0,1],[2,2],[0,3]]
Output: [2,4,64]
Explanation: For n = 15, powers = [1,2,4,8]. It can be shown that powers cannot be a smaller size.
Answer to 1st query: powers[0] * powers[1] = 1 * 2 = 2.
Answer to 2nd query: powers[2] = 4.
Answer to 3rd query: powers[0] * powers[1] * powers[2] * powers[3] = 1 * 2 * 4 * 8 = 64.
Each answer modulo 10^9 + 7 yields the same answer, so [2,4,64] is returned.
```

**Example 2:**
```
Input: n = 2, queries = [[0,0]]
Output: [2]
Explanation: For n = 2, powers = [2].
The answer to the only query is powers[0] = 2. The answer modulo 10^9 + 7 is the same, so [2] is returned.
```

## Approach
Extract the values of set bits in ascending order of their positions. Pre-compute a prefix product array modulo `MOD`. Each query answer is `prefix[r] / prefix[l-1]` modulo `MOD`, using modular inverse.

```text
FUNCTION productQueries(n, queries):
    SET MOD ← 1_000_000_007
    // Extract set-bit values
    SET powers ← []
    SET bit ← 0
    WHILE n > 0:
        IF (n AND 1) = 1:
            APPEND (2 ^ bit) TO powers
        END IF
        SET n ← n >> 1
        SET bit ← bit + 1
    END WHILE
    // Prefix products
    SET prefix ← ARRAY of size LENGTH(powers)
    SET prod ← 1
    FOR i ← 0 TO LENGTH(powers) - 1:
        SET prod ← (prod * powers[i]) MOD MOD
        SET prefix[i] ← prod
    END FOR
    // Answer queries
    SET results ← []
    FOR each q IN queries:
        SET l ← q[0]
        SET r ← q[1]
        IF l = 0:
            SET ans ← prefix[r]
        ELSE
            SET inv ← MODULAR_INVERSE(prefix[l-1], MOD)
            SET ans ← (prefix[r] * inv) MOD MOD
        END IF
        APPEND ans TO results
    END FOR
    RETURN results
END FUNCTION
```

## Walkthrough
| Step | Action | Details |
|------|--------|---------|
|1|Extract bits from `n=13`|bits at positions 0,2,3 → values `[1,4,8]`|
|2|Prefix products|`[1,4,32]` (mod MOD) |
|3|Query `[0,1]`|answer = `prefix[1] = 4` |
|4|Query `[1,2]`|inv = `MODULAR_INVERSE(prefix[0]) = 1`; ans = `prefix[2] * inv = 32` |

## Complexity Analysis
- Time: O(b + q) where `b` is number of set bits in `n` and `q` is number of queries.
- Space: O(b) for the `powers` and `prefix` arrays.

## Follow-Up Questions
1. How would you handle updates to `n` between queries?
2. Can you answer queries online without pre-computing all prefix products?
3. Extend to compute sum instead of product of set-bit values.

## Key Takeaway
By converting set bits to their power-of-two values and using a prefix-product with modular inverses, range product queries become O(1) per query after linear preprocessing.
