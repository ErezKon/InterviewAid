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

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) amortized per call |
| **Space** | O(1) — no extra storage |

---

## 5. Key Takeaway

> **Two-pointer iterator** with an `advance()` helper to skip empty sub-lists. O(1) amortized per operation.
