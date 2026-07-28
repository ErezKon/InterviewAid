# 2828. Check if a String Is an Acronym of Words

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-a-string-is-an-acronym-of-words](https://leetcode.com/problems/check-if-a-string-is-an-acronym-of-words)
**Companies:** Amazon, Uber

---

## 1. Problem Description

Given an array of strings `words` and a string `s`, return `true` if `s` is an acronym of `words` — i.e., `s` is formed by concatenating the first character of each word in order.

---

## 2. Approach: Compare First Characters — O(n) ✅

```text
FUNCTION isAcronym(words, s):
    IF len(s) != len(words): RETURN false
    FOR i FROM 0 TO len(words) - 1:
        IF words[i][0] != s[i]: RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

| words | s | Output |
|-------|---|--------|
| ["apple", "banana", "cherry"] | "abc" | true |
| ["dog", "cat"] | "dc" | true |
| ["hello", "world"] | "hwx" | false |

---

## 4. Walkthrough

Consider `words = ["apple", "banana", "cherry"]` and `s = "abc"`:
1. Lengths match (3).
2. Compare first letters: `"a" == "a"`, `"b" == "b"`, `"c" == "c"`.
3. All match → return `true`.

---

## 5. Complexity Analysis

- **Time:** O(n) where n = number of words (single pass).
- **Space:** O(1) extra space.

---

## 6. Follow-Up Questions

- How would you handle case‑insensitive comparisons?
- What if words may be empty strings?
- Can you extend this to check if `s` is a subsequence of the first letters?

---

## Key Takeaway

> Simple length check + character‑by‑character comparison of first letters against the acronym string.
