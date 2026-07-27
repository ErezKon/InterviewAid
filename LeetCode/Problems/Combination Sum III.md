# 216. Combination Sum III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/combination-sum-iii](https://leetcode.com/problems/combination-sum-iii)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

```
FUNCTION combinationSum3(k, n):
    result = []

    FUNCTION backtrack(start, remaining, combo):
        IF len(combo) == k AND remaining == 0:
            result.ADD(copy(combo))
            RETURN
        IF len(combo) == k OR remaining <= 0: RETURN

        FOR i ← start TO 9:
            IF i > remaining: BREAK
            combo.ADD(i)
            backtrack(i + 1, remaining - i, combo)
            combo.POP()

    backtrack(1, n, [])
    RETURN result
```
