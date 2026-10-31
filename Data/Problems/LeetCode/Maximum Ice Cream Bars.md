# 1833. Maximum Ice Cream Bars

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-ice-cream-bars](https://leetcode.com/problems/maximum-ice-cream-bars)
**Companies:** Amazon

---

## Problem Description

It is a sweltering summer day, and a boy wants to buy some ice cream bars.

At the store, there are `n` ice cream bars. You are given an array `costs` of length `n`, where `costs[i]` is the price of the `i^th` ice cream bar in coins. The boy initially has `coins` coins to spend, and he wants to buy as many ice cream bars as possible.

**Note:** The boy can buy the ice cream bars in any order.

Return *the **maximum** number of ice cream bars the boy can buy with *`coins`* coins.*

You must solve the problem by counting sort.

**Constraints:**
- `costs.length == n`
- `1 <= n <= 10^5`
- `1 <= costs[i] <= 10^5`
- `1 <= coins <= 10^8`

## Examples

**Example 1:**
```
Input: costs = [1,3,2,4,1], coins = 7
Output: 4
Explanation: The boy can buy ice cream bars at indices 0,1,2,4 for a total price of 1 + 3 + 2 + 1 = 7.
```

**Example 2:**
```
Input: costs = [10,6,8,7,7,8], coins = 5
Output: 0
Explanation: The boy cannot afford any of the ice cream bars.
```

**Example 3:**
```
Input: costs = [1,6,3,1,2,5], coins = 20
Output: 6
Explanation: The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.
```

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
*Space*: **O(1)** extra (in-place sort) or **O(n)** if a new sorted list is created.

## Follow-Up Questions
1. How would you solve the problem in **O(n)** time using counting sort when `costs[i]` ≤ 10⁵?
2. What if you could buy at most `k` bars regardless of cost?
3. How does the solution change if each bar can be bought multiple times (unlimited supply)?

## Key Takeaway
Sorting and a simple greedy scan yields the maximum number of items purchasable under a budget constraint.
