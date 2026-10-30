# 591. Tag Validator

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/tag-validator](https://leetcode.com/problems/tag-validator)
**Companies:** Faire, Microsoft
---

## Problem Description

Given a string representing a code snippet, implement a tag validator to parse the code and return whether it is valid.

A code snippet is valid if all the following rules hold:

- The code must be wrapped in a **valid closed tag**. Otherwise, the code is invalid.
- A **closed tag** (not necessarily valid) has exactly the following format : `<TAG_NAME>TAG_CONTENT</TAG_NAME>`. Among them, `<TAG_NAME>` is the start tag, and `</TAG_NAME>` is the end tag. The TAG_NAME in start and end tags should be the same. A closed tag is **valid** if and only if the TAG_NAME and TAG_CONTENT are valid.
- A **valid** `TAG_NAME` only contain **upper-case letters**, and has length in range [1,9]. Otherwise, the `TAG_NAME` is **invalid**.
- A **valid** `TAG_CONTENT` may contain other **valid closed tags**, **cdata** and any characters (see note1) **EXCEPT** unmatched `<`, unmatched start and end tag, and unmatched or closed tags with invalid TAG_NAME. Otherwise, the `TAG_CONTENT` is **invalid**.
- A start tag is unmatched if no end tag exists with the same TAG_NAME, and vice versa. However, you also need to consider the issue of unbalanced when tags are nested.
- A `<` is unmatched if you cannot find a subsequent `>`. And when you find a `<` or `</`, all the subsequent characters until the next `>` should be parsed as TAG_NAME (not necessarily valid).
- The cdata has the following format : `<![CDATA[CDATA_CONTENT]]>`. The range of `CDATA_CONTENT` is defined as the characters between `<![CDATA[` and the **first subsequent** `]]>`.
- `CDATA_CONTENT` may contain **any characters**. The function of cdata is to forbid the validator to parse `CDATA_CONTENT`, so even it has some characters that can be parsed as tag (no matter valid or invalid), you should treat it as **regular characters**.

**Constraints:**
- `1 <= code.length <= 500`
- `code` consists of English letters, digits, `'<'`, `'>'`, `'/'`, `'!'`, `'['`, `']'`, `'.'`, and `' '`.

## Examples

**Example 1:**
```
Input: code = "<DIV>This is the first line <![CDATA[<div>]]></DIV>"
Output: true
Explanation: The code is wrapped in a closed tag : <DIV> and </DIV>.
The TAG_NAME is valid, the TAG_CONTENT consists of some characters and cdata.
Although CDATA_CONTENT has an unmatched start tag with invalid TAG_NAME, it should be considered as plain text, not parsed as a tag.
So TAG_CONTENT is valid, and then the code is valid. Thus return true.
```

**Example 2:**
```
Input: code = "<DIV>>>  ![cdata[]] <![CDATA[<div>]>]]>]]>>]</DIV>"
Output: true
Explanation: We first separate the code into : start_tag|tag_content|end_tag.
start_tag -> "<DIV>"
end_tag -> "</DIV>"
tag_content could also be separated into : text1|cdata|text2.
text1 -> ">>  ![cdata[]] "
cdata -> "<![CDATA[<div>]>]]>", where the CDATA_CONTENT is "<div>]>"
text2 -> "]]>>]"
The reason why start_tag is NOT "<DIV>>>" is because of the rule 6.
The reason why cdata is NOT "<![CDATA[<div>]>]]>]]>" is because of the rule 7.
```

**Example 3:**
```
Input: code = "<A>  <B> </A>   </B>"
Output: false
Explanation: Unbalanced. If "<A>" is closed, then "<B>" must be unmatched, and vice versa.
```

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
