
# The Maximum Concurrent Calls Problem — Complete Guide

---

## Table of Contents

1. [Problem Definition](#1-problem-definition)
2. [Visual Example](#2-visual-example)
3. [Key Insight: The Parentheses Connection](#3-key-insight-the-parentheses-connection)
4. [Naive Approach](#4-naive-approach)
5. [Optimal Solution: Sweep Line](#5-optimal-solution-sweep-line)
   - [Core Idea](#core-idea)
   - [Edge Case: Simultaneous Start and End](#edge-case-simultaneous-start-and-end)
   - [Pseudocode](#pseudocode)
   - [Step-by-Step Walkthrough](#step-by-step-walkthrough)
   - [Complexity Analysis](#complexity-analysis)
6. [Follow-Up 1: Return the Full Peak Time Range](#6-follow-up-1-return-the-full-peak-time-range)
   - [What They're Asking](#61-what-theyre-asking)
   - [Adapted Pseudocode](#62-adapted-pseudocode)
   - [Walkthrough](#63-walkthrough)
   - [Bonus: Multiple Peak Windows](#64-bonus-multiple-peak-windows)
7. [Follow-Up 2: Discrete Time Slots (Bucket Optimization)](#7-follow-up-2-discrete-time-slots-bucket-optimization)
   - [What They're Asking](#71-what-theyre-asking)
   - [Why This Enables a Better Solution](#72-why-this-enables-a-better-solution)
   - [Adapted Pseudocode](#73-adapted-pseudocode)
   - [Walkthrough](#74-walkthrough)
   - [Complexity Comparison](#75-complexity-comparison)
8. [Follow-Up 3: Minimum Staff Needed](#8-follow-up-3-minimum-staff-needed)
   - [Why It's the Same Problem](#81-why-its-the-same-problem)
   - [Disguised Variations](#82-disguised-variations)
9. [Follow-Up 4: Real-Time Streaming Calls](#9-follow-up-4-real-time-streaming-calls)
   - [What They're Asking](#91-what-theyre-asking)
   - [Why Previous Approaches Break Down](#92-why-previous-approaches-break-down)
   - [Adapted Pseudocode (Min-Heap)](#93-adapted-pseudocode-min-heap)
   - [Walkthrough](#94-walkthrough)
   - [Complexity](#95-complexity)
10. [Final Summary Cheat Sheet](#10-final-summary-cheat-sheet)

---

## 1. Problem Definition

You are given a log of phone calls, each with a **start time** and an **end time**. Find the **maximum number of calls happening simultaneously** and identify **when** that peak occurs.

**Input:**
```
A list of calls, each represented as (startTime, endTime)
```

**Output:**
```
The maximum number of concurrent calls (and optionally when it occurs)
```

[↑ Back to Table of Contents](#table-of-contents)

---

## 2. Visual Example

**Input Calls:**
```
Call A:  [09:00 - 09:30]
Call B:  [09:15 - 09:45]
Call C:  [09:20 - 09:35]
Call D:  [09:40 - 10:00]
```

**Timeline:**
```
09:00    09:15    09:20    09:30    09:35    09:40    09:45    10:00
  A: |============================|
  B:          |======================================|
  C:                   |====================|
  D:                                         |==================|
                        ^^^^^^^^^^
                     3 simultaneous calls (PEAK)
```

**Expected Output:** Maximum concurrency = **3**, occurring at **09:20**

[↑ Back to Table of Contents](#table-of-contents)

---

## 3. Key Insight: The Parentheses Connection

This problem is conceptually **identical** to finding the maximum nesting depth of parentheses.

```
String:  ( ( ( ) ( ) ) )
Counter: 1 2 3 2 3 2 1 0
             ^   ^
          Max depth = 3
```

| Aspect | Parentheses | Concurrent Calls |
|--------|-------------|-------------------|
| **+1 event** | `(` open | Call starts |
| **-1 event** | `)` close | Call ends |
| **Tracking** | Running counter | Running counter |
| **Answer** | Max nesting depth | Max concurrency |
| **Pre-sorted?** | Yes (left to right) | **No** (must sort first) |

> The call center problem is the **max nesting depth of parentheses**, but with an **unsorted input** that requires a sort step first.

This is a great observation to mention in an interview — it shows you recognize **patterns across problems**.

[↑ Back to Table of Contents](#table-of-contents)

---

## 4. Naive Approach

You could check every pair of calls for overlap:

```
FOR each call_i:
    count = 0
    FOR each call_j:
        IF call_i overlaps call_j:
            count += 1
    maxConcurrent = MAX(maxConcurrent, count)
```

**Time Complexity: O(n²)** — not scalable for millions of records.

[↑ Back to Table of Contents](#table-of-contents)

---

## 5. Optimal Solution: Sweep Line

### Core Idea

Instead of thinking about *calls*, think about **events**:

- Every call produces **two events**:
  - A **START** event → one more concurrent call (+1)
  - An **END** event → one fewer concurrent call (−1)

Sort all events by time. Sweep through them, maintaining a running counter.

```
Call A (09:00 - 09:30)  →  (09:00, +1)  and  (09:30, -1)
Call B (09:15 - 09:45)  →  (09:15, +1)  and  (09:45, -1)
Call C (09:20 - 09:35)  →  (09:20, +1)  and  (09:35, -1)
Call D (09:40 - 10:00)  →  (09:40, +1)  and  (10:00, -1)
```

### Edge Case: Simultaneous Start and End

> What if a call **ends** at the exact same time another **starts**?

Typically, we process **END events before START events** at the same timestamp, meaning the departing call has hung up before the new one is counted.

**Always clarify this with your interviewer!**

### Pseudocode

```
FUNCTION findPeakConcurrency(calls):

    // ---- STEP 1: Create events ----
    events = empty list

    FOR each call IN calls:
        events.ADD( (call.startTime, +1) )
        events.ADD( (call.endTime,   -1) )

    // ---- STEP 2: Sort events ----
    // Primary sort:   by time (ascending)
    // Secondary sort: by type (-1 before +1 at same time)
    SORT events BY (time ASC, type ASC)

    // ---- STEP 3: Sweep through events ----
    currentConcurrent = 0
    maxConcurrent     = 0
    peakTime          = NULL

    FOR each (time, type) IN events:
        currentConcurrent = currentConcurrent + type

        IF currentConcurrent > maxConcurrent:
            maxConcurrent = currentConcurrent
            peakTime      = time

    // ---- STEP 4: Return result ----
    RETURN (maxConcurrent, peakTime)
```

### Step-by-Step Walkthrough

```
After sorting:
  (09:00, +1) → concurrent = 1  ← new max
  (09:15, +1) → concurrent = 2  ← new max
  (09:20, +1) → concurrent = 3  ← new max ★ PEAK
  (09:30, -1) → concurrent = 2
  (09:35, -1) → concurrent = 1
  (09:40, +1) → concurrent = 2
  (09:45, -1) → concurrent = 1
  (10:00, -1) → concurrent = 0

Result: Max = 3 concurrent calls, peak starts at 09:20
```

### Complexity Analysis

| Aspect | Complexity | Reason |
|--------|------------|--------|
| **Time** | **O(n log n)** | Dominated by the sorting step |
| **Space** | **O(n)** | Storing 2n events |

Where **n** = number of calls.

[↑ Back to Table of Contents](#table-of-contents)

---

## 6. Follow-Up 1: Return the Full Peak Time Range

### 6.1 What They're Asking

Instead of just:
> "The peak is 3 calls at 09:20"

They want:
> "The peak is 3 concurrent calls **from 09:20 to 09:30**"

You need the **start AND end** of the peak window.

The basic solution only captures the **moment** concurrency increases to a new max. It doesn't track **when it drops back down**.

### 6.2 Adapted Pseudocode

```
FUNCTION findPeakRange(calls):

    events = empty list

    FOR each call IN calls:
        events.ADD( (call.startTime, +1) )
        events.ADD( (call.endTime,   -1) )

    SORT events BY (time ASC, type ASC)

    currentConcurrent = 0
    maxConcurrent     = 0
    peakStart         = NULL
    peakEnd           = NULL

    FOR each (time, type) IN events:
        currentConcurrent = currentConcurrent + type

        IF currentConcurrent > maxConcurrent:
            maxConcurrent = currentConcurrent
            peakStart     = time
            peakEnd       = NULL          // reset — we don't know when it ends yet

        ELSE IF peakEnd IS NULL AND currentConcurrent < maxConcurrent:
            peakEnd = time                // peak just dropped, it ended HERE

    RETURN (maxConcurrent, peakStart, peakEnd)
```

### 6.3 Walkthrough

```
(09:00, +1) → concurrent = 1  ← new max, peakStart = 09:00
(09:15, +1) → concurrent = 2  ← new max, peakStart = 09:15
(09:20, +1) → concurrent = 3  ← new max, peakStart = 09:20
(09:30, -1) → concurrent = 2  ← dropped!  peakEnd  = 09:30
(09:35, -1) → concurrent = 1
(09:40, +1) → concurrent = 2
(09:45, -1) → concurrent = 1
(10:00, -1) → concurrent = 0

Result: 3 calls from 09:20 → 09:30
```

### 6.4 Bonus: Multiple Peak Windows

If concurrency reaches the same max multiple times, collect all windows:

```
FUNCTION findAllPeakRanges(calls):

    // ... same event creation and sorting ...

    // FIRST PASS: find the maxConcurrent (same as basic solution)
    // SECOND PASS: collect all windows that hit that max

    peakWindows      = empty list
    currentConcurrent = 0
    windowStart       = NULL

    FOR each (time, type) IN events:
        previousConcurrent = currentConcurrent
        currentConcurrent  = currentConcurrent + type

        // Entering a peak window
        IF currentConcurrent == maxConcurrent AND previousConcurrent < maxConcurrent:
            windowStart = time

        // Leaving a peak window
        IF currentConcurrent < maxConcurrent AND previousConcurrent == maxConcurrent:
            peakWindows.ADD( (windowStart, time) )

    RETURN (maxConcurrent, peakWindows)
```

[↑ Back to Table of Contents](#table-of-contents)

---

## 7. Follow-Up 2: Discrete Time Slots (Bucket Optimization)

### 7.1 What They're Asking

If all calls start and end on **whole hours** (e.g., hour 0 through hour 23), can you do better than **O(n log n)**?

### 7.2 Why This Enables a Better Solution

When the time range is **bounded and discrete**, you don't need to sort. You can use a **bucket array** — the same insight as **counting sort vs. comparison sort**. When the value range is small and known, you can avoid sorting entirely.

### 7.3 Adapted Pseudocode

```
FUNCTION findPeakDiscrete(calls, MIN_HOUR, MAX_HOUR):

    // Create a bucket for each possible hour
    buckets = ARRAY of size (MAX_HOUR - MIN_HOUR + 2) initialized to 0

    // STEP 1: Drop events into buckets — O(n)
    FOR each call IN calls:
        buckets[call.startHour - MIN_HOUR] += 1
        buckets[call.endHour   - MIN_HOUR] -= 1

    // STEP 2: Prefix sum sweep — O(k)
    currentConcurrent = 0
    maxConcurrent     = 0
    peakHour          = MIN_HOUR

    FOR hour FROM 0 TO LENGTH(buckets) - 1:
        currentConcurrent += buckets[hour]

        IF currentConcurrent > maxConcurrent:
            maxConcurrent = currentConcurrent
            peakHour      = hour + MIN_HOUR

    RETURN (maxConcurrent, peakHour)
```

### 7.4 Walkthrough

```
Calls: [1-4], [2-6], [3-5]

STEP 1 — Populate buckets:
Index:     1     2     3     4     5     6
Starts:   +1    +1    +1     0     0     0
Ends:      0     0     0    -1    -1    -1
         ────────────────────────────────────
Net:      +1    +1    +1    -1    -1    -1

STEP 2 — Prefix sum sweep:
Hour 1 → 1
Hour 2 → 2
Hour 3 → 3  ← PEAK ★
Hour 4 → 2
Hour 5 → 1
Hour 6 → 0

Result: Max = 3 at hour 3
```

### 7.5 Complexity Comparison

| Approach | Time | When to Use |
|----------|------|-------------|
| Sort-based | O(n log n) | Arbitrary / continuous timestamps |
| Bucket-based | O(n + k) | Discrete, bounded time range (k = number of time slots) |

[↑ Back to Table of Contents](#table-of-contents)

---

## 8. Follow-Up 3: Minimum Staff Needed

### 8.1 Why It's the Same Problem

> "How many call center agents do we need so that **no caller ever waits**?"

Think about it:

```
At 09:20, there are 3 simultaneous calls happening.
    → You need at LEAST 3 agents at that moment.

At 09:40, there are 2 simultaneous calls.
    → 2 agents would suffice, but you already hired 3.

The PEAK concurrency dictates minimum staffing.
```

The answer is simply:

```
minimumStaff = findPeakConcurrency(calls).maxConcurrent
```

No new algorithm needed.

### 8.2 Disguised Variations

Interviewers test whether you can **recognize a disguised problem**. All of these are the **exact same algorithm**:

| Disguised Version | What They're Really Asking |
|-------------------|---------------------------|
| Minimum **meeting rooms** needed? | Max concurrent meetings |
| Minimum **platforms** at a train station? | Max concurrent trains |
| Minimum **servers** to handle all requests? | Max concurrent requests |
| Minimum **parking spots** needed? | Max concurrent parked cars |
| Minimum **doctors** in an ER? | Max concurrent patients |
| Minimum **runways** at an airport? | Max concurrent landings/takeoffs |

> Recognizing and stating this pattern in an interview demonstrates strong problem-solving maturity.

[↑ Back to Table of Contents](#table-of-contents)

---

## 9. Follow-Up 4: Real-Time Streaming Calls

### 9.1 What They're Asking

You **don't** get all calls upfront. Instead:

> Calls arrive **one at a time** in chronological order, and at each arrival you need to report the **current concurrency**.

### 9.2 Why Previous Approaches Break Down

| Approach | Problem with Streaming |
|----------|----------------------|
| Sort-based | You'd re-sort after every new call → O(n log n) per call |
| Bucket-based | Works only if time range is known in advance |

### 9.3 Adapted Pseudocode (Min-Heap)

The key insight: when a new call arrives, some earlier calls may have **already ended**. Use a **min-heap** sorted by **end time** to efficiently discard expired calls.

```
FUNCTION processCallStream():

    activeCallsHeap = empty MIN-HEAP (sorted by endTime)
    maxConcurrent   = 0

    WHEN a new call (startTime, endTime) arrives:

        // STEP 1: Evict all calls that ended
        //         before (or exactly at) this call's start
        WHILE activeCallsHeap IS NOT EMPTY
              AND activeCallsHeap.PEEK().endTime <= startTime:
            activeCallsHeap.REMOVE_MIN()

        // STEP 2: Add the new call
        activeCallsHeap.INSERT(endTime)

        // STEP 3: Current concurrency = heap size
        currentConcurrent = activeCallsHeap.SIZE()

        IF currentConcurrent > maxConcurrent:
            maxConcurrent = currentConcurrent

        REPORT currentConcurrent
```

### 9.4 Walkthrough

```
Call A arrives (09:00 - 09:30):
    Evict: nothing to evict
    Insert: 09:30
    Heap: [09:30]
    → Concurrent = 1

Call B arrives (09:15 - 09:45):
    Evict: peek is 09:30 > 09:15 → nothing to evict
    Insert: 09:45
    Heap: [09:30, 09:45]
    → Concurrent = 2

Call C arrives (09:20 - 09:35):
    Evict: peek is 09:30 > 09:20 → nothing to evict
    Insert: 09:35
    Heap: [09:30, 09:35, 09:45]
    → Concurrent = 3 ★ PEAK

Call D arrives (09:40 - 10:00):
    Evict: peek is 09:30 ≤ 09:40 → REMOVE ✓
    Evict: peek is 09:35 ≤ 09:40 → REMOVE ✓
    Evict: peek is 09:45 > 09:40 → STOP
    Insert: 10:00
    Heap: [09:45, 10:00]
    → Concurrent = 2
```

### 9.5 Complexity

| Operation | Cost | Reason |
|-----------|------|--------|
| Insert one call | O(log n) | Heap insertion |
| Evict expired calls | O(k log n) | k calls removed, each O(log n) |
| **Amortized per call** | **O(log n)** | Each call is inserted and removed exactly once across its lifetime |

> **Important Assumption:** This approach assumes calls arrive in **chronological order** (sorted by start time). If they arrive out of order, you'd need a more complex structure like a balanced BST or interval tree.

[↑ Back to Table of Contents](#table-of-contents)

---

## 10. Final Summary Cheat Sheet

| Variant | Core Technique | Time Complexity |
|---------|---------------|-----------------|
| **Basic: max concurrency** | Sort events + sweep | O(n log n) |
| **Peak time range** | Track when max starts AND drops | O(n log n) |
| **Discrete hours** | Bucket array + prefix sum | O(n + k) |
| **Min staff / rooms / platforms** | Same as basic — it's the same answer | O(n log n) |
| **Real-time streaming** | Min-heap for lazy eviction | O(log n) amortized per call |

### Why Interviewers Love This Problem

It tests multiple skills simultaneously:

1. **Decomposition** — breaking calls into atomic events
2. **Sorting logic** — handling tie-breaking correctly
3. **Sweep line technique** — a foundational algorithm pattern
4. **Edge case awareness** — same-time starts/ends
5. **Pattern recognition** — connecting it to parentheses, meeting rooms, etc.
6. **Adaptability** — handling follow-ups with different constraints
7. **Communication** — stating assumptions clearly

[↑ Back to Table of Contents](#table-of-contents)