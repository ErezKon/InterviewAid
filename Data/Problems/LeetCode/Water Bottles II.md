# 3100. Water Bottles II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/water-bottles-ii](https://leetcode.com/problems/water-bottles-ii)
**Companies:** Amazon, Google, Meta

---

## Problem Description

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
Drinking is free and never hurts, so drink every full bottle immediately. After that, every exchange costs `numExchange` empties, yields one full bottle (which is drunk at once and becomes one empty), and raises the price by one. Exchanging whenever possible is optimal: delaying an exchange never lowers its price, and each exchange adds exactly one drunk bottle. Simulate until the empties are fewer than the current price.

```text
FUNCTION maxBottlesDrunk(numBottles, numExchange):
    SET drunk ← numBottles          // drink everything first
    SET empty ← numBottles
    WHILE empty >= numExchange:
        SET empty ← empty - numExchange   // pay for one full bottle
        SET numExchange ← numExchange + 1 // price rises
        SET drunk ← drunk + 1             // drink the new bottle
        SET empty ← empty + 1             // it becomes empty
    RETURN drunk
```

## Walkthrough
Example 1: `numBottles = 13`, `numExchange = 6`.

| Step | Empty before | Price | Empty after (−price, +1) | New price | Drunk |
|------|--------------|-------|--------------------------|-----------|-------|
| Drink all | — | 6 | 13 | 6 | 13 |
| Exchange 1 | 13 | 6 | 13 − 6 + 1 = 8 | 7 | 14 |
| Exchange 2 | 8 | 7 | 8 − 7 + 1 = 2 | 8 | 15 |
| Stop | 2 | 8 | 2 < 8 | — | 15 |

Output: `15`.

## Complexity Analysis
- Time: O(√numBottles) – the k-th exchange costs `numExchange + k − 1` and each nets a loss of at least `numExchange + k − 2` empties, so the number of exchanges `k` satisfies roughly `k²/2 ≤ numBottles`.
- Space: O(1) extra space.

## Follow-Up Questions
- Can you compute the number of exchanges in closed form? (Find the largest `k` with `numBottles − Σ_{i=0}^{k−1}(numExchange + i − 1) ≥ numExchange + k − 1` — a quadratic inequality solvable with the quadratic formula or binary search.)
- How does this differ from Water Bottles I, where the price is fixed and multiple batches can be exchanged at once?
- What if the price increased by `d` instead of 1 after each exchange?

## Key Takeaway
When the exchange price rises after each trade, the greedy "drink everything, then exchange one bottle at a time while affordable" simulation is optimal and terminates after only O(√n) iterations.
