# 2551. Put Marbles in Bags

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/put-marbles-in-bags](https://leetcode.com/problems/put-marbles-in-bags)
**Companies:** Amazon, Bloomberg, De Shaw, Google, Meta, Microsoft, Tiktok, Uber

---

## Approach: Sort Adjacent Sums — O(n log n) ✅

```
FUNCTION putMarbles(weights, k):
    IF k == 1: RETURN 0

    // Cost of splitting at position i = weights[i] + weights[i+1]
    pairSums = [weights[i] + weights[i+1] for i in range(len(weights) - 1)]
    SORT pairSums

    // Difference = sum of top k-1 pair sums - sum of bottom k-1 pair sums
    diff = 0
    FOR i ← 0 TO k - 2:
        diff += pairSums[n - 2 - i] - pairSums[i]

    RETURN diff
```

Each split point contributes `weights[i] + weights[i+1]` to the total cost. Choose k-1 split points. Max-min difference = top (k-1) sums - bottom (k-1) sums.
