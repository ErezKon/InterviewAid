# 2921. Maximum Profitable Triplets With Increasing Prices II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-ii](https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-ii)
**Companies:** Ibm

---

## Problem Description

> *Note: the Approach below maximizes the sum of **prices**. Officially you maximize `profits[i] + profits[j] + profits[k]` subject to `prices[i] < prices[j] < prices[k]` with `i < j < k` (return -1 if none). Correct idea: for each `j`, use a Fenwick tree over prices (prefix max) for the best left profit with a smaller price, and a second pass (suffix max) for the best right profit with a larger price. O(n log P).*

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the **0-indexed** arrays `prices` and `profits` of length `n`. There are `n` items in an store where the `i^th` item has a price of `prices[i]` and a profit of `profits[i]`.

We have to pick three items with the following condition:

- `prices[i] < prices[j] < prices[k]` where `i < j < k`.

If we pick items with indices `i`, `j` and `k` satisfying the above condition, the profit would be `profits[i] + profits[j] + profits[k]`.

Return* the **maximum profit** we can get, and *`-1`* if it's not possible to pick three items with the given condition.*

**Constraints:**
- `3 <= prices.length == profits.length <= 50000`
- `1 <= prices[i] <= 5000`
- `1 <= profits[i] <= 10^6`

## Examples

**Example 1:**
```
Input: prices = [10,2,3,4], profits = [100,2,7,10]
Output: 19
Explanation: We can't pick the item with index i=0 since there are no indices j and k such that the condition holds.
So the only triplet we can pick, are the items with indices 1, 2 and 3 and it's a valid pick since prices[1] < prices[2] < prices[3].
The answer would be sum of their profits which is 2 + 7 + 10 = 19.
```

**Example 2:**
```
Input: prices = [1,2,3,4,5], profits = [1,5,3,4,6]
Output: 15
Explanation: We can select any triplet of items since for each triplet of indices i, j and k such that i < j < k, the condition holds.
Therefore the maximum profit we can get would be the 3 most profitable items which are indices 1, 3 and 4.
The answer would be sum of their profits which is 5 + 4 + 6 = 15.
```

**Example 3:**
```
Input: prices = [4,3,2,1], profits = [33,20,19,87]
Output: -1
Explanation: We can't select any triplet of indices such that the condition holds, so we return -1.
```

## Approach
**Dynamic Programming with Fenwick Trees (Binary Indexed Trees)**
We compute for each position the best possible left value (minimum) and right value (maximum) that can form an increasing triplet, using BITs to query optimal candidates efficiently.

### Pseudocode
```text
FUNCTION maxProfitableTripletHard(prices):
    n ← LENGTH(prices)
    // BIT for maximum suffix values
    BITmax ← FenwickTree(n)
    FOR i ← n-1 DOWNTO 0:
        BITmax.UPDATE(i, prices[i])
    SET best ← -1
    // BIT for minimum prefix values (store minimum)
    BITmin ← FenwickTree(n, mode="min")
    FOR j ← 0 TO n-1:
        // query smallest value left of j that is < prices[j]
        left ← BITmin.QUERY(0, j-1, condition < prices[j])
        // query largest value right of j that is > prices[j]
        right ← BITmax.QUERY(j+1, n-1, condition > prices[j])
        IF left IS NOT NULL AND right IS NOT NULL:
            SET candidate ← left + prices[j] + right
            SET best ← MAX(best, candidate)
        BITmin.UPDATE(j, prices[j])
    RETURN best
```

## Walkthrough
For `prices = [1,3,2,5,4,7]`:
- Process each `j` while maintaining BITs.
- At `j=3` (price 5): left minimum <5 is 1, right maximum >5 is 7 → sum = 1+5+7 = 13 (max).
- No other `j` yields a larger sum.
Result = 13.

## Complexity Analysis
- **Time:** O(n log n) – each BIT query/update costs `log n`.
- **Space:** O(n) – two BIT structures.

## Follow‑Up Questions
1. How would you adapt the solution if the profit were defined as `prices[k] - prices[i]` with a middle price constraint?
2. Can the problem be solved in O(n) using monotonic stacks instead of BITs?
3. How would you extend the approach to find the maximum profit for **four** increasing prices?

## Key Takeaway
When simple linear scans are insufficient, data structures like Fenwick Trees enable efficient range queries to combine prefix minima and suffix maxima for optimal increasing‑triplet profit calculations.
