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

You have `k` machines, each with a different composition recipe to produce alloys using `n` types of metals. You have existing `stock[j]` of metal `j` and can buy more at `cost[j]` per unit. You have a `budget`.

You may use **only one machine**. Return the **maximum number of alloys** you can create.

**Constraints:**
- `1 <= n, k <= 100`
- `0 <= budget <= 10^8`
- `composition[i][j]`, `stock[j]`, `cost[j]` in appropriate ranges

---

## Examples

**Example 1:**
```
Input: n=3, k=2, budget=15, composition=[[1,1,1],[1,1,10]], stock=[0,0,0], cost=[1,2,3]
Output: 2
Explanation: Machine 0 needs 1 of each per alloy. Cost for 2 alloys: 2*(1+2+3)=12 ≤ 15.
```

**Example 2:**
```
Input: n=3, k=2, budget=15, composition=[[1,1,1],[1,1,10]], stock=[0,0,100], cost=[1,2,3]
Output: 5
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
