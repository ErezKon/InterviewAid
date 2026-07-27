# 2336. Smallest Number in Infinite Set

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-number-in-infinite-set](https://leetcode.com/problems/smallest-number-in-infinite-set)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Design a data structure that initially contains all positive integers {1, 2, 3, ...}.
Support two operations:
- `popSmallest()` — remove and return the smallest number in the set.
- `addBack(num)` — add `num` back into the set if it is not already present.
Implement both operations efficiently for a large number of calls.

## Examples
- After `popSmallest()` → returns 1; next smallest becomes 2.
- After another `popSmallest()` → returns 2; next smallest becomes 3.
- After `addBack(1)` → the set has 1 again; next `popSmallest()` returns 1.

## Approach — Pointer + Min-Heap and Set  [Time: O(log k), Space: O(k)]
Maintain:
- `current`: the next smallest number that has never been popped.
- Min-heap `heap` of numbers that were popped and later added back.
- Set `inHeap` to deduplicate entries in the heap.

Always take the minimum between the heap top (if any) and `current`.

```
CLASS SmallestInfiniteSet:
    CONSTRUCTOR:
        current = 1
        heap = MIN_HEAP()
        inHeap = SET()

    FUNCTION popSmallest():
        IF heap.NOT_EMPTY():
            x = HEAP_POP(heap)
            inHeap.REMOVE(x)
            RETURN x
        ans = current
        current += 1
        RETURN ans

    FUNCTION addBack(num):
        IF num < current AND num NOT_IN inHeap:
            HEAP_PUSH(heap, num)
            inHeap.ADD(num)
```

## Walkthrough
- Start: `current = 1`, heap = [].
- `popSmallest()` → return 1, `current = 2`.
- `popSmallest()` → return 2, `current = 3`.
- `addBack(1)` → heap = [1].
- `popSmallest()` → pop from heap → 1.

## Complexity
- `popSmallest()`: O(1) if heap empty, else O(log k).
- `addBack()`: O(log k).
- Space: O(k) for numbers in the heap.

## Follow-up
- An ordered set can replace the heap+set pair.
- The `current` pointer avoids storing numbers never popped.
