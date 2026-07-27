# 2438. Range Product Queries of Powers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/range-product-queries-of-powers](https://leetcode.com/problems/range-product-queries-of-powers)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Trilogy

---

```
FUNCTION productQueries(n, queries):
    MOD = 10^9 + 7
    powers = []
    bit = 0
    WHILE n > 0:
        IF n & 1: powers.ADD(1 << bit)
        n >>= 1; bit += 1

    result = []
    FOR [l, r] IN queries:
        product = 1
        FOR i ← l TO r:
            product = (product * powers[i]) % MOD
        result.ADD(product)

    RETURN result
```
