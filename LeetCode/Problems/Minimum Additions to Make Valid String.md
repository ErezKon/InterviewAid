# 2645. Minimum Additions to Make Valid String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-additions-to-make-valid-string](https://leetcode.com/problems/minimum-additions-to-make-valid-string)
**Companies:** Amazon, Google, Microsoft, Tokopedia

---

## Key Insight

> Process the string matching against the repeating pattern `"abc"`. For each cycle, try to match `a`, `b`, `c` in order — if the current character matches, advance; otherwise, count an addition.

---

## Approach: Greedy Pattern Matching — O(n) ✅

```
FUNCTION addMinimum(word):
    additions ← 0
    i ← 0
    WHILE i < LEN(word) DO
        FOR c IN "abc" DO
            IF i < LEN(word) AND word[i] = c THEN
                i ← i + 1
            ELSE
                additions ← additions + 1
    RETURN additions
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | **O(1)** |

---

## Key Takeaway

> **Greedy cycle matching** — walk through the string matching against repeating `"abc"` cycles. Missing characters in each cycle must be added.

---
