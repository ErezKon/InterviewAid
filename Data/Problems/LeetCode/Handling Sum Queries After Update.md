# 2569. Handling Sum Queries After Update

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/handling-sum-queries-after-update](https://leetcode.com/problems/handling-sum-queries-after-update)
**Companies:** Trilogy

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Segment Tree with Lazy Propagation — O(n + q log n) ✅](#3-approach-segment-tree-with-lazy-propagation)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given two **0-indexed** arrays `nums1` and `nums2` and a 2D array `queries` of queries. There are three types of queries:

- For a query of type 1, `queries[i] = [1, l, r]`. Flip the values from `0` to `1` and from `1` to `0` in `nums1` from index `l` to index `r`. Both `l` and `r` are **0-indexed**.
- For a query of type 2, `queries[i] = [2, p, 0]`. For every index `0 <= i < n`, set `nums2[i] = nums2[i] + nums1[i] * p`.
- For a query of type 3, `queries[i] = [3, 0, 0]`. Find the sum of the elements in `nums2`.

Return *an array containing all the answers to the third type queries.*

**Constraints:**
- `1 <= nums1.length,nums2.length <= 10^5`
- `nums1.length = nums2.length`
- `1 <= queries.length <= 10^5`
- `queries[i].length = 3`
- `0 <= l <= r <= nums1.length - 1`
- `0 <= p <= 10^6`
- `0 <= nums1[i] <= 1`
- `0 <= nums2[i] <= 10^9`

---

## 2. Key Insight

> Query type 2 adds `p * count_of_ones_in_nums1` to sum of `nums2`. So we only need to track the count of 1s in `nums1` efficiently. Range flip = segment tree with lazy XOR.

---

## 3. Approach: Segment Tree with Lazy Propagation — O(n + q log n) ✅

```text
FUNCTION buildSegmentTree(nums1):
    // build tree storing count of 1s per segment

FUNCTION flipRange(node, l, r, ql, qr):
    IF ql ≤ l AND r ≤ qr:
        node.count ← (r - l + 1) - node.count  // invert count
        node.lazy ← NOT node.lazy
        RETURN
    PUSH_DOWN(node)
    mid ← (l + r) / 2
    IF ql ≤ mid: flipRange(node.left, l, mid, ql, qr)
    IF qr > mid: flipRange(node.right, mid+1, r, ql, qr)
    node.count ← node.left.count + node.right.count

FUNCTION queryOnes():
    RETURN root.count
```

---

## 4. Examples

**Example 1:**
```
Input: nums1 = [1,0,1], nums2 = [0,0,0], queries = [[1,1,1],[2,1,0],[3,0,0]]
Output: [3]
Explanation: After the first query nums1 becomes [1,1,1]. After the second query, nums2 becomes [1,1,1], so the answer to the third query is 3. Thus, [3] is returned.
```

**Example 2:**
```
Input: nums1 = [1], nums2 = [5], queries = [[2,0,0],[3,0,0]]
Output: [5]
Explanation: After the first query, nums2 remains [5], so the answer to the second query is 5. Thus, [5] is returned.
```

---

## 5. Walkthrough

| Step | Operation | `nums1` | `countOnes` | `sum(nums2)` |
|------|-----------|---------|------------|--------------|
| 1 | Initial | [0,1,0,1] | 2 | 10 |
| 2 | Flip [1,3] | [0,0,1,1] | 2 | 10 |
| 3 | Add p=1 | — | 2 | 10 + 1*2 = 12 |
| 4 | Query | — | — | 12 |

---

## 6. Complexity Analysis

- **Time:** Building tree O(n). Each query O(log n). Overall O(n + q log n).
- **Space:** Segment tree stores O(n) nodes.

---

## 7. Follow-Up Questions

- How would you modify the solution if `nums1` contained arbitrary integers instead of binary values?
- Can you achieve O(1) update time using a difference array when only type‑2 queries are present?

---

## 8. Key Takeaway

> Use a segment tree with lazy XOR to maintain the count of 1s in a binary array, enabling fast range flips and constant‑time contribution to sum updates.
