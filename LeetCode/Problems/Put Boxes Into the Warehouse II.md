# 1580. Put Boxes Into the Warehouse II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/put-boxes-into-the-warehouse-ii](https://leetcode.com/problems/put-boxes-into-the-warehouse-ii)
**Companies:** Google, Pinterest

---

## Problem Description
Given two integer arrays `boxes` and `warehouse`. `boxes[i]` is the height of the i‑th box. `warehouse[j]` is the height of the j‑th segment of a warehouse corridor (from left to right). Unlike version I, boxes can be placed from either the leftmost or rightmost end of the corridor, but they still cannot pass through a segment lower than the box height. Determine the maximum number of boxes that can be placed.

## Examples
**Example 1:**
```
boxes = [4,3,4,1]
warehouse = [5,3,3,4,1]
```
After preprocessing, the effective heights are `[5,3,3,3,1]`. By placing the smallest boxes first, we can fit all 4 boxes (e.g., place 1 at the rightmost segment, then 3, then 4 from the left, etc.).

**Example 2:**
```
boxes = [5,5,5]
warehouse = [2,2,2]
```
No box fits, answer is 0.

## Approach
1. Preprocess the warehouse to obtain a non‑increasing height profile from both ends:
   - From left to right, enforce `warehouse[i] = min(warehouse[i], warehouse[i-1])`.
   - From right to left, enforce `warehouse[i] = min(warehouse[i], warehouse[i+1])`.
   This yields the maximum height a box can have if placed from the left or right at each position.
2. Sort `boxes` in ascending order.
3. Use two pointers `l` and `r` for the leftmost and rightmost available warehouse positions.
4. For each box, try to place it at the leftmost position `l` if `warehouse[l] >= box`; otherwise try the rightmost `r`. If neither fits, stop.

```text
FUNCTION maxBoxesInWarehouseII(boxes, warehouse):
    // Step 1: left‑to‑right monotonic
    FOR i ← 1 TO LENGTH(warehouse) - 1:
        SET warehouse[i] ← MIN(warehouse[i], warehouse[i-1])
    // Step 1b: right‑to‑left monotonic
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
