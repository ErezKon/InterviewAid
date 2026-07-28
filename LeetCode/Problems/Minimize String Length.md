# 2716. Minimize String Length

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimize-string-length](https://leetcode.com/problems/minimize-string-length)
**Companies:** Bloomberg, Google

---

## Problem Description

Given a string `s`, you can pick any character and remove the **closest** occurrence of the same character to its left or right (not itself). Minimize the string length.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aaabbb"` | `2` | Remove duplicate `a` and `b` characters until only one of each remains, leaving "ab".
| `"abc"` | `3` | All characters are distinct, no removal possible.
| `"zzzz"` | `1` | All `z` characters can be removed except one.

---

## Approach

The operation can eliminate any duplicate character by repeatedly removing the nearest duplicate. Consequently, each distinct character will remain exactly once. The minimal possible length is therefore the count of distinct characters in the string.

```text
FUNCTION minimizedStringLength(s):
    // Convert string to a set of characters to keep only unique ones
    SET uniqueChars ← SET(s)
    RETURN LEN(uniqueChars)
```

---

## Walkthrough

Consider the input `"aaabbb"`:

1. Unique characters are `{ 'a', 'b' }`.
2. Length of this set is `2`.
3. No further reductions are possible, so the minimal length is `2`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Count distinct | **O(n)** | **O(1)** (at most 26 lowercase letters) |

---

## Follow-Up Questions

- How would the solution change if the string could contain Unicode characters?
- Can you extend the approach to return the actual minimized string, not just its length?
- What if removal is only allowed for adjacent duplicate characters?

---

## Key Takeaway

> **Duplicate elimination** — the operation removes duplicates until each character appears at most once. The answer is the count of distinct characters.

---