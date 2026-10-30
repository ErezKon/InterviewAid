# 1774. Closest Dessert Cost

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/closest-dessert-cost](https://leetcode.com/problems/closest-dessert-cost)
**Companies:** Google

---

## 1. Problem Description

You would like to make dessert and are preparing to buy the ingredients. You have `n` ice cream base flavors and `m` types of toppings to choose from. You must follow these rules when making your dessert:

- There must be **exactly one** ice cream base.
- You can add **one or more** types of topping or have no toppings at all.
- There are **at most two** of **each type** of topping.

You are given three inputs:

- `baseCosts`, an integer array of length `n`, where each `baseCosts[i]` represents the price of the `i`-th ice cream base flavor.
- `toppingCosts`, an integer array of length `m`, where each `toppingCosts[i]` is the price of **one** of the `i`-th topping.
- `target`, an integer representing your target price for dessert.

You want to make a dessert with a total cost as close to `target` as possible.

Return *the closest possible cost of the dessert to* `target`. If there are multiple, return *the **lower** one.*

**Constraints:**
- `n == baseCosts.length`
- `m == toppingCosts.length`
- `1 <= n, m <= 10`
- `1 <= baseCosts[i], toppingCosts[i] <= 10^4`
- `1 <= target <= 10^4`

---

## 2. Examples

```
Example 1:
  Input: baseCosts = [1,7], toppingCosts = [3,4], target = 10
  Output: 10
  Explanation: Consider the following combination (all 0-indexed):
  - Choose base 1: cost 7
  - Take 1 of topping 0: cost 1 x 3 = 3
  - Take 0 of topping 1: cost 0 x 4 = 0
  Total: 7 + 3 + 0 = 10.
```

```
Example 2:
  Input: baseCosts = [2,3], toppingCosts = [4,5,100], target = 18
  Output: 17
  Explanation: Consider the following combination (all 0-indexed):
  - Choose base 1: cost 3
  - Take 1 of topping 0: cost 1 x 4 = 4
  - Take 2 of topping 1: cost 2 x 5 = 10
  - Take 0 of topping 2: cost 0 x 100 = 0
  Total: 3 + 4 + 10 + 0 = 17. You cannot make a dessert with a total cost of 18.
```

```
Example 3:
  Input: baseCosts = [3,10], toppingCosts = [2,5], target = 9
  Output: 8
  Explanation: It is possible to make desserts with cost 8 and 10. Return 8 as it is the lower cost.
```

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
