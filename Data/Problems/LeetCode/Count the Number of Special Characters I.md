# 3120. Count the Number of Special Characters I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-special-characters-i](https://leetcode.com/problems/count-the-number-of-special-characters-i)
**Companies:** Amazon, Google

---

## Problem Description

You are given a string `word`. A letter is called **special** if it appears **both** in lowercase and uppercase in `word`.

Return the number of **special** letters in `word`.

**Constraints:**
- `1 <= word.length <= 50`
- `word` consists of only lowercase and uppercase English letters.

---

## Examples

```
Example 1:
  Input: word = "aaAbcBC"
  Output: 3
  Explanation: The special characters in word are 'a', 'b', and 'c'.
```

```
Example 2:
  Input: word = "abc"
  Output: 0
  Explanation: No character in word appears in uppercase.
```

```
Example 3:
  Input: word = "abBCab"
  Output: 1
  Explanation: The only special character in word is 'b'.
```

---

## Approach

```text
FUNCTION numberOfSpecialChars(word):
    chars ← SET(word)
    count ← 0
    FOR c FROM 'a' TO 'z':
        IF c IN chars AND UPPERCASE(c) IN chars:
            count ← count + 1
    RETURN count
```

---

## Walkthrough

Consider **Example 1** (`word = "abBA"`).

1. Build a set of characters: `{ 'a','b','B','A' }`.
2. Iterate over each lowercase letter:
   - `'a'` is in the set and `'A'` is also in the set → count = 1.
   - `'b'` is in the set and `'B'` is also in the set → count = 2.
   - All other letters either missing or their uppercase counterpart is missing.
3. Return `count = 2`.

The algorithm runs in linear time over the string length and constant extra space.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — one pass to build the set and one pass over 26 letters |
| **Space** | O(1) — the set holds at most 52 characters |

---

## Follow-Up Questions

1. How would you modify the solution if the string could contain Unicode characters beyond the English alphabet?
2. What if you needed to return the list of special characters instead of just the count?
3. How would the approach change if the problem required case‑insensitive counting (treat 'a' and 'A' as the same character)?

---

## Key Takeaway

> **Build a set of all characters, then check each letter for both cases. Simpler than version II since no ordering constraint.**