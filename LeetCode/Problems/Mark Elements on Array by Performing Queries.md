# 3080. Mark Elements on Array by Performing Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/mark-elements-on-array-by-performing-queries](https://leetcode.com/problems/mark-elements-on-array-by-performing-queries)
**Companies:** Barclays, Samsung

---

## 1. Problem Description

Process a series of queries on an array where each query marks a specific index as used and then marks the `k` smallest unmarked elements. After each query, return the sum of all unmarked elements.

---

## 2. Examples

**Example 1:**
```
nums = [5,3,8,6]
queries = [[1,2],[0,1]]
Output: [13,8]
Explanation:
- After first query, mark index 1 (value 3) and the 2 smallest unmarked values (5 and 6). Unmarked sum = 8.
- After second query, mark index 0 (value 5) and the smallest unmarked value (8). Unmarked sum = 0.
```

**Example 2:**
```
nums = [1,2,3]
queries = [[2,1]]
Output: [3]
Explanation:
Mark index 2 (value 3) and the smallest unmarked value (1). Remaining unmarked sum = 2.
```

---

## 3. Approach: Min-Heap + Tracking — O(n log n) ✅

```text
FUNCTION markElements(nums, queries):
    // Pre‑sort elements by value with their indices
    SET sorted ← SORT(nums WITH index BY value ASC)
    SET pointer ← 0               // points to next smallest unmarked
    SET marked ← SET()            // stores marked indices
    SET totalSum ← SUM(nums)
    SET result ← []
    FOR each query IN queries:
        SET idx, k ← query[0], query[1]
        IF idx NOT IN marked:
            SET marked.ADD(idx)
            SET totalSum ← totalSum - nums[idx]
        // mark k smallest unmarked elements
        SET count ← 0
        WHILE count < k AND pointer < LENGTH(sorted):
            SET (value, i) ← sorted[pointer]
            IF i NOT IN marked:
                SET marked.ADD(i)
                SET totalSum ← totalSum - value
                SET count ← count + 1
            SET pointer ← pointer + 1
        APPEND totalSum TO result
    RETURN result
```

---

## 4. Walkthrough

| Step | Action | Marked Indices | Unmarked Sum |
|------|--------|----------------|--------------|
| Start | - | {} | 22 |
| Q1 (1,2) | Mark 1, then smallest 5 and 6 | {1,0,3} | 8 |
| Q2 (0,1) | Index 0 already marked, mark smallest remaining 8 | {1,0,3,2} | 0 |

---

## 5. Complexity Analysis

- **Time:** Sorting O(n log n) + processing each query O(q·k log n) (heap operations) → overall O((n + q·k) log n).
- **Space:** O(n) for sorted list and marked set.

---

## 6. Follow‑Up Questions

- How would you handle dynamic updates where array values change?
- Can the solution be adapted to support range queries for the sum of unmarked elements?
- What if `k` varies per query and can be large relative to `n`?

---

## Key Takeaway

> Pre‑sort elements and use a pointer/heap to efficiently retrieve the smallest unmarked values while maintaining a running sum.
