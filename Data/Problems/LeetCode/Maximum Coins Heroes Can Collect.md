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

> *Note: premium problem — statement verified via doocs/leetcode.*

There is a battle and `n` heroes are trying to defeat `m` monsters. You are given two **1-indexed** arrays of **positive** integers `heroes` and `monsters` of length `n` and `m`, respectively. `heroes[i]` is the power of `i^th` hero, and `monsters[i]` is the power of `i^th` monster.

The `i^th` hero can defeat the `j^th` monster if `monsters[j] <= heroes[i]`.

You are also given a **1-indexed** array `coins` of length `m` consisting of **positive** integers. `coins[i]` is the number of coins that each hero earns after defeating the `i^th` monster.

Return* an array *`ans`* of length *`n`* where *`ans[i]`* is the **maximum** number of coins that the *`i^th`* hero can collect from this battle*.

**Notes**

- The health of a hero doesn't get reduced after defeating a monster.
- Multiple heroes can defeat a monster, but each monster can be defeated by a given hero only once.

**Constraints:**
- `1 <= n == heroes.length <= 10^5`
- `1 <= m == monsters.length <= 10^5`
- `coins.length == m`
- `1 <= heroes[i], monsters[i], coins[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input: heroes = [1,4,2], monsters = [1,1,5,2,3], coins = [2,3,4,5,6]
Output: [5,16,10]
Explanation: For each hero, we list the index of all the monsters he can defeat:
1^st hero: [1,2] since the power of this hero is 1 and monsters[1], monsters[2] <= 1. So this hero collects coins[1] + coins[2] = 5 coins.
2^nd hero: [1,2,4,5] since the power of this hero is 4 and monsters[1], monsters[2], monsters[4], monsters[5] <= 4. So this hero collects coins[1] + coins[2] + coins[4] + coins[5] = 16 coins.
3^rd hero: [1,2,4] since the power of this hero is 2 and monsters[1], monsters[2], monsters[4] <= 2. So this hero collects coins[1] + coins[2] + coins[4] = 10 coins.
So the answer would be [5,16,10].
```

**Example 2:**
```
Input: heroes = [5], monsters = [2,3,1,2], coins = [10,6,5,2]
Output: [23]
Explanation: This hero can defeat all the monsters since monsters[i] <= 5. So he collects all of the coins: coins[1] + coins[2] + coins[3] + coins[4] = 23, and the answer would be [23].
```

**Example 3:**
```
Input: heroes = [4,4], monsters = [5,7,8], coins = [1,1,1]
Output: [0,0]
Explanation: In this example, no hero can defeat a monster. So the answer would be [0,0],
```

---

## Approach

**Algorithm:** Sort + Binary Search + Prefix Sum

1. Pair each monster's health with its coin value and sort the pairs by health.
2. Build a prefix-sum array of the sorted coin values.
3. For each hero, binary-search the rightmost monster whose health ≤ hero health.
4. Use the prefix-sum index to retrieve the total coins the hero can collect.

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

> Sorting monsters by health, building a prefix-sum of coins, and binary-searching per hero provides an efficient way to answer “total reward ≤ threshold” queries.
