# 2906. Construct Product Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-product-matrix](https://leetcode.com/problems/construct-product-matrix)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

```
FUNCTION constructProductMatrix(grid):
    MOD = 12345
    flat = [cell for row in grid for cell in row]
    n = len(flat)
    prefix = [1] * (n + 1); suffix = [1] * (n + 1)
    FOR i: prefix[i+1] = prefix[i] * flat[i] % MOD
    FOR i ← n-1 DOWN TO 0: suffix[i] = suffix[i+1] * flat[i] % MOD

    result = same shape as grid; idx = 0
    FOR r, c:
        result[r][c] = prefix[idx] * suffix[idx+1] % MOD
        idx += 1
    RETURN result
```
