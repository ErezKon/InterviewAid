# 253. Meeting Rooms II

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/meeting-rooms-ii](https://leetcode.com/problems/meeting-rooms-ii)
**Companies:** Adobe, Amazon, Anduril, Apple, Atlassian, Aurora, Bloomberg, Capital One, Cisco, Citadel, Compass, Docusign, Freshworks, Google, Hubspot, Ibm, Jpmorgan, Lime, Lyft, Meta, Microsoft, Morgan Stanley, Netflix, Nutanix, Oracle, Pinterest, Salesforce, Snapchat, Snowflake, Splunk, Tekion, Tiktok, Two Sigma, Uber, Visa, Walmart Labs, Waymo, Wells Fargo, Whatnot, Worldquant, Yahoo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Min-Heap — O(n log n) ✅](#3-approach-1-min-heap--on-log-n-)
4. [Approach 2: Chronological Ordering — O(n log n) ✅](#4-approach-2-chronological-ordering--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an array of meeting time intervals `intervals` where `intervals[i] = [startᵢ, endᵢ]`, return the **minimum number of conference rooms** required.

**Constraints:**
- `1 <= intervals.length <= 10⁴`
- `0 <= startᵢ < endᵢ <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input:  intervals = [[0,30],[5,10],[15,20]]
  Output: 2
  Reason: Meeting [0,30] overlaps with [5,10] → need 2 rooms.

Example 2:
  Input:  intervals = [[7,10],[2,4]]
  Output: 1
  Reason: No overlap.
```

---

## 3. Approach 1: Min-Heap — O(n log n) ✅

Sort by start time. Use a min-heap to track the **earliest ending meeting**. For each meeting, if it starts after the earliest ending, reuse that room (pop from heap). Always push the new meeting's end time.

```
FUNCTION minMeetingRooms(intervals):

    SORT intervals by start time
    heap = MinHeap()

    FOR each interval [start, end]:
        // If earliest ending meeting is done, reuse its room
        IF heap is not empty AND heap.peek() <= start:
            heap.POP()

        heap.PUSH(end)

    RETURN heap.SIZE()
```

The heap size at any point = number of rooms in use. The final heap size = rooms needed.

---

## 4. Approach 2: Chronological Ordering — O(n log n) ✅

Separate starts and ends into two sorted arrays. Use two pointers to sweep through events:

```
FUNCTION minMeetingRooms(intervals):

    starts = SORT all start times
    ends   = SORT all end times

    rooms = 0
    maxRooms = 0
    s = 0, e = 0

    WHILE s < len(intervals):
        IF starts[s] < ends[e]:
            rooms += 1              // new meeting starts before any ends
            s += 1
        ELSE:
            rooms -= 1              // a meeting ended, free a room
            e += 1

        maxRooms = MAX(maxRooms, rooms)

    RETURN maxRooms
```

### Why This Works

Think of it as a timeline of events. At each "start" event, we need one more room. At each "end" event, we free one room. The peak number of concurrent meetings = rooms needed.

---

## 5. Walkthrough

```
intervals = [[0,30], [5,10], [15,20]]

Approach 2 (Chronological):
  starts = [0, 5, 15]
  ends   = [10, 20, 30]

  s=0, e=0: starts[0]=0 < ends[0]=10 → rooms=1, maxRooms=1, s=1
  s=1, e=0: starts[1]=5 < ends[0]=10 → rooms=2, maxRooms=2, s=2
  s=2, e=0: starts[2]=15 ≥ ends[0]=10 → rooms=1, e=1
  s=2, e=1: starts[2]=15 < ends[1]=20 → rooms=2, maxRooms=2, s=3
  s=3 → done

Result: 2 ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Min-Heap | O(n log n) | O(n) |
| Chronological | O(n log n) | O(n) |

Both are dominated by sorting.

---

## 7. Follow-Up Questions

### 7.1 Meeting Rooms I (LeetCode #252)

Can a person attend all meetings? Sort by start time and check if any meeting starts before the previous one ends.

```
FUNCTION canAttendMeetings(intervals):
    SORT intervals by start
    FOR i ← 1 TO n-1:
        IF intervals[i].start < intervals[i-1].end:
            RETURN false
    RETURN true
```

### 7.2 What if we need to assign specific room numbers?

Use the min-heap approach but store `(endTime, roomId)`. When reusing a room, keep its ID. When allocating a new room, assign the next available ID.

### 7.3 What about intervals with weights/priorities?

This becomes a weighted interval scheduling problem. Dynamic programming on sorted intervals: for each interval, either include it (add its weight + best non-overlapping set ending before it) or skip it.

### 7.4 Minimum Platforms (train station variant)?

Identical problem: trains arrive and depart; find the minimum platforms needed. Use the chronological ordering approach — it's the most intuitive for this variant.

---

## Key Takeaway

> Meeting Rooms II is the canonical **interval overlap counting** problem. The chronological ordering approach (split starts/ends, sweep with a counter) is the most elegant. The min-heap approach is more intuitive and easily extends to tracking room assignments.
