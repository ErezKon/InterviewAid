# 3561. Resulting String After Adjacent Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/resulting-string-after-adjacent-removals](https://leetcode.com/problems/resulting-string-after-adjacent-removals)
**Companies:** Meta

---

## Problem Description

You are given a string `s` consisting of lowercase English letters.

You **must** repeatedly perform the following operation while the string `s` has **at least** two **consecutive **characters:

- Remove the **leftmost** pair of **adjacent** characters in the string that are **consecutive** in the alphabet, in either order (e.g., `'a'` and `'b'`, or `'b'` and `'a'`).
- Shift the remaining characters to the left to fill the gap.

Return the resulting string after no more operations can be performed.

**Note:** Consider the alphabet as circular, thus `'a'` and `'z'` are consecutive.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: s = "abc"
Output: "c"
Explanation: - Remove "ab" from the string, leaving "c" as the remaining string.
- No further operations are possible. Thus, the resulting string after all possible removals is "c".
```

**Example 2:**
```
Input: s = "adcb"
Output: ""
Explanation: - Remove "dc" from the string, leaving "ab" as the remaining string.
- Remove "ab" from the string, leaving "" as the remaining string.
- No further operations are possible. Thus, the resulting string after all possible removals is "".
```

**Example 3:**
```
Input: s = "zadb"
Output: "db"
Explanation: - Remove "za" from the string, leaving "db" as the remaining string.
- No further operations are possible. Thus, the resulting string after all possible removals is "db".
```

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
