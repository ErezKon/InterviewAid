# 591. Tag Validator

**Difficulty:** 🔴 Hard
**Companies:** Faire, Microsoft
---

## Problem Description
Given a string representing an XML‑like document, determine whether it is valid. The string may contain tags, CDATA sections, and plain text. Tags must be properly nested, start with `<` and end with `>`, and tag names consist only of uppercase letters with length 1‑9. CDATA sections (`<![CDATA[...]]>`) can contain any characters and should be ignored for validation.

## Examples
**Example 1:**
```
Input: "<DIV>This is the first line <![CDATA[<div>]]></DIV>"
Output: true
```
Explanation: The CDATA section is ignored, and the `<DIV>` tag is properly closed.

**Example 2:**
```
Input: "<A><B></A></B>"
Output: false
```
Explanation: Tags are not properly nested.

## Approach
Use a stack to track open tags. Scan the string character by character, handling three cases:
1. When encountering `<![CDATA[`, skip until the matching `]]>`.
2. When encountering a closing tag `</TAG>`, pop and compare with the top of the stack.
3. When encountering an opening tag `<TAG>`, push the tag name onto the stack.
If the stack is empty at the end and no parsing errors occurred, the document is valid.

```text
FUNCTION isValid(code):
    IF code IS EMPTY OR code[0] != '<' OR code[-1] != '>':
        RETURN false
    stack ← []
    i ← 0
    WHILE i < LENGTH(code):
        IF code STARTS_WITH "<![CDATA[" AT i:
            j ← FIND "]]>" FROM i+9
            IF j == -1: RETURN false
            i ← j + 3
        ELSE IF code[i] == '<':
            IF i+1 < LENGTH(code) AND code[i+1] == '/':
                // closing tag
                j ← FIND '>' FROM i+2
                IF j == -1: RETURN false
                tag ← SUBSTRING(code, i+2, j)
                IF stack IS EMPTY OR POP(stack) != tag: RETURN false
                i ← j + 1
                IF stack IS EMPTY AND i != LENGTH(code): RETURN false
            ELSE:
                // opening tag
                j ← FIND '>' FROM i+1
                IF j == -1: RETURN false
                tag ← SUBSTRING(code, i+1, j)
                IF NOT MATCH(tag, REGEX "^[A-Z]{1,9}$"): RETURN false
                PUSH(stack, tag)
                i ← j + 1
        ELSE:
            i ← i + 1
    RETURN stack IS EMPTY
```

## Walkthrough
| Index | Substring | Action | Stack after action |
|-------|-----------|--------|--------------------|
| 0‑4   | `<DIV>`   | push "DIV" | ["DIV"] |
| 5‑... | text …    | ignore | ["DIV"] |
| …‑23  | `<![CDATA[<div>]]>` | skip | ["DIV"] |
| …‑29  | `</DIV>`  | pop "DIV" | [] |
| End   | –         | stack empty → valid |

## Complexity Analysis
- Time: O(n), where n is the length of the input string, each character is processed once.
- Space: O(m), where m is the maximum depth of nested tags (size of the stack).

## Follow‑Up Questions
1. How would you modify the parser to support self‑closing tags like `<br/>`?
2. Can the algorithm be extended to validate XML namespaces?
3. What changes are needed to handle attributes inside tags?

## Key Takeaway
A stack provides a simple way to enforce proper nesting of tags while ignoring CDATA sections.
