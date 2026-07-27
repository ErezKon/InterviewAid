# 71. Simplify Path

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/simplify-path](https://leetcode.com/problems/simplify-path)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Capital One, Gojek, Google, Grab, Ibm, Meta, Microsoft, Nvidia, Openai, Oracle, Patreon, Porter, Servicenow, Snowflake, Tiktok, Tinkoff, Uber, Upstart, Visa, Yandex

---

## Problem Description

Given an absolute path for a Unix-style file system, which always begins with a slash `'/'`, transform it into its **simplified canonical path**.

Rules:
- Multiple consecutive slashes are treated as a single slash.
- `"."` refers to the current directory.
- `".."` moves up one directory (if possible).
- Any other sequence is a directory name.

The canonical path starts with `'/'`, directories are separated by a single `'/'`, and it does not end with `'/'` (unless it's the root).

### Examples

**Example 1:**
- **Input:** `path = "/home/"`
- **Output:** `"/home"`

**Example 2:**
- **Input:** `path = "/home//foo/"`
- **Output:** `"/home/foo"`

**Example 3:**
- **Input:** `path = "/home/user/Documents/../Pictures"`
- **Output:** `"/home/user/Pictures"`

**Example 4:**
- **Input:** `path = "/../"`
- **Output:** `"/"`

### Constraints

- `1 <= path.length <= 3000`
- `path` consists of English letters, digits, `.`, `/`, or `_`.

---

## Approach: Stack — O(n) ✅

```
FUNCTION simplifyPath(path):
    stack = []
    parts = path.SPLIT('/')

    FOR part IN parts:
        IF part == '' OR part == '.':
            CONTINUE
        ELSE IF part == '..':
            IF stack: stack.POP()
        ELSE:
            stack.PUSH(part)

    RETURN '/' + '/'.JOIN(stack)
```

### Walkthrough — `path = "/home/user/Documents/../Pictures"`

| part | action | stack |
|------|--------|-------|
| "" | skip | [] |
| "home" | push | ["home"] |
| "user" | push | ["home","user"] |
| "Documents" | push | ["home","user","Documents"] |
| ".." | pop | ["home","user"] |
| "Pictures" | push | ["home","user","Pictures"] |

Result: `"/home/user/Pictures"`

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Split by `/`, ignore empty and `.`, pop on `..`, push valid directory names. Join with `/` and prepend `/`.
