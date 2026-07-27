# 3369. Design an Array Statistics Tracker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-an-array-statistics-tracker](https://leetcode.com/problems/design-an-array-statistics-tracker)
**Companies:** Amazon

---

## Problem Description

Design a data structure that supports adding numbers and querying mean, median, and mode efficiently.

---

## Approach

```
CLASS StatisticsTracker:
    // SortedList for median (O(log n) insert, O(1) median)
    // Running sum + count for mean
    // Frequency map + max-frequency tracker for mode

    FUNCTION addNumber(num): insert into sorted structure, update sum, update freq map
    FUNCTION getMean(): RETURN sum / count
    FUNCTION getMedian(): RETURN sortedList[count // 2]
    FUNCTION getMode(): RETURN element with highest frequency (smallest if tie)
```

---

## Key Takeaway

> **Combine SortedList (median), running sum (mean), and frequency map with max-heap (mode) to support all statistics in O(log n) per operation.**
