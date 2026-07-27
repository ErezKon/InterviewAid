# 3074. Apple Redistribution into Boxes

**Difficulty:** 🟢 Easy
**Companies:** Apple, Bloomberg, Google

---

## Problem Description
You are given two integer arrays `apple` and `capacity`. `apple[i]` represents the number of apples currently in the *i*‑th box, and `capacity[j]` represents the maximum number of apples that the *j*‑th box can hold. You may move apples between boxes arbitrarily. Return the minimum number of boxes required to store all apples after redistribution.

## Examples
- **Input:** `apple = [3,1,4]`, `capacity = [5,3,2]` **Output:** `2`
  *Explanation:* Total apples = 8. Using the two largest capacities (5 and 3) can hold all apples.
- **Input:** `apple = [2,2,2]`, `capacity = [1,1,1,1,1,1]` **Output:** `6`
  *Explanation:* Total apples = 6, each box can hold 1 apple, so all six boxes are needed.

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

## Follow‑Up Questions
1. How would you handle the case where some boxes have a minimum fill requirement?
2. What if moving apples incurs a cost proportional to the number of apples moved?
3. Can you solve the problem in O(n) time using a counting sort when capacities are bounded?

## Key Takeaway
Sorting capacities in descending order and greedily selecting the largest boxes yields the minimum number of boxes needed to store all apples.
