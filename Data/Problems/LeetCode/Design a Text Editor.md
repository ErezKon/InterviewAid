# 2296. Design a Text Editor

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/design-a-text-editor](https://leetcode.com/problems/design-a-text-editor)
**Companies:** Amazon, Dropbox, Google, Jane Street, Liberty Mutual, Meta, Microsoft, Rippling, Salesforce, Shopify, Uber

---

## Problem Description

Design a text editor with a cursor that can do the following:

- **Add** text to where the cursor is.
- **Delete** text from where the cursor is (simulating the backspace key).
- **Move** the cursor either left or right.

When deleting text, only characters to the left of the cursor will be deleted. The cursor will also remain within the actual text and cannot be moved beyond it. More formally, we have that `0 <= cursor.position <= currentText.length` always holds.

Implement the `TextEditor` class:

- `TextEditor()` Initializes the object with empty text.
- `void addText(string text)` Appends `text` to where the cursor is. The cursor ends to the right of `text`.
- `int deleteText(int k)` Deletes `k` characters to the left of the cursor. Returns the number of characters actually deleted.
- `string cursorLeft(int k)` Moves the cursor to the left `k` times. Returns the last `min(10, len)` characters to the left of the cursor, where `len` is the number of characters to the left of the cursor.
- `string cursorRight(int k)` Moves the cursor to the right `k` times. Returns the last `min(10, len)` characters to the left of the cursor, where `len` is the number of characters to the left of the cursor.

**Constraints:**
- `1 <= text.length, k <= 40`
- `text` consists of lowercase English letters.
- At most `2 * 10^4` calls **in total** will be made to `addText`, `deleteText`, `cursorLeft` and `cursorRight`.

**Follow-up:** Could you find a solution with time complexity of `O(k)` per call?

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

```
Example 1:
  Input:
  ["TextEditor", "addText", "deleteText", "addText", "cursorRight", "cursorLeft", "deleteText", "cursorLeft", "cursorRight"]
  [[], ["leetcode"], [4], ["practice"], [3], [8], [10], [2], [6]]
  Output:
  [null, null, 4, null, "etpractice", "leet", 4, "", "practi"]
  Explanation:
  TextEditor textEditor = new TextEditor(); // The current text is "|". (The '|' character represents the cursor)
  textEditor.addText("leetcode"); // The current text is "leetcode|".
  textEditor.deleteText(4);       // return 4
                                  // The current text is "leet|".
                                  // 4 characters were deleted.
  textEditor.addText("practice"); // The current text is "leetpractice|".
  textEditor.cursorRight(3);      // return "etpractice"
                                  // The current text is "leetpractice|".
                                  // The cursor cannot be moved beyond the actual text and thus did not move.
                                  // "etpractice" is the last 10 characters to the left of the cursor.
  textEditor.cursorLeft(8);       // return "leet"
                                  // The current text is "leet|practice".
                                  // "leet" is the last min(10, 4) = 4 characters to the left of the cursor.
  textEditor.deleteText(10);      // return 4
                                  // The current text is "|practice".
                                  // Only 4 characters were deleted.
  textEditor.cursorLeft(2);       // return ""
                                  // The current text is "|practice".
                                  // The cursor cannot be moved beyond the actual text and thus did not move.
                                  // "" is the last min(10, 0) = 0 characters to the left of the cursor.
  textEditor.cursorRight(6);      // return "practi"
                                  // The current text is "practi|ce".
                                  // "practi" is the last min(10, 6) = 6 characters to the left of the cursor.
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

> **Two-stack cursor model: left stack holds text before the cursor, right stack (reversed) holds text after. Cursor moves are simple push/pop transfers, giving clean `O(k)` operations.**