# 1066. Campus Bikes II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/campus-bikes-ii](https://leetcode.com/problems/campus-bikes-ii)
**Companies:** Google

---

## 1. Problem Description

On a campus represented as a 2D grid, there are `n` workers and `m` bikes, with `n <= m`. Each worker and bike is a 2D coordinate on this grid.

We assign one unique bike to each worker so that the sum of the **Manhattan distances** between each worker and their assigned bike is minimized.

Return `the minimum possible sum of Manhattan distances between each worker and their assigned bike`.

The **Manhattan distance** between two points `p1` and `p2` is `Manhattan(p1, p2) = |p1.x - p2.x| + |p1.y - p2.y|`.

**Constraints:**
- `n == workers.length`
- `m == bikes.length`
- `1 <= n <= m <= 10`
- `workers[i].length == 2`
- `bikes[i].length == 2`
- `0 <= workers[i][0], workers[i][1], bikes[i][0], bikes[i][1] < 1000`
- All the workers and the bikes locations are **unique**.

---

## 2. Examples

```
Example 1:
  Input: workers = [[0,0],[2,1]], bikes = [[1,2],[3,3]]
  Output: 6
  Explanation: We assign bike 0 to worker 0, bike 1 to worker 1. The Manhattan distance of both assignments is 3, so the output is 6.
```

```
Example 2:
  Input: workers = [[0,0],[1,1],[2,0]], bikes = [[1,0],[2,2],[2,1]]
  Output: 4
  Explanation: We first assign bike 0 to worker 0, then assign bike 1 to worker 1 or worker 2, bike 2 to worker 2 or worker 1. Both assignments lead to sum of the Manhattan distances as 4.
```

```
Example 3:
  Input: workers = [[0,0],[1,0],[2,0],[3,0],[4,0]], bikes = [[0,999],[1,999],[2,999],[3,999],[4,999]]
  Output: 4995
```

---

## 3. Approach: Bitmask DP — O(n × 2^m) ✅

```text
FUNCTION assignBikes(workers, bikes):
    n ← len(workers)
    m ← len(bikes)
    dp ← MAP with key 0 → 0   // mask of used bikes → min cost
    
    FOR i ← 0 TO n-1:               // assign bike to worker i
        newDp ← EMPTY MAP
        FOR mask, cost IN dp:
            FOR j ← 0 TO m-1:
                IF mask AND (1 << j): CONTINUE   // bike j already used
                newMask ← mask OR (1 << j)
                newCost ← cost + manhattan(workers[i], bikes[j])
                IF newMask NOT IN newDp OR newCost < newDp[newMask]:
                    newDp[newMask] ← newCost
        dp ← newDp
    
    RETURN MINIMUM value in dp
```

| Time | Space |
|------|-------|
| O(n × 2^m) | O(2^m) |

---

## 4. Walkthrough

Consider `workers = [[0,0],[2,1]]` and `bikes = [[1,2],[3,3]]`:
| State (mask) | Assigned workers | Cost |
|--------------|------------------|------|
| 0 (00) | none | 0 |
| after worker 0 picks bike 0 (01) | worker0→bike0 | 3 |
| after worker 0 picks bike 1 (10) | worker0→bike1 | 5 |
| after worker 1 picks remaining bike (from mask 01) → mask 11 | both assigned | 3+3 = 6 |
| after worker 1 picks remaining bike (from mask 10) → mask 11 | both assigned | 5+2 = 7 |
The minimum cost for mask `11` is 6.

---

## 5. Complexity Analysis

- **Time:** For each of the `n` workers we iterate over all `2^m` masks and try up to `m` bike assignments → O(n × 2^m).
- **Space:** Store DP for each mask → O(2^m).

---

## 6. Follow-Up Questions

- How would you solve the problem if `n` and `m` were up to 1000? (Hint: Hungarian algorithm.)
- What if each worker could take multiple bikes with a capacity constraint?
- Can you extend the DP to also return the actual assignment mapping?

---

## Key Takeaway

> Assignment problems with small `n/m` use bitmask DP. The mask tracks which bikes are taken, and we assign one bike per worker sequentially. For larger inputs, use the Hungarian algorithm (O(n³)).
