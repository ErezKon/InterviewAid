# 284. Peeking Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/peeking-iterator](https://leetcode.com/problems/peeking-iterator)
**Companies:** Apple, Google, Yahoo

---

## Problem Description
Design an iterator that supports the `peek` operation on an existing iterator in addition to the `hasNext` and the `next` operations.

Implement the `PeekingIterator` class:

- `PeekingIterator(Iterator<int> nums)` Initializes the object with the given integer iterator `iterator`.
- `int next()` Returns the next element in the array and moves the pointer to the next element.
- `boolean hasNext()` Returns `true` if there are still elements in the array.
- `int peek()` Returns the next element in the array **without** moving the pointer.

**Note:** Each language may have a different implementation of the constructor and `Iterator`, but they all support the `int next()` and `boolean hasNext()` functions.

**Constraints:**

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`
- All the calls to `next` and `peek` are valid.
- At most `1000` calls will be made to `next`, `hasNext`, and `peek`.

**Follow up:** How would you extend your design to be generic and work with all types, not just integer?

## Examples

```
Example 1:
  Input:
  ["PeekingIterator", "next", "peek", "next", "next", "hasNext"]
  [[[1, 2, 3]], [], [], [], [], []]
  Output:
  [null, 1, 2, 2, 3, false]
  Explanation:
  PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3], pointer at 1
  peekingIterator.next();    // return 1, the pointer moves to the next element [1,(2),3].
  peekingIterator.peek();    // return 2, the pointer does not move [1,(2),3].
  peekingIterator.next();    // return 2, the pointer moves to the next element [1,2,(3)]
  peekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]
  peekingIterator.hasNext(); // return False
```

## Approach
Maintain a cache for the next element.

1. Store the underlying iterator.
2. Keep two state variables: `peeked` (the cached value) and `hasPeeked` (boolean).
3. `peek()`:
   - If `hasPeeked` is false, call `iter.next()` and store in `peeked`; set `hasPeeked` true.
   - Return `peeked`.
4. `next()`:
   - If `hasPeeked` is true, clear the flag and return `peeked`.
   - Otherwise, directly return `iter.next()`.
5. `hasNext()`:
   - Return `hasPeeked` OR `iter.hasNext()`.

## Walkthrough
Assume underlying iterator yields `[1,2,3]`:
| Call | Action | peeked | hasPeeked | Return |
|------|--------|--------|-----------|--------|
| `peek()` | fetch next (1) | 1 | true | 1 |
| `next()` | use cached 1 | – | false | 1 |
| `hasNext()` | check cache false, iterator has more | – | – | true |
| `next()` | no cache, call iterator.next() → 2 | – | – | 2 |

## Complexity Analysis
- Time: O(1) for each method – only constant‑time operations.
- Space: O(1) – only a single cached element.

## Follow‑Up Questions
1. How would you extend the design to support `peek(k)` for the k‑th upcoming element?
2. Can you implement the iterator without extra state by modifying the underlying iterator?
3. What changes are needed if the underlying collection is a stream with no `hasNext()`?

## Key Takeaway
Caching the next element enables a constant‑time `peek()` while preserving the original iterator’s O(1) semantics.
