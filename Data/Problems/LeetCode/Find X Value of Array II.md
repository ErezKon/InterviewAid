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

You are given an array of **positive** integers `nums` and a **positive** integer `k`. You are also given a 2D array `queries`, where `queries[i] = [index_i, value_i, start_i, x_i]`.

You are allowed to perform an operation **once** on `nums`, where you can remove any **suffix** from `nums` such that `nums` remains **non-empty**.

The **x-value** of `nums` **for a given** `x` is defined as the number of ways to perform this operation so that the **product** of the remaining elements leaves a *remainder* of `x` **modulo** `k`.

For each query in `queries` you need to determine the **x-value** of `nums` for `x_i` after performing the following actions:

- Update `nums[index_i]` to `value_i`. Only this step persists for the rest of the queries.
- **Remove** the prefix `nums[0..(start_i - 1)]` (where `nums[0..(-1)]` will be used to represent the **empty** prefix).

Return an array `result` of size `queries.length` where `result[i]` is the answer for the `i^th` query.

A **prefix** of an array is a subarray that starts from the beginning of the array and extends to any point within it.

A **suffix** of an array is a subarray that starts at any point within the array and extends to the end of the array.

**Note** that the prefix and suffix to be chosen for the operation can be **empty**.

**Note** that x-value has a *different* definition in this version.

**Constraints:**
- `1 <= nums[i] <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= k <= 5`
- `1 <= queries.length <= 2 * 10^4`
- `queries[i] == [index_i, value_i, start_i, x_i]`
- `0 <= index_i <= nums.length - 1`
- `1 <= value_i <= 10^9`
- `0 <= start_i <= nums.length - 1`
- `0 <= x_i <= k - 1`

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

**Example 1:**
```
Input: nums = [1,2,3,4,5], k = 3, queries = [[2,2,0,2],[3,3,3,0],[0,1,0,1]]
Output: [2,2,2]
Explanation: - For query 0, nums becomes [1, 2, 2, 4, 5], and the empty prefix must be removed. The possible operations are:
- Remove the suffix [2, 4, 5]. nums becomes [1, 2].
- Remove the empty suffix. nums becomes [1, 2, 2, 4, 5] with a product 80, which gives remainder 2 when divided by 3.
- For query 1, nums becomes [1, 2, 2, 3, 5], and the prefix [1, 2, 2] must be removed. The possible operations are:
- Remove the empty suffix. nums becomes [3, 5].
- Remove the suffix [5]. nums becomes [3].
- For query 2, nums becomes [1, 2, 2, 3, 5], and the empty prefix must be removed. The possible operations are:
- Remove the suffix [2, 2, 3, 5]. nums becomes [1].
- Remove the suffix [3, 5]. nums becomes [1, 2, 2].
```

**Example 2:**
```
Input: nums = [1,2,4,8,16,32], k = 4, queries = [[0,2,0,2],[0,2,0,1]]
Output: [1,0]
Explanation: - For query 0, nums becomes [2, 2, 4, 8, 16, 32]. The only possible operation is:
- Remove the suffix [2, 4, 8, 16, 32].
- For query 1, nums becomes [2, 2, 4, 8, 16, 32]. There is no possible way to perform the operation.
```

**Example 3:**
```
Input: nums = [1,1,2,1,1], k = 2, queries = [[2,1,0,1]]
Output: [5]
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
