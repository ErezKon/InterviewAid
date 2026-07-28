# 2838. Maximum Coins Heroes Can Collect

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-coins-heroes-can-collect](https://leetcode.com/problems/maximum-coins-heroes-can-collect)
**Companies:** Deutsche Bank

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a list of heroes with health values and a list of monsters each with a health value and a coin reward, each hero can defeat all monsters whose health is less than or equal to the hero's health. Return an array where the i‑th element is the total number of coins the i‑th hero can collect.

---

## Examples

**Example 1:**
```
heroes = [3,1]
monsters = [2,4]
coins = [5,7]
Output: [5,0]
Explanation: Hero with health 3 can defeat monster 2 and collect 5 coins. Hero with health 1 cannot defeat any monster.
```

**Example 2:**
```
heroes = [5]
monsters = [1,2,3]
coins = [10,20,30]
Output: [60]
Explanation: The single hero defeats all monsters and collects 10+20+30 = 60 coins.
```

---

## Approach

**Algorithm:** Sort + Binary Search + Prefix Sum

1. Pair each monster's health with its coin value and sort the pairs by health.
2. Build a prefix‑sum array of the sorted coin values.
3. For each hero, binary‑search the rightmost monster whose health ≤ hero health.
4. Use the prefix‑sum index to retrieve the total coins the hero can collect.

```text
FUNCTION maxCoins(heroes, monsters, coins):
    paired ← ZIP(monsters, coins)
    SORT paired BY monster health ASCENDING
    healths ← [h FROM paired]
    prefix ← [0]
    FOR (_, c) IN paired:
        APPEND(prefix[-1] + c) TO prefix
    result ← []
    FOR h IN heroes:
        idx ← BISECT_RIGHT(healths, h) - 1
        IF idx >= 0:
            result.APPEND(prefix[idx + 1])
        ELSE:
            result.APPEND(0)
    RETURN result
```

---

## Walkthrough

Consider `heroes = [3,1]`, `monsters = [2,4]`, `coins = [5,7]`.

| Step | Action | Data |
|------|--------|------|
| 1 | Pair & sort monsters | paired = [(2,5),(4,7)] |
| 2 | Build prefix sum | prefix = [0,5,12] |
| 3 | Hero 3: binary search → idx = 0 | coins = prefix[1] = 5 |
| 4 | Hero 1: binary search → idx = -1 | coins = 0 |

Result = [5,0].

---

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O((n+m) log m)** – sorting `m` monsters and binary searching for each of `n` heroes |
| Space  | **O(m)** – storage for sorted pairs and prefix sum |

---

## Follow-Up Questions

- How would you handle updates where new monsters are added dynamically?
- Can the solution be extended to support range queries for multiple hero health thresholds?
- What if each hero can defeat at most `k` monsters?

---

## Key Takeaway

> Sorting monsters by health, building a prefix‑sum of coins, and binary‑searching per hero provides an efficient way to answer “total reward ≤ threshold” queries.
