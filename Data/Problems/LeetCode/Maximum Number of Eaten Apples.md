# 1705. Maximum Number of Eaten Apples

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-eaten-apples](https://leetcode.com/problems/maximum-number-of-eaten-apples)
**Companies:** Uber

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

On day `i`, a tree grows `apples[i]` apples that will rot after `days[i]` days (i.e., expire on day `i + days[i]`). You can eat **at most one apple per day** (including days after the tree stops growing). Return the **maximum number of apples** you can eat.

**Constraints:**
- `apples.length == days.length`
- `1 <= n <= 2 × 10^4`
- `0 <= apples[i], days[i] <= 2 × 10^4`

---

## Examples

**Example 1:**
```
Input:  apples = [1,2,3,5,2], days = [3,2,1,4,2]
Output: 7
Explanation: Eat apples greedily — always eat the one expiring soonest.
```

**Example 2:**
```
Input:  apples = [3,0,0,0,0,2], days = [3,0,0,0,0,2]
Output: 5
```

---

## Key Insight

> **Greedy + Min-Heap**: always eat the apple that expires soonest. This is an interval scheduling / deadline problem. A min-heap ordered by expiry date gives the apple closest to rotting.

---

## Approach

```
FUNCTION eatenApples(apples, days)
    heap ← MinHeap()   // (expiry_day, count)
    n ← len(apples)
    eaten ← 0
    day ← 0

    WHILE day < n OR heap NOT EMPTY DO
        // Add today's apples
        IF day < n AND apples[day] > 0 THEN
            heap.PUSH((day + days[day], apples[day]))

        // Remove expired batches
        WHILE heap NOT EMPTY AND heap.TOP().expiry ≤ day DO
            heap.POP()

        // Eat one apple from the soonest-expiring batch
        IF heap NOT EMPTY THEN
            (expiry, count) ← heap.POP()
            eaten ← eaten + 1
            IF count - 1 > 0 THEN
                heap.PUSH((expiry, count - 1))

        day ← day + 1

    RETURN eaten
END FUNCTION
```

---

## Walkthrough

```
apples = [1,2,3,5,2], days = [3,2,1,4,2]
```

| Day | Add            | Heap (expiry, count) | Eat from      | eaten |
|-----|---------------|---------------------|---------------|-------|
| 0   | (3, 1)        | [(3,1)]             | (3,1)→(3,0)   | 1     |
| 1   | (3, 2)        | [(3,2)]             | (3,2)→(3,1)   | 2     |
| 2   | (3, 3)        | [(3,1),(3,3)]       | (3,1)→(3,0)   | 3     |
| 3   | (7, 5)        | [(3,3),(7,5)]→expire (3,3) | (7,5)→(7,4) | 4 |
| 4   | (6, 2)        | [(6,2),(7,4)]       | (6,2)→(6,1)   | 5     |
| 5   | —             | [(6,1),(7,4)]       | (6,1)→(6,0)   | 6     |
| 6   | —             | [(7,4)]             | (7,4)→(7,3)   | **7** |
| 7   | —             | [(7,3)]→expired     | —              | 7     |

**Result: 7** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(D log n)** — D = total days processed, log n for heap ops |
| Space  | **O(n)** — heap entries |

---

## Follow-Up Questions

1. **Why eat the soonest-expiring apple?**
   Apples that expire later can be eaten on future days; apples expiring soon have no future opportunity.

2. **How is this related to task scheduling with deadlines?**
   Same pattern — prioritize items with earliest deadlines (Earliest Deadline First).

3. **What if you could eat multiple apples per day?**
   Then greedily eat as many as allowed from the soonest-expiring batches.

---

## Key Takeaway

> **Earliest Deadline First (min-heap on expiry)** is the greedy strategy for maximizing consumption of perishable items — always consume what's about to expire first.
