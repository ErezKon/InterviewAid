
# 56. Merge Intervals

**Difficulty:** 🟡 Medium
**Acceptance:** 51.8%
**LeetCode:** [https://leetcode.com/problems/merge-intervals](https://leetcode.com/problems/merge-intervals)
**Companies:** Accenture, Adobe, Amazon, Amd, Anduril, Apple, Applied Intuition, Athenahealth, Atlassian, Autodesk, Bloomberg, Bytedance, C3 Ai, Capital One, Cars24, Chewy, Cisco, Citadel, Clevertap, Coupa, Coupang, Crowdstrike, Cyntexa, Darwinbox, Databricks, Deloitte, Discovery, Disney, Docusign, Doordash, Dropbox, Earnin, Ebay, Epam Systems, Expedia, Figma, Flipkart, Geico, Godaddy, Goldman Sachs, Google, Grammarly, Grubhub, Hubspot, Ibm, Infosys, Intuit, Ixl, Jpmorgan, Juspay, Lime, Linkedin, Makemytrip, Meta, Microsoft, Millennium, Morgan Stanley, Moveworks, Netflix, Nextdoor, Nielsen, Nuro, Nutanix, Nvidia, Okta, Oracle, Ozon, Palantir, Palo Alto Networks, Patreon, Paypal, Phonepe, Qualcomm, Razorpay, Remitly, Ripple, Rippling, Roblox, Salesforce, Samsung, Sap, Scaler, Servicenow, Siemens, Snapchat, Squarespace, Tcs, Tencent, Tesco, Tesla, Tiktok, Turing, Twitch, Twitter, Uber, Verkada, Visa, Vk, Walmart Labs, Wells Fargo, Wipro, Wix, Yandex, Yelp, Zalando, Zepto, Zeta, Zoho, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: Sort + Merge — O(n log n) ✅](#4-solution-sort--merge--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

---

## 2. Examples

```
Example 1:
  Input:  [[1,3], [2,6], [8,10], [15,18]]
  Output: [[1,6], [8,10], [15,18]]
  Reason: [1,3] and [2,6] overlap → merge into [1,6]

Example 2:
  Input:  [[1,4], [4,5]]
  Output: [[1,5]]
  Reason: [1,4] and [4,5] overlap at point 4 → merge into [1,5]
```

---

## 3. Key Insight

After sorting by start time, overlapping intervals are **adjacent**. Two intervals overlap if and only if:

```
current.start <= previous.end
```

When they overlap, extend the previous interval's end to `MAX(previous.end, current.end)`.

```
Before sorting:  [8,10] [1,3] [2,6] [15,18]
After sorting:   [1,3] [2,6] [8,10] [15,18]
                   └──┘ ← overlap → merge to [1,6]
```

---

## 4. Solution: Sort + Merge — O(n log n) ✅

```
FUNCTION merge(intervals):

    IF intervals IS EMPTY:
        RETURN []

    // Sort by start time
    SORT intervals BY start (ascending)

    merged = [intervals[0]]

    FOR i ← 1 TO n - 1:
        current = intervals[i]
        last    = merged[LAST]

        IF current.start <= last.end:
            // Overlap → extend the end
            last.end = MAX(last.end, current.end)
        ELSE:
            // No overlap → add as new interval
            merged.ADD(current)

    RETURN merged
```

---

## 5. Walkthrough

```
Input: [[1,3], [2,6], [8,10], [15,18]]
After sort: [[1,3], [2,6], [8,10], [15,18]]  (already sorted)

merged = [[1,3]]

i=1: current=[2,6], last=[1,3]
     2 <= 3? YES → overlap → last.end = MAX(3,6) = 6
     merged = [[1,6]]

i=2: current=[8,10], last=[1,6]
     8 <= 6? NO → no overlap
     merged = [[1,6], [8,10]]

i=3: current=[15,18], last=[8,10]
     15 <= 10? NO → no overlap
     merged = [[1,6], [8,10], [15,18]]

Result: [[1,6], [8,10], [15,18]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — dominated by sorting |
| **Space** | O(n) — for the result (O(log n) for sort if in-place) |

---

## 7. Follow-Up Questions

### 7.1 Insert Interval (LeetCode #57)

Given a **sorted** list of non-overlapping intervals and a new interval, insert it and merge if necessary.

```
FUNCTION insert(intervals, newInterval):
    result = []
    i = 0
    n = LENGTH(intervals)

    // Add all intervals that end before newInterval starts
    WHILE i < n AND intervals[i].end < newInterval.start:
        result.ADD(intervals[i])
        i += 1

    // Merge all overlapping intervals with newInterval
    WHILE i < n AND intervals[i].start <= newInterval.end:
        newInterval.start = MIN(newInterval.start, intervals[i].start)
        newInterval.end   = MAX(newInterval.end,   intervals[i].end)
        i += 1

    result.ADD(newInterval)

    // Add remaining intervals
    WHILE i < n:
        result.ADD(intervals[i])
        i += 1

    RETURN result
```

**Time:** O(n), **Space:** O(n)

---

### 7.2 Meeting Rooms (LeetCode #252)

**Can a person attend all meetings?** — Check if any intervals overlap.

```
FUNCTION canAttendMeetings(intervals):
    SORT intervals BY start
    FOR i ← 1 TO n - 1:
        IF intervals[i].start < intervals[i-1].end:
            RETURN FALSE
    RETURN TRUE
```

---

### 7.3 Meeting Rooms II (LeetCode #253)

**Minimum number of meeting rooms required** — This is the **max concurrent intervals** problem (same as the Call Center problem).

```
FUNCTION minMeetingRooms(intervals):
    events = []
    FOR each interval:
        events.ADD((interval.start, +1))
        events.ADD((interval.end,   -1))

    SORT events BY (time ASC, type ASC)

    current = 0
    maxRooms = 0
    FOR each (time, type) IN events:
        current += type
        maxRooms = MAX(maxRooms, current)

    RETURN maxRooms
```

---

### 7.4 What if intervals are given as a stream?

Maintain a **sorted data structure** (e.g., balanced BST or sorted list) of merged intervals. On each new interval:
1. Find all existing intervals that overlap with the new one.
2. Merge them.
3. Insert the merged result.

**Time per insertion:** O(n) worst case, O(log n) for finding the insertion point.

---

### 7.5 Non-overlapping Intervals (LeetCode #435)

**Minimum number of intervals to remove** to make the rest non-overlapping.

Greedy: sort by end time, always keep the interval that ends earliest.

```
FUNCTION eraseOverlapIntervals(intervals):
    SORT intervals BY end (ascending)
    count = 0
    prevEnd = -INFINITY

    FOR each interval:
        IF interval.start >= prevEnd:
            prevEnd = interval.end       // keep this interval
        ELSE:
            count += 1                   // remove this interval

    RETURN count
```

---

## Interval Problem Family

| Problem | Core Technique | Complexity |
|---------|---------------|------------|
| **Merge Intervals** | Sort + linear merge | O(n log n) |
| **Insert Interval** | Three-phase scan | O(n) |
| **Meeting Rooms** | Sort + overlap check | O(n log n) |
| **Meeting Rooms II** | Sweep line / min-heap | O(n log n) |
| **Non-overlapping Intervals** | Greedy (sort by end) | O(n log n) |
| **Interval List Intersections** | Two pointers | O(m + n) |

---

## Key Takeaway

> **Sort by start time** is the foundational step for almost all interval problems. Once sorted, overlapping intervals are adjacent, and a single linear scan resolves them. Recognizing the "interval" pattern and choosing between sort+sweep, greedy, or heap is a key interview skill.
