# 3310. Remove Methods From Project

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-methods-from-project](https://leetcode.com/problems/remove-methods-from-project)
**Companies:** Bloomberg

---

## Problem Description
Given a list of method names used in a software project and a list of deprecated methods, remove all occurrences of the deprecated methods from the project list. Return the cleaned list preserving the original order of the remaining methods.

## Examples
**Example 1:**
```
methods = ["init", "load", "save", "delete", "load"]
deprecated = ["load", "delete"]
output = ["init", "save"]
```
**Explanation:** All `load` and `delete` entries are removed.

**Example 2:**
```
methods = ["start", "stop", "restart"]
deprecated = []
output = ["start", "stop", "restart"]
```
**Explanation:** No methods are deprecated, so the list stays unchanged.

## Approach
Iterate through the `methods` list and keep a hash set of deprecated method names for O(1) lookup. Append each method to the result only if it is not in the deprecated set.

```text
FUNCTION removeDeprecatedMethods(methods, deprecated):
    SET deprecatedSet ← SET FROM deprecated
    SET result ← []
    FOR name IN methods:
        IF name NOT IN deprecatedSet:
            APPEND name TO result
    RETURN result
```

## Walkthrough
| Step | Current method | In deprecatedSet? | Action |
|------|----------------|-------------------|--------|
| 1 | "init" | no | keep → result ["init"] |
| 2 | "load" | yes | skip |
| 3 | "save" | no | keep → result ["init","save"] |
| 4 | "delete" | yes | skip |
| 5 | "load" | yes | skip |

## Complexity Analysis
- **Time:** O(N + D) where N is the number of methods and D is the number of deprecated entries.
- **Space:** O(D) for the deprecated set plus O(N) for the output list.

## Follow-Up Questions
1. How would you perform the removal in‑place without extra space?
2. How would you handle case‑insensitive method names?
3. Can you extend the solution to remove methods based on a pattern (e.g., prefix or suffix)?

## Key Takeaway
Using a hash set for deprecated methods enables linear‑time filtering while preserving order.
