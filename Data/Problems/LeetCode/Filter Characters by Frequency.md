# 3662. Filter Characters by Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/filter-characters-by-frequency](https://leetcode.com/problems/filter-characters-by-frequency)
**Companies:** Opentext

---

## Problem Description

Given a string `s`, remove all characters whose frequency is strictly less than the average frequency of all distinct characters. Return the filtered string maintaining original order.

---

## Examples

**Example 1:**
```
Input: s = "aabccc"
Average frequency = (2 + 1 + 3) / 3 = 2
Output: "aabccc" (characters with frequency ≥ 2 are kept: 'a' and 'c')
```

**Example 2:**
```
Input: s = "abcde"
Average frequency = (1+1+1+1+1)/5 = 1
Output: "abcde" (all characters have frequency equal to average)
```

---

## Approach: Count + Filter ✅

```text
FUNCTION filterByFrequency(s):
    freq ← MAP of character → count
    FOR char IN s:
        freq[char] ← freq.get(char, 0) + 1
    avg ← SUM of freq.values() / SIZE of freq
    result ← EMPTY STRING
    FOR char IN s:
        IF freq[char] ≥ avg:
            APPEND char TO result
    RETURN result
```

---

## Walkthrough

Consider **Example 1** (`s = "aabccc"`):
| Step | Action | freq map | avg | result |
|------|--------|----------|-----|--------|
| 1 | Count frequencies | {a:2, b:1, c:3} | 2 | "" |
| 2 | Compute avg = (2+1+3)/3 = 2 |
| 3 | Iterate original string:
- 'a' (freq 2 ≥ 2) → result = "a"
- 'a' (freq 2) → result = "aa"
- 'b' (freq 1 < 2) → skip
- 'c' (freq 3 ≥ 2) → result = "aac"
- 'c' → result = "aacc"
- 'c' → result = "aaccc" |
Final result = "aacc c" → "aabccc" after preserving original order (note 'b' removed).

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass to count, another pass to build result |
| **Space** | O(k) — map for `k` distinct characters |

---

## Follow‑Up Questions

1. How would you modify the algorithm to keep characters whose frequency is **greater than** the median frequency?
2. Can the solution be adapted to work with Unicode characters beyond ASCII?
3. What if the average frequency should be rounded up before comparison?

---

## Key Takeaway

> **Count frequencies, compute the average, and filter out characters below that threshold while preserving order.**
