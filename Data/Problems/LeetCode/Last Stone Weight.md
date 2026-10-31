# 1046. Last Stone Weight

**Difficulty:** 🟢 Easy
**Acceptance:** 66.0%
**LeetCode:** [https://leetcode.com/problems/last-stone-weight](https://leetcode.com/problems/last-stone-weight)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan, Meta, Microsoft, Nvidia, Oracle, Paypal, Rippling, Salesforce, Visa

---

## 1. Problem Description

You are given an array of integers `stones` where `stones[i]` is the weight of the `i`-th stone.

We are playing a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together. Suppose the heaviest two stones have weights `x` and `y` with `x <= y`. The result of this smash is:

- If `x == y`, both stones are destroyed, and
- If `x != y`, the stone of weight `x` is destroyed, and the stone of weight `y` has new weight `y - x`.

At the end of the game, there is **at most one** stone left.

Return *the weight of the last remaining stone*. If there are no stones left, return `0`.

**Constraints:**
- `1 <= stones.length <= 30`
- `1 <= stones[i] <= 1000`

---

## 2. Examples

```
Example 1:
  Input: stones = [2,7,4,1,8,1]
  Output: 1
  Explanation:
  We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
  we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
  we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
  we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of the last stone.
```

```
Example 2:
  Input: stones = [1]
  Output: 1
```

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

1. Insert all stone weights into a max-heap.
2. Pop the two largest stones `first` and `second`.
3. If they differ, push the difference back (the remaining weight).
4. Repeat until at most one stone remains; return its weight or 0.

---

## 5. Complexity Analysis

Time: **O(n log n)** – each heap operation costs log n and we perform at most n pops/pushes.
Space: **O(n)** for storing the heap.

---

## 6. Follow-Up Questions

- How would you solve this using a counting sort / bucket array for limited weight ranges?
- Can you modify the algorithm to also return the sequence of smash operations?
- What is the complexity if the input size is extremely large and cannot fit in memory?

---

## Key Takeaway

> Max-heap naturally gives the two heaviest stones. Pop both, push the difference if non-zero. Simple simulation problem.
