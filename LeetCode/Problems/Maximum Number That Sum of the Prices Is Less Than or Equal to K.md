# 3007. Maximum Number That Sum of the Prices Is Less Than or Equal to K

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k](https://leetcode.com/problems/maximum-number-that-sum-of-the-prices-is-less-than-or-equal-to-k)
**Companies:** Google, Microsoft

---

## Problem Description
You are given an array `prices` where `prices[i]` is the price of the `i`‑th item, and an integer `k`. Determine the maximum number of items you can purchase such that the total sum of their prices does not exceed `k`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `prices = [2,3,1,5]`, `k = 7` | `3` | Buy items with costs `1,2,3` (total 6). |
| `prices = [4,4,4]`, `k = 5` | `0` | No single item fits the budget.

## Approach
Sort the `prices` array and greedily take the cheapest items until the budget is exhausted. This yields the maximum count because any other selection with the same count would have a larger total cost.

```text
FUNCTION maxItems(prices, k):
    SORT prices ASCENDING
    count ← 0
    FOR price IN prices:
        IF k < price:
            BREAK
        k ← k - price
        count ← count + 1
    RETURN count
```
If the price range is limited, a counting sort can achieve linear time.

## Walkthrough
For `prices = [2,3,1,5]`, `k = 7`:
1. After sorting → `[1,2,3,5]`.
2. Take `1` (k=6, count=1).
3. Take `2` (k=4, count=2).
4. Take `3` (k=1, count=3).
5. Next price `5` exceeds remaining budget → stop. Return `3`.

## Complexity Analysis
*Time*: **O(n log n)** for sorting (`n = len(prices)`).
*Space*: **O(1)** extra if sorting in place, otherwise **O(n)**.

## Follow‑Up Questions
1. How would you solve the problem in **O(n)** time using a frequency array when `prices[i] ≤ 10⁵`?
2. What if you must also output the list of selected item indices?
3. How does the algorithm change if you can purchase at most `m` items regardless of cost?

## Key Takeaway
Sorting and a greedy scan give the optimal count of purchasable items under a budget constraint.
