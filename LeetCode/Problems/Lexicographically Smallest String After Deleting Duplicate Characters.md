# 3816. Lexicographically Smallest String After Deleting Duplicate Characters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-string-after-deleting-duplicate-characters](https://leetcode.com/problems/lexicographically-smallest-string-after-deleting-duplicate-characters)
**Companies:** Meta, Paytm

---

## 1. Problem Description

Remove duplicate characters so each appears at most once, producing the lexicographically smallest result while preserving relative order.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"cbacdcbc"` | `"acdb"` | The smallest string containing each character once is "acdb". |
| `"bcabc"` | `"abc"` | Remove the first `b` and `c` to obtain the minimal ordering. |

---

## 3. Approach: Monotonic Stack + Last Occurrence — O(n) ✅

Same pattern as "Remove Duplicate Letters" (LC 316).

```text
FUNCTION removeDuplicateLetters(s):
    // record last index of each character
    lastIdx ← MAP from character to its last position in s
    stack ← []
    inStack ← SET()
    FOR i, c IN ENUMERATE(s):
        IF c IN inStack: CONTINUE
        WHILE stack AND c < stack[-1] AND lastIdx[stack[-1]] > i:
            // pop larger char that appears later
            inStack.REMOVE(stack.POP())
        stack.PUSH(c)
        inStack.ADD(c)
    RETURN JOIN(stack)
```

---

## 4. Walkthrough

**Example:** `s = "cbacdcbc"`

| Step | Stack | Reason |
|------|-------|--------|
| i=0, c='c' | ['c'] | Stack empty, push 'c'. |
| i=1, c='b' | ['b'] | 'b' < 'c' and 'c' appears later → pop 'c', push 'b'. |
| i=2, c='a' | ['a'] | 'a' < 'b' and 'b' appears later → pop 'b', push 'a'. |
| i=3, c='c' | ['a','c'] | 'c' not in stack, push. |
| i=4, c='d' | ['a','c','d'] | push 'd'. |
| i=5, c='c' | ['a','c','d'] | 'c' already in stack → skip. |
| i=6, c='b' | ['a','c','d','b'] | 'b' not in stack, push. |
| i=7, c='c' | ['a','c','d','b'] | 'c' already in stack → skip. |

Result: `"acdb"`.

---

## 5. Complexity Analysis

- **Time:** O(n) – each character is pushed/popped at most once.
- **Space:** O(1) extra (bounded by alphabet size, 26 for lowercase letters).

---

## 6. Follow-Up Questions

- How would the solution change for Unicode characters?
- Can the algorithm be adapted to return the k‑th smallest string?
- What if characters may appear more than once but with a limited count?

---

## 7. Key Takeaway

> Monotonic stack: pop larger chars if they appear later. Track last occurrence to know if a char can be safely removed. Classic greedy + stack pattern.
