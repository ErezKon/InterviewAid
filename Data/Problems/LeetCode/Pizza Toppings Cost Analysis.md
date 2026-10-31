# 3050. Pizza Toppings Cost Analysis

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pizza-toppings-cost-analysis](https://leetcode.com/problems/pizza-toppings-cost-analysis)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Toppings`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| topping_name | varchar |
| cost         | decimal |
+--------------+---------+
topping_name is the primary key for this table.
Each row of this table contains topping name and the cost of the topping.
```

Write a solution to calculate the **total cost** of **all possible `3`-topping** pizza combinations from a given list of toppings. The total cost of toppings must be **rounded** to `2` **decimal** places.

**Note:**

- **Do not** include the pizzas where a topping is **repeated**. For example, ‘Pepperoni, Pepperoni, Onion Pizza’.
- Toppings **must be** listed in **alphabetical order**. For example, 'Chicken, Onions, Sausage'. 'Onion, Sausage, Chicken' is not acceptable.

Return* the result table ordered by total cost in* ***descending*** *order and combination of toppings in **ascending** order.*

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Toppings table:
+--------------+------+
| topping_name | cost |
+--------------+------+
| Pepperoni    | 0.50 |
| Sausage      | 0.70 |
| Chicken      | 0.55 |
| Extra Cheese | 0.40 |
+--------------+------+
Output:
+--------------------------------+------------+
| pizza                          | total_cost |
+--------------------------------+------------+
| Chicken,Pepperoni,Sausage      | 1.75       |
| Chicken,Extra Cheese,Sausage   | 1.65       |
| Extra Cheese,Pepperoni,Sausage | 1.60       |
| Chicken,Extra Cheese,Pepperoni | 1.45       |
+--------------------------------+------------+
Explanation:
There are only four different combinations possible with the three topings:
- Chicken, Pepperoni, Sausage: Total cost is $1.75 (Chicken $0.55, Pepperoni $0.50, Sausage $0.70).
- Chicken, Extra Cheese, Sausage: Total cost is $1.65 (Chicken $0.55, Extra Cheese $0.40, Sausage $0.70).
- Extra Cheese, Pepperoni, Sausage: Total cost is $1.60 (Extra Cheese $0.40, Pepperoni $0.50, Sausage $0.70).
- Chicken, Extra Cheese, Pepperoni: Total cost is $1.45 (Chicken $0.55, Extra Cheese $0.40, Pepperoni $0.50).
Output table is ordered by the total cost in descending order.
```

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
Sorting dominates: **O(n log n)** time, **O(1)** extra space if in-place.

## Follow-Up Questions
1. How to handle the case where fewer than three toppings are available?
2. How to compute the minimum cost for *k* toppings efficiently?
3. Can you solve it in linear time without full sorting?

## Key Takeaway
Sorting enables a simple selection of the smallest *k* elements, yielding the minimal sum.
