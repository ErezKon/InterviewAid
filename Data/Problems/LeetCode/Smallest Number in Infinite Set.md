# 2336. Smallest Number in Infinite Set

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-number-in-infinite-set](https://leetcode.com/problems/smallest-number-in-infinite-set)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You have a set which contains all positive integers `[1, 2, 3, 4, 5, ...]`.

Implement the `SmallestInfiniteSet` class:

- `SmallestInfiniteSet()` Initializes the **SmallestInfiniteSet** object to contain **all** positive integers.
- `int popSmallest()` **Removes** and returns the smallest integer contained in the infinite set.
- `void addBack(int num)` **Adds** a positive integer `num` back into the infinite set, if it is **not** already in the infinite set.

**Constraints:**
- `1 <= num <= 1000`
- At most `1000` calls will be made **in total** to `popSmallest` and `addBack`.

## Examples
```
Example 1:
  Input:
    ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
    [[], [2], [], [], [], [1], [], [], []]
  Output:
    [null, null, 1, 2, 3, null, 1, 4, 5]
  Explanation:
    SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
    smallestInfiniteSet.addBack(2);    // 2 is already in the set, so no change is made.
    smallestInfiniteSet.popSmallest(); // return 1, since 1 is the smallest number, and remove it from the set.
    smallestInfiniteSet.popSmallest(); // return 2, and remove it from the set.
    smallestInfiniteSet.popSmallest(); // return 3, and remove it from the set.
    smallestInfiniteSet.addBack(1);    // 1 is added back to the set.
    smallestInfiniteSet.popSmallest(); // return 1, since 1 was added back to the set and
                                       // is the smallest number, and remove it from the set.
    smallestInfiniteSet.popSmallest(); // return 4, and remove it from the set.
    smallestInfiniteSet.popSmallest(); // return 5, and remove it from the set.
```

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
