# 900. RLE Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/rle-iterator](https://leetcode.com/problems/rle-iterator)
**Companies:** Databricks, Google

---

## Problem Description

Implement an iterator over a run-length encoded sequence. Given encoding `[count₁, val₁, count₂, val₂, ...]`, support `next(n)` which exhausts the next `n` elements and returns the last element exhausted (or `-1` if exhausted).

---

## Examples

| encoding | calls | output |
|----------|-------|--------|
| `[3,8,0,9,2,5]` | `next(2)` → `8` | consumes two 8s |
| | `next(1)` → `8` | consumes last 8 |
| | `next(1)` → `5` | skips zero 9s, returns 5 |
| | `next(2)` → `-1` | only one 5 left, then exhausted |

## Approach

```
CLASS RLEIterator:
    INIT(encoding):
        self.encoding ← encoding
        self.index ← 0

    FUNCTION next(n):
        WHILE self.index < LENGTH(self.encoding):
            IF self.encoding[self.index] >= n:
                self.encoding[self.index] -= n
                RETURN self.encoding[self.index + 1]
            n -= self.encoding[self.index]
            self.index += 2
        RETURN -1
```

## Walkthrough

1. Start with `encoding = [3,8,0,9,2,5]`, `index = 0`.
2. `next(2)`: `encoding[0]=3 >=2` → decrement to `1`, return `8`.
3. `next(1)`: `encoding[0]=1 >=1` → decrement to `0`, return `8`.
4. `next(1)`: `encoding[0]=0 <1` → subtract `0`, move `index` to `2` (skip zero‑count 9). Now `encoding[2]=2 >=1` → decrement to `1`, return `5`.
5. `next(2)`: `encoding[2]=1 <2` → subtract `1`, move `index` to `4` (end). No more runs, return `-1`.

## Complexity Analysis

- **Time:** O(k) per `next` call amortized, where k is number of runs consumed.
- **Space:** O(1) extra – modifies the encoding in place.

---

## Key Takeaway

> Maintain a pointer into the encoding; on each `next(n)`, consume runs until `n` is satisfied — classic "consume from a stream" iterator pattern.
