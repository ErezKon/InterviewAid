# 480. Sliding Window Median

**Difficulty:** 🔴 Hard
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/sliding-window-median](https://leetcode.com/problems/sliding-window-median)
**Companies:** Amazon, Apple, Bloomberg, Datadog, Doordash, Google, Meta, Microsoft, Salesforce, Snapchat, Spotify

---

## 1. Problem Description

Given an array `nums` and window size `k`, return the median of each window as it slides from left to right.

---

## 2. Approach: Two Heaps with Lazy Deletion — O(n log k) ✅

Maintain a max-heap (small half) and min-heap (large half) like Find Median from Data Stream. For sliding window, use **lazy deletion**: mark removed elements but only actually remove when they appear at the heap top.

```
FUNCTION medianSlidingWindow(nums, k):
    maxHeap = MaxHeap()    // small half
    minHeap = MinHeap()    // large half
    result = []
    balance = 0
    toRemove = {}          // lazy deletion map

    // Initialize first window
    FOR i ← 0 TO k-1:
        maxHeap.PUSH(nums[i])
    // Balance: move top half to minHeap
    FOR i ← 0 TO k/2 - 1:
        minHeap.PUSH(maxHeap.POP())

    // Process windows
    FOR i ← k TO n:
        // Record median
        IF k is odd: result.ADD(maxHeap.TOP())
        ELSE: result.ADD((maxHeap.TOP() + minHeap.TOP()) / 2.0)

        IF i == n: BREAK

        outgoing = nums[i - k]
        incoming = nums[i]

        // Track balance: +1 if removed from maxHeap side, -1 from minHeap
        balance += -1 IF outgoing <= maxHeap.TOP() ELSE 1
        toRemove[outgoing] += 1

        // Add incoming
        IF incoming <= maxHeap.TOP():
            maxHeap.PUSH(incoming)
            balance += 1
        ELSE:
            minHeap.PUSH(incoming)
            balance -= 1

        // Rebalance
        IF balance > 0:
            minHeap.PUSH(maxHeap.POP())
            balance -= 2  // actually just set to 0
        ELSE IF balance < 0:
            maxHeap.PUSH(minHeap.POP())
            balance += 2

        // Lazy cleanup
        WHILE maxHeap.TOP() in toRemove:
            toRemove[maxHeap.TOP()] -= 1
            maxHeap.POP()
        WHILE minHeap.TOP() in toRemove:
            toRemove[minHeap.TOP()] -= 1
            minHeap.POP()

    RETURN result
```

| Time | Space |
|------|-------|
| O(n log k) | O(n) |

---

## Key Takeaway

> Sliding window median extends Find Median from Data Stream with lazy deletion. Elements are logically removed via a counter map and physically removed only when they reach the heap top.
