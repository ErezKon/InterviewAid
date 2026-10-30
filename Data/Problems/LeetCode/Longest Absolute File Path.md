# 388. Longest Absolute File Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-absolute-file-path](https://leetcode.com/problems/longest-absolute-file-path)
**Companies:** Amazon, Google, Meta, Microsoft

---

## 1. Problem Description

Suppose we have a file system that stores both files and directories. An example of one system is represented in the following picture:

![img](https://assets.leetcode.com/uploads/2020/08/28/mdir.jpg)

Here, we have `dir` as the only directory in the root. `dir` contains two subdirectories, `subdir1` and `subdir2`. `subdir1` contains a file `file1.ext` and subdirectory `subsubdir1`. `subdir2` contains a subdirectory `subsubdir2`, which contains a file `file2.ext`.

In text form, it looks like this (with ⟶ representing the tab character):

```
dir
⟶ subdir1
⟶ ⟶ file1.ext
⟶ ⟶ subsubdir1
⟶ subdir2
⟶ ⟶ subsubdir2
⟶ ⟶ ⟶ file2.ext
```

If we were to write this representation in code, it will look like this: `"dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"`. Note that the `'\n'` and `'\t'` are the new-line and tab characters.

Every file and directory has a unique **absolute path** in the file system, which is the order of directories that must be opened to reach the file/directory itself, all concatenated by `'/'s`. Using the above example, the **absolute path** to `file2.ext` is `"dir/subdir2/subsubdir2/file2.ext"`. Each directory name consists of letters, digits, and/or spaces. Each file name is of the form `name.extension`, where `name` and `extension` consist of letters, digits, and/or spaces.

Given a string `input` representing the file system in the explained format, return *the length of the **longest absolute path** to a **file** in the abstracted file system*. If there is no file in the system, return `0`.

**Note** that the testcases are generated such that the file system is valid and no file or directory name has length 0.

**Constraints:**
- `1 <= input.length <= 10^4`
- `input` may contain lowercase or uppercase English letters, a new line character `'\n'`, a tab character `'\t'`, a dot `'.'`, a space `' '`, and digits.
- All file and directory names have **positive** length.

---

## 2. Examples

**Example 1:**
```
Input: input = "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"
Output: 20
Explanation: We have only one file, and the absolute path is "dir/subdir2/file.ext" of length 20.
```

**Example 2:**
```
Input: input = "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"
Output: 32
Explanation: We have two files:
"dir/subdir1/file1.ext" of length 21
"dir/subdir2/subsubdir2/file2.ext" of length 32.
We return 32 since it is the longest absolute path to a file.
```

**Example 3:**
```
Input: input = "a"
Output: 0
Explanation: We do not have any files, just a single directory named "a".
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
