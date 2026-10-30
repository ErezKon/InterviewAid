# 2279. Maximum Bags With Full Capacity of Rocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks](https://leetcode.com/problems/maximum-bags-with-full-capacity-of-rocks)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have `n` bags numbered from `0` to `n - 1`. You are given two **0-indexed** integer arrays `capacity` and `rocks`. The `i^th` bag can hold a maximum of `capacity[i]` rocks and currently contains `rocks[i]` rocks. You are also given an integer `additionalRocks`, the number of additional rocks you can place in **any** of the bags.

Return* the **maximum** number of bags that could have full capacity after placing the additional rocks in some bags.*

**Constraints:**
- `n == capacity.length == rocks.length`
- `1 <= n <= 5 * 10^4`
- `1 <= capacity[i] <= 10^9`
- `0 <= rocks[i] <= capacity[i]`
- `1 <= additionalRocks <= 10^9`

---

## Examples

**Example 1:**
```
Input: capacity = [2,3,4,5], rocks = [1,2,4,4], additionalRocks = 2
Output: 3
Explanation: Place 1 rock in bag 0 and 1 rock in bag 1.
The number of rocks in each bag are now [2,3,4,4].
Bags 0, 1, and 2 have full capacity.
There are 3 bags at full capacity, so we return 3.
It can be shown that it is not possible to have more than 3 bags at full capacity.
Note that there may be other ways of placing the rocks that result in an answer of 3.
```

**Example 2:**
```
Input: capacity = [10,2,2], rocks = [2,2,0], additionalRocks = 100
Output: 3
Explanation: Place 8 rocks in bag 0 and 2 rocks in bag 2.
The number of rocks in each bag are now [10,2,2].
Bags 0, 1, and 2 have full capacity.
There are 3 bags at full capacity, so we return 3.
It can be shown that it is not possible to have more than 3 bags at full capacity.
Note that we did not use all of the additional rocks.
```

---

## Approach

> **Greedy Sort** – Fill bags that need the fewest rocks first.

```
FUNCTION maximumBags(capacity, rocks, additionalRocks):
    // Compute how many more rocks each bag needs
    remaining ← []
    FOR i ← 0 TO LENGTH(capacity) - 1:
        SET need ← capacity[i] - rocks[i]
        APPEND need TO remaining
    // Sort so the easiest bags are first
    SORT remaining ASCENDING
    SET count ← 0
    FOR need IN remaining:
        IF additionalRocks >= need:
            additionalRocks ← additionalRocks - need
            count ← count + 1
        ELSE:
            BREAK
    RETURN count
```

---

## Walkthrough

| Step | remaining (sorted) | additionalRocks | Action | count |
|------|--------------------|----------------|--------|-------|
| 1 | `[1,1,2]` | 2 | Fill first bag (need 1) → rocks left 1, count 1 |
| 2 | `[1,2]` | 1 | Fill second bag (need 1) → rocks left 0, count 2 |
| 3 | `[2]` | 0 | Cannot fill third bag (need 2) → stop |

Result: `2` bags are full.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy Sort | **O(n log n)** (sorting) | O(n) (remaining array) |

---

## Follow-Up Questions

- How would the solution change if each bag could only receive rocks up to a maximum limit per operation?
- Can you adapt the algorithm to return the list of bag indices that become full?
- What if `additionalRocks` is extremely large; can you achieve O(n) time without sorting?

---

## Key Takeaway

> **Fill the easiest-to-complete bags first.** Sort by remaining capacity ascending and greedily allocate rocks to maximize the number of full bags.
