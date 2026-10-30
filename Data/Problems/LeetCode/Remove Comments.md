# 722. Remove Comments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-comments](https://leetcode.com/problems/remove-comments)
**Companies:** Google, Microsoft, Uber

---

## Problem Description
Given a C++ program, remove comments from it. The program source is an array of strings `source` where `source[i]` is the `iᵗʰ` line of the source code. This represents the result of splitting the original source code string by the newline character `'\n'`.

In C++, there are two types of comments, line comments, and block comments.

- The string `"//"` denotes a line comment, which represents that it and the rest of the characters to the right of it in the same line should be ignored.
- The string `"/*"` denotes a block comment, which represents that all characters until the next (non-overlapping) occurrence of `"*/"` should be ignored. (Here, occurrences happen in reading order: line by line from left to right.) To be clear, the string `"/*/"` does not yet end the block comment, as the ending would be overlapping the beginning.

The first effective comment takes precedence over others.

- For example, if the string `"//"` occurs in a block comment, it is ignored.
- Similarly, if the string `"/*"` occurs in a line or block comment, it is also ignored.

If a certain line of code is empty after removing comments, you must not output that line: each string in the answer list will be non-empty.

There will be no control characters, single quote, or double quote characters.

- For example, `source = "string s = "/* Not a comment. */";"` will not be a test case.

Also, nothing else such as defines or macros will interfere with the comments.

It is guaranteed that every open block comment will eventually be closed, so `"/*"` outside of a line or block comment always starts a new comment.

Finally, implicit newline characters can be deleted by block comments. Please see the examples below for details.

After removing the comments from the source code, return *the source code in the same format*.

**Constraints:**

- `1 <= source.length <= 100`
- `0 <= source[i].length <= 80`
- `source[i]` consists of printable **ASCII** characters.
- Every open block comment is eventually closed.
- There are no single-quote or double-quote in the input.

## Examples

```
Example 1:
  Input: source = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]
  Output: ["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]
  Explanation: The line by line code is visualized as below:
    /*Test program */
    int main()
    {
      // variable declaration
    int a, b, c;
    /* This is a test
       multiline
       comment for
       testing */
    a = b + c;
    }
    The string /* denotes a block comment, including line 1 and lines 6-9. The string // denotes line 4 as comments.
    The line by line output code is visualized as below:
    int main()
    {

    int a, b, c;
    a = b + c;
    }
```

```
Example 2:
  Input: source = ["a/*comment", "line", "more_comment*/b"]
  Output: ["ab"]
  Explanation: The original source string is "a/*comment\nline\nmore_comment*/b", where we have bolded the newline characters. After deletion, the implicit newline characters are deleted, leaving the string "ab", which when delimited by newline characters becomes ["ab"].
```

## Approach
Use a state machine with a boolean `inBlock` indicating whether we are inside a block comment. Iterate character by character, building a buffer for the current line when not in a comment. When a line comment start `//` is encountered outside a block, discard the rest of the line. When a block comment start `/*` is found, set `inBlock` true and skip until the matching `*/`.

## Walkthrough
| Step | Line | inBlock | Buffer after processing | Result |
|------|------|---------|--------------------------|--------|
| 1 | `int main() {` | false | `int main() {` | added |
| 2 | ` // initialize` | false | (empty) – line comment triggers break | skipped |
| 3 | `int a = 0; /* start loop */` | false → true at `/*` → false at `*/` | `int a = 0; ` | added |
| 4 | `for(int i=0;i<10;i++) {` | false | same line | added |
| 5 | `    a += i; // accumulate` | false | `    a += i; ` | added |
| 6 | `}` | false | `}` | added |
| 7 | `}` | false | `}` | added |

## Complexity Analysis
- **Time:** O(N) where N is total number of characters across all lines.
- **Space:** O(L) for the output list plus O(M) for the current line buffer, where M is the maximum line length.

## Follow-Up Questions
1. How would you modify the algorithm to handle nested block comments?
2. Can you process the source in a streaming fashion without storing the entire output?
3. How would you adapt the solution for a language that supports line continuations inside comments?

## Key Takeaway
Maintain a simple state (`inBlock`) while scanning characters to correctly strip both line and block comments in a single pass.
