# 1701. Average Waiting Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/average-waiting-time](https://leetcode.com/problems/average-waiting-time)
**Companies:** Amazon, De Shaw, Google, Instacart, Meta, Salesforce

---

## Problem Description

There is a restaurant with a single chef. You are given an array `customers`, where `customers[i] = [arrival_i, time_i]:`

- `arrival_i` is the arrival time of the `i^th` customer. The arrival times are sorted in **non-decreasing** order.
- `time_i` is the time needed to prepare the order of the `i^th` customer.

When a customer arrives, he gives the chef his order, and the chef starts preparing it once he is idle. The customer waits till the chef finishes preparing his order. The chef does not prepare food for more than one customer at a time. The chef prepares food for customers **in the order they were given in the input**.

Return *the **average** waiting time of all customers*. Solutions within `10^-5` from the actual answer are considered accepted.

**Constraints:**
- `1 <= customers.length <= 10^5`
- `1 <= arrival_i, time_i <= 10^4`
- `arrival_i <= arrival_i+1`

## Examples

**Example 1:**
```
Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation: 1) The first customer arrives at time 1, the chef takes his order and starts preparing it immediately at time 1, and finishes at time 3, so the waiting time of the first customer is 3 - 1 = 2.
2) The second customer arrives at time 2, the chef takes his order and starts preparing it at time 3, and finishes at time 8, so the waiting time of the second customer is 8 - 2 = 6.
3) The third customer arrives at time 4, the chef takes his order and starts preparing it at time 8, and finishes at time 11, so the waiting time of the third customer is 11 - 4 = 7.
So the average waiting time = (2 + 6 + 7) / 3 = 5.
```

**Example 2:**
```
Input: customers = [[5,2],[5,4],[10,3],[20,1]]
Output: 3.25000
Explanation: 1) The first customer arrives at time 5, the chef takes his order and starts preparing it immediately at time 5, and finishes at time 7, so the waiting time of the first customer is 7 - 5 = 2.
2) The second customer arrives at time 5, the chef takes his order and starts preparing it at time 7, and finishes at time 11, so the waiting time of the second customer is 11 - 5 = 6.
3) The third customer arrives at time 10, the chef takes his order and starts preparing it at time 11, and finishes at time 14, so the waiting time of the third customer is 14 - 10 = 4.
4) The fourth customer arrives at time 20, the chef takes his order and starts preparing it immediately at time 20, and finishes at time 21, so the waiting time of the fourth customer is 21 - 20 = 1.
So the average waiting time = (2 + 6 + 4 + 1) / 4 = 3.25.
```

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
