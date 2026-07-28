# 1564. Put Boxes Into the Warehouse I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/put-boxes-into-the-warehouse-i](https://leetcode.com/problems/put-boxes-into-the-warehouse-i)
**Companies:** Amazon, Google, Pinterest

---

## Problem Description
You are given two integer arrays `boxes` and `warehouse`. `boxes[i]` is the height of the i‑th box, and `warehouse[j]` is the height of the j‑th segment of a warehouse corridor (from left to right). A box can be placed in a segment if its height does not exceed the segment's height. Boxes are placed one by one from the rightmost segment moving left; a box cannot pass through a segment that is lower than its height. Return the maximum number of boxes that can be placed.

## Examples
**Example 1:**
```
boxes = [4,3,4,1]
warehouse = [5,3,3,4,1]
```
After preprocessing the warehouse heights to be non‑increasing from left to right, the effective heights become `[5,3,3,3,1]`. Placing boxes in descending order yields 3 boxes placed.

**Example 2:**
```
boxes = [1,2,2,3,4]
warehouse = [1,2,3,4,5]
```
All 5 boxes fit.

## Approach
1. Convert the warehouse heights to a non‑increasing sequence from left to right by taking a running minimum.
2. Sort `boxes` in ascending order.
3. Iterate over the sorted boxes, trying to place each box in the rightmost remaining warehouse segment that can accommodate it. Decrease the segment pointer after each successful placement.

```text
FUNCTION maxBoxesInWarehouse(boxes, warehouse):
    // Step 1: preprocess warehouse heights
    FOR i ← 1 TO LENGTH(warehouse) - 1:
        SET warehouse[i] ← MIN(warehouse[i], warehouse[i-1])
    // Step 2: sort boxes
    SORT boxes ASCENDING
    SET count ← 0
    SET j ← LENGTH(warehouse) - 1  // rightmost segment index
    FOR each box IN boxes:
        WHILE j >= 0 AND warehouse[j] < box:
            DECREMENT j
        IF j < 0:
            BREAK
        INCREMENT count
        DECREMENT j
    RETURN count
```

## Walkthrough
| Box (sorted) | j (segment) before | Condition | Action |
|--------------|-------------------|-----------|--------|
| 1 | 4 (height 1) | 1 ≤ 1 | place, count=1, j→3 |
| 3 | 3 (height 3) | 3 ≤ 3 | place, count=2, j→2 |
| 4 | 2 (height 3) | 4 > 3 → j-- →1 (height 3) still <4 → j-- →0 (height 5) | place, count=3, j→-1 |
| remaining boxes cannot be placed |

## Complexity Analysis
- **Time:** O(n log n + m) where n = number of boxes (sorting) and m = length of warehouse (preprocess).
- **Space:** O(1) extra beyond input arrays.

## Follow-Up Questions
1. How would you adapt the algorithm for Warehouse II where boxes can be placed from either side?
2. Can you solve the problem without sorting the boxes, perhaps using a counting sort for bounded heights?
3. How would you handle the case where boxes have widths and must occupy consecutive segments?

## Key Takeaway
Preprocessing the warehouse to a monotonic height profile and greedily placing the smallest boxes from the rightmost feasible segment yields an optimal solution.
