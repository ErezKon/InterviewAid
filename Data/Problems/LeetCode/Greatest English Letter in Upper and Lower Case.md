# 2309. Greatest English Letter in Upper and Lower Case

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case](https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case)
**Companies:** Microsoft

---

## 1. Problem Description

Given a string of English letters `s`, return *the **greatest** English letter which occurs as **both** a lowercase and uppercase letter in* `s`. The returned letter should be in **uppercase**. If no such letter exists, return *an empty string*.

An English letter `b` is **greater** than another letter `a` if `b` appears **after** `a` in the English alphabet.

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of lowercase and uppercase English letters.

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

```
Example 1:
  Input: s = "lEeTcOdE"
  Output: "E"
  Explanation: The letter 'E' is the only letter to appear in both lower and upper case.
```
```
Example 2:
  Input: s = "arRAzFif"
  Output: "R"
  Explanation: The letter 'R' is the greatest letter to appear in both lower and upper case.
  Note that 'A' and 'F' also appear in both lower and upper case, but 'R' is greater than 'F' or 'A'.
```
```
Example 3:
  Input: s = "AbCdEfGhIjK"
  Output: ""
  Explanation: There is no letter that appears in both lower and upper case.
```

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
