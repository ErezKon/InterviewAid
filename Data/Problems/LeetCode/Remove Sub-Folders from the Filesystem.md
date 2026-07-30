# 1233. Remove Sub-Folders from the Filesystem

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-sub-folders-from-the-filesystem](https://leetcode.com/problems/remove-sub-folders-from-the-filesystem)
**Companies:** Amazon, Google, Meta, Microsoft, Nuro, Snowflake, Uber, Verkada

---

## Problem Description
Given a list of folder paths, remove all subfolders that are contained within another folder in the list. Return the remaining folders in any order. Each path is a string starting with '/' and consists of lowercase English letters separated by '/'.

## Examples
**Example 1:**
```
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: "/a/b" is a subfolder of "/a" and "/c/d/e" is a subfolder of "/c/d".
```
**Example 2:**
```
Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Both "/a/b/c" and "/a/b/d" are subfolders of "/a".
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