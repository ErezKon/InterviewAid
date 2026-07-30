# 2907. Maximum Profitable Triplets With Increasing Prices I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-i](https://leetcode.com/problems/maximum-profitable-triplets-with-increasing-prices-i)
**Companies:** Ibm

---

## Problem Description
Given an integer array `prices` of length `n`, choose three indices `i < j < k` such that `prices[i] < prices[j] < prices[k]`. The profit is `prices[i] + prices[j] + prices[k]`. Return the maximum possible profit, or `-1` if no such increasing triplet exists.

Constraints: `3 <= n <= 10^5`, `1 <= prices[i] <= 10^9`.

## Examples
| prices | Output | Explanation |
|--------|--------|-------------|
| [2, 5, 3, 7, 11] | 20 | Triplet `(2,7,11)` gives 2+7+11 = 20 |
| [5,4,3,2,1] | -1 | No increasing triplet exists |

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

## Follow‑Up Questions
1. How would you extend the solution to return the actual indices of the optimal triplet?
2. What changes are needed if the profit is defined as `prices[k] - prices[i]` with a middle constraint?
3. Can the problem be solved in O(1) extra space?

## Key Takeaway
By precomputing prefix minima and suffix maxima, each element can be evaluated as the middle of an increasing triplet in constant time, yielding a linear‑time solution.
