# 1518. Water Bottles

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/water-bottles](https://leetcode.com/problems/water-bottles)
**Companies:** Accenture, Amazon, Bloomberg, Google, Hilabs, Ibm, Meta, Microsoft, Tcs
---

## Problem Description
You have `numBottles` full water bottles. You can exchange `numExchange` empty bottles for one additional full bottle. After drinking a bottle it becomes empty. Compute the maximum total number of bottles you can drink.

## Examples
- Input: `numBottles = 9`, `numExchange = 3` → Output: `13`
- Input: `numBottles = 5`, `numExchange = 5` → Output: `6`

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
- Time: O(log n) – each loop reduces the number of bottles.
- Space: O(1).

## Follow-Up Questions
- Derive a closed‑form formula for the result.
- How would the algorithm change if each exchange gave `k` bottles?
- What if you could borrow bottles temporarily?

## Key Takeaway
Repeatedly converting empties to full bottles via a simple loop yields the maximal drink count.
