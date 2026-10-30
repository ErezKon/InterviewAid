# 378. Kth Smallest Element in a Sorted Matrix

**Difficulty:** 🟡 Medium
**Acceptance:** 64.0%
**LeetCode:** [https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix)
**Companies:** Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Oracle, Phonepe, Tiktok, Twitter

---

## 1. Problem Description

Given an `n x n` `matrix` where each of the rows and columns is sorted in ascending order, return *the* `k^th` *smallest element in the matrix*.

Note that it is the `k^th` smallest element **in the sorted order**, not the `k^th` **distinct** element.

You must find a solution with a memory complexity better than `O(n^2)`.

**Follow up:**

- Could you solve the problem with a constant memory (i.e., `O(1)` memory complexity)?
- Could you solve the problem in `O(n)` time complexity? The solution may be too advanced for an interview but you may find reading this paper fun.

**Constraints:**
- `n == matrix.length == matrix[i].length`
- `1 <= n <= 300`
- `-10^9 <= matrix[i][j] <= 10^9`
- All the rows and columns of `matrix` are **guaranteed** to be sorted in **non-decreasing order**.
- `1 <= k <= n^2`

---

## 2. Approach 1: Binary Search on Value — O(n · log(max‑min)) ✅

```text
FUNCTION kthSmallest(matrix, k):
    lo ← matrix[0][0]
    hi ← matrix[n-1][n-1]
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        count ← countLessOrEqual(matrix, mid)
        IF count < k:
            lo ← mid + 1
        ELSE:
            hi ← mid
    RETURN lo

FUNCTION countLessOrEqual(matrix, target):
    count ← 0
    r ← n - 1
    c ← 0
    WHILE r ≥ 0 AND c < n:
        IF matrix[r][c] ≤ target:
            count ← count + r + 1
            c ← c + 1
        ELSE:
            r ← r - 1
    RETURN count
```

---

## 3. Approach 2: Min‑Heap — O(k log n) ✅

```text
FUNCTION kthSmallestHeap(matrix, k):
    heap ← MIN_HEAP()
    FOR row FROM 0 TO n-1:
        heap.PUSH((matrix[row][0], row, 0))
    FOR i FROM 1 TO k:
        (val, r, c) ← heap.POP()
        IF c + 1 < n:
            heap.PUSH((matrix[r][c+1], r, c+1))
    RETURN val
```

---

## 4. Examples

**Example 1:**
```
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8^th smallest number is 13
```

**Example 2:**
```
Input: matrix = [[-5]], k = 1
Output: -5
```

---

## 5. Walkthrough (Binary Search Approach)

Consider the matrix `[[1,5,9],[10,11,13],[12,13,15]]`, `k = 8`.

1. **Initial bounds:** lo = 1, hi = 15.
2. **mid = 8**, count of ≤8 is 2 (1,5). 2 < 8 → lo = 9.
3. **mid = 12**, count of ≤12 is 5 (1,5,9,10,11,12). 5 < 8 → lo = 13.
4. **mid = 14**, count of ≤14 is 8. 8 ≥ 8 → hi = 14.
5. **mid = 13**, count of ≤13 is 8. 8 ≥ 8 → hi = 13.
6. Loop ends (lo = 13, hi = 13). Return 13.

---

## 6. Complexity Analysis

- **Binary Search:** Time O(n · log(max‑min)) for the binary search loop, each iteration counts in O(n). Space O(1).
- **Min‑Heap:** Time O(k log n) for pushing/popping up to `k` elements. Space O(n) for the heap of at most one element per row.

---

## 7. Follow‑Up Questions

- How would you modify the solution to handle a non‑square `m × n` matrix?
- Can you achieve O(k log n) time without extra space beyond the heap?
- What if the matrix is streamed row by row and cannot be stored entirely in memory?

---

## 8. Key Takeaway

> Binary search on the value range combined with a linear “staircase” count leverages the matrix’s sorted rows and columns to find the k‑th smallest in O(n log range). The min‑heap alternative offers a straightforward O(k log n) solution.
