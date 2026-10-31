# 281. Zigzag Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zigzag-iterator](https://leetcode.com/problems/zigzag-iterator)
**Companies:** Amazon, C3 Ai, Coinbase, Google, Yandex

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given two vectors of integers `v1` and `v2`, implement an iterator to return their elements alternately.

Implement the `ZigzagIterator` class:

- `ZigzagIterator(List<int> v1, List<int> v2)` initializes the object with the two vectors `v1` and `v2`.
- `boolean hasNext()` returns `true` if the iterator still has elements, and `false` otherwise.
- `int next()` returns the current element of the iterator and moves the iterator to the next element.

**Follow up:** What if you are given `k` vectors? How well can your code be extended to such cases?

**Clarification for the follow-up question:**

The "Zigzag" order is not clearly defined and is ambiguous for `k > 2` cases. If "Zigzag" does not look right to you, replace "Zigzag" with "Cyclic".

**Follow-up Example:**

```
**Input:** v1 = [1,2,3], v2 = [4,5,6,7], v3 = [8,9]
**Output:** [1,4,8,2,5,9,3,6,7]
```

**Constraints:**
- `0 <= v1.length, v2.length <= 1000`
- `1 <= v1.length + v2.length <= 2000`
- `-2^31 <= v1[i], v2[i] <= 2^31 - 1`

## Examples

**Example 1:**
```
Input: v1 = [1,2], v2 = [3,4,5,6]
Output: [1,3,2,4,5,6]
Explanation: By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,3,2,4,5,6].
```

**Example 2:**
```
Input: v1 = [1], v2 = []
Output: [1]
```

**Example 3:**
```
Input: v1 = [], v2 = [1]
Output: [1]
```

## Approach
Use a queue to store active iterators. Initially push iterators for any non-empty input vector. For each `next()` call, pop the front iterator, retrieve its current value, and if it has more elements, push it back. `hasNext()` checks if the queue is non-empty.

```text
FUNCTION ZigzagIterator(v1, v2):
    SET queue ← empty deque
    IF v1 is not empty: queue.APPEND(iterator over v1)
    IF v2 is not empty: queue.APPEND(iterator over v2)

FUNCTION next():
    SET it ← queue.POPLEFT()
    SET val ← it.NEXT()
    IF it has more elements:
        queue.APPEND(it)
    RETURN val

FUNCTION hasNext():
    RETURN queue is not empty
```

## Walkthrough
| Step | Queue (iterators) | Returned Value |
|------|-------------------|----------------|
| Start | `[it(v1), it(v2)]` | – |
| next() | pop `it(v1)` → `1`; push back `it(v1)` | `1` |
| next() | pop `it(v2)` → `3`; push back `it(v2)` | `3` |
| next() | pop `it(v1)` → `2`; `it(v1)` exhausted, not re-queued | `2` |
| next() | pop `it(v2)` → `4`; push back `it(v2)` | `4` |
| … | continue until queue empty |

## Complexity Analysis
- **Time:** Each `next()` and `hasNext()` operation runs in **O(1)** amortized time.
- **Space:** Stores at most two iterators → **O(1)** extra space.

## Follow-Up Questions
1. How would you extend this design to `k` vectors?
2. Can you implement the iterator without using extra space for a queue?
3. How would you handle infinite streams where one iterator never ends?

## Key Takeaway
A queue of active iterators enables constant-time alternating traversal across multiple sequences.
