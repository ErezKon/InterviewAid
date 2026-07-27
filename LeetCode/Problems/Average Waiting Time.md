# 1701. Average Waiting Time

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/average-waiting-time](https://leetcode.com/problems/average-waiting-time)
**Companies:** Amazon, De Shaw, Google, Instacart, Meta, Salesforce

---

```
FUNCTION averageWaitingTime(customers):
    currTime = 0; totalWait = 0

    FOR [arrival, time] IN customers:
        currTime = MAX(currTime, arrival) + time
        totalWait += currTime - arrival

    RETURN totalWait / len(customers)
```
