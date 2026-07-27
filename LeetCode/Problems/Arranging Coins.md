# 441. Arranging Coins

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/arranging-coins](https://leetcode.com/problems/arranging-coins)
**Companies:** Amazon, Bloomberg, Godaddy, Google, Meta, Microsoft

---

```
FUNCTION arrangeCoins(n):
    // k*(k+1)/2 <= n → k = floor((-1 + sqrt(1 + 8n)) / 2)
    RETURN int((-1 + sqrt(1 + 8*n)) / 2)
```

Or binary search: find largest k where k*(k+1)/2 ≤ n.
