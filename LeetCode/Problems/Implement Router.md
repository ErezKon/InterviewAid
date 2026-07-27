# 3508. Implement Router

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-router](https://leetcode.com/problems/implement-router)
**Companies:** Amazon, Cisco, Google, Microsoft

---

## 1. Problem Description

Design a router that queues packets (with capacity limit), deduplicates, forwards in FIFO order, and counts packets for a destination within a time range.

## 2. Approach: Queue + Set + Binary Search ✅

```
CLASS Router:
    // Queue with capacity, deduplication, and forwarding
    FUNCTION addPacket(source, destination, timestamp): bool
        // Reject if duplicate (src, dst, ts) or queue full
    FUNCTION forwardPacket(): [source, destination, timestamp]
        // Dequeue front packet
    FUNCTION getCount(destination, startTime, endTime): int
        // Binary search on sorted timestamps per destination
```

## Key Takeaway

> Use a queue for FIFO, a set for deduplication, and per-destination sorted lists with binary search for range count queries.
