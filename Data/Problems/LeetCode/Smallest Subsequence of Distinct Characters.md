# 1081. Smallest Subsequence of Distinct Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-subsequence-of-distinct-characters](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters)
**Companies:** Amazon, Bytedance, Factset, Google

---

## Problem Description

Given a string `s`, return the lexicographically smallest subsequence that contains all distinct characters of `s` exactly once. Identical to problem 316 (Remove Duplicate Letters).

### Examples

- **Input:** `s = "bcabc"` → **Output:** `"abc"`
- **Input:** `s = "cbacdcbc"` → **Output:** `"acdb"`

## Approach: Monotonic Stack — O(n) ✅

**Key Insight:** Use a monotonic stack. Pop larger characters from the stack if they appear again later, ensuring the smallest lexicographic order while keeping all distinct chars.

```
FUNCTION smallestSubsequence(s):
    last = {c: i for i, c in enumerate(s)}
    stack = []; seen = set()
    FOR i, c IN enumerate(s):
        IF c IN seen: CONTINUE
        WHILE stack AND c < stack[-1] AND last[stack[-1]] > i:
            seen.REMOVE(stack.POP())
        stack.PUSH(c); seen.ADD(c)
    RETURN JOIN(stack)
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) — at most 26 chars |
