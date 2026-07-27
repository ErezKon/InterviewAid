# 3282. Reach End of Array With Max Score

**Difficulty:** 🟡 Medium

**Companies:** Google, Meta, Microsoft
---

```
FUNCTION findMaximumScore(nums):
    // Greedy: always jump to the next position with higher value
    score = 0; maxSoFar = 0
    FOR i ← 0 TO len(nums) - 2:
        maxSoFar = MAX(maxSoFar, nums[i])
        score += maxSoFar
    RETURN score
```
