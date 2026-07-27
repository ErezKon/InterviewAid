# 1167. Minimum Cost to Connect Sticks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-connect-sticks](https://leetcode.com/problems/minimum-cost-to-connect-sticks)
**Companies:** Amazon, Google, Ibm, Jpmorgan, Twitter

---

## Key Insight

> **Huffman coding principle** — always merge the two smallest sticks. Each merge's cost equals the combined length, which gets added to future merge costs. Min-heap ensures optimal ordering.

---

## Approach: Min-Heap (Huffman-like) — O(n log n) ✅

```
FUNCTION connectSticks(sticks):
    heap ← MinHeap(sticks)
    cost ← 0

    WHILE heap.SIZE() > 1 DO
        a ← heap.POP()
        b ← heap.POP()
        merged ← a + b
        cost ← cost + merged
        heap.PUSH(merged)

    RETURN cost
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Min-heap merging | **O(n log n)** | **O(n)** |

---

## Key Takeaway

> **Greedy merge smallest first** — identical to Huffman coding. The min-heap always gives the two cheapest elements to merge.

---
