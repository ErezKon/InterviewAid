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

## Examples

**Example 1:**
```
router = Router(3)
router.addPacket(1, 2, 5)   // true
router.addPacket(1, 2, 5)   // false (duplicate)
router.addPacket(2, 3, 6)   // true
router.getCount(2, 0, 10)  // 1
router.forwardPacket()      // returns (1,2,5)
```

**Example 2:**
```
router = Router(2)
router.addPacket(1,1,1) // true
router.addPacket(2,2,2) // true
router.addPacket(3,3,3) // false (capacity full)
router.getCount(1,0,5) // 1
```

## Walkthrough

| Step | Operation | Queue State | Set State | Destination Map |
|------|-----------|-------------|-----------|-----------------|
| 1 | addPacket(1,2,5) | [(1,2,5)] | {(1,2,5)} | {2: [5]} |
| 2 | addPacket(1,2,5) | unchanged | unchanged (duplicate) | unchanged |
| 3 | forwardPacket() | [] | {} | {2: []} |
| 4 | getCount(2,0,10) | [] | {} | returns 0 |

## Complexity Analysis

- **Time:** `addPacket` O(log k) for binary‑search insertion into the per‑destination list (k = packets for that destination). `forwardPacket` O(1). `getCount` O(log k).
- **Space:** O(n) to store all packets, where n is the number of packets currently in the router.

## Key Takeaway

> Use a queue for FIFO, a set for deduplication, and per‑destination sorted lists with binary search for range count queries.
