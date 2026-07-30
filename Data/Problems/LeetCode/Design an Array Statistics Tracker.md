# 3369. Design an Array Statistics Tracker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-an-array-statistics-tracker](https://leetcode.com/problems/design-an-array-statistics-tracker)
**Companies:** Amazon

---

## Problem Description

Design a data structure that supports adding numbers and querying mean, median, and mode efficiently.

---

## Examples

| Operation | Input | Output |
|-----------|-------|--------|
| addNumber | (5) | – |
| addNumber | (3) | – |
| addNumber | (5) | – |
| getMean   | –   | 4.33 |
| getMedian | –   | 5 |
| getMode   | –   | 5 |

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

## Walkthrough

1. **Add 5** – Insert 5 into the sorted list, sum = 5, count = 1, frequency = {5:1}.
2. **Add 3** – Insert 3 (list now [3,5]), sum = 8, count = 2, frequency = {5:1,3:1}.
3. **Add 5** – Insert another 5 (list [3,5,5]), sum = 13, count = 3, frequency = {5:2,3:1}.
4. **Mean** – `13 / 3 ≈ 4.33`.
5. **Median** – With 3 elements, median is the middle element `5`.
6. **Mode** – Frequency map shows 5 appears twice, highest frequency, so mode is `5`.

---

## Complexity Analysis

- **Time**: `addNumber` O(log n) for insertion into sorted structure, `getMean` O(1), `getMedian` O(1), `getMode` O(1) (maintaining max‑frequency).
- **Space**: O(n) to store the numbers, sum, count, and frequency map.

---

## Follow-Up Questions

- How would you support removal of numbers?
- How to handle floating‑point precision for mean?
- Can you achieve O(1) median without a balanced tree?

---

## Key Takeaway

> **Combine SortedList (median), running sum (mean), and frequency map with max‑heap (mode) to support all statistics in O(log n) per operation.**