# 3223. Minimum Length of String After Operations

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Bloomberg, Ibm

---

## Problem Description

You can remove two occurrences of a character (one from each side of a third occurrence). Return the **minimum length** of string after performing operations optimally.

## Approach: Frequency Parity — O(n) ✅

```
FUNCTION minimumLength(s):
    count = Counter(s)
    RETURN SUM(2 if c % 2 == 0 else 1 for c in count.values())
```

Each character with even frequency reduces to 2, odd frequency reduces to 1. Removals always take pairs around a center.

| Time | Space |
|------|-------|
| O(n) | O(26) |

## Key Takeaway

> Each character's final count depends only on its frequency's **parity** — even → 2, odd → 1. Operations reduce but can never fully eliminate a character.
