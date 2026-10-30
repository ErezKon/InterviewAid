# 3080. Mark Elements on Array by Performing Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/mark-elements-on-array-by-performing-queries](https://leetcode.com/problems/mark-elements-on-array-by-performing-queries)
**Companies:** Barclays, Samsung

---

## 1. Problem Description

You are given a **0-indexed** array `nums` of size `n` consisting of positive integers.

You are also given a 2D array `queries` of size `m` where `queries[i] = [index_i, k_i]`.

Initially all elements of the array are **unmarked**.

You need to apply `m` queries on the array in order, where on the `i^th` query you do the following:

- Mark the element at index `index_i` if it is not already marked.
- Then mark `k_i` unmarked elements in the array with the **smallest** values. If multiple such elements exist, mark the ones with the smallest indices. And if less than `k_i` unmarked elements exist, then mark all of them.

Return *an array answer of size* `m` *where* `answer[i]` *is the **sum** of unmarked elements in the array after the* `i^th` *query*.

**Constraints:**

- `n == nums.length`
- `m == queries.length`
- `1 <= m <= n <= 10^5`
- `1 <= nums[i] <= 10^5`
- `queries[i].length == 2`
- `0 <= index_i, k_i <= n - 1`

---

## 2. Examples

```
Example 1:
  Input: nums = [1,2,2,1,2,3,1], queries = [[1,2],[3,3],[4,2]]
  Output: [8,3,0]
  Explanation: We do the following queries on the array (marked elements shown in brackets):
  - Mark the element at index 1, and 2 of the smallest unmarked elements with the smallest indices if they exist, the marked elements now are nums = [(1),(2),2,(1),2,3,1]. The sum of unmarked elements is 2 + 2 + 3 + 1 = 8.
  - Mark the element at index 3, since it is already marked we skip it. Then we mark 3 of the smallest unmarked elements with the smallest indices, the marked elements now are nums = [(1),(2),(2),(1),(2),3,(1)]. The sum of unmarked elements is 3.
  - Mark the element at index 4, since it is already marked we skip it. Then we mark 2 of the smallest unmarked elements with the smallest indices if they exist, the marked elements now are nums = [(1),(2),(2),(1),(2),(3),(1)]. The sum of unmarked elements is 0.
```

```
Example 2:
  Input: nums = [1,4,2,3], queries = [[0,1]]
  Output: [7]
  Explanation: We do one query which is mark the element at index 0 and mark the smallest element among unmarked elements. The marked elements will be nums = [(1),4,(2),3], and the sum of unmarked elements is 4 + 3 = 7.
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
