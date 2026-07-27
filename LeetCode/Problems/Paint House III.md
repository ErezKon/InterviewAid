# 1473. Paint House III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/paint-house-iii](https://leetcode.com/problems/paint-house-iii)
**Companies:** Google, Linkedin, Paypal

---

```
FUNCTION minCost(houses, cost, m, n, target):
    // dp[i][j][k] = min cost for first i houses, house i painted color j, k neighborhoods
    dp = m × (n+1) × (target+1) of infinity
    // Initialize first house
    // Transition: if houses[i] is already painted, only one color option
    // New neighborhood if color changes
    // Return min over dp[m-1][any color][target]
```
