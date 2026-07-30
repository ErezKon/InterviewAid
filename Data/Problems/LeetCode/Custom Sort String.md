# 791. Custom Sort String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/custom-sort-string](https://leetcode.com/problems/custom-sort-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description

Rearrange characters of `s` so they follow the ordering defined by `order`. Characters not in `order` can go anywhere.

---

## Approach

```text
FUNCTION customSortString(order, s):
    count ← empty map
    FOR ch IN s:
        INCREMENT count[ch]
    result ← empty string
    FOR ch IN order:
        IF ch IN count:
            result ← result + REPEAT(ch, count[ch])
            REMOVE ch FROM count
    FOR ch, cnt IN count:
        result ← result + REPEAT(ch, cnt)
    RETURN result
```

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `order = "cba"`<br>`s = "abcd"` | `"cbad"` | Characters `c`, `b`, `a` appear first respecting `order`; `d` (not in `order`) can be placed anywhere, here at the end.
| `order = "bcafg"`<br>`s = "abcd"` | `"bcad"` | Follow `order` for `b`, `c`, `a`; `d` is appended after ordered characters.

---

## Walkthrough

**Example 1** – `order = "cba"`, `s = "abcd"`

1. Count frequencies: `{a:1, b:1, c:1, d:1}`.
2. Iterate `order`:
   - `c` present → append `c`, remove from map.
   - `b` present → append `b`, remove.
   - `a` present → append `a`, remove.
3. Remaining map `{d:1}` → append `d`.
4. Result string: `"cbad"`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) where n = len(s) |
| **Space** | O(n) |

---

## Follow-Up Questions

1. How would you modify the algorithm to handle Unicode characters beyond the basic ASCII set?
2. Can you solve the problem in a single pass without using extra space for counting frequencies?
3. How would you adapt the solution if `order` could contain duplicate characters?

---

## Key Takeaway

> **Custom ordering via counting sort: count character frequencies, output in `order` sequence first, then append remaining characters.**