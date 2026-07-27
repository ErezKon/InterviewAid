# 1046. Last Stone Weight

**Difficulty:** 🟢 Easy
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/last-stone-weight](https://leetcode.com/problems/last-stone-weight)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Oracle, Paypal, Rippling, Salesforce, Visa

---

## 1. Problem Description

Smash the two heaviest stones. If equal, both destroyed. If not, the lighter is destroyed and the heavier loses weight equal to the lighter's weight. Return the weight of the last remaining stone (or 0).

---

## 2. Approach: Max-Heap — O(n log n) ✅

```
FUNCTION lastStoneWeight(stones):
    heap = MaxHeap(stones)

    WHILE heap.SIZE() > 1:
        first = heap.POP()
        second = heap.POP()
        IF first != second:
            heap.PUSH(first - second)

    RETURN heap.POP() IF heap ELSE 0
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## Key Takeaway

> Max-heap naturally gives the two heaviest stones. Pop both, push the difference if non-zero. Simple simulation problem.
