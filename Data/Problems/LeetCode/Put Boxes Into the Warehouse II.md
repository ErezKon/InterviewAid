# 1580. Put Boxes Into the Warehouse II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/put-boxes-into-the-warehouse-ii](https://leetcode.com/problems/put-boxes-into-the-warehouse-ii)
**Companies:** Google, Pinterest

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given two arrays of positive integers, `boxes` and `warehouse`, representing the heights of some boxes of unit width and the heights of `n` rooms in a warehouse respectively. The warehouse's rooms are labeled from `0` to `n - 1` from left to right where `warehouse[i]` (0-indexed) is the height of the `i`th room.

Boxes are put into the warehouse by the following rules:

- Boxes cannot be stacked.
- You can rearrange the insertion order of the boxes.
- Boxes can be pushed into the warehouse from **either side** (left or right)
- If the height of some room in the warehouse is less than the height of a box, then that box and all other boxes behind it will be stopped before that room.

Return *the maximum number of boxes you can put into the warehouse.*

**Constraints:**
- `n == warehouse.length`
- `1 <= boxes.length, warehouse.length <= 10^5`
- `1 <= boxes[i], warehouse[i] <= 10^9`

## Examples

**Example 1:**
```
Input: boxes = [1,2,2,3,4], warehouse = [3,4,1,2]
Output: 4
Explanation:
We can store the boxes in the following order:
1- Put the yellow box in room 2 from either the left or right side.
2- Put the orange box in room 3 from the right side.
3- Put the green box in room 1 from the left side.
4- Put the red box in room 0 from the left side.
Notice that there are other valid ways to put 4 boxes such as swapping the red and green boxes or the red and orange boxes.
```

**Example 2:**
```
Input: boxes = [3,5,5,2], warehouse = [2,1,3,4,5]
Output: 3
Explanation:
It is not possible to put the two boxes of height 5 in the warehouse since there's only 1 room of height >= 5.
Other valid solutions are to put the green box in room 2 or to put the orange box first in room 2 before putting the green and red boxes.
```

## Approach
1. Preprocess the warehouse to obtain a non-increasing height profile from both ends:
   - From left to right, enforce `warehouse[i] = min(warehouse[i], warehouse[i-1])`.
   - From right to left, enforce `warehouse[i] = min(warehouse[i], warehouse[i+1])`.
   This yields the maximum height a box can have if placed from the left or right at each position.
2. Sort `boxes` in ascending order.
3. Use two pointers `l` and `r` for the leftmost and rightmost available warehouse positions.
4. For each box, try to place it at the leftmost position `l` if `warehouse[l] >= box`; otherwise try the rightmost `r`. If neither fits, stop.

```text
FUNCTION maxBoxesInWarehouseII(boxes, warehouse):
    // Step 1: left-to-right monotonic
    FOR i ← 1 TO LENGTH(warehouse) - 1:
        SET warehouse[i] ← MIN(warehouse[i], warehouse[i-1])
    // Step 1b: right-to-left monotonic
    FOR i ← LENGTH(warehouse) - 2 DOWNTO 0:
        SET warehouse[i] ← MIN(warehouse[i], warehouse[i+1])
    // Step 2: sort boxes
    SORT boxes ASCENDING
    SET l ← 0
    SET r ← LENGTH(warehouse) - 1
    SET count ← 0
    FOR each box IN boxes:
        IF l <= r AND warehouse[l] >= box:
            INCREMENT count
            INCREMENT l
        ELSE IF l <= r AND warehouse[r] >= box:
            INCREMENT count
            DECREMENT r
        ELSE:
            BREAK
    RETURN count
```

## Walkthrough
| Box | l (height) | r (height) | Placement |
|-----|------------|------------|-----------|
| 1   | 5 (idx0)   | 1 (idx4)   | fits left → l=1, count=1 |
| 3   | 3 (idx1)   | 1 (idx4)   | fits left → l=2, count=2 |
| 4   | 3 (idx2)   | 1 (idx4)   | left fails, right fails → stop (if no right fit) |
| …   | …          | …          | … |

## Complexity Analysis
- **Time:** O(n log n + m) where n = number of boxes (sorting) and m = length of warehouse (preprocessing).
- **Space:** O(1) extra.

## Follow-Up Questions
1. How would the solution change if each box also had a width and must occupy consecutive segments?
2. Can you design an O(n) algorithm without sorting by using a counting sort when heights are bounded?
3. How would you handle a scenario where boxes arrive in a given order and cannot be reordered?

## Key Takeaway
By creating monotonic height limits from both ends and greedily placing the smallest boxes at the earliest feasible side, we maximize the number of boxes that can be stored.
