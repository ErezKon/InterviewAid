# 808. Soup Servings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/soup-servings](https://leetcode.com/problems/soup-servings)
**Companies:** Amazon, Bloomberg, Google

---

```
FUNCTION soupServings(n):
    IF n > 4800: RETURN 1.0    // probability converges to 1
    n = ceil(n / 25)

    @memoize
    FUNCTION dp(a, b):
        IF a <= 0 AND b <= 0: RETURN 0.5
        IF a <= 0: RETURN 1.0
        IF b <= 0: RETURN 0.0
        RETURN 0.25 * (dp(a-4,b) + dp(a-3,b-1) + dp(a-2,b-2) + dp(a-1,b-3))

    RETURN dp(n, n)
```
