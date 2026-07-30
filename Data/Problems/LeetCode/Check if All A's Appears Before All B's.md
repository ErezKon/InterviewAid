# 2124. Check if All A's Appears Before All B's

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-as-appears-before-all-bs](https://leetcode.com/problems/check-if-all-as-appears-before-all-bs)
**Companies:** Bloomberg, Microsoft

---

## 1. Problem Description

Given a string consisting only of characters `'a'` and `'b'`, determine whether every `'a'` appears before any `'b'`. In other words, the string must not contain the substring `"ba"`.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"aaabbb"` | `true` | All `'a'`s come before `'b'`s. |
| `"abab"`   | `false`| Contains `"ba"` at positions 2‑3. |
| `"bbbb"`   | `true` | No `'a'` present, condition vacuously holds. |

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
