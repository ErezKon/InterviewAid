# 3310. Remove Methods From Project

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-methods-from-project](https://leetcode.com/problems/remove-methods-from-project)
**Companies:** Bloomberg

---

## Problem Description

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
1. Build the adjacency list of the invocation graph and run an iterative DFS (or BFS) from `k`; every reached node is **suspicious**.
2. The suspicious set can be removed only if no non-suspicious method invokes a suspicious one. Scan every edge `[a, b]`: if `a` is not suspicious but `b` is, removal is impossible, so return all methods `0..n-1`.
3. Otherwise return every non-suspicious method.

(Edges from a suspicious method to a non-suspicious one cannot exist, because DFS would have marked the target.)

```text
FUNCTION remainingMethods(n, k, invocations):
    graph ← array of n empty lists
    FOR each [a, b] IN invocations:
        APPEND b TO graph[a]
    suspicious ← array of n FALSE
    suspicious[k] ← TRUE
    stack ← [k]
    WHILE stack not empty:
        u ← POP(stack)
        FOR v IN graph[u]:
            IF NOT suspicious[v]:
                suspicious[v] ← TRUE
                PUSH v ONTO stack
    // check for an outside caller into the suspicious group
    FOR each [a, b] IN invocations:
        IF NOT suspicious[a] AND suspicious[b]:
            RETURN [0, 1, ..., n-1]
    RETURN [i FOR i ← 0 TO n-1 IF NOT suspicious[i]]
```

## Walkthrough
Example 2: `n = 5, k = 0, invocations = [[1,2],[0,2],[0,1],[3,4]]`

DFS from 0: visit 0 → neighbours 2, 1 → suspicious = {0, 1, 2}.

| Edge [a,b] | a suspicious? | b suspicious? | Outside caller? |
|------------|---------------|---------------|-----------------|
| [1,2] | yes | yes | no |
| [0,2] | yes | yes | no |
| [0,1] | yes | yes | no |
| [3,4] | no | no | no |

No outside caller, so remove {0,1,2}. Result: `[3,4]` — matches the expected output.

(In Example 1, suspicious = {1,2} and edge [0,1] has a non-suspicious caller, so `[0,1,2,3]` is returned.)

## Complexity Analysis
- **Time:** O(n + m), where m = `invocations.length` — one DFS plus one pass over the edges.
- **Space:** O(n + m) for the adjacency list, the visited array and the stack.

## Follow-Up Questions
1. How would you report *which* outside methods block the removal? (Collect every `a` from offending edges.)
2. What if there are several buggy methods `k1, k2, ...`? (Multi-source DFS from all of them; the edge check stays the same.)
3. How would you find the smallest extra set of methods to remove so that removal becomes possible? (Add all ancestors of the suspicious set — i.e. everything that can reach it — then recheck.)

## Key Takeaway
Mark the reachable set with one graph traversal, then a single edge scan checks whether any edge crosses into the set from outside; this decides "remove all or nothing" in linear time.
