# 2124. Check if All A's Appears Before All B's

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-all-as-appears-before-all-bs](https://leetcode.com/problems/check-if-all-as-appears-before-all-bs)
**Companies:** Bloomberg, Microsoft

---

## 1. Problem Description

Given a string of only `'a'` and `'b'`, check if all `'a'`s appear before all `'b'`s (no `'a'` after any `'b'`).

---

## 2. Approach: Check for "ba" — O(n) ✅

```
FUNCTION checkString(s):
    RETURN "ba" NOT IN s
```

If `'b'` is ever followed by `'a'`, the condition is violated. Equivalently, check that `s` has no substring `"ba"`.

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> The only violation is `'b'` before `'a'`. Just check for the substring `"ba"`. Elegant one-liner.
