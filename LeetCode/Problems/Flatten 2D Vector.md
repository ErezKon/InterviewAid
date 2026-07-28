# 251. Flatten 2D Vector

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flatten-2d-vector](https://leetcode.com/problems/flatten-2d-vector)
**Companies:** Airbnb, Google, Twitter, Zenefits

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Two Pointers — O(1) amortized ✅](#3-approach-two-pointers--o1-amortized-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Implement an iterator that flattens a 2D vector, supporting `next()` and `hasNext()`.

**Constraints:**
- `0 <= vec.length <= 200`

---

## 2. Key Insight

> Use two pointers: `outer` (which inner list) and `inner` (position within). An `advance()` helper skips empty inner lists.

---

## 3. Approach: Two Pointers — O(1) amortized ✅

```
CLASS Vector2D:
    CONSTRUCTOR(vec):
        self.vec = vec
        self.outer = 0; self.inner = 0
        self.advance()

    FUNCTION advance():
        WHILE outer < len(vec) AND inner >= len(vec[outer]):
            outer += 1; inner = 0

    FUNCTION next():
        val = vec[outer][inner]
        inner += 1; advance()
        RETURN val

    FUNCTION hasNext():
        RETURN outer < len(vec)
```

---

## Examples

**Example 1:**
```
Input: vec = [[1,2],[3],[4,5,6]]
Operations: next(), next(), next(), next(), next(), next(), hasNext()
Output: 1,2,3,4,5,6,false
```
Explanation: The iterator returns elements in row‑major order until exhausted.

**Example 2:**
```
Input: vec = []
Operations: hasNext()
Output: false
```
Explanation: Empty vector yields no elements.

---

## Walkthrough

| Step | outer | inner | Action |
|------|-------|-------|--------|
| Init | 0 | 0 | `advance()` skips no empty lists |
| next() | 0 | 0 | Return 1, inner→1 |
| next() | 0 | 1 | Return 2, inner→2 → `advance()` moves to outer=1, inner=0 |
| next() | 1 | 0 | Return 3, inner→1 → `advance()` moves to outer=2, inner=0 |
| next() | 2 | 0 | Return 4, inner→1 |
| next() | 2 | 1 | Return 5, inner→2 |
| next() | 2 | 2 | Return 6, inner→3 → `advance()` moves outer→3 (end) |
| hasNext() | 3 | 0 | outer >= len(vec) → false |

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) amortized per call |
| **Space** | O(1) — no extra storage |

---

## Follow-Up Questions

- How would you modify the iterator to support a `remove()` operation?
- Can you design a similar iterator for a 3‑dimensional vector?
- What changes are needed if the input is a stream of vectors rather than a static 2D array?

---

## 5. Key Takeaway

> **Two-pointer iterator** with an `advance()` helper to skip empty sub-lists. O(1) amortized per operation.
