# 2402. Meeting Rooms III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/meeting-rooms-iii](https://leetcode.com/problems/meeting-rooms-iii)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Ibm, Meta, Microsoft, Oracle, Pinterest, Tiktok, Uber, Walmart Labs

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have `n` rooms numbered `0` to `n-1`. Given meetings sorted by start time, assign each meeting to the **lowest-numbered available room**. If no room is free, the meeting waits for the **earliest room to free** (keeping its original duration). Return the room that held the **most meetings** (smallest number on tie).

**Constraints:**
- `1 ≤ n ≤ 100`
- `1 ≤ meetings.length ≤ 10⁵`
- `0 ≤ start_i < end_i ≤ 5 × 10⁵`

---

## Examples

**Example 1:**
```
Input:  n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
Output: 0
Explanation: Room 0 gets meetings [0,10] and [3,4→delayed to 10,11]. Room 1 gets [1,5] and [2,7].
Both hold 2 meetings → return 0 (smallest).
```

---

## Key Insight

> Use **two min-heaps**: one for available room numbers, one for busy rooms sorted by `(endTime, roomNumber)`. When no room is available, pop the earliest-ending room, delay the meeting to start when that room frees up, and preserve the meeting's duration.

---

## Approach: Two Heaps — O(m log n) ✅

```
FUNCTION mostBooked(n, meetings):
    SORT meetings BY start
    available ← MinHeap([0, 1, ..., n-1])    // room numbers
    busy ← MinHeap()                          // (endTime, roomNumber)
    count ← [0] * n

    FOR [start, end] IN meetings DO
        // Free up rooms that are done
        WHILE busy NOT EMPTY AND busy.TOP().endTime ≤ start DO
            available.PUSH(busy.POP().room)

        IF available NOT EMPTY THEN
            room ← available.POP()
            busy.PUSH((end, room))
        ELSE
            // Wait for earliest room to free
            (endTime, room) ← busy.POP()
            duration ← end - start
            busy.PUSH((endTime + duration, room))

        count[room] ← count[room] + 1

    RETURN ARGMAX(count)    // room with most meetings (smallest number on tie)
```

---

## Walkthrough

```
n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
available = {0, 1}, busy = {}

Meeting [0,10]: room 0 available → busy={(10,0)}, count=[1,0]
Meeting [1,5]:  room 1 available → busy={(5,1),(10,0)}, count=[1,1]
Meeting [2,7]:  no room free (5>2, 10>2). Wait for room 1 (ends at 5).
                Delayed [5, 5+5=10] → busy={(10,0),(10,1)}, count=[1,2]
Meeting [3,4]:  no room free. Wait for earliest (10,0).
                Delayed [10, 10+1=11] → busy={(10,1),(11,0)}, count=[2,2]

count = [2, 2] → return 0 (smallest index with max) ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two heaps | **O(m log n)** | **O(n)** |

Where `m` = number of meetings, `n` = number of rooms.

---

## Follow-Up Questions

1. **Why two heaps?** The available heap gives us the lowest-numbered room instantly. The busy heap gives us the earliest-ending room for delayed meetings.
2. **Why not just one priority queue?** We need to prioritize by room number (for assignment) AND by end time (for freeing) — these are different orderings.
3. **What if meetings can be preempted?** Would need a different model — possibly priority-based scheduling with context switching.
4. **How does this differ from Meeting Rooms II?** MR2 counts max concurrent meetings; MR3 simulates actual room assignment with delays.

---

## Key Takeaway

> **Two-heap simulation** — available rooms by number, busy rooms by end time — naturally handles the "assign lowest, wait for earliest" scheduling policy in O(m log n).

---
