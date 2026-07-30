# 722. Remove Comments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-comments](https://leetcode.com/problems/remove-comments)
**Companies:** Google, Microsoft, Uber

---

## Problem Description
Given an array of strings representing source code lines, remove all line comments (`//`) and block comments (`/* */`). Return the cleaned code as an array of strings, preserving the original line order and omitting empty lines.

## Examples
**Example 1:**
```
source = ["int main() {", " // initialize", "int a = 0; /* start loop */", "for(int i=0;i<10;i++) {", "    a += i; // accumulate", "}", "}"]
output = ["int main() {", "int a = 0; ", "for(int i=0;i<10;i++) {", "    a += i; ", "}", "}"]
```
**Explanation:** Line comment after `//` and block comment `/* ... */` are removed.

**Example 2:**
```
source = ["a/*comment", "line*/b"]
output = ["ab"]
```
**Explanation:** Block comment spans multiple lines.

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
