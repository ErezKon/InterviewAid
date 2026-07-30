# 3837. Delayed Count of Equal Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delayed-count-of-equal-elements](https://leetcode.com/problems/delayed-count-of-equal-elements)
**Companies:** Mitsogo

---

## Problem Description

Process a stream of elements with delayed counting — track how many times each element has appeared, but with a delay mechanism before counts are finalized.

---

## Examples

| Input Stream | Delay | Output |
|--------------|-------|--------|
| [1,2,1,2,1] | 2 | [0,0,1,1,2] |
| [5,5,5,5] | 1 | [0,1,2,3] |

---

## Approach

```
FUNCTION delayedCount(stream, d):
    // hashmap to store frequencies
    freq = {}
    // queue to hold elements waiting for delay
    waitQueue = []
    result = []
    FOR element IN stream:
        // add element to waiting queue
        waitQueue.APPEND(element)
        // if queue size exceeds delay, finalize count for oldest element
        IF LENGTH(waitQueue) > d:
            oldest = waitQueue.POP_FRONT()
            freq[oldest] = freq.get(oldest, 0) + 1
        // current count for this element is its frequency so far (excluding waiting ones)
        result.APPEND(freq.get(element, 0))
    // finalize remaining elements after stream ends (optional based on problem spec)
    RETURN result
```

---

## Walkthrough

1. Initialize empty hashmap `freq` and empty queue `waitQueue`.
2. For each incoming element, push it onto `waitQueue`.
3. When `waitQueue` length exceeds the delay `d`, pop the front element, increment its count in `freq`.
4. The output for the current element is the current frequency of that element in `freq` (i.e., counts that have already been finalized).
5. Continue until the stream ends; any remaining elements in the queue are not counted until their delay expires.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each element is processed a constant number of times |
| **Space** | O(m) – hashmap for distinct elements plus queue of size ≤ delay |

---

## Follow-Up Questions

- How would you adapt the solution if the delay is dynamic per element?
- Can you support decrement operations where an element’s count should be reduced after a certain condition?

---

## Key Takeaway

> **Use a hashmap for frequencies combined with a sliding‑window‑style queue to enforce the required delay before counts become visible.**