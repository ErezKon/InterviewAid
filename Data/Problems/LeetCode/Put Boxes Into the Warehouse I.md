# 1564. Put Boxes Into the Warehouse I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/put-boxes-into-the-warehouse-i](https://leetcode.com/problems/put-boxes-into-the-warehouse-i)
**Companies:** Amazon, Google, Pinterest

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given two arrays of positive integers, `boxes` and `warehouse`, representing the heights of some boxes of unit width and the heights of `n` rooms in a warehouse respectively. The warehouse's rooms are labelled from `0` to `n - 1` from left to right where `warehouse[i]` (0-indexed) is the height of the `i`th room.

Boxes are put into the warehouse by the following rules:

- Boxes cannot be stacked.
- You can rearrange the insertion order of the boxes.
- Boxes can only be pushed into the warehouse from left to right only.
- If the height of some room in the warehouse is less than the height of a box, then that box and all other boxes behind it will be stopped before that room.

Return *the maximum number of boxes you can put into the warehouse.*

**Constraints:**
- `n == warehouse.length`
- `1 <= boxes.length, warehouse.length <= 10^5`
- `1 <= boxes[i], warehouse[i] <= 10^9`

## Examples

**Example 1:**
```
Input: boxes = [4,3,4,1], warehouse = [5,3,3,4,1]
Output: 3
Explanation:
We can first put the box of height 1 in room 4. Then we can put the box of height 3 in either of the 3 rooms 1, 2, or 3. Lastly, we can put one box of height 4 in room 0.
There is no way we can fit all 4 boxes in the warehouse.
```

**Example 2:**
```
Input: boxes = [1,2,2,3,4], warehouse = [3,4,1,2]
Output: 3
Explanation:
Notice that it's not possible to put the box of height 4 into the warehouse since it cannot pass the first room of height 3.
Also, for the last two rooms, 2 and 3, only boxes of height 1 can fit.
We can fit 3 boxes maximum as shown above. The yellow box can also be put in room 2 instead.
Swapping the orange and green boxes is also valid, or swapping one of them with the red box.
```

**Example 3:**
```
Input: boxes = [1,2,3], warehouse = [1,2,3,4]
Output: 1
Explanation: Since the first room in the warehouse is of height 1, we can only put boxes of height 1.
```

## Approach
1. Convert the warehouse heights to a non-increasing sequence from left to right by taking a running minimum.
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
1. How would you adapt the algorithm for Warehouse II where boxes can be placed from either side?
2. Can you solve the problem without sorting the boxes, perhaps using a counting sort for bounded heights?
3. How would you handle the case where boxes have widths and must occupy consecutive segments?

## Key Takeaway
Preprocessing the warehouse to a monotonic height profile and greedily placing the smallest boxes from the rightmost feasible segment yields an optimal solution.
