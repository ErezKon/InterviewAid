# 568. Maximum Vacation Days

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-vacation-days](https://leetcode.com/problems/maximum-vacation-days)
**Companies:** Datadog, Google, Meta

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

There are `n` cities and `k` weeks. You start in city `0`. Each week you can either stay in your current city or fly to another city (if a direct flight exists). Given:
- `flights[i][j]` = 1 if there is a flight from city `i` to city `j`, else 0
- `days[i][j]` = vacation days available in city `i` during week `j`

Return the **maximum vacation days** you can take over `k` weeks.

**Constraints:**
- `1 ≤ n ≤ 100`, `1 ≤ k ≤ 100`
- `flights[i][i] = 0` (no self-flights, but you can stay)
- `0 ≤ days[i][j] ≤ 7`

---

## Examples

**Example 1:**
```
Input:  flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[1,3,1],[6,0,3],[3,3,3]]
Output: 12
Explanation: Week 0→city 1 (6), Week 1→city 0 (3), Week 2→city 1 (3) = 12.
```

**Example 2:**
```
Input:  flights = [[0,0,0],[0,0,0],[0,0,0]], days = [[1,1,1],[7,7,7],[7,7,7]]
Output: 3
Explanation: No flights available, must stay in city 0. Total = 1+1+1 = 3.
```

---

## Key Insight

> This is a **shortest-path-style DP** on a graph across time layers. At each week, for every city you could be in, consider all cities you could have come from (stayed or flew). The state is `(week, city)` and the transition checks flight connectivity.

---

## Approach

DP where `dp[city]` = max vacation days achievable ending at that city after the current week.

```
FUNCTION maxVacationDays(flights, days):
    n ← LEN(flights)
    k ← LEN(days[0])
    dp ← [-∞] * n
    dp[0] ← 0

    FOR week ← 0 TO k - 1 DO
        newDp ← [-∞] * n
        FOR dest ← 0 TO n - 1 DO
            FOR src ← 0 TO n - 1 DO
                IF src = dest OR flights[src][dest] = 1 THEN
                    newDp[dest] ← MAX(newDp[dest], dp[src] + days[dest][week])
        dp ← newDp

    RETURN MAX(dp)
```

---

## Walkthrough

```
flights = [[0,1,1],[1,0,1],[1,1,0]]
days    = [[1,3,1],[6,0,3],[3,3,3]]

Initial: dp = [0, -∞, -∞]  (start in city 0)

Week 0:
  dest=0: from src=0 (stay) → 0+1=1, from src=1 (fly) → -∞, from src=2 (fly) → -∞  → newDp[0]=1
  dest=1: from src=0 (fly)  → 0+6=6, from src=1 (stay) → -∞                         → newDp[1]=6
  dest=2: from src=0 (fly)  → 0+3=3, from src=2 (stay) → -∞                         → newDp[2]=3
  dp = [1, 6, 3]

Week 1:
  dest=0: from src=0→1+3=4, src=1→6+3=9, src=2→3+3=6  → newDp[0]=9
  dest=1: from src=0→1+0=1, src=1→6+0=6, src=2→3+0=3  → newDp[1]=6
  dest=2: from src=0→1+3=4, src=1→6+3=9, src=2→3+3=6  → newDp[2]=9
  dp = [9, 6, 9]

Week 2:
  dest=0: from src=0→9+1=10, src=1→6+1=7, src=2→9+1=10 → newDp[0]=10
  dest=1: from src=0→9+3=12, src=1→6+3=9, src=2→9+3=12 → newDp[1]=12
  dest=2: from src=0→9+3=12, src=1→6+3=9, src=2→9+3=12 → newDp[2]=12
  dp = [10, 12, 12]

Return MAX(10, 12, 12) = 12 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP (rolling array) | **O(k · n²)** | **O(n)** |
| DP (full table) | O(k · n²) | O(k · n) |

---

## Follow-Up Questions

1. **Can BFS/DFS solve this?** DFS with memoization works but DP is cleaner since the week dimension is naturally sequential.
2. **What if flights have costs?** Add flight costs as negative terms in transitions — becomes a profit-maximization problem.
3. **Why initialize dp[0]=0 and others to -∞?** We start in city 0; -∞ marks unreachable cities so they don't contaminate MAX.
4. **Can the graph be sparse?** Use adjacency lists instead of matrix to skip non-existent flights — improves constant factor.

---

## Key Takeaway

> **Layer-by-layer DP on a graph** (time × node) is the standard approach when you need to optimize a cumulative value over a fixed number of steps with transition constraints.

---
