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

You are playing a video game where you are defending your city from a group of `n` monsters. You are given a **0-indexed** integer array `dist` of size `n`, where `dist[i]` is the **initial distance** in kilometers of the `i^th` monster from the city.

The monsters walk toward the city at a **constant** speed. The speed of each monster is given to you in an integer array `speed` of size `n`, where `speed[i]` is the speed of the `i^th` monster in kilometers per minute.

You have a weapon that, once fully charged, can eliminate a **single** monster. However, the weapon takes **one minute** to charge. The weapon is fully charged at the very start.

You lose when any monster reaches your city. If a monster reaches the city at the exact moment the weapon is fully charged, it counts as a **loss**, and the game ends before you can use your weapon.

Return *the **maximum** number of monsters that you can eliminate before you lose, or *`n`* if you can eliminate all the monsters before they reach the city.*

**Constraints:**
- `n == dist.length == speed.length`
- `1 <= n <= 10^5`
- `1 <= dist[i], speed[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: dist = [1,3,4], speed = [1,1,1]
Output: 3
Explanation: In the beginning, the distances of the monsters are [1,3,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,2,3]. You eliminate the second monster.
After a minute, the distances of the monsters are [X,X,2]. You eliminate the third monster.
All 3 monsters can be eliminated.
```

**Example 2:**
```
Input: dist = [1,1,2,3], speed = [1,1,1,1]
Output: 1
Explanation: In the beginning, the distances of the monsters are [1,1,2,3]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,1,2], so you lose.
You can only eliminate 1 monster.
```

**Example 3:**
```
Input: dist = [3,2,4], speed = [5,3,2]
Output: 1
Explanation: In the beginning, the distances of the monsters are [3,2,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,2], so you lose.
You can only eliminate 1 monster.
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
