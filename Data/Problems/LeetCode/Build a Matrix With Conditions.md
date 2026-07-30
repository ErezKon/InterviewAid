# 2392. Build a Matrix With Conditions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/build-a-matrix-with-conditions](https://leetcode.com/problems/build-a-matrix-with-conditions)
**Companies:** Google

---

## 1. Problem Description

Given `k`, `rowConditions` (pairs `[above, below]`), and `colConditions` (pairs `[left, right]`), build a `k × k` matrix containing numbers `1` to `k` exactly once such that all row and column ordering constraints are satisfied. Return any valid matrix, or empty if impossible.

---

## 2. Key Insight

> Row ordering and column ordering are independent topological sort problems. Topo-sort on `rowConditions` gives the row position of each number. Topo-sort on `colConditions` gives the column position. If either has a cycle, return empty.

---

## 3. Approach: Two Topological Sorts — O(k + E) ✅

```text
FUNCTION buildMatrix(k, rowConditions, colConditions):
    rowOrder ← topoSort(k, rowConditions)
    colOrder ← topoSort(k, colConditions)
    IF rowOrder is empty OR colOrder is empty:
        RETURN []  // cycle detected
    
    rowPos ← MAP each value in rowOrder to its index
    colPos ← MAP each value in colOrder to its index
    
    matrix ← k × k zeros
    FOR num FROM 1 TO k:
        matrix[rowPos[num]][colPos[num]] ← num
    RETURN matrix
```

---

## 4. Examples

**Example 1:**
```
Input: k = 3, rowConditions = [[1,2],[3,2]], colConditions = [[1,3],[2,3]]
Output: [[1,0,0],[0,0,2],[0,3,0]]
Explanation: One possible matrix satisfying all constraints.
```

**Example 2:**
```
Input: k = 2, rowConditions = [[1,2],[2,1]], colConditions = []
Output: []
Explanation: Row conditions contain a cycle, so no valid matrix exists.
```

---

## 5. Walkthrough

| Step | Action |
|------|--------|
| 1 | Perform topological sort on `rowConditions` → order `[1,3,2]` (row positions). |
| 2 | Perform topological sort on `colConditions` → order `[1,2,3]` (column positions). |
| 3 | Map numbers to row/column indices. |
| 4 | Place each number at `(rowPos[num], colPos[num])` in a 3×3 matrix. |
| 5 | Return the constructed matrix. |

---

## 6. Complexity Analysis

- **Time:** O(k + E) for two topological sorts plus O(k) to place numbers.
- **Space:** O(k + E) for adjacency lists and O(k²) for the output matrix.

---

## 7. Follow-Up Questions

- How would you modify the algorithm if row and column constraints were interdependent?
- Can you detect cycles more efficiently using union‑find?
- What if the matrix size is not square but rectangular?

---

## Key Takeaway

> When row and column constraints are independent, decompose into two separate topological sorts. Place each number at the intersection of its row-order and column-order positions.
