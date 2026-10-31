# 1518. Water Bottles

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/water-bottles](https://leetcode.com/problems/water-bottles)
**Companies:** Accenture, Amazon, Bloomberg, Google, Hilabs, Ibm, Meta, Microsoft, Tcs

---

## Problem Description

There are `numBottles` water bottles that are initially full of water. You can exchange `numExchange` empty water bottles from the market with one full water bottle.

The operation of drinking a full water bottle turns it into an empty bottle.

Given the two integers `numBottles` and `numExchange`, return *the **maximum** number of water bottles you can drink*.

**Constraints:**
- `1 <= numBottles <= 100`
- `2 <= numExchange <= 100`

## Examples

**Example 1:**
```
Input: numBottles = 9, numExchange = 3
Output: 13
Explanation: You can exchange 3 empty bottles to get 1 full water bottle.
Number of water bottles you can drink: 9 + 3 + 1 = 13.
```

**Example 2:**
```
Input: numBottles = 15, numExchange = 4
Output: 19
Explanation: You can exchange 4 empty bottles to get 1 full water bottle.
Number of water bottles you can drink: 15 + 3 + 1 = 19.
```

## Approach
Iteratively exchange empties for new bottles while possible. Keep a running total of bottles drunk.

```text
FUNCTION maxBottles(numBottles, numExchange):
    SET total ← numBottles
    WHILE numBottles >= numExchange:
        SET exchanged ← numBottles DIV numExchange
        SET total ← total + exchanged
        SET numBottles ← exchanged + (numBottles MOD numExchange)
    RETURN total
```

## Walkthrough
| Step | Full Bottles | Empty Bottles | Total Drunk |
|------|--------------|--------------|------------|
| Start| 9            | 0            | 9 |
| Exchange| 3        | 0            | 12 |
| Exchange| 1        | 0            | 13 |

## Complexity Analysis
- Time: O(log n) – each loop reduces the number of bottles.
- Space: O(1).

## Follow-Up Questions
- Derive a closed-form formula for the result.
- How would the algorithm change if each exchange gave `k` bottles?
- What if you could borrow bottles temporarily?

## Key Takeaway
Repeatedly converting empties to full bottles via a simple loop yields the maximal drink count.
