# 2144. Minimum Cost of Buying Candies With Discount

**Difficulty:** 🟢 Easy
**Companies:** Garmin, Meta, Nokia

---
## Problem Description
You are given an array `cost` where `cost[i]` is the price of the i‑th candy. You can buy any number of candies, but for every two candies you purchase, you get a third candy for free (the free candy must be the cheapest among the three). Determine the minimum total amount of money needed to buy all candies.

## Examples
**Example 1**
Input: cost = [6,5,7,9,2,2]
Output: 23
Explanation: Sort descending → [9,7,6,5,2,2]. Pay for 9,7, skip 6 (free); pay for 5,2, skip 2 (free). Total = 9+7+5+2 = 23.

**Example 2**
Input: cost = [1,2,3]
Output: 5
Explanation: Pay for 3 and 2, get 1 free.

## Approach
**Algorithm:** Greedy – sort descending and skip every third candy
After sorting in non‑increasing order, the cheapest candy in each consecutive group of three becomes free. Summing the prices of all candies whose index `i % 3 != 2` yields the minimal cost.

```text
FUNCTION minimumCost(cost):
    SORT cost IN DESCENDING order
    total ← 0
    FOR i ← 0 TO LEN(cost)-1:
        IF i MOD 3 ≠ 2:
            total ← total + cost[i]
    RETURN total
```

## Walkthrough
For `cost = [6,5,7,9,2,2]`:
1. Sort → [9,7,6,5,2,2]
2. Indices 0,1,3,4 are paid (9+7+5+2 = 23); indices 2 and 5 are free.
The algorithm guarantees the free candy is always the cheapest possible in each group, minimizing total spend.

## Complexity Analysis
| Metric | Value |
|--------|-------|
| Time   | O(n log n) for sorting |
| Space  | O(1) additional (in‑place sort) |

## Follow‑Up Questions
1. How would the solution change if the offer were "buy two, get the cheapest of the next `k` free"?
2. Can you solve the problem in O(n) time using a counting sort when candy prices are bounded?
3. What if the free candy must be strictly cheaper than the two paid ones?

## Key Takeaway
Sorting descending and skipping every third candy ensures the cheapest possible candies are taken for free, yielding the minimum total cost.
