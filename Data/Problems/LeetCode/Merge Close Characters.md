# 3853. Merge Close Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/merge-close-characters](https://leetcode.com/problems/merge-close-characters)
**Companies:** Zoho

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string `s` consisting of lowercase English letters and an integer `k`.

Two **equal** characters in the **current** string `s` are considered **close** if the distance between their indices is **at most** `k`.

When two characters are **close**, the right one merges into the left. Merges happen **one at a time**, and after each merge, the string updates until no more merges are possible.

Return the resulting string after performing all possible merges.

**Note**: If multiple merges are possible, always merge the pair with the **smallest left** index. If multiple pairs share the smallest left index, choose the pair with the **smallest right** index.

**Constraints:**
- `1 ≤ s.length ≤ 100`
- `1 ≤ k ≤ s.length`
- `s` consists of lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "abca", k = 3
  Output: "abc"
  Explanation:
  - Characters 'a' at indices i = 0 and i = 3 are close as 3 - 0 = 3 <= k.
  - Merge them into the left 'a' and s = "abc".
  - No other equal characters are close, so no further merges occur.
```

```
Example 2:
  Input: s = "aabca", k = 2
  Output: "abca"
  Explanation:
  - Characters 'a' at indices i = 0 and i = 1 are close as 1 - 0 = 1 <= k.
  - Merge them into the left 'a' and s = "abca".
  - Now the remaining 'a' characters at indices i = 0 and i = 3 are not close as k < 3, so no further merges occur.
```

```
Example 3:
  Input: s = "yybyzybz", k = 2
  Output: "ybzybz"
  Explanation:
  - Characters 'y' at indices i = 0 and i = 1 are close as 1 - 0 = 1 <= k.
  - Merge them into the left 'y' and s = "ybyzybz".
  - Now the characters 'y' at indices i = 0 and i = 2 are close as 2 - 0 = 2 <= k.
  - Merge them into the left 'y' and s = "ybzybz".
  - No other equal characters are close, so no further merges occur.
```

---

## Key Insight

> Use a **stack** to simulate the merging process. Push characters one by one; when the top of the stack and the current character are "close" (differ by ≤ 1), pop and keep the smaller, then continue checking the new top.

---

## Approach

```
FUNCTION mergeCloseCharacters(s):
    stack ← []
    FOR ch IN s DO
        WHILE stack NOT EMPTY AND |stack.TOP - ch| ≤ 1 DO
            ch ← MIN(stack.POP(), ch)
        stack.PUSH(ch)
    RETURN JOIN(stack)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack simulation | **O(n)** | **O(n)** |

Each character is pushed and popped at most once.

---

## Key Takeaway

> **Stack-based merging** — when adjacent elements can merge under a condition, a stack naturally handles cascading merges in linear time.

---
