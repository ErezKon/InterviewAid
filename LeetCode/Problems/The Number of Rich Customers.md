# 2082. The Number of Rich Customers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-number-of-rich-customers](https://leetcode.com/problems/the-number-of-rich-customers)
**Companies:** Athenahealth

---

## Problem Description
Given an integer array `customers` where `customers[i]` represents the wealth of the i-th customer, and an integer `k` representing the wealth threshold, return the number of customers whose wealth is **greater than or equal to** `k`.

Constraints: `1 <= customers.length <= 10^5`, `0 <= customers[i], k <= 10^9`.

## Examples
**Example 1:**
```
Input: customers = [1,2,3,4,5], k = 3
Output: 3
Explanation: Customers with wealth 3,4,5 meet the threshold.
```

**Example 2:**
```
Input: customers = [10,20,30], k = 25
Output: 1
Explanation: Only the customer with wealth 30 is rich.
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
