# 2296. Design a Text Editor

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-a-text-editor](https://leetcode.com/problems/design-a-text-editor)
**Companies:** Amazon, Dropbox, Google, Jane Street, Liberty Mutual, Meta, Microsoft, Rippling, Salesforce, Shopify, Uber

---

## Problem Description

Design a text editor with a cursor supporting `addText`, `deleteText`, `cursorLeft`, and `cursorRight`. The cursor operations must return the last 10 characters to the left of the cursor.

---

## Approach

```
CLASS TextEditor:
    CONSTRUCTOR:
        left = []     // characters left of cursor
        right = []    // characters right of cursor (reversed)

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

## Examples

**Example 1:**
```
Operations: ["TextEditor","addText","addText","cursorLeft","deleteText","cursorRight","addText","cursorLeft","cursorRight"]
Arguments:  [[],["hello"],["world"], [3], [5], [2], ["!"], [4], [5]]
Output:    [null,null,null,"hel",5,"lo!","lo!","lo!","lo!"]
Explanation:
TextEditor te = new TextEditor();
te.addText("hello"); // text = "hello|"
te.addText("world"); // text = "helloworld|"
te.cursorLeft(3); // moves cursor left 3, returns "hel"
te.deleteText(5); // deletes "world", returns 5
te.cursorRight(2); // moves cursor right 2 (no effect), returns "lo!"
te.addText("!"); // text = "hello!|"
te.cursorLeft(4); // returns "lo!"
te.cursorRight(5); // returns "lo!"
```

---

## Walkthrough

| Step | Operation | Left Stack | Right Stack | Returned |
|------|-----------|------------|-------------|----------|
| 1 | `addText("hello")` | h e l l o | – | – |
| 2 | `addText("world")` | h e l l o w o r l d | – | – |
| 3 | `cursorLeft(3)` | h e l l o w | d l r | "hel" |
| 4 | `deleteText(5)` | h e | – | 5 |
| 5 | `cursorRight(2)` | h e | – | "he" (padded to 10) |
| 6 | `addText("!")` | h e ! | – | – |
| 7 | `cursorLeft(4)` | h | e ! | "he!" |
| 8 | `cursorRight(5)` | h e ! | – | "he!" |

---

## Complexity Analysis

- **Time:** Each operation touches at most `k` characters, so `O(k)` where `k` is the number of moved or deleted characters. `addText` is `O(m)` for `m` characters added.
- **Space:** Two stacks store all characters, giving `O(n)` total space for `n` characters in the editor.

---

## Follow-Up Questions

- How would you modify the design to support undo/redo operations?
- Can you achieve `O(1)` time for `cursorLeft`/`cursorRight` by using a balanced binary tree instead of stacks?
- How would you handle very large texts that exceed memory limits?

---

## Key Takeaway

> **Two‑stack cursor model: left stack holds text before the cursor, right stack (reversed) holds text after. Cursor moves are simple push/pop transfers, giving clean `O(k)` operations.**