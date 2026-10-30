# 2861. Maximum Number of Alloys

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-alloys](https://leetcode.com/problems/maximum-number-of-alloys)
**Companies:** Mathworks, Microsoft, Sofi, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are the owner of a company that creates alloys using various types of metals. There are `n` different types of metals available, and you have access to `k` machines that can be used to create alloys. Each machine requires a specific amount of each metal type to create an alloy.

For the `i`th machine to create an alloy, it needs `composition[i][j]` units of metal of type `j`. Initially, you have `stock[i]` units of metal type `i`, and purchasing one unit of metal type `i` costs `cost[i]` coins.

Given integers `n`, `k`, `budget`, a **1-indexed** 2D array `composition`, and **1-indexed** arrays `stock` and `cost`, your goal is to **maximize** the number of alloys the company can create while staying within the budget of `budget` coins.

**All alloys must be created with the same machine.**

Return *the maximum number of alloys that the company can create*.

**Constraints:**
- `1 <= n, k <= 100`
- `0 <= budget <= 10^8`
- `composition.length == k`
- `composition[i].length == n`
- `1 <= composition[i][j] <= 100`
- `stock.length == cost.length == n`
- `0 <= stock[i] <= 10^8`
- `1 <= cost[i] <= 100`

---

## Examples

```
Example 1:
  Input: n = 3, k = 2, budget = 15, composition = [[1,1,1],[1,1,10]], stock = [0,0,0], cost = [1,2,3]
  Output: 2
  Explanation: It is optimal to use the 1st machine to create alloys.
    To create 2 alloys we need to buy the:
    - 2 units of metal of the 1st type.
    - 2 units of metal of the 2nd type.
    - 2 units of metal of the 3rd type.
    In total, we need 2 * 1 + 2 * 2 + 2 * 3 = 12 coins, which is smaller than or equal to budget = 15.
    Notice that we have 0 units of metal of each type and we have to buy all the required units of metal.
    It can be proven that we can create at most 2 alloys.
```

```
Example 2:
  Input: n = 3, k = 2, budget = 15, composition = [[1,1,1],[1,1,10]], stock = [0,0,100], cost = [1,2,3]
  Output: 5
  Explanation: It is optimal to use the 2nd machine to create alloys.
    To create 5 alloys we need to buy:
    - 5 units of metal of the 1st type.
    - 5 units of metal of the 2nd type.
    - 0 units of metal of the 3rd type.
    In total, we need 5 * 1 + 5 * 2 + 0 * 3 = 15 coins, which is smaller than or equal to budget = 15.
    It can be proven that we can create at most 5 alloys.
```

```
Example 3:
  Input: n = 2, k = 3, budget = 10, composition = [[2,1],[1,2],[1,1]], stock = [1,1], cost = [5,5]
  Output: 2
  Explanation: It is optimal to use the 3rd machine to create alloys.
    To create 2 alloys we need to buy the:
    - 1 unit of metal of the 1st type.
    - 1 unit of metal of the 2nd type.
    In total, we need 1 * 5 + 1 * 5 = 10 coins, which is smaller than or equal to budget = 10.
    It can be proven that we can create at most 2 alloys.
```

---

## Key Insight

> For a fixed machine, the cost to produce `mid` alloys is a **monotonically increasing** function of `mid`. This means we can **binary search** on the number of alloys for each machine and take the global max.

---

## Approach

```
FUNCTION maxNumberOfAlloys(n, k, budget, composition, stock, cost)
    result ← 0

    FOR each machine IN composition DO
        lo ← 0, hi ← 10^9

        WHILE lo ≤ hi DO
            mid ← (lo + hi) / 2
            totalCost ← 0

            FOR j ← 0 TO n - 1 DO
                needed ← MAX(0, mid * machine[j] - stock[j])
                totalCost ← totalCost + needed * cost[j]

            IF totalCost ≤ budget THEN
                lo ← mid + 1
                result ← MAX(result, mid)
            ELSE
                hi ← mid - 1

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
n=3, k=2, budget=15, composition=[[1,1,1],[1,1,10]], stock=[0,0,0], cost=[1,2,3]
```

**Machine 0** (recipe [1,1,1]):
- Binary search: try mid=5 → cost = 5*(1+2+3) = 30 > 15 → hi=4
- mid=2 → cost = 2*6 = 12 ≤ 15 → lo=3, result=2
- mid=3 → cost = 18 > 15 → hi=2. Done. Max for machine 0 = 2.

**Machine 1** (recipe [1,1,10]):
- mid=1 → cost = 1+2+30 = 33 > 15 → too expensive even for 1!
- Result stays 2.

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(k × n × log(maxAlloys))** — k machines, binary search with n-cost check |
| Space  | **O(1)** — constant extra |

---

## Follow-Up Questions

1. **Why binary search and not a formula?**
   The cost per alloy varies by metal and stock, making a closed-form complex. Binary search is cleaner.

2. **What if we could use multiple machines?**
   Would need a different approach — potentially DP or greedy combining.

3. **Why is the upper bound 10^9?**
   With budget up to 10^8 and minimum cost of 1 per alloy, max possible alloys is 10^8. 10^9 is a safe upper bound.

---

## Key Takeaway

> **Binary search on the answer** works whenever the feasibility check is monotonic — if you can make X alloys, you can make X-1 too. Check each machine independently and take the best.
