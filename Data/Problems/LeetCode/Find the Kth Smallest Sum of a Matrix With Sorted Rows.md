# 1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows](https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows)
**Companies:** Amazon, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Row-by-Row Merge with Heap — O(m · k · log k) ✅](#4-approach-row-by-row-merge-with-heap--om--k--log-k-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an `m x n` matrix where each row is sorted in non-decreasing order, find the `k`-th smallest sum by picking exactly one element from each row.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 40`
- `1 <= k <= min(200, n^m)`

---

## 2. Examples

```
Example 1:
  Input:  mat = [[1,3,11],[2,4,6]], k = 5
  Output: 7
  Reason: Sums sorted: [3,5,7,9,13,17]. 5th = 7.
```

---

## 3. Key Insight

> Merge two rows at a time: compute pairwise sums, keep only the k smallest. After merging all rows, the k-th smallest is the answer. A min-heap efficiently finds the top-k pairwise sums.

---

## 4. Approach: Row-by-Row Merge with Heap — O(m · k · log k) ✅

```
FUNCTION kthSmallest(mat, k):
    current ← mat[0]
    FOR i ← 1 TO m - 1 DO
        current ← mergeKSmallest(current, mat[i], k)
    RETURN current[k - 1]

FUNCTION mergeKSmallest(arr1, arr2, k):
    heap ← MinHeap()
    heap.PUSH((arr1[0] + arr2[0], 0, 0))
    seen ← SET((0, 0))
    result ← []

    WHILE result.LENGTH < k AND heap NOT EMPTY DO
        (sumVal, i, j) ← heap.POP()
        result.ADD(sumVal)
        IF i + 1 < len(arr1) AND (i+1, j) NOT IN seen THEN
            heap.PUSH((arr1[i+1] + arr2[j], i+1, j))
            seen.ADD((i+1, j))
        IF j + 1 < len(arr2) AND (i, j+1) NOT IN seen THEN
            heap.PUSH((arr1[i] + arr2[j+1], i, j+1))
            seen.ADD((i, j+1))

    RETURN result
```

---

## 5. Walkthrough

```
mat = [[1,3,11],[2,4,6]], k = 5

Merge row 0 and row 1:
  Start: (1+2=3, 0,0)
  Pop 3 → push (3+2=5, 1,0) and (1+4=5, 0,1)
  Pop 5 → push (3+4=7, 1,1) and (1+6=7, 0,2) [also (11+2=13)]
  Pop 5 → ...
  Continue until 5th: result = [3, 5, 5, 7, 7]

5th smallest = 7 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · k · log k) — m-1 merges, each with k heap operations |
| **Space** | O(k) — top-k list per merge |

---

## 7. Key Takeaway

> **Pairwise merge with top-k pruning** reduces the combinatorial explosion. By keeping only the k smallest sums at each merge step, we avoid generating all n^m combinations.
