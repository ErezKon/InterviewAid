# 2907. Maximum Profitable Triplets With Increasing Prices I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-i](https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-i)
**Companies:** Ibm

---

## Problem Description

> *Note: the Approach below maximizes the sum of **prices**. Officially you maximize `profits[i] + profits[j] + profits[k]` subject to `prices[i] < prices[j] < prices[k]` with `i < j < k` (return -1 if none). Correct idea (n ≤ 2000): for each middle `j`, scan left for the max profit with a smaller price and right for the max profit with a larger price. O(n²), or a Fenwick tree as in part II.*

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the **0-indexed** arrays `prices` and `profits` of length `n`. There are `n` items in an store where the `i^th` item has a price of `prices[i]` and a profit of `profits[i]`.

We have to pick three items with the following condition:

- `prices[i] < prices[j] < prices[k]` where `i < j < k`.

If we pick items with indices `i`, `j` and `k` satisfying the above condition, the profit would be `profits[i] + profits[j] + profits[k]`.

Return* the **maximum profit** we can get, and *`-1`* if it's not possible to pick three items with the given condition.*

**Constraints:**
- `3 <= prices.length == profits.length <= 2000`
- `1 <= prices[i] <= 10^6`
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
**Greedy with prefix minima and suffix maxima**
Maintain the smallest value to the left of each position and the largest value to the right. For each middle index `j`, if a smaller left value and larger right value exist, compute the sum.

### Pseudocode
```text
FUNCTION maxProfitableTriplet(prices):
    n ← LENGTH(prices)
    SET leftMin[0] ← prices[0]
    FOR i ← 1 TO n-1:
        SET leftMin[i] ← MIN(leftMin[i-1], prices[i])
    SET rightMax[n-1] ← prices[n-1]
    FOR i ← n-2 DOWNTO 0:
        SET rightMax[i] ← MAX(rightMax[i+1], prices[i])
    SET best ← -1
    FOR j ← 1 TO n-2:
        IF leftMin[j-1] < prices[j] AND prices[j] < rightMax[j+1]:
            SET candidate ← leftMin[j-1] + prices[j] + rightMax[j+1]
            SET best ← MAX(best, candidate)
    RETURN best
```

## Walkthrough
For `prices = [2,5,3,7,11]`:
- `leftMin` = [2,2,2,2,2]
- `rightMax` = [11,11,11,11,11]
- Evaluate middle indices:
  - j=1 (5): leftMin=2 <5<rightMax=11 → sum=2+5+11=18
  - j=2 (3): 2<3<11 → sum=2+3+11=16
  - j=3 (7): 2<7<11 → sum=2+7+11=20 (max)
Result = 20.

## Complexity Analysis
- **Time:** O(n) – three linear passes.
- **Space:** O(n) – two auxiliary arrays.

## Follow-Up Questions
1. How would you extend the solution to return the actual indices of the optimal triplet?
2. What changes are needed if the profit is defined as `prices[k] - prices[i]` with a middle constraint?
3. Can the problem be solved in O(1) extra space?

## Key Takeaway
By precomputing prefix minima and suffix maxima, each element can be evaluated as the middle of an increasing triplet in constant time, yielding a linear-time solution.
