# 1190. Reverse Substrings Between Each Pair of Parentheses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses](https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses)
**Companies:** Adobe, Agoda, Amazon, Bloomberg, Flipkart, Google, Microsoft, Okta, Oracle

---

## Problem Description

You are given a string `s` that consists of lower case English letters and brackets.

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should **not** contain any brackets.

**Constraints:**
- `1 <= s.length <= 2000`
- `s` only contains lower case English characters and parentheses.
- It is guaranteed that all parentheses are balanced.

---

## Approach: Stack — O(n²) / Wormhole O(n) ✅

### Stack approach:
```text
FUNCTION reverseParentheses(s):
    stack ← [[]]
    FOR char IN s:
        IF char == '(':
            stack.PUSH([])
        ELSE IF char == ')':
            inner ← stack.POP()
            inner.REVERSE()
            stack.TOP().EXTEND(inner)
        ELSE:
            stack.TOP().APPEND(char)
    RETURN JOIN(stack[0])
```

### Wormhole approach:
```text
FUNCTION reverseParentheses(s):
    n ← LENGTH(s)
    pair ← ARRAY[n]
    openStack ← []
    FOR i ← 0 TO n-1:
        IF s[i] == '(':
            openStack.PUSH(i)
        IF s[i] == ')':
            j ← openStack.POP()
            pair[i] ← j; pair[j] ← i
    result ← []
    i ← 0; direction ← 1
    WHILE i >= 0 AND i < n:
        IF s[i] == '(' OR s[i] == ')':
            i ← pair[i]
            direction ← -direction
        ELSE:
            result.APPEND(s[i])
        i ← i + direction
    RETURN JOIN(result)
```

---

## 3. Examples

**Example 1:**
```
Input: s = "(abcd)"
Output: "dcba"
```

**Example 2:**
```
Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.
```

**Example 3:**
```
Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.
```

---

## 4. Walkthrough (Wormhole Approach)

Consider `s = "(u(love)i)"`.
1. Pair parentheses: index 0 ↔ 8, 2 ↔ 7.
2. Start `i=0`, `direction=1`. Encounter '(' at 0 → jump to 8, flip direction to -1.
3. Move left: `i=7` (character 'i') → append 'i'.
4. Continue left until index 2 '(' → jump to 7, flip direction to 1.
5. Move right, reading characters `l','o','v','e'` reversed automatically due to direction flips.
6. Result builds as `"iloveu"`.

---

## 5. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack    | O(n²) — repeated reversals | O(n) |
| Wormhole | O(n) — each character visited once | O(n) |

---

## Key Takeaway

> The "wormhole" technique pairs parentheses and flips traversal direction, turning nested reversals into a single linear pass.
