# 1687. Delivering Boxes from Storage to Ports

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delivering-boxes-from-storage-to-ports](https://leetcode.com/problems/delivering-boxes-from-storage-to-ports)
**Companies:** Nutanix

---

## Problem Description

Deliver boxes to ports with constraints on max boxes per trip, max weight, and minimize total trips. Each trip starts/ends at storage.

---

## Key Insight

Sliding window DP. `dp[i]` = min trips to deliver first `i` boxes. For each trip ending at box `i`, find the earliest box `j` such that the load from `j+1..i` fits constraints. Trips cost = 2 + number of port changes in the batch. Use a deque for monotonic optimization.

---

## Approach

```
FUNCTION boxDelivering(boxes, portsCount, maxBoxes, maxWeight):
    n = len(boxes)
    dp = [0] * (n + 1)
    trips = 0; j = 0; weight = 0

    FOR i ← 1 TO n:
        weight += boxes[i-1].weight
        IF i > 1 AND boxes[i-1].port != boxes[i-2].port: trips += 1
        WHILE (i - j > maxBoxes OR weight > maxWeight):
            weight -= boxes[j].weight
            IF boxes[j].port != boxes[j+1].port: trips -= 1
            j += 1
        dp[i] = MIN over valid j of (dp[j] + trips + 2)

    RETURN dp[n]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) with deque optimization |
| **Space** | O(n) |

---

## Key Takeaway

> **Sliding window DP with trip cost = 2 + port changes in the batch. Maintain a window satisfying box/weight constraints and optimize with a monotonic deque.**
