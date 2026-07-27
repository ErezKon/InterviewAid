# 1774. Closest Dessert Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-dessert-cost](https://leetcode.com/problems/closest-dessert-cost)
**Companies:** Google

---

## 1. Problem Description

You must make a dessert by choosing exactly one base and any combination of toppings (each can be used 0, 1, or 2 times). Find the cost closest to `target`. If two costs are equally close, pick the smaller one.

---

## 2. Key Insight

> With small constraints, enumerate all topping combinations via DFS/backtracking on top of each base cost. Track the closest-to-target result.

---

## 3. Approach: DFS / Backtracking — O(n × 3^m) ✅

```
FUNCTION closestCost(baseCosts, toppingCosts, target):
    best = baseCosts[0]
    
    FUNCTION dfs(idx, current):
        nonlocal best
        IF ABS(current - target) < ABS(best - target) OR
           (ABS(current - target) == ABS(best - target) AND current < best):
            best = current
        IF idx == len(toppingCosts) OR current > target:
            RETURN
        FOR times IN [0, 1, 2]:
            dfs(idx + 1, current + toppingCosts[idx] * times)
    
    FOR base IN baseCosts:
        dfs(0, base)
    
    RETURN best
```

| Time | Space |
|------|-------|
| O(n × 3^m) | O(m) recursion depth |

---

## Key Takeaway

> When constraints are small (m ≤ 10), brute-force DFS over all topping combinations (3^m) is perfectly efficient. Prune when `current > target` since adding more only moves further away.
