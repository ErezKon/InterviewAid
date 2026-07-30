# 1066. Campus Bikes II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/campus-bikes-ii](https://leetcode.com/problems/campus-bikes-ii)
**Companies:** Google

---

## 1. Problem Description

Given `n` workers and `m` bikes, find the assignment that minimizes the **total** Manhattan distance. Each worker gets exactly one bike.

---

## 2. Examples

**Example 1:**
```
workers = [[0,0],[2,1]]
bikes = [[1,2],[3,3]]
output = 6
```
*Explanation:* Assign worker 0 to bike 0 (distance 3) and worker 1 to bike 1 (distance 3). Total = 6.

**Example 2:**
```
workers = [[0,0],[1,1],[2,2]]
bikes = [[1,0],[2,1],[3,3]]
output = 4
```
*Explanation:* Optimal assignment yields distances 1, 1, and 2 respectively, summing to 4.

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
