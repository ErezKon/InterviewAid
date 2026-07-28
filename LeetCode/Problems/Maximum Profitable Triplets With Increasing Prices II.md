# 2921. Maximum Profitable Triplets With Increasing Prices II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-ii](https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-ii)
**Companies:** Ibm

---

## Problem Description
Given an integer array `prices` of length `n`, select three indices `i < j < k` such that `prices[i] < prices[j] < prices[k]`. The profit is defined as `prices[i] + prices[j] + prices[k]`. Unlike the easy version, you must maximize the profit under the additional constraint that the three chosen prices must be **strictly increasing** and you may need to consider large value ranges. Return the maximum profit, or `-1` if no valid triplet exists.

Constraints: `3 <= n <= 10^5`, `1 <= prices[i] <= 10^9`.

## Examples
| prices | Output | Explanation |
|--------|--------|-------------|
| [1, 3, 2, 5, 4, 7] | 13 | Triplet `(1,5,7)` yields 1+5+7 = 13, which is maximal |
| [9,8,7,6] | -1 | No increasing triplet exists |

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
