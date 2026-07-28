# 373. Find K Pairs with Smallest Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-pairs-with-smallest-sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Linkedin, Meta, Microsoft, Oracle, Uber, Walmart Labs

---

## Problem Description

Given two sorted integer arrays `nums1` and `nums2`, return the `k` pairs `(u, v)` with the smallest sums where `u` comes from `nums1` and `v` from `nums2`. The result should be ordered by increasing sum.

---

## Examples

**Example 1:**
```
nums1 = [1,7,11]
nums2 = [2,4,6]
k = 3
Output: [[1,2],[1,4],[1,6]]
```
Explanation: The smallest sums are 1+2, 1+4, 1+6.

**Example 2:**
```
nums1 = [1,1,2]
nums2 = [1,2,3]
k = 2
Output: [[1,1],[1,1]]
```
Explanation: Duplicate pairs are allowed if they come from different indices.

---

## Approach: Min-Heap — O(k log k) ✅

```text
FUNCTION kSmallestPairs(nums1, nums2, k):
    SET heap ← MIN-HEAP()
    SET visited ← SET()
    // start from (0,0)
    heap.PUSH((nums1[0] + nums2[0], 0, 0))
    visited.ADD((0, 0))
    SET result ← []
    WHILE heap NOT EMPTY AND LENGTH(result) < k:
        SET (sum, i, j) ← heap.POP()
        APPEND [nums1[i], nums2[j]] TO result
        IF i + 1 < LENGTH(nums1) AND (i+1, j) NOT IN visited:
            heap.PUSH((nums1[i+1] + nums2[j], i+1, j))
            visited.ADD((i+1, j))
        IF j + 1 < LENGTH(nums2) AND (i, j+1) NOT IN visited:
            heap.PUSH((nums1[i] + nums2[j+1], i, j+1))
            visited.ADD((i, j+1))
    RETURN result
```

---

## Walkthrough

| Step | Heap Contents (sum,i,j) | Result | Action |
|------|--------------------------|--------|--------|
| 1 | [(1+2,0,0)] | [] | Pop (1+2) → add [1,2]; push (7+2,1,0) and (1+4,0,1) |
| 2 | [(1+4,0,1), (7+2,1,0)] | [[1,2]] | Pop (1+4) → add [1,4]; push (7+4,1,1) and (1+6,0,2) |
| 3 | [(1+6,0,2), (7+2,1,0), (7+4,1,1)] | [[1,2],[1,4]] | Stop after k=3 pairs collected. |

---

## Complexity Analysis

- **Time:** O(k log k) – each of the `k` extractions and insertions costs log k.
- **Space:** O(k) – heap stores at most `k` candidate pairs.

---

## Follow-Up Questions

- How would you adapt the algorithm if the arrays were not sorted?
- Can you solve it using a max‑heap of size `k`?
- How to return pairs in descending order of sum?

---

## Key Takeaway

> **Min‑heap BFS from the smallest index pair (0,0). Pop the smallest sum, then push its right and down neighbors while tracking visited pairs.**
