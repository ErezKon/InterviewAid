# 2446. Determine if Two Events Have Conflict

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/determine-if-two-events-have-conflict](https://leetcode.com/problems/determine-if-two-events-have-conflict)
**Companies:** Goldman Sachs, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Interval Overlap Check](#approach-interval-overlap-check)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given two arrays of strings that represent two inclusive events that happened **on the same day**, `event1` and `event2`, where:

- `event1 = [startTime_1, endTime_1]` and
- `event2 = [startTime_2, endTime_2]`.

Event times are valid 24 hours format in the form of `HH:MM`.

A **conflict** happens when two events have some non-empty intersection (i.e., some moment is common to both events).

Return `true`* if there is a conflict between two events. Otherwise, return *`false`.

**Constraints:**
- `event1.length == event2.length == 2`
- `event1[i].length == event2[i].length == 5`
- `startTime_1 <= endTime_1`
- `startTime_2 <= endTime_2`
- All the event times follow the `HH:MM` format.

---

## Examples

**Example 1:**
```
Input: event1 = ["01:15","02:00"], event2 = ["02:00","03:00"]
Output: true
Explanation: The two events intersect at time 2:00.
```

**Example 2:**
```
Input: event1 = ["01:00","02:00"], event2 = ["01:20","03:00"]
Output: true
Explanation: The two events intersect starting from 01:20 to 02:00.
```

**Example 3:**
```
Input: event1 = ["10:00","11:00"], event2 = ["14:00","15:00"]
Output: false
Explanation: The two events do not intersect.
```

---

## Key Insight

> Two intervals **do NOT** overlap if and only if one ends before the other starts: `end1 < start2 OR end2 < start1`. Negate this for conflict. Since times are in `"HH:MM"` format, **string comparison** works directly (lexicographic order matches chronological order).

```
No overlap:    |---event1---|          |---event2---|
Overlap:       |---event1---⟩
                         ⟨---event2---|
```

---

## Approach: Interval Overlap Check ✅

```
FUNCTION haveConflict(event1, event2):
    // Two intervals overlap iff start1 <= end2 AND start2 <= end1
    RETURN event1[0] <= event2[1] AND event2[0] <= event1[1]
END FUNCTION
```

No time parsing needed — string comparison of `"HH:MM"` is chronologically correct.

---

## Walkthrough

```
event1 = ["01:15", "02:00"],  event2 = ["02:00", "03:00"]
```

- `event1[0] <= event2[1]`  →  `"01:15" <= "03:00"` → ✅
- `event2[0] <= event1[1]`  →  `"02:00" <= "02:00"` → ✅

Both true → **conflict** ✅

```
event1 = ["01:00", "02:00"],  event2 = ["02:01", "03:00"]
```

- `event1[0] <= event2[1]`  →  `"01:00" <= "03:00"` → ✅
- `event2[0] <= event1[1]`  →  `"02:01" <= "02:00"` → ✗

Not both true → **no conflict** ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Two string comparisons |
| **Space** | O(1) | No extra storage |

---

## Follow-Up Questions

**Q1: Why does string comparison work for "HH:MM" times?**
> The format has fixed-width zero-padded fields, so lexicographic order equals chronological order. `"09:30" < "10:00"` works correctly as string comparison.

**Q2: What if events span midnight?**
> The problem constrains times to a single day. For multi-day events, you'd need date+time parsing and a more general interval overlap check.

**Q3: How would you find all conflicts among N events?**
> Sort events by start time, then use a sweep-line or merge-interval approach in O(N log N).

---

## Key Takeaway

> **Two intervals overlap iff neither ends before the other starts — this classic check `start1 ≤ end2 AND start2 ≤ end1` is the foundation of all interval problems.**
