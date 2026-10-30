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

You have `k` servers numbered from `0` to `k-1` that are being used to handle multiple requests simultaneously. Each server has infinite computational capacity but **cannot handle more than one request at a time**. The requests are assigned to servers according to a specific algorithm:

- The `i^th` (0-indexed) request arrives.
- If all servers are busy, the request is dropped (not handled at all).
- If the `(i % k)^th` server is available, assign the request to that server.
- Otherwise, assign the request to the next available server (wrapping around the list of servers and starting from 0 if necessary). For example, if the `i^th` server is busy, try to assign the request to the `(i+1)^th` server, then the `(i+2)^th` server, and so on.

You are given a **strictly increasing** array `arrival` of positive integers, where `arrival[i]` represents the arrival time of the `i^th` request, and another array `load`, where `load[i]` represents the load of the `i^th` request (the time it takes to complete). Your goal is to find the **busiest server(s)**. A server is considered **busiest** if it handled the most number of requests successfully among all the servers.

Return *a list containing the IDs (0-indexed) of the **busiest server(s)***. You may return the IDs in any order.

**Constraints:**
- `1 <= k <= 10^5`
- `1 <= arrival.length, load.length <= 10^5`
- `arrival.length == load.length`
- `1 <= arrival[i], load[i] <= 10^9`
- `arrival` is **strictly increasing**.

---

## 2. Examples

**Example 1:**
```
Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3]
Output: [1]
Explanation: All of the servers start out available.
The first 3 requests are handled by the first 3 servers in order.
Request 3 comes in. Server 0 is busy, so it's assigned to the next available server, which is 1.
Request 4 comes in. It cannot be handled since all servers are busy, so it is dropped.
Servers 0 and 2 handled one request each, while server 1 handled two requests. Hence server 1 is the busiest server.
```

**Example 2:**
```
Input: k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
Output: [0]
Explanation: The first 3 requests are handled by first 3 servers.
Request 3 comes in. It is handled by server 0 since the server is available.
Server 0 handled two requests, while servers 1 and 2 handled one request each. Hence server 0 is the busiest server.
```

**Example 3:**
```
Input: k = 3, arrival = [1,2,3], load = [10,12,11]
Output: [0,1,2]
Explanation: Each server handles a single request, so they are all considered the busiest.
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
