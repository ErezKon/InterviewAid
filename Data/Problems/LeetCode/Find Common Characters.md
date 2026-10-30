# 1002. Find Common Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-common-characters](https://leetcode.com/problems/find-common-characters)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tripadvisor

---

## Problem Description

Given a string array `words`, return *an array of all characters that show up in all strings within the* `words` *(including duplicates)*. You may return the answer in **any order**.

**Constraints:**

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of lowercase English letters.

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

```
Example 1:
  Input: words = ["bella","label","roller"]
  Output: ["e","l","l"]
```

```
Example 2:
  Input: words = ["cool","lock","cook"]
  Output: ["c","o"]
```

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