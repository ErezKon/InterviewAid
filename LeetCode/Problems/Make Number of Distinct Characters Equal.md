# 2531. Make Number of Distinct Characters Equal

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/make-number-of-distinct-characters-equal](https://leetcode.com/problems/make-number-of-distinct-characters-equal)
**Companies:** Google

---

## 1. Problem Description

Swap exactly one character between two strings. Check if it's possible to make both have the same number of distinct characters.

---

## 2. Examples

**Example 1:**
```
Input: word1 = "ac", word2 = "b"
Output: true
Explanation: Swap 'c' from word1 with 'b' from word2 → word1 = "ab", word2 = "c". Both now have 2 distinct characters.
```

**Example 2:**
```
Input: word1 = "abc", word2 = "def"
Output: false
Explanation: Any single swap changes distinct counts by at most 1, so they can never become equal.
```

---

## 3. Approach: Enumerate All 26×26 Swaps — O(26²) ✅

```text
FUNCTION canEqualizeDistinct(word1, word2):
    // Count distinct characters in each word
    distinct1 ← SET_OF_CHARACTERS(word1)
    distinct2 ← SET_OF_CHARACTERS(word2)
    count1 ← SIZE(distinct1)
    count2 ← SIZE(distinct2)

    // Frequency maps for quick lookup
    freq1 ← FREQUENCY_MAP(word1)
    freq2 ← FREQUENCY_MAP(word2)

    FOR c1 FROM 'a' TO 'z':
        IF freq1[c1] == 0: CONTINUE
        FOR c2 FROM 'a' TO 'z':
            IF freq2[c2] == 0: CONTINUE
            // Simulate swapping c1 and c2
            newCount1 ← count1
            newCount2 ← count2
            // Effect on word1
            IF freq1[c1] == 1: newCount1 ← newCount1 - 1
            IF freq1[c2] == 0: newCount1 ← newCount1 + 1
            // Effect on word2
            IF freq2[c2] == 1: newCount2 ← newCount2 - 1
            IF freq2[c1] == 0: newCount2 ← newCount2 + 1
            IF newCount1 == newCount2:
                RETURN true
    RETURN false
```

---

## 4. Walkthrough

Take `word1 = "ac"`, `word2 = "b"`.
1. Distinct sets: `{a,c}` (2) and `{b}` (1).
2. Consider swapping `c` (present only in word1) with `b` (present only in word2).
   - Removing `c` (freq 1) reduces word1 distinct to 1.
   - Adding `b` (absent) increases word1 distinct to 2.
   - Removing `b` (freq 1) reduces word2 distinct to 0.
   - Adding `c` (absent) increases word2 distinct to 1.
3. After swap, both have 2 distinct characters → condition satisfied.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(26²) – constant‑time enumeration of character pairs | O(1) – only frequency arrays of size 26 |

---

## 6. Follow-Up Questions

- How would the solution change if multiple swaps were allowed?
- Can the algorithm be extended to Unicode characters beyond the English alphabet?
- What is the impact on complexity if the strings are extremely long (e.g., millions of characters)?

---

## Key Takeaway

> Only 26×26 = 676 possible swaps to try. For each, compute the effect on distinct counts: removing a char that had count 1 decreases distinct by 1, adding a new char increases by 1.
