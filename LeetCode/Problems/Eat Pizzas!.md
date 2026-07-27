# 3457. Eat Pizzas!

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/eat-pizzas](https://leetcode.com/problems/eat-pizzas)
**Companies:** Infosys

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Sort](#approach-greedy-sort--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `pizzas` of length `4n`, you perform `n` rounds. In each round you pick 4 pizzas. On **odd rounds** (1st, 3rd, ...) you eat the pizza with the **2nd largest** weight. On **even rounds** (2nd, 4th, ...) you eat the pizza with the **largest** weight. Maximize the total weight eaten.

**Constraints:**
- `4 <= pizzas.length <= 2 × 10^5`
- `pizzas.length` is a multiple of 4

---

## Examples

```
Input: pizzas = [1,2,3,4,5,6,7,8]
Output: 14
Explanation: n=2 rounds.
  Round 1 (odd): pick {5,6,7,8}, eat 2nd largest = 7
  Round 2 (even): pick {1,2,3,4}, eat largest = 4  → wait, we can do better
  Optimal: Round 1: pick {1,7,2,8}, eat 2nd largest = 7
           Round 2: pick {3,4,5,6}, eat largest = 6 → total = 13? 
  Actually: Round 1: pick {1,6,7,8}, eat 2nd largest = 7
            Round 2: pick {2,3,4,5}, eat largest = 5 → 12
  Best: Sort desc [8,7,6,5,4,3,2,1]. Odd rounds: ⌈n/2⌉=1, Even rounds: ⌊n/2⌋=1
  Odd: take 2nd largest from top → 7. Even: take largest remaining → 6. Total = 13? 
  The key: on even rounds take largest, on odd take 2nd largest.
```

---

## Key Insight

> Sort pizzas descending. For even rounds (eat largest), greedily take the biggest available. For odd rounds (eat 2nd largest), pair the current top pizza with the next one, eat the 2nd. Effectively, in `⌈n/2⌉` even rounds pick from the top, and for `⌊n/2⌋` odd rounds skip every other from the top.

---

## Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION maxWeight(pizzas):
    SORT pizzas DESCENDING
    n = len(pizzas) / 4
    evenRounds = n / 2        // eat largest
    oddRounds = (n + 1) / 2   // eat 2nd largest
    total = 0
    idx = 0

    // Even rounds: take every top element
    FOR i ← 0 TO evenRounds - 1:
        total += pizzas[idx]
        idx += 1

    // Odd rounds: take every 2nd element (skip one, take one)
    FOR i ← 0 TO oddRounds - 1:
        idx += 1              // skip largest of this group
        total += pizzas[idx]
        idx += 1

    RETURN total
```

---

## Walkthrough

```
pizzas = [1,2,3,4,5,6,7,8], sorted desc: [8,7,6,5,4,3,2,1]
n = 2, evenRounds = 1, oddRounds = 1

Even round: take pizzas[0] = 8, idx=1
Odd round: skip pizzas[1]=7, take pizzas[2]=6, idx=3

Total = 8 + 6 = 14 ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n log n) |
| **Space** | O(1) extra |

---

## Key Takeaway

> **Greedy with sorting: maximize by assigning the largest pizzas to even rounds (eat largest) and the next-largest to odd rounds (eat 2nd largest, skipping one each time).**
