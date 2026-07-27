# 2296. Design a Text Editor

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-a-text-editor](https://leetcode.com/problems/design-a-text-editor)
**Companies:** Amazon, Dropbox, Google, Jane Street, Liberty Mutual, Meta, Microsoft, Rippling, Salesforce, Shopify, Uber

---

## Problem Description

Design a text editor with cursor supporting `addText`, `deleteText`, `cursorLeft`, `cursorRight`. Cursor operations return last 10 chars to the left.

---

## Key Insight

Two stacks split the text at the cursor. Left stack = text before cursor, right stack = text after cursor (reversed). All operations naturally map to push/pop.

---

## Approach: Two Stacks (Left + Right of cursor) — O(k) ✅

```
CLASS TextEditor:
    CONSTRUCTOR:
        left = []     // chars to the left of cursor
        right = []    // chars to the right (reversed)

    FUNCTION addText(text):
        FOR char IN text: left.PUSH(char)

    FUNCTION deleteText(k):
        deleted = MIN(k, len(left))
        FOR _ ← 0 TO deleted - 1: left.POP()
        RETURN deleted

    FUNCTION cursorLeft(k):
        moves = MIN(k, len(left))
        FOR _ ← 0 TO moves - 1:
            right.PUSH(left.POP())
        RETURN last 10 chars of left as string

    FUNCTION cursorRight(k):
        moves = MIN(k, len(right))
        FOR _ ← 0 TO moves - 1:
            left.PUSH(right.POP())
        RETURN last 10 chars of left as string
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(k) per operation |
| **Space** | O(n) total text |

---

## Key Takeaway

> **Two-stack text editor: left stack holds text before cursor, right stack (reversed) holds text after. Cursor movement = pop from one, push to other. Elegant O(k) per op.**
