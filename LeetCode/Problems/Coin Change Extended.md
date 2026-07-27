# DP Knapsack Patterns

Related: #322, #518, #416, #494, #474, #1049

---

## Knapsack Taxonomy

### 0/1 Knapsack (each item used once)

Iterate target values **in reverse**.

```
FOR item IN items:
    FOR j ← target DOWN TO item:
        dp[j] = MAX(dp[j], dp[j - item] + value)
```

| Problem | Objective |
|---------|-----------|
| Partition Equal Subset (#416) | Can reach target? (boolean) |
| Target Sum (#494) | Count ways to reach target |
| Last Stone Weight II (#1049) | Minimize difference |

### Unbounded Knapsack (unlimited items)

Iterate target values **forward**.

```
FOR item IN items:
    FOR j ← item TO target:
        dp[j] = MIN(dp[j], dp[j - item] + 1)
```

| Problem | Objective |
|---------|-----------|
| Coin Change (#322) | Min items to reach target |
| Coin Change II (#518) | Count combinations |
| Perfect Squares (#279) | Min squares summing to n |
