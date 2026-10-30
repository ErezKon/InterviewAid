# 3100. Water Bottles II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/water-bottles-ii](https://leetcode.com/problems/water-bottles-ii)
**Companies:** Amazon, Google, Meta

---

## Problem Description

> *Note: the original description (and the Approach below) describe #1518 Water Bottles; here `numExchange` **increases by one after every exchange** and only one bottle is obtained per exchange. Correct idea: `ans = empty = numBottles`; while `empty >= numExchange`: `empty -= numExchange; numExchange++; ans++; empty++`. O(√numBottles).*

You are given two integers `numBottles` and `numExchange`.

`numBottles` represents the number of full water bottles that you initially have. In one operation, you can perform one of the following operations:

- Drink any number of full water bottles turning them into empty bottles.
- Exchange `numExchange` empty bottles with one full water bottle. Then, increase `numExchange` by one.

Note that you cannot exchange multiple batches of empty bottles for the same value of `numExchange`. For example, if `numBottles == 3` and `numExchange == 1`, you cannot exchange `3` empty water bottles for `3` full bottles.

Return *the **maximum** number of water bottles you can drink*.

**Constraints:**
- `1 <= numBottles <= 100`
- `1 <= numExchange <= 100`

## Examples

**Example 1:**
```
Input: numBottles = 13, numExchange = 6
Output: 15
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.
```

**Example 2:**
```
Input: numBottles = 10, numExchange = 3
Output: 13
Explanation: The table above shows the number of full water bottles, empty water bottles, the value of numExchange, and the number of bottles drunk.
```

## Approach
Simulate the process: keep track of `drunk` (total consumed) and `empty` bottles. While there are enough empty bottles to exchange, perform the exchange, increment `drunk`, and update counts.

```text
FUNCTION maxBottlesDrunk(numBottles, numExchange):
    SET drunk ← 0
    SET empty ← 0
    WHILE numBottles > 0:
        // Drink all current full bottles
        SET drunk ← drunk + numBottles
        SET empty ← empty + numBottles
        SET numBottles ← 0
        // Exchange empties for new full bottles
        WHILE empty >= numExchange:
            SET empty ← empty - numExchange
            SET numBottles ← numBottles + 1
    RETURN drunk
```

## Walkthrough
| Step | Full Bottles | Empty Bottles | Drunk |
|------|--------------|--------------|-------|
| Start| 9            | 0            | 0     |
| Drink| 0            | 9            | 9     |
| Exchange| 3        | 0            | 9     |
| Drink| 0            | 3            | 12    |
| Exchange| 1        | 0            | 12    |
| Drink| 0            | 1            | 13    |

## Complexity Analysis
- Time: O(total bottles drunk) – each bottle is processed once.
- Space: O(1) extra space.

## Follow-Up Questions
- How would the solution change if each exchange gave `k` new bottles instead of one?
- What if you could borrow bottles temporarily and must return them later?
- Can you compute the result directly using arithmetic instead of simulation?

## Key Takeaway
Repeatedly exchanging empties for new bottles can be simulated with a simple loop, tracking total drunk and empty counts.
