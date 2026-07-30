# 1774. Closest Dessert Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-dessert-cost](https://leetcode.com/problems/closest-dessert-cost)
**Companies:** Google

---

## 1. Problem Description

You must make a dessert by choosing exactly one base and any combination of toppings (each can be used 0, 1, or 2 times). Find the cost closest to `target`. If two costs are equally close, pick the smaller one.

---

## 2. Examples

**Example 1:**
```
baseCosts = [10,12]
 toppingCosts = [1,2,3]
 target = 15
```
The possible dessert costs are:
- Base 10 + 0‑2×1 + 0‑2×2 + 0‑2×3 = {10,11,12,13,14,15,16,17,18,19,20,21,22,23,24}
The cost closest to 15 is **15**.

**Example 2:**
```
baseCosts = [3]
 toppingCosts = [2,5]
 target = 10
```
All reachable costs: {3,5,7,8,10,12,13,15,18}. The closest to 10 is **10**.

---

## 3. Approach: DFS / Backtracking — O(n × 3^m) ✅

```text
FUNCTION closestCost(baseCosts, toppingCosts, target):
    best ← baseCosts[0]
    
    FUNCTION dfs(idx, current):
        // Update best if current is closer to target
        IF ABS(current - target) < ABS(best - target) OR
           (ABS(current - target) == ABS(best - target) AND current < best):
            best ← current
        // Stop if all toppings considered or cost already exceeds target
        IF idx == LEN(toppingCosts) OR current > target:
            RETURN
        // Try using topping idx 0, 1, or 2 times
        FOR times IN [0, 1, 2]:
            dfs(idx + 1, current + toppingCosts[idx] * times)
    
    FOR base IN baseCosts:
        dfs(0, base)
    
    RETURN best
```

---

## 4. Walkthrough (Example 1)
| Step | idx | current cost | Action |
|------|-----|--------------|--------|
| 1 | - | best = 10 (first base) | Initialize DFS with base 10 |
| 2 | 0 | 10 | Try 0×1 → dfs(1,10) |
| 3 | 1 | 10 | Try 0×2 → dfs(2,10) |
| 4 | 2 | 10 | Try 0×3 → update best (|10‑15|=5) |
| 5 | 2 | 13 | Try 1×3 → update best (|13‑15|=2) |
| 6 | 2 | 16 | Skip (cost > target) |
| 7 | 1 | 12 | Try 1×2 → dfs(2,12) → update best (|12‑15|=3) |
| 8 | 2 | 15 | Try 1×3 → update best to **15** (exact match) |
The recursion explores all 3^3 combinations; the exact match stops further pruning.

---

## 5. Complexity Analysis
| Aspect | Complexity |
|--------|------------|
| Time   | O(n × 3^m) – for each of the `n` bases we explore every topping combination (each topping 0‑2 times). |
| Space  | O(m) – recursion depth equals number of toppings. |

---

## 6. Follow‑Up Questions
- How would you modify the algorithm if each topping could be used an unlimited number of times?
- Can you solve the problem using dynamic programming to avoid exponential enumeration?
- How would you handle a scenario where the number of toppings is large (e.g., >20) while still meeting time constraints?

---

## Key Takeaway

> When constraints are small (m ≤ 10), brute‑force DFS over all topping combinations (3^m) is perfectly efficient. Prune when `current > target` since adding more only moves further away.
