# 2138. Divide a String Into Groups of Size k

**Difficulty:** 🟢 Easy
**Companies:** Bloomberg, Canonical, Google

---

## Problem Description

Divide string `s` into groups of size `k`. If the last group is shorter, pad with `fill` character.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "abcdef", k = 2, fill = "x"` | `["ab","cd","ef"]` | Length is already divisible by `k`, no padding needed. |
| `s = "abcde", k = 3, fill = "x"` | `["abc","dex"]` | Pad with one `x` to make length 6, then split. |
| `s = "a", k = 4, fill = "0"` | `["a000"]` | Pad with three `0`s to reach length 4.

---

## Approach: Pad and Slice ✅

```text
FUNCTION divideString(s, k, fill):
    // Pad until length divisible by k
    WHILE LENGTH(s) MOD k != 0:
        SET s ← s + fill
    // Slice into chunks of size k
    SET groups ← []
    FOR i ← 0 TO LENGTH(s) - 1 STEP k:
        APPEND SUBSTRING(s, i, i + k) TO groups
    RETURN groups
```

The insight is to make the string length a multiple of `k` first, then a simple fixed‑size slicing yields the groups.

---

## Walkthrough

Take `s = "abcde"`, `k = 3`, `fill = "x"`:

1. Length of `s` is 5, `5 MOD 3 = 2` → not divisible.
2. Append `fill` → `s = "abcdex"` (length 6, now divisible).
3. Iterate `i = 0, 3`:
   - `i=0`: take `s[0:3] = "abc"`.
   - `i=3`: take `s[3:6] = "dex"`.
4. Result `["abc","dex"]`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(n) | One pass for padding and one pass for slicing. |
| **Space** | O(n) | Output list of groups plus possible padding. |

---

## Follow-Up Questions

- How would you handle Unicode characters where length may differ from byte count?
- Can you perform the operation in‑place on a mutable character array?
- What if the groups must be formed without padding, discarding leftover characters?

---

## Key Takeaway

> **Pad the string to make its length divisible by `k`, then slice into fixed‑size chunks.**