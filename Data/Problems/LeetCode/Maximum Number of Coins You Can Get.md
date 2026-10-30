# 1561. Maximum Number of Coins You Can Get

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-coins-you-can-get](https://leetcode.com/problems/maximum-number-of-coins-you-can-get)
**Companies:** Amazon

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

There are `3n` piles of coins of varying size, you and your friends will take piles of coins as follows:

- In each step, you will choose **any** `3` piles of coins (not necessarily consecutive).
- Of your choice, Alice will pick the pile with the maximum number of coins.
- You will pick the next pile with the maximum number of coins.
- Your friend Bob will pick the last pile.
- Repeat until there are no more piles of coins.

Given an array of integers `piles` where `piles[i]` is the number of coins in the `i`th pile.

Return the maximum number of coins that you can have.

**Constraints:**
- `3 <= piles.length <= 10^5`
- `piles.length % 3 == 0`
- `1 <= piles[i] <= 10^4`

---

## Examples

```
Example 1:
  Input: piles = [2,4,1,2,7,8]
  Output: 9
  Explanation: Choose the triplet (2, 7, 8), Alice Pick the pile with 8 coins, you the pile with 7 coins and Bob the last one.
    Choose the triplet (1, 2, 4), Alice Pick the pile with 4 coins, you the pile with 2 coins and Bob the last one.
    The maximum number of coins which you can have are: 7 + 2 = 9.
    On the other hand if we choose this arrangement (1, 2, 8), (2, 4, 7) you only get 2 + 4 = 6 coins which is not optimal.
```

```
Example 2:
  Input: piles = [2,4,5]
  Output: 4
```

```
Example 3:
  Input: piles = [9,8,7,6,5,1,2,3,4]
  Output: 18
```

---

## Key Insight

> Sort all piles. Give Bob the smallest `n` piles. From the remaining `2n`, pair them: Alice gets the largest, you get the second. So you get every other pile starting from the second-largest.

---

## Approach

```
FUNCTION maxCoins(piles)
    SORT piles
    n ← len(piles) / 3
    result ← 0

    // Skip the bottom n piles (Bob's). Take every 2nd from the top.
    i ← len(piles) - 2
    FOR round ← 1 TO n DO
        result ← result + piles[i]
        i ← i - 2

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
piles = [2, 4, 1, 2, 7, 8]  →  sorted: [1, 2, 2, 4, 7, 8]
n = 2
```

| Round | i (your pick) | piles[i] | result |
|-------|--------------|----------|--------|
| 1     | 4            | 7        | 7      |
| 2     | 2            | 2        | **9**  |

**Result: 9** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting |
| Space  | **O(1)** — in-place sort |

---

## Follow-Up Questions

1. **Why is this greedy optimal?**
   Bob must get the smallest pile each round. Giving him the n smallest overall maximizes what's left for you.

2. **What if Alice took the second-largest and you the largest?**
   Then you'd just take the largest n piles directly — even simpler but different problem.

3. **What if there were K players instead of 3?**
   Generalize: sort, assign bottom portion to last player, then pick every K-th.

---

## Key Takeaway

> **Greedy sorting trick**: sacrifice the smallest piles to the weakest player, then alternate picking from the top — you always get every second element.
