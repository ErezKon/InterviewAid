# 1002. Find Common Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-common-characters](https://leetcode.com/problems/find-common-characters)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tripadvisor

---

## Problem Description

Return a list of characters that appear in **all** strings (including duplicates at their minimum frequency).

---

## Approach: Counter Intersection — O(n × L) ✅

```text
FUNCTION commonChars(words):
    common ← Counter(words[0])
    FOR word IN words[1:]:
        common &= Counter(word)    // intersection (min counts)
    RETURN list(common.elements())
```

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `["bella","label","roller"]` | `["e","l","l"]` | Characters `e` and `l` appear in all strings; `l` appears twice in each, so it is listed twice. |
| `["cool","lock","cook"]` | `["c","o"]` | `c` and `o` are common to all three strings. |

---

## Walkthrough

Consider the first example:
1. Initialize `common` with counts of the first word `"bella"` → `{b:1, e:1, l:2, a:1}`.
2. Intersect with `"label"` → `{e:1, l:1, a:1}` (minimum counts).
3. Intersect with `"roller"` → `{e:1, l:1}`.
4. Expand the counter to a list → `["e","l"]` (but `l` appears twice in the final intersection, so output `["e","l","l"]`).

---

## Complexity Analysis

- **Time:** O(n × L) where *n* is the number of strings and *L* is the average length of a string (each character is processed once per string).
- **Space:** O(C) where *C* is the size of the character set (at most 26 for lowercase English letters).

---

## Follow-Up Questions

- How would you modify the solution to handle Unicode characters?
- Can you solve the problem without using a Counter data structure?
- How would you extend the approach to find characters that appear in **at least k** strings?

---

## Key Takeaway

> **Counter intersection (`&=`) keeps minimum counts across all words. `elements()` expands the counter back to a list with duplicates.**