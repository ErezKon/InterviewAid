# 3214. Year on Year Growth Rate

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/year-on-year-growth-rate](https://leetcode.com/problems/year-on-year-growth-rate)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `user_transactions`

```
+------------------+----------+
| Column Name      | Type     |
+------------------+----------+
| transaction_id   | integer  |
| product_id       | integer  |
| spend            | decimal  |
| transaction_date | datetime |
+------------------+----------+
The transaction_id column uniquely identifies each row in this table.
Each row of this table contains the transaction ID, product ID, the spend amount, and the transaction date.
```

Write a solution to calculate the **year-on-year growth rate** for the total spend **for each product**.

The result table should include the following columns:

- `year`: The year of the transaction.
- `product_id`: The ID of the product.
- `curr_year_spend`: The total spend for the current year.
- `prev_year_spend`: The total spend for the previous year.
- `yoy_rate`: The year-on-year growth rate percentage, rounded to `2` decimal places.

Return *the result table ordered by* `product_id`,`year` *in **ascending** order*.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
user_transactions table:
+----------------+------------+---------+---------------------+
| transaction_id | product_id | spend   | transaction_date    |
+----------------+------------+---------+---------------------+
| 1341           | 123424     | 1500.60 | 2019-12-31 12:00:00 |
| 1423           | 123424     | 1000.20 | 2020-12-31 12:00:00 |
| 1623           | 123424     | 1246.44 | 2021-12-31 12:00:00 |
| 1322           | 123424     | 2145.32 | 2022-12-31 12:00:00 |
+----------------+------------+---------+---------------------+
Output:
+------+------------+----------------+----------------+----------+
| year | product_id | curr_year_spend| prev_year_spend| yoy_rate |
+------+------------+----------------+----------------+----------+
| 2019 | 123424     | 1500.60        | NULL           | NULL     |
| 2020 | 123424     | 1000.20        | 1500.60        | -33.35   |
| 2021 | 123424     | 1246.44        | 1000.20        | 24.62    |
| 2022 | 123424     | 2145.32        | 1246.44        | 72.12    |
+------+------------+----------------+----------------+----------+
Explanation:
- For product ID 123424:
- In 2019:
- Current year's spend is 1500.60
- No previous year's spend recorded
- YoY growth rate: NULL
- In 2020:
- Current year's spend is 1000.20
- Previous year's spend is 1500.60
- YoY growth rate: ((1000.20 - 1500.60) / 1500.60) * 100 = -33.35%
- In 2021:
- Current year's spend is 1246.44
- Previous year's spend is 1000.20
- YoY growth rate: ((1246.44 - 1000.20) / 1000.20) * 100 = 24.62%
- In 2022:
- Current year's spend is 2145.32
- Previous year's spend is 1246.44
- YoY growth rate: ((2145.32 - 1246.44) / 1246.44) * 100 = 72.12%
Note: Output table is ordered by product_id and year in ascending order.
```

## Approach
Iterate once through the array, compute the ratio for each adjacent pair, and store the result. Since each computation is O(1), the overall algorithm is linear.

```text
FUNCTION yearOnYearGrowth(revenues):
    SET n ← LENGTH(revenues)
    SET growthRates ← []
    FOR i ← 1 TO n-1:
        SET prev ← revenues[i-1]
        SET curr ← revenues[i]
        SET rate ← (curr - prev) / prev
        APPEND rate TO growthRates
    RETURN growthRates
```

## Walkthrough
| i | prev | curr | rate |
|---|------|------|------|
|1|100|150|0.5|
|2|150|120|-0.2|
|3|120|180|0.5|

The function returns `[0.5, -0.2, 0.5]`.

## Complexity Analysis
- **Time:** O(n) where n is the length of `revenues`.
- **Space:** O(n) for the output list (O(1) auxiliary space).

## Follow-Up Questions
1. How would you handle queries that ask for the average growth rate over a range of years?
2. What if the input size is huge and you need to stream the data without storing the entire array?
3. Can you extend the solution to compute compound annual growth rate (CAGR) over multiple years?

## Key Takeaway
A single pass over the revenue list yields all year‑on‑year growth rates, turning a seemingly repetitive calculation into a straightforward O(n) solution.
