# 1046. Last Stone Weight

**Difficulty:** 🟢 Easy
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/last-stone-weight](https://leetcode.com/problems/last-stone-weight)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Oracle, Paypal, Rippling, Salesforce, Visa

---

## 1. Problem Description

Smash the two heaviest stones. If equal, both destroyed. If not, the lighter is destroyed and the heavier loses weight equal to the lighter's weight. Return the weight of the last remaining stone (or 0).

---

## 2. Examples

| stones | result |
|--------|--------|
| [2,7,4,1,8,1] | 1 |
| [1] | 1 |
| [3,3] | 0 |

---

## 3. Approach: Max-Heap — O(n log n) ✅

```text
FUNCTION lastStoneWeight(stones):
    heap ← MaxHeap(stones)
    WHILE heap.SIZE() > 1:
        first ← heap.POP()
        second ← heap.POP()
        IF first != second:
            heap.PUSH(first - second)
    RETURN heap.POP() IF heap ELSE 0
```

---

## 4. Walkthrough

1. Insert all stone weights into a max‑heap.
2. Pop the two largest stones `first` and `second`.
3. If they differ, push the difference back (the remaining weight).
4. Repeat until at most one stone remains; return its weight or 0.

---

## 5. Complexity Analysis

Time: **O(n log n)** – each heap operation costs log n and we perform at most n pops/pushes.
Space: **O(n)** for storing the heap.

---

## 6. Follow-Up Questions

- How would you solve this using a counting sort / bucket array for limited weight ranges?
- Can you modify the algorithm to also return the sequence of smash operations?
- What is the complexity if the input size is extremely large and cannot fit in memory?

---

## Key Takeaway

> Max‑heap naturally gives the two heaviest stones. Pop both, push the difference if non‑zero. Simple simulation problem.
