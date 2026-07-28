# 1544. Make The String Great

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/make-the-string-great](https://leetcode.com/problems/make-the-string-great)
**Companies:** Amazon, Blackstone, Bloomberg, Google

---

## 1. Problem Description

Remove adjacent characters that are the same letter but different case (e.g., "aA"). Repeat until no more such pairs exist.

---

## 2. Approach: Stack — O(n) ✅

```text
FUNCTION makeGood(s):
    stack ← []
    FOR c IN s:
        IF stack AND stack[-1] != c AND LOWER(stack[-1]) == LOWER(c):
            POP(stack)
        ELSE:
            PUSH(stack, c)
    RETURN JOIN(stack)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
s = "leEeetcode"
```
- Process: "le" → keep, "E" matches "e" (different case) → pop, resulting string "leetcode". **Output:** "leetcode".

**Example 2:**
```
s = "abBAcC"
```
- All adjacent opposite cases cancel out, final string is empty. **Output:** "".

---

## 4. Walkthrough

| Step | Current char | Stack content | Action |
|------|--------------|---------------|--------|
| 1 | `l` | [] | PUSH → [l]
| 2 | `e` | [l] | PUSH → [l, e]
| 3 | `E` | [l, e] | Top `e` opposite case → POP → [l]
| 4 | `e` | [l] | PUSH → [l, e]
| 5 | `e` | [l, e] | Same case, PUSH → [l, e, e]
| ... | ... | ... | ... |

---

## 5. Complexity Analysis

- **Time:** Each character processed once → O(n).
- **Space:** Stack may hold up to n characters in worst case → O(n).

---

## 6. Follow-Up Questions

- How would you modify the algorithm to allow removal of any adjacent pair of identical characters regardless of case?
- Can you solve the problem in O(1) extra space by using the input string as a mutable buffer?

---

## 7. Key Takeaway

> Use a stack to cancel out adjacent opposite‑case letters, yielding the final “good” string.
