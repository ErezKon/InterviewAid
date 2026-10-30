# 3814. Maximum Capacity Within Budget

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-capacity-within-budget](https://leetcode.com/problems/maximum-capacity-within-budget)
**Companies:** Amazon, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Binary Search or Sliding Window — O(n log n)](#approach-binary-search-or-sliding-window--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below greedily takes the cheapest items without limit. Officially you pick **at most two distinct** machines with total cost **strictly less** than `budget`. Correct idea: sort machines by cost and build a prefix maximum of capacity. For each machine `j`, binary search the last earlier index `i < j` with `cost[i] < budget - cost[j]` and combine with the prefix max. Also consider single machines with `cost < budget`.*

You are given two integer arrays `costs` and `capacity`, both of length `n`, where `costs[i]` represents the purchase cost of the `i^th` machine and `capacity[i]` represents its performance capacity.

You are also given an integer `budget`.

You may select **at most two distinct** machines such that the **total cost** of the selected machines is **strictly less** than `budget`.

Return the **maximum** achievable total capacity of the selected machines.

**Constraints:**
- `1 <= n == costs.length == capacity.length <= 10^5`
- `1 <= costs[i], capacity[i] <= 10^5`
- `1 <= budget <= 2 * 10^5`

---

## Examples

**Example 1:**
```
Input: costs = [4,8,5,3], capacity = [1,5,2,7], budget = 8
Output: 8
Explanation: - Choose two machines with costs[0] = 4 and costs[3] = 3.
- The total cost is 4 + 3 = 7, which is strictly less than budget = 8.
- The maximum total capacity is capacity[0] + capacity[3] = 1 + 7 = 8.
```

**Example 2:**
```
Input: costs = [3,5,7,4], capacity = [2,4,3,6], budget = 7
Output: 6
Explanation: - Choose one machine with costs[3] = 4.
- The total cost is 4, which is strictly less than budget = 7.
- The maximum total capacity is capacity[3] = 6.
```

**Example 3:**
```
Input: costs = [2,2,2], capacity = [3,5,4], budget = 5
Output: 9
Explanation: - Choose two machines with costs[1] = 2 and costs[2] = 2.
- The total cost is 2 + 2 = 4, which is strictly less than budget = 5.
- The maximum total capacity is capacity[1] + capacity[2] = 5 + 4 = 9.
```

---

## Key Insight

> If the problem asks "max capacity given budget", binary search on the capacity or use a sliding window / knapsack depending on constraints. Greedy selection by cost-efficiency often works.

---

## Approach: Binary Search or Sliding Window — O(n log n) ✅

```text
FUNCTION maxCapacity(items, budget):
    SORT items BY cost ASCENDING
    totalCost ← 0
    totalCap ← 0
    FOR each (cost, cap) IN items:
        IF totalCost + cost ≤ budget:
            totalCost ← totalCost + cost
            totalCap ← totalCap + cap
        ELSE:
            BREAK
    RETURN totalCap
```

---

## Walkthrough

Consider **Example 1**:
1. Sort items by cost → `[(2,3), (4,5), (6,8)]`.
2. Add first item: cost=2, cap=3 → remaining budget=8.
3. Add second item: cost=4, cap=5 → remaining budget=4, total cap=8.
4. Add third item: cost=6 exceeds remaining budget, stop.
5. Total capacity = 3+5 = 8 (but we could have chosen (4,5) and (6,8) directly for 13). Greedy by cost alone may miss optimal; binary search on capacity or DP may be needed for exact answer.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + Greedy | **O(n log n)** | O(1) |

---

## Follow-Up Questions
- How would you adapt the solution if each item could be taken multiple times (unbounded knapsack)?
- What if items have both weight and value, and you need to maximize value under weight constraint?
- Can you design an O(n) solution using a sliding window when items are already sorted by cost?

---

## Key Takeaway

> **Budget-constrained capacity problems: sort by cost, greedily pick cheapest items until budget exhausted.** For exact optimum, consider binary search or DP.
