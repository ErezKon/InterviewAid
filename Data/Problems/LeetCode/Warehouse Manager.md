# 1571. Warehouse Manager

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/warehouse-manager](https://leetcode.com/problems/warehouse-manager)
**Companies:** Amazon
---

## Problem Description
Given an integer `capacity` representing the maximum number of items a warehouse can hold and a list of daily shipments `arrivals` (positive integers) and `departures` (negative integers), determine if the warehouse can process all shipments without exceeding its capacity at any time. Return `true` if feasible, otherwise `false`.

## Examples
- Input: `capacity = 10`, `transactions = [5, -3, 4, -2, -4]` → Output: `true` (running totals: 5, 2, 6, 4, 0 ≤ 10).
- Input: `capacity = 5`, `transactions = [4, 3, -2]` → Output: `false` (after second transaction total = 7 > 5).

## Approach
Iterate through the transaction list, maintaining a running sum of items in the warehouse. After each update, check that the sum never exceeds `capacity`. If it does, return `false`; otherwise return `true` after processing all transactions.

```text
FUNCTION canManageWarehouse(capacity, transactions):
    SET current ← 0
    FOR change IN transactions:
        SET current ← current + change
        IF current > capacity:
            RETURN false
    RETURN true
```

## Walkthrough
| Step | Change | Current Load |
|------|--------|--------------|
| 1    | +5     | 5            |
| 2    | -3     | 2            |
| 3    | +4     | 6            |
| 4    | -2     | 4            |
| 5    | -4     | 0            |
The load never exceeds the capacity of 10, so the answer is `true`.

## Complexity Analysis
- Time: O(n) where n is the number of transactions.
- Space: O(1) extra space.

## Follow-Up Questions
- How would you handle multiple warehouses with different capacities?
- What if shipments could arrive concurrently and need ordering?
- Can you extend the solution to also report the maximum load encountered?

## Key Takeaway
A simple linear scan tracking the running total ensures the capacity constraint is never violated.
