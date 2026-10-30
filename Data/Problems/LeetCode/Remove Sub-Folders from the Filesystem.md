# 1233. Remove Sub-Folders from the Filesystem

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-sub-folders-from-the-filesystem](https://leetcode.com/problems/remove-sub-folders-from-the-filesystem)
**Companies:** Amazon, Google, Meta, Microsoft, Nuro, Snowflake, Uber, Verkada

---

## Problem Description

Given a list of folders `folder`, return *the folders after removing all **sub-folders** in those folders*. You may return the answer in **any order**.

If a `folder[i]` is located within another `folder[j]`, it is called a **sub-folder** of it. A sub-folder of `folder[j]` must start with `folder[j]`, followed by a `"/"`. For example, `"/a/b"` is a sub-folder of `"/a"`, but `"/b"` is not a sub-folder of `"/a/b/c"`.

The format of a path is one or more concatenated strings of the form: `'/'` followed by one or more lowercase English letters.

- For example, `"/leetcode"` and `"/leetcode/problems"` are valid paths while an empty string and `"/"` are not.

**Constraints:**
- `1 <= folder.length <= 4 * 10^4`
- `2 <= folder[i].length <= 100`
- `folder[i]` contains only lowercase letters and `'/'`.
- `folder[i]` always starts with the character `'/'`.
- Each folder name is **unique**.

## Examples

**Example 1:**
```
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.
```

**Example 2:**
```
Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".
```

**Example 3:**
```
Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]
```

## Approach
Sort the folder list lexicographically so that any subfolder appears immediately after its parent. Iterate through the sorted list, keeping the last folder that was added to the result. If the current folder does not start with the last kept folder plus a '/', it is not a subfolder and is added to the result.

```text
FUNCTION removeSubfolders(folders):
    SORT folders
    result ← []
    FOR each folder IN folders:
        IF result IS EMPTY OR NOT folder.startswith(result[-1] + "/"):
            APPEND folder TO result
    RETURN result
```

## Walkthrough
| Step | Sorted folder | Result so far | Reason |
|------|---------------|--------------|--------|
| 1 | /a | [/a] | result empty, add |
| 2 | /a/b | [/a] | starts with "/a/", skip |
| 3 | /c/d | [/a, /c/d] | does not start with "/a/", add |
| 4 | /c/d/e | [/a, /c/d] | starts with "/c/d/", skip |
| 5 | /c/f | [/a, /c/d, /c/f] | does not start with "/c/d/", add |

## Complexity Analysis
- Time: O(n log n · L) for sorting, where *n* is number of folders and *L* is average path length.
- Space: O(n) for the result list and sorting overhead.

## Follow-Up Questions
1. How would you solve this problem without sorting, using a Trie data structure?
2. Can you modify the algorithm to return the folders in lexicographic order?
3. How would you handle duplicate folder paths in the input?

## Key Takeaway
Sorting folders lexicographically lets you detect subfolders with a simple prefix check, eliminating the need for complex data structures.