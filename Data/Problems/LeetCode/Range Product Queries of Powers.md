# 2438. Range Product Queries of Powers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-product-queries-of-powers](https://leetcode.com/problems/range-product-queries-of-powers)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Trilogy
---

## Problem Description
Given an integer `n`, consider its binary representation. For each set bit at position `i` (0‑based from the least significant bit), define a value `2^i`. You are given multiple queries `[l, r]` asking for the product of the values corresponding to the set bits from the `l`‑th to the `r`‑th (inclusive) in the list of set‑bit values, modulo `10^9+7`.

## Examples
- `n = 13` (binary `1101`) → set‑bit values `[1,4,8]`. Query `[0,1]` → `1*4 = 4`.
- `n = 5` (binary `101`) → values `[1,4]`. Query `[1,1]` → `4`.

## Approach
Extract the values of set bits in ascending order of their positions. Pre‑compute a prefix product array modulo `MOD`. Each query answer is `prefix[r] / prefix[l-1]` modulo `MOD`, using modular inverse.

```text
FUNCTION productQueries(n, queries):
    SET MOD ← 1_000_000_007
    // Extract set‑bit values
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

## Follow‑Up Questions
1. How would you handle updates to `n` between queries?
2. Can you answer queries online without pre‑computing all prefix products?
3. Extend to compute sum instead of product of set‑bit values.

## Key Takeaway
By converting set bits to their power‑of‑two values and using a prefix‑product with modular inverses, range product queries become O(1) per query after linear preprocessing.
