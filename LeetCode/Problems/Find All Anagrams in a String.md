# 438. Find All Anagrams in a String

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/find-all-anagrams-in-a-string](https://leetcode.com/problems/find-all-anagrams-in-a-string)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Bolt, Databricks, Google, Meta, Microsoft, Revolut, Snowflake, Splunk, Tiktok, Uber, Walmart Labs, Yandex

---

## 1. Problem Description

Given strings `s` and `p`, find all start indices of `p`'s anagrams in `s`. Return in any order.

---

## 2. Examples

| s | p | Output |
|---|---|---|
| "cbaebabacd" | "abc" | [0,6] |
| "abab" | "ab" | [0,1,2] |

*Explanation*: At each output index, the substring of `s` of length `len(p)` is a permutation of `p`.

---

## 3. Approach

**Sliding Window** — O(n) ✅

Maintain a frequency count window of size `len(p)`. Track how many characters have the correct count.

```text
FUNCTION findAnagrams(s, p):
    IF len(s) < len(p): RETURN []
    pCount = frequency of p
    sCount = frequency of s[0..len(p)-1]
    result = []
    matches = 0
    FOR c ← 'a' TO 'z':
        IF sCount[c] == pCount[c]: matches += 1
    FOR i ← 0 TO len(s) - len(p):
        IF matches == 26: result.ADD(i)
        IF i + len(p) < len(s):
            c = s[i + len(p)]
            IF sCount[c] == pCount[c]: matches -= 1
            sCount[c] += 1
            IF sCount[c] == pCount[c]: matches += 1
            c = s[i]
            IF sCount[c] == pCount[c]: matches -= 1
            sCount[c] -= 1
            IF sCount[c] == pCount[c]: matches += 1
    RETURN result
```

---

## 4. Walkthrough

| Step | Window (indices) | sCount vs pCount | Action |
|------|------------------|------------------|--------|
| 0 | [0‑2] "cba" | matches 26? No | No output |
| 1 | [1‑3] "bae" | matches 26? No | No output |
| 2 | [2‑4] "aeb" | matches 26? No | No output |
| 3 | [3‑5] "eba" | matches 26? No | No output |
| 4 | [4‑6] "bab" | matches 26? No | No output |
| 5 | [5‑7] "aba" | matches 26? No | No output |
| 6 | [6‑8] "bac" | matches 26? Yes | Output 6 |
| 7 | [7‑9] "acd" | matches 26? No | End |

---

## 5. Complexity Analysis

- **Time:** O(n) where n = `len(s)` – each character enters and leaves the window once.
- **Space:** O(1) – fixed arrays of size 26 for character counts.

---

## 6. Follow-Up Questions

- How would you modify the solution to return the actual anagram substrings instead of indices?
- Can the algorithm be adapted for Unicode characters beyond lowercase English letters?
- What if `p` contains duplicate characters? (Handled by frequency counts.)

---

## Key Takeaway

> Fixed-size sliding window with frequency comparison. The `matches` counter avoids comparing all 26 characters at each step — O(1) per slide.
