# 3050. Pizza Toppings Cost Analysis

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pizza-toppings-cost-analysis](https://leetcode.com/problems/pizza-toppings-cost-analysis)
**Companies:** Amazon

---

## Problem Description
Given an array `costs` where `costs[i]` is the price of the *i*‑th pizza topping, determine the minimum total cost to purchase exactly three distinct toppings.

## Examples
| costs | Output |
|-------|--------|
| [2,3,1,5] | 6 |
| [10,20,30] | 60 |
| [5,5,5,5] | 15 |

## Approach
Sort the costs and sum the three smallest values.

```text
FUNCTION MinCostThreeToppings(costs):
    SORT costs ASCENDING
    RETURN costs[0] + costs[1] + costs[2]
```

## Walkthrough
| Step | Action | Result |
|------|--------|--------|
| 1 | Sort `[2,3,1,5]` → `[1,2,3,5]` | |
| 2 | Sum first three → `1+2+3 = 6` |
| 3 | Return `6` |

## Complexity Analysis
Sorting dominates: **O(n log n)** time, **O(1)** extra space if in‑place.

## Follow-Up Questions
1. How to handle the case where fewer than three toppings are available?
2. How to compute the minimum cost for *k* toppings efficiently?
3. Can you solve it in linear time without full sorting?

## Key Takeaway
Sorting enables a simple selection of the smallest *k* elements, yielding the minimal sum.
