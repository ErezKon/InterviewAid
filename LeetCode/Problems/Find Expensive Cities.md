# 2987. Find Expensive Cities

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-expensive-cities](https://leetcode.com/problems/find-expensive-cities)
**Companies:** Google

---

## Problem Description

Find cities where the average home price exceeds the national average.

---

## Examples

**Example 1:**
```
Input: listings table
| city   | price |
|--------|-------|
| A      | 300k |
| A      | 350k |
| B      | 200k |
| B      | 250k |
| C      | 400k |
| C      | 420k |

National average = (300+350+200+250+400+420) / 6 = 336.67k
City averages: A=325k, B=225k, C=410k
Output: ["C"]
```
Explanation: Only city C has an average price above the national average.

**Example 2:**
```
Input: listings with cities D (100k, 150k) and E (500k, 600k)
National average = 462.5k
City D average = 125k, City E average = 550k
Output: ["E"]
```
---

## Approach: SQL Subquery ✅

```sql
SELECT city
FROM listings
GROUP BY city
HAVING AVG(price) > (SELECT AVG(price) FROM listings)
ORDER BY city;
```

---

## Walkthrough

1. **Compute national average** – the subquery `(SELECT AVG(price) FROM listings)` calculates the overall average price across all rows.
2. **Group by city** – `GROUP BY city` aggregates rows per city.
3. **Filter groups** – `HAVING AVG(price) > national_average` keeps only those cities whose group average exceeds the overall average.
4. **Order results** – `ORDER BY city` returns the city names in alphabetical order.

---

## Complexity Analysis

- **Time:** The query scans the `listings` table twice (once for the subquery, once for grouping) → `O(N)` where N is the number of rows.
- **Space:** Uses additional space for grouping results → `O(C)` where C is the number of distinct cities.

---

## Follow-Up Questions

1. How would you modify the query to find cities where the median price exceeds the national median?
2. Can you write a version that returns the difference between city average and national average for each qualifying city?
3. How would you adapt the solution for a very large dataset that cannot fit into memory?

---

## Key Takeaway

> **Compare group average to global average using a subquery in HAVING clause.**