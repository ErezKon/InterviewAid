# 388. Longest Absolute File Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-absolute-file-path](https://leetcode.com/problems/longest-absolute-file-path)
**Companies:** Amazon, Google, Meta, Microsoft

---

## 1. Problem Description

Given a string representation of a file system where `\n` separates entries and `\t` indicates depth, return the length of the longest absolute path to a file. A file contains a `.` in its name.

---

## 2. Examples

**Example 1:**
```
Input: "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
Output: 20
Explanation: The longest path is "dir/subdir2/file.ext" with length 20.
```

**Example 2:**
```
Input: "a"
Output: 0
Explanation: No file exists, so the longest path length is 0.
```

---

## 3. Approach: Stack — O(n) ✅

```text
FUNCTION lengthLongestPath(input):
    stack ← [0]               // cumulative lengths at each depth (root depth = 0)
    maxLen ← 0
    FOR line IN SPLIT(input, '\n'):
        depth ← COUNT of '\t' at start of line
        name ← line AFTER removing leading '\t's
        // Ensure stack size matches current depth + 1
        WHILE LENGTH(stack) > depth + 1:
            POP(stack)
        IF '.' IN name:       // it's a file
            // current length = length of parent path + length of file name
            maxLen ← MAX(maxLen, stack[-1] + LENGTH(name))
        ELSE:                 // it's a directory
            // add directory length + 1 for '/' and push for deeper levels
            PUSH(stack, stack[-1] + LENGTH(name) + 1)
    RETURN maxLen
```

---

## 4. Walkthrough

Input: `"dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"`
| Step | line | depth | name | action |
|------|------|-------|------|--------|
| 1 | dir | 0 | dir | stack → [0, 4] (4 = 0 + len('dir') + 1) |
| 2 | \tsubdir1 | 1 | subdir1 | stack → [0, 4, 12] |
| 3 | \tsubdir2 | 1 | subdir2 | pop to depth 1, then push 12 (4 + 7 + 1) |
| 4 | \t\tfile.ext | 2 | file.ext | file → candidate length = stack[-1] + 8 = 12 + 8 = 20 → maxLen = 20 |
Result = 20.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – each character processed once | O(d) – depth of directory tree (stack) |

---

## 6. Follow-Up Questions

* How would you modify the algorithm to return the actual longest path string instead of its length?
* Can the solution be adapted for a streamed input where the file system description is read line by line?
* What changes are needed if directories may contain `.` but only files have an extension like `.txt`?

---

## 7. Key Takeaway

> Use a stack to maintain cumulative path lengths at each depth. When encountering a file, compute its full path length using the stack and update the maximum.
