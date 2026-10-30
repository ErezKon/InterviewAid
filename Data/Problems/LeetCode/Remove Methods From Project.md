# 3310. Remove Methods From Project

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-methods-from-project](https://leetcode.com/problems/remove-methods-from-project)
**Companies:** Bloomberg

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented "filter deprecated names" problem. Correct idea: DFS/BFS from `k` over `invocations` to mark all suspicious methods; then scan every edge `[a, b]` — if `a` is not suspicious but `b` is, removal is impossible, return all `0..n-1`; otherwise return the non-suspicious methods. O(n + m).*

You are maintaining a project that has `n` methods numbered from `0` to `n - 1`.

You are given two integers `n` and `k`, and a 2D integer array `invocations`, where `invocations[i] = [a_i, b_i]` indicates that method `a_i` invokes method `b_i`.

There is a known bug in method `k`. Method `k`, along with any method invoked by it, either **directly** or **indirectly**, are considered **suspicious** and we aim to remove them.

A group of methods can only be removed if no method **outside** the group invokes any methods **within** it.

Return an array containing all the remaining methods after removing all the **suspicious** methods. You may return the answer in *any order*. If it is not possible to remove **all** the suspicious methods, **none** should be removed.

**Constraints:**
- `1 <= n <= 10^5`
- `0 <= k <= n - 1`
- `0 <= invocations.length <= 2 * 10^5`
- `invocations[i] == [a_i, b_i]`
- `0 <= a_i, b_i <= n - 1`
- `a_i != b_i`
- `invocations[i] != invocations[j]`

## Examples

**Example 1:**
```
Input: n = 4, k = 1, invocations = [[1,2],[0,1],[3,2]]
Output: [0,1,2,3]
Explanation:
Method 2 and method 1 are suspicious, but they are directly invoked by methods 3 and 0, which are not suspicious. We return all elements without removing anything.
```

**Example 2:**
```
Input: n = 5, k = 0, invocations = [[1,2],[0,2],[0,1],[3,4]]
Output: [3,4]
Explanation:
Methods 0, 1, and 2 are suspicious and they are not directly invoked by any other method. We can remove them.
```

**Example 3:**
```
Input: n = 3, k = 2, invocations = [[1,2],[0,1],[2,0]]
Output: []
Explanation:
All methods are suspicious. We can remove them.
```

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
