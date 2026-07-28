# 3100. Water Bottles II

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Meta
---

## Problem Description
You have `numBottles` full water bottles and can exchange `numExchange` empty bottles for **one** additional full bottle. Each time you drink a bottle, it becomes empty. Determine the maximum number of bottles you can drink.

## Examples
- Input: `numBottles = 9`, `numExchange = 3` → Output: `13`
  (Drink 9, exchange 9 empties for 3 new, drink 3, exchange 3 empties for 1 new, drink 1.)
- Input: `numBottles = 5`, `numExchange = 5` → Output: `6`
  (Drink 5, exchange 5 empties for 1 new, drink 1.)

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
