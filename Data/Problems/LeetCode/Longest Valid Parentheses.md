# 32. Longest Valid Parentheses

**Difficulty:** 🔴 Hard
**Acceptance:** 35.0%
**LeetCode:** [https://leetcode.com/problems/longest-valid-parentheses](https://leetcode.com/problems/longest-valid-parentheses)
**Companies:** Accenture, Amazon, Bloomberg, Bookingcom, De Shaw, Flipkart, Google, Ibm, Infosys, Inmobi, Intuit, Linkedin, Makemytrip, Maq Software, Meta, Microsoft, Nielsen, Nike, Nykaa, Oracle, Sprinklr, Tiktok, Uber, Visa, Zoho

---

## 1. Problem Description

Given a string containing just `(` and `)`, return the length of the longest valid (well-formed) parentheses substring.

---

## 2. Examples

```
Example 1: s = "(()"   → 2
Example 2: s = ")()())" → 4
Example 3: s = ""       → 0
```

---

## 3. Approach 1: Stack — O(n) ✅

Push indices onto the stack. The stack bottom always holds the boundary of the last unmatched `)`.

```
FUNCTION longestValidParentheses(s):
    stack = [-1]       // boundary marker
    maxLen = 0

    FOR i ← 0 TO len(s) - 1:
        IF s[i] == '(':
            stack.PUSH(i)
        ELSE:
            stack.POP()
            IF stack is empty:
                stack.PUSH(i)      // new boundary
            ELSE:
                maxLen = MAX(maxLen, i - stack.TOP())

    RETURN maxLen
```

---

## 4. Approach 2: DP — O(n)

`dp[i]` = length of longest valid parentheses ending at index `i`.

```
IF s[i] == ')':
    IF s[i-1] == '(':
        dp[i] = dp[i-2] + 2
    ELSE IF s[i-1] == ')' AND s[i - dp[i-1] - 1] == '(':
        dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]
```

---

## 5. Approach 3: Two-Pass Counter — O(n), O(1) space

```
FUNCTION longestValidParentheses(s):
    maxLen = 0
    // Left to right
    left = right = 0
    FOR char IN s:
        IF char == '(': left++ ELSE: right++
        IF left == right: maxLen = MAX(maxLen, 2*right)
        IF right > left: left = right = 0
    // Right to left (mirror)
    left = right = 0
    FOR char IN REVERSE(s):
        IF char == '(': left++ ELSE: right++
        IF left == right: maxLen = MAX(maxLen, 2*left)
        IF left > right: left = right = 0
    RETURN maxLen
```

| Approach | Time | Space |
|----------|------|-------|
| Stack | O(n) | O(n) |
| DP | O(n) | O(n) |
| **Two-Pass** | **O(n)** | **O(1)** |

---

## Key Takeaway

> The stack approach with a boundary marker is the most intuitive. The two-pass counter approach achieves O(1) space by scanning both directions.
