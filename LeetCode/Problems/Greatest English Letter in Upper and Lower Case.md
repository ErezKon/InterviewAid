# 2309. Greatest English Letter in Upper and Lower Case

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case](https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case)
**Companies:** Microsoft

---

## 1. Problem Description

Find the greatest (alphabetically last) letter that appears in both uppercase and lowercase in the string.

---

## 2. Approach: Set Check — O(n) ✅

```text
FUNCTION greatestLetter(s):
    SET chars ← SET_OF_CHARACTERS(s)
    FOR c FROM 'Z' DOWNTO 'A':
        IF c IN chars AND LOWERCASE(c) IN chars:
            RETURN c
    RETURN ""
```

---

## 3. Examples

| Input | Output |
|-------|--------|
| "lEeTcOdE" | "E" |
| "arRAz" | "R" |
| "AbCdEf" | "" |

---

## 4. Walkthrough

1. Convert the input string into a set of characters.
2. Iterate from 'Z' down to 'A'.
3. For each letter, check if both the uppercase and its lowercase version exist in the set.
4. Return the first letter that satisfies the condition; if none, return an empty string.

---

## 5. Complexity Analysis

- **Time:** O(n) where n is the length of the string (building the set and scanning 26 letters).
- **Space:** O(1) extra space for the set of at most 52 characters.

---

## Key Takeaway

> Build a set, iterate from 'Z' down to 'A', check if both cases exist.
