# 3186. Maximum Total Damage With Spell Casting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-total-damage-with-spell-casting](https://leetcode.com/problems/maximum-total-damage-with-spell-casting)
**Companies:** Amazon, Bloomberg, Citadel, Google, Meta, Microsoft, Phonepe

---

## Approach: DP like House Robber — O(n log n) ✅

```
FUNCTION maximumTotalDamage(power):
    count = Counter(power)
    unique = SORT(count.keys())

    dp = [0] * (len(unique) + 1)
    FOR i ← 0 TO len(unique) - 1:
        val = unique[i]
        total = val * count[val]

        // Find last index where unique[j] < val - 2
        j = binary search for rightmost unique[j] < val - 2

        dp[i+1] = MAX(dp[i], (dp[j+1] if j >= 0 else 0) + total)

    RETURN dp[-1]
```

Can't use spells with damage d-1, d, or d+1 together. Group by value, DP with skip.
