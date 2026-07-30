# 1062. Longest Repeating Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-repeating-substring](https://leetcode.com/problems/longest-repeating-substring)
**Companies:** Amazon, Coupang, Google, Meta

---

## 1. Problem Description

Find the length of the longest substring that occurs at least twice.

---

## 2. Approach: Binary Search + Rolling Hash — O(n log n) ✅

```
FUNCTION longestRepeatingSubstring(s):
    lo ← 0
    hi ← LENGTH(s) - 1
    WHILE lo < hi:
        mid ← (lo + hi + 1) / 2
        IF hasRepeat(s, mid):
            lo ← mid
        ELSE:
            hi ← mid - 1
    RETURN lo

FUNCTION hasRepeat(s, length):
    seen ← SET()
    FOR i ← 0 TO LENGTH(s) - length:
        sub ← s[i : i + length]
        IF sub IN seen:
            RETURN true
        seen.ADD(sub)
    RETURN false
```

---

## Examples

| Input | Output |
|-------|--------|
| `"abcd"` | `0` |
| `"abab"` | `2` |
| `"banana"` | `3` |

---

## Walkthrough

Consider `s = "banana"`.

1. Binary search range `lo=0`, `hi=5`.
2. `mid=3` → check length 3 substrings: `"ban"`, `"ana"`, `"nan"`, `"ana"`. Duplicate `"ana"` found → `lo=3`.
3. `mid=4` → substrings: `"bana"`, `"anan"`, `"nana"`. No duplicates → `hi=3`.
4. Loop ends, return `lo=3`. The longest repeating substring is `"ana"` of length 3.

---

## Complexity Analysis

- **Time:** O(n log n) – binary search over lengths, each check scans the string.
- **Space:** O(n) – hash set storing seen substrings for a given length.

---

## Follow-Up Questions

1. How would you improve the check to O(n) using a rolling hash (Rabin‑Karp) to avoid storing full substrings?
2. Can the problem be solved in O(n) time using suffix arrays or suffix trees?
3. What changes are needed if you must return the substring itself, not just its length?

---

## Key Takeaway

> Binary search on substring length combined with a hash‑based duplicate check efficiently finds the longest repeating substring.
