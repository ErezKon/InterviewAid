# 1418. Display Table of Food Orders in a Restaurant

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant](https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant)
**Companies:** Jpmorgan, Nordstrom

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Hash Map + Sorting](#approach-hash-map--sorting)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `orders` where `orders[i] = [customerName, tableNumber, foodItem]`, build a **display table** — a matrix where:
- First row = `["Table", food1, food2, ...]` (food items sorted alphabetically).
- Each subsequent row = `[tableNumber, count1, count2, ...]` (tables sorted numerically).
- Counts represent how many of each food were ordered at that table.

**Constraints:**
- `1 <= orders.length <= 5 × 10^4`

---

## Examples

```
Input: orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],
                 ["David","3","Fried Chicken"],["Carla","5","Water"],
                 ["Carla","5","Ceviche"],["Rous","3","Ceviche"]]

Output:
[["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],
 ["3","0","2","1","0"],
 ["5","0","1","0","1"],
 ["10","1","0","0","0"]]
```

---

## Key Insight

> Collect all unique food items (sorted) and all unique tables (sorted numerically). Use a nested hash map `table → food → count` to tally orders, then build the result matrix.

---

## Approach: Hash Map + Sorting ✅

```
FUNCTION displayTable(orders):
    tableMap ← defaultdict(Counter)    // table → {food: count}
    foods ← set()

    FOR [name, table, food] IN orders DO
        tableMap[int(table)][food] += 1
        foods.ADD(food)

    sortedFoods ← SORT(foods)
    sortedTables ← SORT(tableMap.keys())

    // Build header
    result ← [["Table"] + sortedFoods]

    // Build rows
    FOR table IN sortedTables DO
        row ← [str(table)]
        FOR food IN sortedFoods DO
            row.ADD(str(tableMap[table][food]))
        result.ADD(row)

    RETURN result
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n + F log F + T log T + T×F) | n orders, F foods, T tables |
| **Space** | O(T × F) | Count map |

---

## Key Takeaway

> **Pivot-table style problems — collect dimensions (rows/columns), tally in a nested map, then render sorted. Standard data aggregation pattern.**
