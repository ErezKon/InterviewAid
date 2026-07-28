# 3561. Resulting String After Adjacent Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/resulting-string-after-adjacent-removals](https://leetcode.com/problems/resulting-string-after-adjacent-removals)
**Companies:** Meta

---

## Problem Description

Given a string `s`, repeatedly remove any two **adjacent** characters whose alphabetical values differ by exactly 1 (e.g., 'a' and 'b', 'c' and 'd'). Return the final string after no more removals are possible.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"abc"` | `"c"` | Remove `"ab"` (a and b differ by 1), then `"c"` remains. |
| `"acbd"` | `"ad"` | Remove `"cb"` (c and b differ by 1) → `"ad"`. No further removals. |
| `"abdc"` | `"dc"` | Remove `"ab"` → `"dc"`. |

---

## Key Insight

> Use a **stack**: push characters one by one. Before pushing, check if the stack top and current character differ by exactly 1 — if so, pop (remove the pair) instead of pushing. This handles cascading removals automatically.

---

## Approach

```text
FUNCTION resultingString(s)
    stack ← []

    FOR EACH ch IN s DO
        IF stack IS NOT EMPTY AND ABS(ORD(stack.TOP()) - ORD(ch)) == 1 THEN
            stack.POP()
        ELSE
            stack.PUSH(ch)
        END IF
    END FOR

    RETURN JOIN(stack)
END FUNCTION
```

---

## Walkthrough

`s = "abc"`

| Step | Char | Stack before | Action            | Stack after |
|------|------|-------------|-------------------|-------------|
| 1    | 'a'  | []          | Push              | ['a']       |
| 2    | 'b'  | ['a']       | |a-b|=1 → Pop 'a' | []          |
| 3    | 'c'  | []          | Push              | ['c']       |

Result: `"c"` ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — each character pushed/popped at most once |
| Space  | O(n) — stack |

---

## Follow-Up Questions

- How would you modify the algorithm to handle removal of characters with a difference of **k** instead of 1?
- Can this be extended to support removal of non‑adjacent pairs?

---

## Key Takeaway

> Stack-based pair removal is the standard approach for "remove adjacent matching pairs" problems — the stack naturally handles cascading removals that simple iteration would miss.
