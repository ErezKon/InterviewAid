# 1405. Longest Happy String

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/longest-happy-string](https://leetcode.com/problems/longest-happy-string)
**Companies:** Amazon, Bloomberg, Capgemini, Geico, Google, Microsoft, Tiktok, Wayfair

---

## 1. Problem Description

Given counts of 'a', 'b', 'c', construct the longest string where no letter appears more than 2 times consecutively.

---

## 2. Approach: Greedy with Max-Heap — O(a+b+c) ✅

```
FUNCTION longestDiverseString(a, b, c):
    heap = MaxHeap()
    IF a > 0: heap.PUSH((a, 'a'))
    IF b > 0: heap.PUSH((b, 'b'))
    IF c > 0: heap.PUSH((c, 'c'))

    result = []

    WHILE heap:
        (count1, char1) = heap.POP()

        // If last 2 chars are same as char1, use second most frequent
        IF len(result) >= 2 AND result[-1] == char1 AND result[-2] == char1:
            IF heap is empty: BREAK

            (count2, char2) = heap.POP()
            result.ADD(char2)
            IF count2 - 1 > 0: heap.PUSH((count2 - 1, char2))
            heap.PUSH((count1, char1))
        ELSE:
            result.ADD(char1)
            IF count1 - 1 > 0: heap.PUSH((count1 - 1, char1))

    RETURN JOIN(result)
```

| Time | Space |
|------|-------|
| O(a + b + c) | O(1) |

---

## Key Takeaway

> Greedy: always pick the most frequent character unless it would create a triple. In that case, pick the second most frequent. Max-heap makes this efficient.
