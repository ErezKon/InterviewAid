# 388. Longest Absolute File Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-absolute-file-path](https://leetcode.com/problems/longest-absolute-file-path)
**Companies:** Amazon, Google, Meta, Microsoft

---

## 1. Problem Description

Given a file system as a string (using `\n` and `\t` for structure), return the length of the longest absolute path to a file.

---

## 2. Approach: Stack — O(n) ✅

```
FUNCTION lengthLongestPath(input):
    stack = [0]    // cumulative lengths at each depth
    maxLen = 0

    FOR line IN input.split('\n'):
        depth = line.count('\t')
        name = line.lstrip('\t')

        WHILE len(stack) > depth + 1: stack.POP()

        IF '.' IN name:
            maxLen = MAX(maxLen, stack[-1] + len(name))
        ELSE:
            stack.PUSH(stack[-1] + len(name) + 1)    // +1 for '/'

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(depth) |

---

## 3. Key Takeaway

> Stack tracks cumulative path length at each depth. On directory: push cumulative + name + '/'. On file: compare cumulative + name to max. Pop stack when depth decreases.
