# 3121. Count the Number of Special Characters II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-special-characters-ii](https://leetcode.com/problems/count-the-number-of-special-characters-ii)
**Companies:** Amazon, Microsoft

---

## Problem Description

You are given a string `word`. A letter `c` is called **special** if it appears **both** in lowercase and uppercase in `word`, and **every** lowercase occurrence of `c` appears before the **first** uppercase occurrence of `c`.

Return the number of **special** letters in `word`.

**Constraints:**
- `1 <= word.length <= 2 * 10^5`
- `word` consists of only lowercase and uppercase English letters.

---

## Examples

```
Example 1:
  Input: word = "aaAbcBC"
  Output: 3
  Explanation: The special characters are 'a', 'b', and 'c'.
```

```
Example 2:
  Input: word = "abc"
  Output: 0
  Explanation: There are no special characters in word.
```

```
Example 3:
  Input: word = "AbBCab"
  Output: 0
  Explanation: There are no special characters in word.
```

---

## Approach

```text
FUNCTION numberOfSpecialChars(word):
    lastLower ← MAP()
    firstUpper ← MAP()
    FOR i FROM 0 TO LENGTH(word)-1:
        c ← word[i]
        IF IS_LOWERCASE(c):
            lastLower[c] ← i
        ELSE:
            lower ← TO_LOWERCASE(c)
            IF lower NOT IN firstUpper OR i < firstUpper[lower]:
                firstUpper[lower] ← i
    count ← 0
    FOR ch FROM 'a' TO 'z':
        IF ch IN lastLower AND ch IN firstUpper AND lastLower[ch] < firstUpper[ch]:
            count ← count + 1
    RETURN count
```

---

## Walkthrough

Consider `word = "abBA"`.

1. Scan the string:
   - Index 0, `'a'` (lower) → `lastLower['a'] = 0`.
   - Index 1, `'b'` (lower) → `lastLower['b'] = 1`.
   - Index 2, `'B'` (upper) → `firstUpper['b'] = 2`.
   - Index 3, `'A'` (upper) → `firstUpper['a'] = 3`.
2. After the pass we have:
   - `lastLower = {'a':0, 'b':1}`
   - `firstUpper = {'b':2, 'a':3}`
3. Evaluate each letter:
   - `'a'`: `0 < 3` → count = 1.
   - `'b'`: `1 < 2` → count = 2.
   - All other letters lack both cases.
4. Return `2`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — single pass over the string |
| **Space** | O(1) — maps store at most 26 entries |

---

## Follow-Up Questions

1. How would the solution change if the ordering constraint were reversed (uppercase before lowercase)?
2. What if the input string could contain Unicode letters beyond the English alphabet?
3. Could you extend the algorithm to also return the list of special characters, not just the count?

---

## Key Takeaway

> **Track the last lowercase index and first uppercase index for each letter. A letter is special if both exist and the last lowercase appears before the first uppercase.**
