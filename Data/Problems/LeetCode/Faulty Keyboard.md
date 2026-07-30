# 2810. Faulty Keyboard

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/faulty-keyboard](https://leetcode.com/problems/faulty-keyboard)
**Companies:** Samsung

---

## Problem Description

A faulty keyboard types normally except when the character `'i'` is pressed — it reverses the entire string typed so far. Given a string `s`, return the final string after processing all characters in order.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abc"` | `"abc"` | No `'i'` characters, string remains unchanged. |
| `"abic"` | `"cba"` | After `'i'`, the prefix `"ab"` is reversed to `"ba"`, then `'c'` appended → `"cba"`. |
| `"ii"` | `""` | First `'i'` reverses empty string (no effect), second `'i'` reverses empty string again. |

---

## Approach: Simulate with Direction Flag — O(n) ✅

```text
FUNCTION finalString(s):
    deque = []
    forward = TRUE
    FOR ch IN s:
        IF ch == 'i':
            forward = NOT forward
        ELSE IF forward:
            deque.APPEND_RIGHT(ch)
        ELSE:
            deque.APPEND_LEFT(ch)
    IF NOT forward:
        deque.REVERSE()
    RETURN JOIN(deque)
```

The direction flag avoids costly reversals; characters are added to the appropriate end of a deque.

---

## Walkthrough

Input: `"abicd"`
1. `a` → forward, deque: `[a]`
2. `b` → forward, deque: `[a, b]`
3. `i` → toggle forward → false
4. `c` → backward, prepend: `[c, a, b]`
5. `d` → backward, prepend: `[d, c, a, b]`
End flag is false, so reverse deque → `[b, a, c, d]` → result `"bacd"`.

---

## Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| Time   | O(n) — single pass through the string |
| Space  | O(n) — storage for the deque |

---

## Follow-Up Questions

- How would you modify the solution to support multiple special characters that trigger different transformations?
- Can the algorithm be adapted to work in a streaming context with limited memory?
- What if the reversal operation had a cost proportional to the current string length?

---

## Key Takeaway

> **Use a deque with a direction flag to simulate reversals efficiently, achieving O(n) time without repeated full-string reversals.**