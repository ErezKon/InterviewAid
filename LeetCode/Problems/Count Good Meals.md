# 1711. Count Good Meals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-good-meals](https://leetcode.com/problems/count-good-meals)
**Companies:** Amazon, Robinhood, Swiggy

---

```
FUNCTION countPairs(deliciousness):
    MOD = 10^9 + 7; count = Counter(); result = 0
    FOR d IN deliciousness:
        FOR p ← 0 TO 21:
            target = (1 << p) - d
            IF target IN count: result = (result + count[target]) % MOD
        count[d] += 1
    RETURN result
```
