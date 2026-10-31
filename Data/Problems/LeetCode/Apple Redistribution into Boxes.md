# 3074. Apple Redistribution into Boxes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/apple-redistribution-into-boxes](https://leetcode.com/problems/apple-redistribution-into-boxes)
**Companies:** Apple, Bloomberg, Google

---

## Problem Description
You are given an array `apple` of size `n` and an array `capacity` of size `m`.

There are `n` packs where the `ith` pack contains `apple[i]` apples. There are `m` boxes as well, and the `ith` box has a capacity of `capacity[i]` apples.

Return *the **minimum** number of boxes you need to select to redistribute these* `n` *packs of apples into boxes*.

**Note** that, apples from the same pack can be distributed into different boxes.

**Constraints:**
- `1 <= n == apple.length <= 50`
- `1 <= m == capacity.length <= 50`
- `1 <= apple[i], capacity[i] <= 50`
- The input is generated such that it's possible to redistribute packs of apples into boxes.

## Examples
```
Example 1:
  Input: apple = [1,3,2], capacity = [4,3,1,5,2]
  Output: 2
  Explanation: We will use boxes with capacities 4 and 5.
  It is possible to distribute the apples as the total capacity is greater than or equal to the total number of apples.
```
```
Example 2:
  Input: apple = [5,5,5], capacity = [2,4,2,7]
  Output: 4
  Explanation: We will need to use all the boxes.
```

## Approach
The task reduces to covering the total number of apples with the fewest box capacities. Sort the capacities in descending order and keep adding them until the cumulative capacity meets or exceeds the total apples.

```text
FUNCTION minimumBoxes(apple, capacity):
    // Total apples to store
    SET total ← SUM(apple)
    // Sort capacities from largest to smallest
    SORT capacity DESCENDING
    SET used ← 0
    FOR i FROM 0 TO LENGTH(capacity) - 1:
        SET total ← total - capacity[i]
        SET used ← i + 1
        IF total <= 0:
            RETURN used
    RETURN used  // all capacities used
```

## Walkthrough
| Step | total apples | capacity considered | remaining total | boxes used |
|------|--------------|--------------------|----------------|------------|
| Start | 8 | – | 8 | 0 |
| 1 | 8 | 5 | 3 | 1 |
| 2 | 3 | 3 | 0 | 2 |
| Result | – | – | ≤0 | **2** |

## Complexity Analysis
- **Time:** O(n log n) for sorting the `capacity` array, where n = length of `capacity`.
- **Space:** O(1) extra space aside from the input arrays.

## Follow-Up Questions
1. How would you handle the case where some boxes have a minimum fill requirement?
2. What if moving apples incurs a cost proportional to the number of apples moved?
3. Can you solve the problem in O(n) time using a counting sort when capacities are bounded?

## Key Takeaway
Sorting capacities in descending order and greedily selecting the largest boxes yields the minimum number of boxes needed to store all apples.
