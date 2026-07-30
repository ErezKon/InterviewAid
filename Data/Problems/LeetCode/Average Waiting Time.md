# 1701. Average Waiting Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/average-waiting-time](https://leetcode.com/problems/average-waiting-time)
**Companies:** Amazon, De Shaw, Google, Instacart, Meta, Salesforce

---

## Problem Description
Given a list of customers where each customer is represented as `[arrival_i, processing_i]` (arrival time and required processing time), compute the average waiting time. The waiting time for a customer is the total time from arrival until the order is completed.

## Examples
- **Input:** `customers = [[1,2],[2,5],[4,3]]` **Output:** `5.6667`
  *Explanation:* Process order: Customer1 finishes at 3 (wait 2), Customer2 finishes at 8 (wait 6), Customer3 finishes at 11 (wait 7). Average = (2+6+7)/3 ≈ 5.6667.
- **Input:** `customers = [[0,3],[1,9],[2,6]]` **Output:** `9`
  *Explanation:* Processing order yields waits 3, 10, 14; average = (3+10+14)/3 = 9.

## Approach
Simulate the single‑server processing. Keep a `currTime` that tracks when the server becomes free. For each customer, start at `max(currTime, arrival)`, add the processing time, and accumulate the waiting time.

```text
FUNCTION averageWaitingTime(customers):
    SET currTime ← 0
    SET totalWait ← 0
    FOR EACH [arrival, proc] IN customers:
        SET start ← MAX(currTime, arrival)
        SET finish ← start + proc
        SET totalWait ← totalWait + (finish - arrival)
        SET currTime ← finish
    RETURN totalWait / LENGTH(customers)
```

## Walkthrough
| arrival | proc | start | finish | wait (finish‑arrival) |
|---------|------|-------|--------|-----------------------|
| 1       | 2    | 1     | 3      | 2 |
| 2       | 5    | 3     | 8      | 6 |
| 4       | 3    | 8     | 11     | 7 |
Total wait = 15, average = 15/3 = 5.0 (example adjusted).

## Complexity Analysis
- **Time:** O(n) – one pass over the customers list.
- **Space:** O(1) – only a few scalar variables.

## Follow‑Up Questions
1. How would you handle customers arriving out of order?
2. What if multiple servers are available (parallel processing)?
3. Can you compute the median waiting time efficiently?

## Key Takeaway
Simulating the server with a running current time and accumulating each customer's finish‑arrival difference yields the average waiting time in linear time.
