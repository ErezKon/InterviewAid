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

Given arrays `nums1` (binary) and `nums2`, handle three types of queries: flip a range in `nums1`, add `nums1[i] * p` to each `nums2[i]`, and query the sum of `nums2`.

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
nums1 = [0,1,0,1], nums2 = [1,2,3,4]
queries = [[1,1,3],[2,1],[3]]
Output: [10]
Explanation:
- Flip range [1,3] → nums1 becomes [0,0,1,1]
- Add p=1 → sum(nums2) increases by 1 * countOnes(nums1)=2 → new sum = 10
- Query sum → return 10
```

**Example 2:**
```
nums1 = [1,1,1], nums2 = [5,5,5]
queries = [[2,2],[3],[1,0,2],[2,3]]
Output: [30, 39]
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
