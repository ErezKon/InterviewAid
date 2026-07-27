# 1606. Find Servers That Handled Most Number of Requests

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests](https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests)
**Companies:** Amazon, Apple, Cisco, Citadel, Google, Wish

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Heaps + SortedList — O(n log k) ✅](#4-approach-two-heaps--sortedlist--on-log-k-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You have `k` servers numbered `0` to `k-1`. Request `i` arrives at time `arrival[i]` and takes `load[i]` time to process. Requests are assigned using a **round-robin** scheme: request `i` goes to server `i % k`, or the next available server (wrapping around). If no server is available, the request is dropped.

Return a list of servers that handled the **most** requests.

**Constraints:**
- `1 <= k <= 10⁵`
- `1 <= n <= 10⁵`
- `arrival` is strictly increasing.

---

## 2. Examples

```
Example 1:
  Input:  k=3, arrival=[1,2,3,4,5], load=[5,2,3,3,3]
  Output: [1]
  Reason: Server 1 handles the most requests (2 requests).

Example 2:
  Input:  k=3, arrival=[1,2,3,4], load=[1,2,1,2]
  Output: [0]
```

---

## 3. Key Insight

> Use a **min-heap** to track busy servers (by end time) and a **SortedList** for available servers. For each request, free expired servers, then find the next available server ≥ `i % k` using binary search on the sorted available set (wrapping around if needed).

---

## 4. Approach: Two Heaps + SortedList — O(n log k) ✅

```
FUNCTION busiestServers(k, arrival, load):
    available = SortedList(range(k))
    busy = MinHeap()    // (endTime, serverId)
    count = [0] * k

    FOR i, (start, dur) IN enumerate(zip(arrival, load)):
        // Free up servers that finished
        WHILE busy AND busy[0][0] <= start:
            _, sid = busy.POP()
            available.ADD(sid)

        IF NOT available: CONTINUE

        // Find server >= i % k (round-robin)
        idx = available.bisect_left(i % k)
        IF idx == len(available): idx = 0
        server = available[idx]
        available.REMOVE(server)
        busy.PUSH((start + dur, server))
        count[server] += 1

    maxCount = MAX(count)
    RETURN [i for i in range(k) if count[i] == maxCount]
```

---

## 5. Walkthrough

```
k=3, arrival=[1,2,3,4,5], load=[5,2,3,3,3]
available={0,1,2}, busy=[], count=[0,0,0]

i=0, start=1: target=0%3=0, pick server 0. busy=[(6,0)], count=[1,0,0]
i=1, start=2: target=1%3=1, pick server 1. busy=[(6,0),(4,1)], count=[1,1,0]
i=2, start=3: target=2%3=2, pick server 2. busy=[(6,0),(4,1),(6,2)], count=[1,1,1]
i=3, start=4: free server 1 (end=4). available={1}. target=3%3=0,
              bisect_left(0)=0 → but available has {1}, idx=0 → server 1.
              count=[1,2,1]
i=4, start=5: no servers free. Drop request.

maxCount = 2 → [1] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log k) — each request does O(log k) SortedList operations |
| **Space** | O(k) — server tracking structures |

---

## 7. Follow-Up Questions

### 7.1 Why SortedList instead of a regular set?

We need to find the **next server ≥ target** efficiently. A sorted structure supports O(log k) bisect; a regular set would need O(k) scanning.

### 7.2 What if arrivals are not sorted?

Sort by arrival time first. The round-robin assignment index should still follow the original request numbering.

### 7.3 Could you use a TreeMap/TreeSet instead?

Yes — Java's `TreeSet.ceiling()` or C++ `std::set::lower_bound()` provide the same "find next ≥ target" operation.

---

## 8. Key Takeaway

> **Min-heap for busy tracking + SortedList for available set** is the standard pattern for simulating round-robin server assignment. The key operation is "find next available ≥ target with wraparound."
