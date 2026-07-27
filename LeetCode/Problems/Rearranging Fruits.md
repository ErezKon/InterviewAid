# 2561. Rearranging Fruits

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/rearranging-fruits](https://leetcode.com/problems/rearranging-fruits)
**Companies:** Amazon, Atlassian, Bloomberg, Google, Meta, Microsoft, Oracle, Tiktok, Uber

---

## Approach: Greedy — O(n log n) ✅

```
FUNCTION minCost(basket1, basket2):
    diff = Counter(basket1)
    FOR x IN basket2: diff[x] -= 1

    // Each value must appear an even number of times in diff
    toSwap = []
    FOR val, cnt IN diff.items():
        IF cnt % 2 != 0: RETURN -1
        FOR _ ← 0 TO ABS(cnt) / 2 - 1:
            toSwap.ADD(val)

    SORT toSwap
    minVal = MIN(MIN(basket1), MIN(basket2))
    cost = 0

    FOR i ← 0 TO len(toSwap) / 2 - 1:
        // Direct swap costs toSwap[i], indirect via smallest costs 2*minVal
        cost += MIN(toSwap[i], 2 * minVal)

    RETURN cost
```

For each swap, either do it directly (cost = smaller value) or route through the global minimum (cost = 2 × minVal).
