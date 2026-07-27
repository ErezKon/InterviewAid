# 1199. Minimum Time to Build Blocks

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-build-blocks](https://leetcode.com/problems/minimum-time-to-build-blocks)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Huffman-like Merge — O(n log n)](#3-approach-huffman-like-merge--on-log-n)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` blocks with build times and a split cost. One worker can build a block or split into two (costs `split` time). Both workers then work in parallel. Return the **minimum** time to build all blocks.

**Constraints:**
- `1 <= blocks.length <= 1000`
- `1 <= blocks[i], split <= 10⁵`

---

## 2. Key Insight

> Model as a binary tree: leaves are blocks, internal nodes are splits. Time = root-to-leaf path cost. This is equivalent to **Huffman coding** but reversed — merge the two smallest blocks repeatedly, adding `split` cost at each merge. The answer = height of the tree × split + max leaf.

---

## 3. Approach: Huffman-like Merge — O(n log n) ✅

```
FUNCTION minBuildTime(blocks, split):
    heap = MIN_HEAP(blocks)

    WHILE len(heap) > 1:
        a = heap.POP()  // two smallest
        b = heap.POP()
        // After splitting, both run in parallel: time = split + max(a, b)
        heap.PUSH(split + MAX(a, b))

    RETURN heap.POP()
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — heap operations |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Reverse Huffman merge** — merge the two cheapest blocks repeatedly. The parallel execution means we pay `split + max(a, b)` per merge, not `split + a + b`.
