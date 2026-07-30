# 2301. Match Substring After Replacement

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/match-substring-after-replacement](https://leetcode.com/problems/match-substring-after-replacement)
**Companies:** Discord

---

## 1. Problem Description

Check if `sub` can match some substring of `s` after allowed character replacements (given as mapping pairs).

---

## 2. Examples

| s | sub | Mappings | Output |
|---|-----|----------|--------|
| "abcde" | "axc" | [("x","b")] | true |
| "abcd" | "abf" | [] | false |
| "aabbcc" | "abc" | [("a","b"), ("b","c")] | true |

---

## 3. Walkthrough

1. Build a hash set `allowed` containing all ordered pairs `(old, new)` from the given mappings.
2. For each possible start index `i` in `s` where `sub` could fit (`0 … len(s)-len(sub)`):
   - For each position `j` in `sub` compare `sub[j]` with `s[i+j]`.
   - Characters match if they are equal **or** the pair `(sub[j], s[i+j])` exists in `allowed`.
   - If any position fails, break and move to the next start index.
3. If a start index passes all character checks, return **true**.
4. After scanning all start positions without success, return **false**.

---

## 4. Approach: Brute Force with Mapping Set — O(n·m) ✅

```
// Build set of allowed replacements: (old, new) pairs
// For each starting position in s, check if sub matches character by character
// A character matches if equal or replacement (sub[j] → s[i+j]) is allowed
```

---

## 5. Complexity Analysis

- **Time:** O(n·m) – `n` is length of `s`, `m` is length of `sub`; each start position scans `sub`.
- **Space:** O(|mappings|) – storage for the replacement set.

---

## 6. Follow-Up Questions

- How would you adapt the solution if replacements could be chained (e.g., a→b and b→c implies a→c)?
- Can you achieve better than O(n·m) using advanced string matching techniques like KMP with wildcard support?
- What changes are needed if multiple substrings need to be checked simultaneously?

---

## Key Takeaway

> Pre‑build a set of allowed replacement pairs and slide `sub` over `s`, checking each character in O(1) time.