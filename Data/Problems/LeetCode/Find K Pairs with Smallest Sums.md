# 373. Find K Pairs with Smallest Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-k-pairs-with-smallest-sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums)
**Companies:** Amazon, Bloomberg, Flipkart, Google, Linkedin, Meta, Microsoft, Oracle, Uber, Walmart Labs

---

## Problem Description

You are given two integer arrays `nums1` and `nums2` sorted in **non-decreasing order** and an integer `k`.

Define a pair `(u, v)` which consists of one element from the first array and one element from the second array.

Return *the* `k` *pairs* `(u_1, v_1), (u_2, v_2), ..., (u_k, v_k)` *with the smallest sums*.

**Constraints:**

- `1 <= nums1.length, nums2.length <= 10^5`
- `-10^9 <= nums1[i], nums2[i] <= 10^9`
- `nums1` and `nums2` both are sorted in **non-decreasing order**.
- `1 <= k <= 10^4`
- `k <= nums1.length * nums2.length`

---

## Examples

```
Example 1:
  Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
  Output: [[1,2],[1,4],[1,6]]
  Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
```

```
Example 2:
  Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
  Output: [[1,1],[1,1]]
  Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
```

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

- **Time:** O(k log k) – each of the `k` extractions and insertions costs log k.
- **Space:** O(k) – heap stores at most `k` candidate pairs.

---

## Follow-Up Questions

- How would you adapt the algorithm if the arrays were not sorted?
- Can you solve it using a max-heap of size `k`?
- How to return pairs in descending order of sum?

---

## Key Takeaway

> **Min-heap BFS from the smallest index pair (0,0). Pop the smallest sum, then push its right and down neighbors while tracking visited pairs.**
