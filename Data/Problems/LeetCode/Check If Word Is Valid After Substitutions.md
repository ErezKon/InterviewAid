# 1003. Check If Word Is Valid After Substitutions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-word-is-valid-after-substitutions](https://leetcode.com/problems/check-if-word-is-valid-after-substitutions)
**Companies:** Nutanix

---

## 1. Problem Description

A string is valid if it can be built by repeatedly inserting `"abc"` into itself (starting from empty). Given a string `s`, check if it's valid.

---

## 2. Examples

**Example 1:**
```
Input: s = "aabcbc"
Output: true
Explanation: Insert "abc" twice → "a" + "abc" + "bc" = "aabcbc".
```

**Example 2:**
```
Input: s = "abcabcababcc"
Output: true
Explanation: Build step‑by‑step: "" → "abc" → "abcabc" → "abcabcabc" → "abcabcababcc".
```

**Example 3:**
```
Input: s = "abccba"
Output: false
Explanation: No sequence of "abc" insertions can produce this order.
```

---

## 3. Approach: Stack — O(n) ✅

```text
FUNCTION isValid(s):
    // Use a stack to simulate building the string
    stack ← []
    FOR ch IN s:
        stack.PUSH(ch)
        // Whenever the top three characters form "abc", remove them
        IF stack.SIZE ≥ 3 AND stack[-3:] == ['a','b','c']:
            stack.POP(); stack.POP(); stack.POP()
    RETURN stack.SIZE == 0
```

Similar to removing matching parentheses, but we remove `"abc"` sequences.

---

## 4. Walkthrough

Take `s = "aabcbc"` (Example 1):
1. Push `a` → `[a]`
2. Push `a` → `[a,a]`
3. Push `b` → `[a,a,b]`
4. Push `c` → `[a,a,b,c]` → top three are `a,b,c`? No (they are `a,b,c` starting at index 1). No pop.
5. Push `b` → `[a,a,b,c,b]`
6. Push `c` → `[a,a,b,c,b,c]` → top three `b,c` not `a,b,c`.
7. After processing all characters, stack is empty because the two "abc" subsequences were removed during the scan.

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time   | O(n) – each character processed once |
| Space  | O(n) – worst‑case stack size equals string length |

---

## 6. Follow-Up Questions

* How would you modify the algorithm to handle a different pattern, e.g., "xyz"?
* Can you solve the problem in O(1) extra space by using two‑pointer technique?
* What if the pattern length is variable or given as input?

---

## Key Takeaway

> Stack-based reduction: push characters and pop when the last 3 form `"abc"`. If the stack empties, the string is valid. Same pattern as valid parentheses but with a 3‑char sequence.
