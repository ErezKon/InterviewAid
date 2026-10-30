# 678. Valid Parenthesis String

**Difficulty:** 🟡 Medium
**Acceptance:** 37.0%
**LeetCode:** [https://leetcode.com/problems/valid-parenthesis-string](https://leetcode.com/problems/valid-parenthesis-string)
**Companies:** Alibaba, Amazon, Bloomberg, Goldman Sachs, Google, Jpmorgan, Linkedin, Meta, Microsoft, Motive, Pornhub, Roku, Salesforce, Tekion, Tiktok

---

## 1. Problem Description

Given a string `s` containing only three types of characters: `'('`, `')'` and `'*'`, return `true` *if* `s` *is **valid***.

The following rules define a **valid** string:

- Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
- Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
- Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
- `'*'` could be treated as a single right parenthesis `')'` or a single left parenthesis `'('` or an empty string `""`.

**Constraints:**
- `1 <= s.length <= 100`
- `s[i]` is `'('`, `')'` or `'*'`.

---

## 2. Approach: Track Min/Max Open Count — O(n) ✅

```text
FUNCTION checkValidString(s):
    // minOpen = minimum possible open '(' count, maxOpen = maximum possible open '(' count
    SET minOpen ← 0
    SET maxOpen ← 0

    FOR char IN s:
        IF char == '(':
            SET minOpen ← minOpen + 1
            SET maxOpen ← maxOpen + 1
        ELSE IF char == ')':
            SET minOpen ← minOpen - 1
            SET maxOpen ← maxOpen - 1
        ELSE: // '*'
            // treat '*' as either '(' or ')'
            SET minOpen ← minOpen - 1   // as ')'
            SET maxOpen ← maxOpen + 1   // as '('

        IF maxOpen < 0:
            RETURN false   // too many ')'
        SET minOpen ← MAX(minOpen, 0) // cannot be negative

    RETURN minOpen == 0
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Examples

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "(*)"
Output: true
```

**Example 3:**
```
Input: s = "(*))"
Output: true
```

**Example 4:**
```
Input: s = "("
Output: false
```

---

## 4. Walkthrough

Consider the example `"(*))"`:

1. Start with `minOpen = 0, maxOpen = 0`.
2. Char `(` → `minOpen = 1, maxOpen = 1`.
3. Char `*` → `minOpen = 0` (treat as `)`), `maxOpen = 2` (treat as `(`).
4. Char `)` → `minOpen = -1 → 0` (clamp), `maxOpen = 1`.
5. Char `)` → `minOpen = -1 → 0`, `maxOpen = 0`.
6. End of string: `minOpen == 0`, so the string can be valid.

---

## 5. Complexity Analysis

- **Time:** O(n) – single pass through the string.
- **Space:** O(1) – only two integer counters are used.

---

## 6. Follow-Up Questions

- How would you modify the algorithm to also return one possible valid replacement of `*` characters?
- Can this approach be extended to handle other types of brackets like `{}` and `[]`?
- What is the impact on performance if the string length reaches millions of characters?

---

## Key Takeaway

> Track the **range** of possible open parenthesis counts. `*` expands the range. If 0 is within `[minOpen, maxOpen]` at the end, the string is valid.
