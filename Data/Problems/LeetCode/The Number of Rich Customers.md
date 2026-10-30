# 2082. The Number of Rich Customers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-number-of-rich-customers](https://leetcode.com/problems/the-number-of-rich-customers)
**Companies:** Athenahealth

---

## Problem Description
Table: `Store`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| bill_id     | int  |
| customer_id | int  |
| amount      | int  |
+-------------+------+
bill_id is the primary key (column with unique values) for this table.
Each row contains information about the amount of one bill and the customer associated with it.
```

Write a solution to report the number of customers who had **at least one** bill with an amount **strictly greater** than `500`.

The result format is in the following example.

## Examples
```
Example 1:
  Input:
  Store table:
  +---------+-------------+--------+
  | bill_id | customer_id | amount |
  +---------+-------------+--------+
  | 6       | 1           | 549    |
  | 8       | 1           | 834    |
  | 4       | 2           | 394    |
  | 11      | 3           | 657    |
  | 13      | 3           | 257    |
  +---------+-------------+--------+
  Output:
  +------------+
  | rich_count |
  +------------+
  | 2          |
  +------------+
  Explanation:
  Customer 1 has two bills with amounts strictly greater than 500.
  Customer 2 does not have any bills with an amount strictly greater than 500.
  Customer 3 has one bill with an amount strictly greater than 500.
```

## Approach
The problem is a straightforward counting task. Iterate through the `customers` array and increment a counter whenever an element meets or exceeds `k`.

### Pseudocode
```text
FUNCTION countRichCustomers(customers, k):
    SET count ← 0
    FOR wealth IN customers:
        IF wealth >= k:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
| Index | wealth | Condition (wealth >= k) | count |
|-------|--------|--------------------------|-------|
| 0 | 1 | false | 0 |
| 1 | 2 | false | 0 |
| 2 | 3 | true | 1 |
| 3 | 4 | true | 2 |
| 4 | 5 | true | 3 |
The final count is 3.

## Complexity Analysis
- **Time:** O(n), where n is the number of customers.
- **Space:** O(1) extra space.

## Follow-Up Questions
1. How would you handle a stream of customer wealth values?
2. What if you need to support updates to individual customers' wealth?
3. Can you find the k‑th richest customer efficiently?

## Key Takeaway
Counting elements that satisfy a simple condition can be solved in linear time with constant extra space.
