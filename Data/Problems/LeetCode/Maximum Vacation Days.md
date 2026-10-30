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

> *Note: premium problem — statement verified via doocs/leetcode.*

LeetCode wants to give one of its best employees the option to travel among `n` cities to collect algorithm problems. But all work and no play makes Jack a dull boy, you could take vacations in some particular cities and weeks. Your job is to schedule the traveling to maximize the number of vacation days you could take, but there are certain rules and restrictions you need to follow.

Rules and restrictions:

- You can only travel among `n` cities, represented by indexes from `0` to `n - 1`. Initially, you are in the city indexed `0` on **Monday**.
- The cities are connected by flights. The flights are represented as an `n x n` matrix (not necessarily symmetrical), called `flights` representing the airline status from the city `i` to the city `j`. If there is no flight from the city `i` to the city `j`, `flights[i][j] == 0`; Otherwise, `flights[i][j] == 1`. Also, `flights[i][i] == 0` for all `i`.
- You totally have `k` weeks (each week has **seven days**) to travel. You can only take flights at most once per day and can only take flights on each week's Monday morning. Since flight time is so short, we do not consider the impact of flight time.
- For each city, you can only have restricted vacation days in different weeks, given an `n x k` matrix called `days` representing this relationship. For the value of `days[i][j]`, it represents the maximum days you could take a vacation in the city `i` in the week `j`.
- You could stay in a city beyond the number of vacation days, but you should work on the extra days, which will not be counted as vacation days.
- If you fly from city `A` to city `B` and take the vacation on that day, the deduction towards vacation days will count towards the vacation days of city `B` in that week.
- We do not consider the impact of flight hours on the calculation of vacation days.

Given the two matrices `flights` and `days`, return *the maximum vacation days you could take during *`k`* weeks*.

**Constraints:**
- `n == flights.length`
- `n == flights[i].length`
- `n == days.length`
- `k == days[i].length`
- `1 <= n, k <= 100`
- `flights[i][j]` is either `0` or `1`.
- `0 <= days[i][j] <= 7`

---

## Examples

**Example 1:**
```
Input: flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[1,3,1],[6,0,3],[3,3,3]]
Output: 12
Explanation: One of the best strategies is:
1st week : fly from city 0 to city 1 on Monday, and play 6 days and work 1 day.
(Although you start at city 0, we could also fly to and start at other cities since it is Monday.)
2nd week : fly from city 1 to city 2 on Monday, and play 3 days and work 4 days.
3rd week : stay at city 2, and play 3 days and work 4 days.
Ans = 6 + 3 + 3 = 12.
```

**Example 2:**
```
Input: flights = [[0,0,0],[0,0,0],[0,0,0]], days = [[1,1,1],[7,7,7],[7,7,7]]
Output: 3
Explanation: Since there are no flights that enable you to move to another city, you have to stay at city 0 for the whole 3 weeks.
For each week, you only have one day to play and six days to work.
So the maximum number of vacation days is 3.
Ans = 1 + 1 + 1 = 3.
```

**Example 3:**
```
Input: flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[7,0,0],[0,7,0],[0,0,7]]
Output: 21
Explanation: One of the best strategies is:
1st week : stay at city 0, and play 7 days.
2nd week : fly from city 0 to city 1 on Monday, and play 7 days.
3rd week : fly from city 1 to city 2 on Monday, and play 7 days.
Ans = 7 + 7 + 7 = 21
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
