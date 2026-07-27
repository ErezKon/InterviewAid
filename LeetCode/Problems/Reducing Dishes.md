# 1402. Reducing Dishes

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reducing-dishes](https://leetcode.com/problems/reducing-dishes)
**Companies:** Google, Microsoft

---

## Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION maxSatisfaction(satisfaction):
    SORT satisfaction in descending order
    total = 0; prefixSum = 0; maxTotal = 0

    FOR s IN satisfaction:
        prefixSum += s
        IF prefixSum <= 0: BREAK
        total += prefixSum
        maxTotal = MAX(maxTotal, total)

    // Alternative: sort ascending, add from most positive
    SORT satisfaction
    suffixSum = 0; result = 0
    FOR i ← n - 1 DOWN TO 0:
        suffixSum += satisfaction[i]
        IF suffixSum <= 0: BREAK
        result += suffixSum

    RETURN result
```

Sort ascending. Add dishes from the most satisfying. Each added dish pushes all others one time unit later. Stop when suffix sum goes negative.
