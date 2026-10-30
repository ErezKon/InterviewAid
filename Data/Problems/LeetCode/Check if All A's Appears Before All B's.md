# 2124. Check if All A's Appears Before All B's

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-as-appears-before-all-bs](https://leetcode.com/problems/check-if-all-as-appears-before-all-bs)
**Companies:** Bloomberg, Microsoft

---

## 1. Problem Description

Given a string `s` consisting of **only** the characters `'a'` and `'b'`, return `true` *if **every*** `'a'` *appears before **every*** `'b'` *in the string*. Otherwise, return `false`.

**Constraints:**
- `1 <= s.length <= 100`
- `s[i]` is either `'a'` or `'b'`.

---

## 2. Examples

```
Example 1:
  Input: s = "aaabbb"
  Output: true
  Explanation:
  The 'a's are at indices 0, 1, and 2, while the 'b's are at indices 3, 4, and 5.
  Hence, every 'a' appears before every 'b' and we return true.
```

```
Example 2:
  Input: s = "abab"
  Output: false
  Explanation:
  There is an 'a' at index 2 and a 'b' at index 1.
  Hence, not every 'a' appears before every 'b' and we return false.
```

```
Example 3:
  Input: s = "bbb"
  Output: true
  Explanation:
  There are no 'a's, hence, every 'a' appears before every 'b' and we return true.
```

---

## 3. Approach: Check for "ba" — O(n) ✅

```text
FUNCTION allABeforeB(s):
    // Scan for forbidden pattern
    FOR i ← 0 TO LENGTH(s) - 2:
        IF s[i] = 'b' AND s[i+1] = 'a':
            RETURN false
    RETURN true
```

---

## 4. Walkthrough

Consider `s = "aababb"`.

| Index | Char | Condition Check |
|-------|------|-----------------|
| 0     | a    | No `"ba"` yet |
| 1     | a    | No `"ba"` yet |
| 2     | b    | Look ahead: next is `a` → violation |

At index 2 we see `"ba"`, so the function returns `false`.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass over the string.
- **Space:** O(1) – only constant‑size variables used.

---

## 6. Follow-Up Questions

- How would you solve it using a regular expression?
- Can you extend the solution to an arbitrary alphabet where a specific ordering of characters is required?
- What if the string may contain other characters and you need to ignore them?

---

## Key Takeaway

> The problem reduces to detecting the forbidden substring `"ba"`. A linear scan suffices, yielding O(n) time and O(1) space.
