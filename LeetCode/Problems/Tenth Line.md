# 195. Tenth Line

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/tenth-line](https://leetcode.com/problems/tenth-line)
**Companies:** Adobe, Bloomberg, Google, Meta
---

## Problem Description
Given a text file, you need to output the content of its 10th line. The file is guaranteed to have at least ten lines. Implement this using a command‑line tool.

## Examples
**Example:**
```
$ cat example.txt
line1
line2
...
line10
line11
$ sed -n '10p' example.txt
line10
```
The command prints exactly the 10th line.

## Approach
Use the `sed` stream editor with the `-n` flag to suppress automatic printing and the `10p` command to print only line 10.

```text
COMMAND: sed -n '10p' <filename>
```

## Walkthrough
| Step | Command executed | Output |
|------|------------------|--------|
| 1 | `sed -n '10p' file.txt` | Prints line 10 of `file.txt` |

## Complexity Analysis
- Time: O(n) where n is the number of lines up to the 10th (constant for this problem).
- Space: O(1) – only the current line is held in memory.

## Follow‑Up Questions
1. How would you modify the command to print a range of lines, e.g., 5‑15?
2. Can you achieve the same result using `awk` or `head`/`tail`?
3. What changes are needed if the file is extremely large and you want to avoid reading the whole file?

## Key Takeaway
`sed -n '10p'` provides a concise way to extract a specific line from a text file without extra processing.
