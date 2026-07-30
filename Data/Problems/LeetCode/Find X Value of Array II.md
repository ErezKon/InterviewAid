# 3525. Find X Value of Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-x-value-of-array-ii](https://leetcode.com/problems/find-x-value-of-array-ii)
**Companies:** Rubrik

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Same as Part I but with point updates and range queries on the array. Count subsequences with product mod k = x after updates.

**Constraints:**
- `1 <= n, q <= 10⁵`
- `1 <= k <= 5`

---

## 2. Key Insight

> Each element's multiplication transforms a remainder vector. Use a segment tree where each node stores a k×k remainder transition matrix. Combining segments = matrix multiplication. Point updates modify a single leaf.

---

## 3. Approach

```text
FUNCTION buildSegTree(arr, k):
    // leaf matrix for value v: M[i][j] = 1 if (i * v) % k == j else 0
    // internal node matrix = LEFT.matrix × RIGHT.matrix (matrix multiplication)
    // query(l, r): multiply matrices of covered nodes to get transition for the range
    // update(pos, newVal): rebuild leaf matrix and recompute ancestors

FUNCTION query(l, r, x):
    trans ← multiply matrices for segment [l, r]
    RETURN trans[1][x]   // 1 represents empty‑product remainder
```

---

## 4. Examples

**Example 1**
```
Input: nums = [2,3,4], k = 5, queries = [(1,2,0), (2,3,1)]
Explanation:
- Query 1 asks for remainder 0 in subarray [2,3]; no subsequence product %5 ==0 → 0
- After updating index 2 to 5, array becomes [2,5,4]
- Query 2 asks for remainder 1 in subarray [5,4]; subsequences: [], [5], [4], [5,4]
  Products %5: 1,0,4,0 → count of remainder 1 is 1 (empty subsequence)
Output: [0,1]
```

**Example 2**
```
Input: nums = [1,1,1,1], k = 2, queries = [(1,4,1)]
All subsequence products are 1, so remainder 1 occurs 2^4 = 16 times (including empty).
Output: [16]
```

---

## 5. Walkthrough

Consider `nums = [2,3]`, `k = 4` and a query for the whole array, remainder `x = 2`.
1. Build leaf matrices:
   - For 2: M₂ where M₂[i][j] = 1 if (i*2)%4 == j.
   - For 3: M₃ similarly.
2. Multiply M₂ × M₃ to obtain transition for `[2,3]`.
3. The entry `trans[1][2]` gives the count of subsequences whose product %4 == 2.
4. The multiplication accounts for all combinations of picking or skipping each element, thus enumerating every subsequence.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O((n + q) · k² · log n) |
| **Space** | O(n · k²) |

---

## 7. Follow-Up Questions

- How would the solution change if updates were range assignments instead of point updates?
- Can we extend the segment‑tree approach to handle sum modulo `k` queries?
- What optimizations are possible when `k` is large (e.g., > 100)?

---

## 8. Key Takeaway

> **Segment tree with matrix nodes** handles product‑remainder queries with updates. Since `k ≤ 5`, the k×k matrices are tiny, making matrix multiplication cheap.
