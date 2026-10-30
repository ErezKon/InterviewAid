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

You are given an `m x n` matrix `mat` that has its rows sorted in non-decreasing order and an integer `k`.

You are allowed to choose **exactly one element** from each row to form an array.

Return *the *`k^th`* smallest array sum among all possible arrays*.

**Constraints:**
- `m == mat.length`
- `n == mat.length[i]`
- `1 <= m, n <= 40`
- `1 <= mat[i][j] <= 5000`
- `1 <= k <= min(200, n^m)`
- `mat[i]` is a non-decreasing array.

---

## 2. Examples

**Example 1:**
```
Input: mat = [[1,3,11],[2,4,6]], k = 5
Output: 7
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,2], [1,4], [3,2], [3,4], [1,6]. Where the 5th sum is 7.
```

**Example 2:**
```
Input: mat = [[1,3,11],[2,4,6]], k = 9
Output: 17
```

**Example 3:**
```
Input: mat = [[1,10,10],[1,4,5],[2,3,6]], k = 7
Output: 9
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,1,2], [1,1,3], [1,4,2], [1,4,3], [1,1,6], [1,5,2], [1,5,3]. Where the 7th sum is 9.
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
