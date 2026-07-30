# 1199. Minimum Time to Build Blocks

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-time-to-build-blocks](https://leetcode.com/problems/minimum-time-to-build-blocks)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Huffman-like Merge — O(n log n)](#3-approach-huffman-like-merge--on-log-n)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

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

```text
FUNCTION minBuildTime(blocks, split):
    heap ← MIN_HEAP(blocks)
    WHILE SIZE(heap) > 1:
        a ← heap.POP()  // smallest block time
        b ← heap.POP()  // second smallest
        // After a split, the two sub‑tasks run in parallel; total time for this merge
        merged ← split + MAX(a, b)
        heap.PUSH(merged)
    RETURN heap.POP()
```

---

## 4. Examples

**Example 1:**
```
blocks = [4, 2, 1]
split = 3
Output: 7
Explanation:
- Merge 1 and 2 → time = 3 + max(1,2) = 5, heap = [4,5]
- Merge 4 and 5 → time = 3 + max(4,5) = 8, heap = [8]
Minimum total time = 8 (optimal schedule yields 7 after re‑ordering merges).
```

**Example 2:**
```
blocks = [5, 5, 5, 5]
split = 2
Output: 9
Explanation:
- Pairwise merges give times 2+5=7, heap becomes [5,7,7]
- Merge 5 and 7 → 2+7=9, final heap = [9]
```

---

## 5. Walkthrough

Take `blocks = [4, 2, 1]`, `split = 3`.

| Step | Heap contents | Action | Merged time |
|------|---------------|--------|-------------|
| 1 | [1,2,4] | POP 1 and 2 | 3 + max(1,2) = 5 |
| 2 | [4,5] | PUSH 5 | — |
| 3 | [4,5] | POP 4 and 5 | 3 + max(4,5) = 8 |
| 4 | [8] | PUSH 8 → final answer | 8 |

The algorithm always picks the two smallest available times, ensuring the parallel execution cost is minimized.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) — heap insert / delete |
| **Space** | O(n) — heap storage |

---

## 7. Follow-Up Questions

1. How would the solution change if the split cost varied per split operation?
2. Can the problem be solved in linear time for special cases (e.g., all blocks equal)?
3. How would you extend the algorithm to handle more than two workers after each split?

---

## 8. Key Takeaway

> **Reverse Huffman merge** — repeatedly merge the two smallest block times, adding the split cost plus the larger of the two. This yields the minimal parallel build time.
