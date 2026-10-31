# 3369. Design an Array Statistics Tracker

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-an-array-statistics-tracker](https://leetcode.com/problems/design-an-array-statistics-tracker)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The existing Approach below may not handle `removeFirstAddedNumber`.*

Design a data structure that keeps track of the values in it and answers some queries regarding their mean, median, and mode.

Implement the `StatisticsTracker` class.

- `StatisticsTracker()`: Initialize the `StatisticsTracker` object with an empty array.
- `void addNumber(int number)`: Add `number` to the data structure.
- `void removeFirstAddedNumber()`: Remove the earliest added number from the data structure.
- `int getMean()`: Return the floored **mean** of the numbers in the data structure.
- `int getMedian()`: Return the **median** of the numbers in the data structure.
- `int getMode()`: Return the **mode** of the numbers in the data structure. If there are multiple modes, return the smallest one.

**Note**:

- The **mean** of an array is the sum of all the values divided by the number of values in the array.
- The **median** of an array is the middle element of the array when it is sorted in non-decreasing order. If there are two choices for a median, the larger of the two values is taken.
- The **mode** of an array is the element that appears most often in the array.

**Constraints:**
- `1 <= number <= 10^9`
- At most, `10^5` calls will be made to `addNumber`, `removeFirstAddedNumber`, `getMean`, `getMedian`, and `getMode` in total.
- `removeFirstAddedNumber`, `getMean`, `getMedian`, and `getMode` will be called only if there is at least one element in the data structure.

---

## Examples

**Example 1:**
```
Input: ["StatisticsTracker", "addNumber", "addNumber", "addNumber", "addNumber", "getMean", "getMedian", "getMode", "removeFirstAddedNumber", "getMode"]
[[], [4], [4], [2], [3], [], [], [], [], []]
Output: [null, null, null, null, null, 3, 4, 4, null, 2]
Explanation:
StatisticsTracker statisticsTracker = new StatisticsTracker();
statisticsTracker.addNumber(4); // The data structure now contains [4]
statisticsTracker.addNumber(4); // The data structure now contains [4, 4]
statisticsTracker.addNumber(2); // The data structure now contains [4, 4, 2]
statisticsTracker.addNumber(3); // The data structure now contains [4, 4, 2, 3]
statisticsTracker.getMean(); // return 3
statisticsTracker.getMedian(); // return 4
statisticsTracker.getMode(); // return 4
statisticsTracker.removeFirstAddedNumber(); // The data structure now contains [4, 2, 3]
statisticsTracker.getMode(); // return 2
```

**Example 2:**
```
Input: ["StatisticsTracker", "addNumber", "addNumber", "getMean", "removeFirstAddedNumber", "addNumber", "addNumber", "removeFirstAddedNumber", "getMedian", "addNumber", "getMode"]
[[], [9], [5], [], [], [5], [6], [], [], [8], []]
Output: [null, null, null, 7, null, null, null, null, 6, null, 5]
Explanation:
StatisticsTracker statisticsTracker = new StatisticsTracker();
statisticsTracker.addNumber(9); // The data structure now contains [9]
statisticsTracker.addNumber(5); // The data structure now contains [9, 5]
statisticsTracker.getMean(); // return 7
statisticsTracker.removeFirstAddedNumber(); // The data structure now contains [5]
statisticsTracker.addNumber(5); // The data structure now contains [5, 5]
statisticsTracker.addNumber(6); // The data structure now contains [5, 5, 6]
statisticsTracker.removeFirstAddedNumber(); // The data structure now contains [5, 6]
statisticsTracker.getMedian(); // return 6
statisticsTracker.addNumber(8); // The data structure now contains [5, 6, 8]
statisticsTracker.getMode(); // return 5
```

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

1. **Add 5** – Insert 5 into the sorted list, sum = 5, count = 1, frequency = {5:1}.
2. **Add 3** – Insert 3 (list now [3,5]), sum = 8, count = 2, frequency = {5:1,3:1}.
3. **Add 5** – Insert another 5 (list [3,5,5]), sum = 13, count = 3, frequency = {5:2,3:1}.
4. **Mean** – `13 / 3 ≈ 4.33`.
5. **Median** – With 3 elements, median is the middle element `5`.
6. **Mode** – Frequency map shows 5 appears twice, highest frequency, so mode is `5`.

---

## Complexity Analysis

- **Time**: `addNumber` O(log n) for insertion into sorted structure, `getMean` O(1), `getMedian` O(1), `getMode` O(1) (maintaining max-frequency).
- **Space**: O(n) to store the numbers, sum, count, and frequency map.

---

## Follow-Up Questions

- How would you support removal of numbers?
- How to handle floating-point precision for mean?
- Can you achieve O(1) median without a balanced tree?

---

## Key Takeaway

> **Combine SortedList (median), running sum (mean), and frequency map with max-heap (mode) to support all statistics in O(log n) per operation.**