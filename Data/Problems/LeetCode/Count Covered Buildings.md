# 3531. Count Covered Buildings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-covered-buildings](https://leetcode.com/problems/count-covered-buildings)
**Companies:** Amazon, Google

---

## 1. Problem Description

You are given a positive integer `n`, representing an `n x n` city. You are also given a 2D grid `buildings`, where `buildings[i] = [x, y]` denotes a **unique** building located at coordinates `[x, y]`.

A building is **covered** if there is at least one building in all **four** directions: left, right, above, and below.

Return the number of **covered** buildings.

**Constraints:**
- `2 <= n <= 10^5`
- `1 <= buildings.length <= 10^5`
- `buildings[i] = [x, y]`
- `1 <= x, y <= n`
- All coordinates of `buildings` are **unique**.

---

## 2. Key Insight

> For each building, it's covered if there's a building above and below in the same column, and a building left and right in the same row. Precompute min/max row per column and min/max column per row.

---

## 3. Approach: Min/Max per Row and Column — O(n) ✅

```text
FUNCTION countCoveredBuildings(buildings):
    rowMin ← map()
    rowMax ← map()
    colMin ← map()
    colMax ← map()
    // First pass: record extremes
    FOR (x, y) IN buildings:
        IF x NOT IN rowMin OR y < rowMin[x]: rowMin[x] ← y
        IF x NOT IN rowMax OR y > rowMax[x]: rowMax[x] ← y
        IF y NOT IN colMin OR x < colMin[y]: colMin[y] ← x
        IF y NOT IN colMax OR x > colMax[y]: colMax[y] ← x
    count ← 0
    // Second pass: check coverage
    FOR (x, y) IN buildings:
        IF colMin[y] < x < colMax[y] AND rowMin[x] < y < rowMax[x]:
            count ← count + 1
    RETURN count
```

---

## 2. Examples

```
Example 1:
  Input: n = 3, buildings = [[1,2],[2,2],[3,2],[2,1],[2,3]]
  Output: 1
  Explanation:
  - Only building [2,2] is covered as it has at least one building:
    above ([1,2]), below ([3,2]), left ([2,1]), right ([2,3]).
  - Thus, the count of covered buildings is 1.
```

```
Example 2:
  Input: n = 3, buildings = [[1,1],[1,2],[2,1],[2,2]]
  Output: 0
  Explanation:
  - No building has at least one building in all four directions.
```

```
Example 3:
  Input: n = 5, buildings = [[1,3],[3,2],[3,3],[3,5],[5,3]]
  Output: 1
  Explanation:
  - Only building [3,3] is covered as it has at least one building:
    above ([1,3]), below ([5,3]), left ([3,2]), right ([3,5]).
  - Thus, the count of covered buildings is 1.
```

---

## 4. Walkthrough

Consider the first example.
1. After the first pass we have:
   - rowMin[1]=2, rowMax[1]=2; rowMin[2]=1, rowMax[2]=3; rowMin[3]=2, rowMax[3]=2
   - colMin[2]=1, colMax[2]=3; colMin[1]=2, colMax[1]=2; colMin[3]=2, colMax[3]=2
2. In the second pass we examine each building:
   - (1,2): colMin[2]=1 < 1? false → not covered.
   - (2,2): colMin[2]=1 < 2 < colMax[2]=3 **and** rowMin[2]=1 < 2 < rowMax[2]=3 → covered.
   - (3,2): colMin[2]=1 < 3? true but 3 < colMax[2]=3 false → not covered.
   - (2,1) and (2,3) fail the row condition.
3. Only (2,2) increments the count, yielding result 1.

---

## 5. Complexity Analysis

- **Time:** O(n) – two linear passes over the list of buildings.
- **Space:** O(n) – dictionaries store min/max for each distinct row and column.

---

## Follow-Up Questions

1. How would you adapt the solution if buildings could share the same row or column multiple times?
2. Can the algorithm be extended to count buildings covered in diagonal directions as well?
3. What if the grid is extremely sparse – would a different data structure improve performance?

---

## Key Takeaway

> A building is covered iff it's strictly between the min and max in both its row and column. Precompute extremes per row/column in one pass.
