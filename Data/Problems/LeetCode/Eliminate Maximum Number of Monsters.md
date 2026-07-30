# 1921. Eliminate Maximum Number of Monsters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/eliminate-maximum-number-of-monsters](https://leetcode.com/problems/eliminate-maximum-number-of-monsters)
**Companies:** Agoda, Google, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort by Arrival Time](#approach-sort-by-arrival-time--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Monsters are approaching a city. Monster `i` is at distance `dist[i]` moving at `speed[i]`. You can eliminate one monster per minute (starting at minute 0). Return the **maximum** number of monsters you can eliminate before any reaches the city.

**Constraints:**
- `1 <= n <= 10^5`

---

## Examples

```
Input: dist = [1,3,4], speed = [1,1,1]
Output: 3
Explanation: Arrivals = [1,3,4]. Kill at t=0,1,2 — all before arrival.

Input: dist = [1,1,2,3], speed = [1,1,1,1]
Output: 1
Explanation: Arrivals = [1,1,2,3]. Kill 1 at t=0. At t=1, monster with arrival=1 reaches city.
```

---

## Key Insight

> Compute arrival time for each monster (`dist[i] / speed[i]`), sort them, and greedily kill the earliest-arriving first. The i-th monster you kill happens at minute `i`. If any monster arrives at or before minute `i`, you lose.

---

## Approach: Sort by Arrival Time — O(n log n) ✅

```
FUNCTION eliminateMaximum(dist, speed):
    arrivals = sorted(d / s for d, s in zip(dist, speed))
    FOR i, t IN enumerate(arrivals):
        IF t <= i: RETURN i
    RETURN len(arrivals)
```

---

## Walkthrough

```
dist = [3,2,4], speed = [5,3,2]
arrivals = [3/5, 2/3, 4/2] = [0.6, 0.67, 2.0]
sorted = [0.6, 0.67, 2.0]

i=0: 0.6 > 0 ✅ (kill at minute 0)
i=1: 0.67 > 1? NO → 0.67 ≤ 1 → RETURN 1

Only eliminated 1 monster.
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Greedy scheduling: compute arrival times, sort, and kill earliest first. If monster i arrives before minute i, game over. Classic sort + greedy pattern.**
