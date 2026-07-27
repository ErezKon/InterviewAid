# 2599. Make the Prefix Sum Non-negative

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-the-prefix-sum-non-negative](https://leetcode.com/problems/make-the-prefix-sum-non-negative)
**Companies:** Microsoft

---

## 1. Problem Description

Move elements to the end of the array so all prefix sums are non-negative. Minimize the number of moves.

---

## 2. Approach: Greedy with Min-Heap — O(n log n) ✅

```
FUNCTION makePrefSumNonNegative(nums):
    heap = min-heap
    prefSum = 0; ops = 0
    FOR num IN nums:
        prefSum += num
        IF num < 0: heap.PUSH(num)
        WHILE prefSum < 0:
            prefSum -= heap.POP()    // remove most negative
            ops += 1
    RETURN ops
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Greedily move the most negative element to the end when prefix sum goes negative. Min-heap tracks candidates. Moving to end effectively removes it from the prefix.
