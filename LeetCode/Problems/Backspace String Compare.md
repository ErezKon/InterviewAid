# 844. Backspace String Compare

**Difficulty:** 🟢 Easy
**Acceptance:** 48.0%
**LeetCode:** [https://leetcode.com/problems/backspace-string-compare](https://leetcode.com/problems/backspace-string-compare)
**Companies:** Agoda, Amazon, Bloomberg, Goldman Sachs, Google, Ibm, Meta, Microsoft, Microstrategy, Oracle, Roku, Salesforce, Wayfair, Wells Fargo

---

## 1. Problem Description

Given two strings `s` and `t`, each may contain the character `#` representing a backspace. Return `true` if the final strings after applying all backspaces are equal.

---

## 2. Approach 1: Stack — O(n)

```text
FUNCTION process(str):
    stack = []
    FOR ch IN str:
        IF ch != '#':
            stack.APPEND(ch)
        ELSE IF stack:
            stack.POP()
    RETURN stack

RETURN process(s) == process(t)
```

## 3. Approach 2: Two Pointers from End — O(n) time, O(1) space ✅

```text
FUNCTION backspaceCompare(s, t):
    i ← LEN(s) - 1
    j ← LEN(t) - 1
    WHILE i >= 0 OR j >= 0:
        i ← getNextValidIndex(s, i)
        j ← getNextValidIndex(t, j)
        IF i >= 0 AND j >= 0 AND s[i] != t[j]:
            RETURN false
        IF (i >= 0) != (j >= 0):
            RETURN false
        i ← i - 1
        j ← j - 1
    RETURN true

FUNCTION getNextValidIndex(str, idx):
    skip ← 0
    WHILE idx >= 0:
        IF str[idx] == '#':
            skip ← skip + 1
            idx ← idx - 1
        ELSE IF skip > 0:
            skip ← skip - 1
            idx ← idx - 1
        ELSE:
            BREAK
    RETURN idx
```

---

## 4. Examples

**Example 1:**
```
s = "ab#c"
t = "ad#c"
output = true
```
*Explanation:* Both become "ac" after processing.

**Example 2:**
```
s = "ab##"
t = "c#d#"
output = true
```
*Explanation:* Both become empty strings.

**Example 3:**
```
s = "a#c"
t = "b"
output = false
```
*Explanation:* "c" vs "b" are different.

---

## 5. Walkthrough (Two‑Pointer Method)

| Step | s index | t index | s char | t char | skipS | skipT | Action |
|------|---------|---------|-------|-------|------|------|--------|
| 1 | 3 | 0 | 'c' | 'b' | 0 | 0 | chars differ → return false |

In Example 3, after handling backspaces, the pointers land on `'c'` and `'b'`, leading to a mismatch.

---

## 6. Complexity Analysis

- **Time:** O(n) – each string is scanned at most twice.
- **Space:** O(1) – only a few integer variables are used.

---

## 7. Follow‑Up Questions

- How would you extend the solution to handle Unicode characters?
- Can you modify the algorithm to return the final processed strings instead of just a boolean?
- What if the backspace character could delete multiple preceding characters (e.g., a count prefix)?

---

## Key Takeaway

> Processing from the end lets you handle backspaces on‑the‑fly with constant extra space, avoiding the need for auxiliary stacks.
