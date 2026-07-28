# 284. Peeking Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/peeking-iterator](https://leetcode.com/problems/peeking-iterator)
**Companies:** Apple, Google, Yahoo

---

## Problem Description
Design an iterator wrapper over an existing iterator that supports a `peek()` operation, which returns the next element without advancing the iterator. The wrapper must also support the usual `next()` and `hasNext()` methods.

Constraints: The underlying iterator provides `next()` and `hasNext()` in O(1) time. The `PeekingIterator` should preserve these complexities.

## Examples
| Operations | Output |
|------------|--------|
| `PeekingIterator(it)` | – |
| `peek()` | first element of `it` |
| `next()` | same element as previous `peek()` |
| `hasNext()` | true/false depending on remaining elements |

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
