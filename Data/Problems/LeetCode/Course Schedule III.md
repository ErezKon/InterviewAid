# 630. Course Schedule III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/course-schedule-iii](https://leetcode.com/problems/course-schedule-iii)
**Companies:** Amazon, Meta, Salesforce, Works Applications

---

## Problem Description

Each course is represented as a pair `[duration, deadline]`. You can take courses sequentially. Return the maximum number of courses you can complete such that each course finishes on or before its deadline.

---

## Examples

| courses | Output | Explanation |
|---------|--------|-------------|
| `[[100,200],[200,1300],[1000,1250],[2000,3200]]` | `3` | Take courses `[100,200]`, `[200,1300]`, `[1000,1250]` (skip the last). |
| `[[1,2]]` | `1` | Single course fits within its deadline. |
| `[[5,5],[4,6],[2,6]]` | `2` | Take `[4,6]` and `[2,6]` (or `[5,5]` and `[2,6]`). |

---

## Approach: Greedy + Max‑Heap — O(n log n) ✅

```text
FUNCTION scheduleCourse(courses):
    // Sort courses by deadline
    SORT courses BY deadline ASC
    SET maxHeap ← empty max‑heap   // stores durations of selected courses
    SET time ← 0

    FOR EACH [duration, deadline] IN courses:
        SET time ← time + duration
        maxHeap.PUSH(duration)
        IF time > deadline:
            // Remove the longest course to free time
            SET longest ← maxHeap.POP()
            SET time ← time - longest
    RETURN maxHeap.SIZE()
```

---

## Walkthrough

Take `courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]`:

1. Sort by deadline → `[[100,200],[1000,1250],[200,1300],[2000,3200]]`.
2. Add `[100,200]`: `time=100`, heap=[100]. Within deadline.
3. Add `[1000,1250]`: `time=1100`, heap=[1000,100]. Exceeds deadline 1250? No (1100 ≤ 1250).
4. Add `[200,1300]`: `time=1300`, heap=[1000,100,200]. `time` equals deadline 1300 → ok.
5. Add `[2000,3200]`: `time=3300`, heap=[2000,1000,200,100]. `time > 3200`, pop longest `2000` → `time=1300`.
6. Final heap size = 3 → maximum courses.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n log n) – sorting plus heap operations |
| **Space** | O(n) – heap storing selected durations |

---

## Follow‑Up Questions

1. How would the solution change if courses could be taken in parallel on multiple machines?
2. Can you solve the problem using a balanced BST instead of a heap?
3. What if each course also had a profit value and you wanted to maximize total profit under deadlines?

---

## Key Takeaway

> **Greedy scheduling with a max‑heap: sort by deadline, take every course, and when the total time exceeds a deadline, discard the longest course taken so far. This keeps the count maximal while respecting all deadlines.**