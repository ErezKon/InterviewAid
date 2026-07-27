# 1353. Maximum Number of Events That Can Be Attended

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended](https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended)
**Companies:** Amazon, Bloomberg, Expedia, Google, Gopuff, Meta, Microsoft, Nvidia, Oracle, Paypal, Snowflake, Uber, Visa, Zoho

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

Given `events` where `events[i] = [startDay, endDay]`, you can attend an event on **any single day** within its range `[startDay, endDay]`. You can only attend **one event per day**. Return the **maximum number of events** you can attend.

**Constraints:**
- `1 <= events.length <= 10^5`
- `1 <= startDay <= endDay <= 10^5`

---

## Examples

**Example 1:**
```
Input:  events = [[1,2],[2,3],[3,4]]
Output: 3
Explanation: Day 1→event 0, Day 2→event 1, Day 3→event 2.
```

**Example 2:**
```
Input:  events = [[1,2],[2,3],[3,4],[1,2]]
Output: 4
```

---

## Key Insight

> **Greedy with min-heap**: on each day, attend the event that **ends soonest** among those currently available. This ensures we don't waste events that have tight deadlines.

---

## Approach: Sort + Min-Heap — O(n log n) ✅

```
FUNCTION maxEvents(events)
    SORT events by start day
    heap ← MinHeap()    // end days of available events
    i ← 0, count ← 0, n ← len(events)

    FOR day ← 1 TO maxDay DO
        // Add all events starting today
        WHILE i < n AND events[i].start = day DO
            heap.PUSH(events[i].end)
            i ← i + 1

        // Remove expired events
        WHILE heap NOT EMPTY AND heap.TOP() < day DO
            heap.POP()

        // Attend the event ending soonest
        IF heap NOT EMPTY THEN
            heap.POP()
            count ← count + 1

    RETURN count
END FUNCTION
```

---

## Walkthrough

```
events = [[1,2],[2,3],[3,4]], sorted: [[1,2],[2,3],[3,4]]
```

| Day | Add to heap | Heap (end days) | Attend | count |
|-----|-------------|----------------|--------|-------|
| 1   | [2]         | [2]            | end=2  | 1     |
| 2   | [3]         | [3]            | end=3  | 2     |
| 3   | [4]         | [4]            | end=4  | **3** |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n + D log n)** — sort + D days × heap ops |
| Space  | **O(n)** — heap |

Note: D can be up to 10^5.

---

## Follow-Up Questions

1. **How does this differ from "Events That Can Be Attended II"?**
   That problem adds event values and a limit k, requiring DP instead of greedy.

2. **Why earliest-ending first?**
   Events ending sooner have fewer days remaining — attending them first preserves options for later.

3. **What if attending required the full duration?**
   Then it becomes interval scheduling maximization (sort by end, pick non-overlapping).

---

## Key Takeaway

> **Earliest Deadline First + min-heap** — sweep through days, always pick the event closest to ending, and remove expired events. Classic greedy scheduling in O(n log n).
