# 1833. Maximum Ice Cream Bars

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-ice-cream-bars](https://leetcode.com/problems/maximum-ice-cream-bars)
**Companies:** Amazon

---

## Problem Description
You are given an integer array `costs` where `costs[i]` is the price of the `i`‑th ice‑cream bar, and an integer `coins` representing the total money you have. Return the maximum number of ice‑cream bars you can purchase.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `costs = [1,3,2,4,1]`, `coins = 7` | `4` | Buy bars with costs `1,1,2,3` (total 7). |
| `costs = [10,6,8,7]`, `coins = 5` | `0` | No bar is affordable.

## Approach
Sort the `costs` array and greedily buy the cheapest bars until the budget is exhausted.

```text
FUNCTION maxIceCream(costs, coins):
    SORT costs ASCENDING
    count ← 0
    FOR price IN costs:
        IF coins < price:
            BREAK
        coins ← coins - price
        count ← count + 1
    RETURN count
```
The greedy choice is optimal because buying a cheaper bar never harms the ability to buy more later.

## Walkthrough
For `costs = [1,3,2,4,1]`:
1. After sorting → `[1,1,2,3,4]`.
2. Buy `1` (coins=6, count=1).
3. Buy `1` (coins=5, count=2).
4. Buy `2` (coins=3, count=3).
5. Buy `3` (coins=0, count=4).
6. Next price `4` exceeds remaining coins → stop. Return `4`.

## Complexity Analysis
*Time*: **O(n log n)** for sorting (`n = len(costs)`).
*Space*: **O(1)** extra (in‑place sort) or **O(n)** if a new sorted list is created.

## Follow‑Up Questions
1. How would you solve the problem in **O(n)** time using counting sort when `costs[i]` ≤ 10⁵?
2. What if you could buy at most `k` bars regardless of cost?
3. How does the solution change if each bar can be bought multiple times (unlimited supply)?

## Key Takeaway
Sorting and a simple greedy scan yields the maximum number of items purchasable under a budget constraint.
