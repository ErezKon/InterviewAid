# 630. Course Schedule III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/course-schedule-iii](https://leetcode.com/problems/course-schedule-iii)
**Companies:** Amazon, Meta, Salesforce, Works Applications

---

## Problem Description

Each course has `[duration, deadline]`. Find the maximum number of courses you can take, where each course must finish by its deadline.

---

## Key Insight

Sort by deadline. Greedily take every course. If adding a course exceeds its deadline, remove the longest course taken so far (max-heap) — this frees the most time while keeping the count the same or better.

---

## Approach: Greedy + Max-Heap — O(n log n) ✅

```
FUNCTION scheduleCourse(courses):
    SORT courses by deadline
    heap = MaxHeap()    // durations of taken courses
    time = 0

    FOR [duration, deadline] IN courses:
        time += duration
        heap.PUSH(duration)

        IF time > deadline:
            time -= heap.POP()     // remove longest course

    RETURN heap.SIZE()
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Greedy scheduling with deadlines: sort by deadline, greedily take courses, and when time overflows, swap out the longest course via a max-heap. This maximizes the count while staying within all deadlines.**
