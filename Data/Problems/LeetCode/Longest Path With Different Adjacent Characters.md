# 2246. Longest Path With Different Adjacent Characters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-path-with-different-adjacent-characters](https://leetcode.com/problems/longest-path-with-different-adjacent-characters)
**Companies:** Amazon, Hrt, Microsoft, Target, Uber

---

## 1. Problem Description

You are given a **tree** (i.e. a connected, undirected graph that has no cycles) **rooted** at node `0` consisting of `n` nodes numbered from `0` to `n - 1`. The tree is represented by a **0-indexed** array `parent` of size `n`, where `parent[i]` is the parent of node `i`. Since node `0` is the root, `parent[0] == -1`.

You are also given a string `s` of length `n`, where `s[i]` is the character assigned to node `i`.

Return *the length of the **longest path** in the tree such that no pair of **adjacent** nodes on the path have the same character assigned to them.*

**Constraints:**
- `n == parent.length == s.length`
- `1 <= n <= 10^5`
- `0 <= parent[i] <= n - 1` for all `i >= 1`
- `parent[0] == -1`
- `parent` represents a valid tree.
- `s` consists of only lowercase English letters.

---

## 2. Approach: DFS – O(n) ✅

```
FUNCTION LongestPath(parent, s):
    // Build adjacency list of children
    children ← MAP FROM node TO LIST
    FOR i ← 1 TO n-1:
        children[parent[i]].ADD(i)

    maxPath ← 1

    FUNCTION dfs(node):
        top1 ← top2 ← 0               // two longest valid child chains
        FOR child IN children[node]:
            childLen ← dfs(child)
            IF s[child] != s[node]:
                IF childLen > top1:
                    top2 ← top1
                    top1 ← childLen
                ELSE IF childLen > top2:
                    top2 ← childLen
        // Path through node = top1 + top2 + 1
        maxPath ← MAX(maxPath, top1 + top2 + 1)
        RETURN top1 + 1               // longest chain upward

    dfs(0)
    RETURN maxPath
```

---

## Examples

**Example 1:**
```
Input: parent = [-1,0,0,1,1,2], s = "abacbe"
Output: 3
Explanation: The longest path where each two adjacent nodes have different characters in the tree is the path: 0 -> 1 -> 3. The length of this path is 3, so 3 is returned.
It can be proven that there is no longer path that satisfies the conditions.
```

**Example 2:**
```
Input: parent = [-1,0,0,0], s = "aabc"
Output: 3
Explanation: The longest path where each two adjacent nodes have different characters is the path: 2 -> 0 -> 3. The length of this path is 3, so 3 is returned.
```

---

## Walkthrough

Consider `parent = [0,0,0,1,2]`, `s = "abaca"`.

1. Build children: 0→[1,2,3], 1→[4], 2→[5].
2. DFS on leaf 4 (`s[4]='c'`): returns `1`.
3. Node 1 (`s[1]='b'`): child 4 differs, top1=1 → maxPath=3 (1+0+1).
4. Node 2 (`s[2]='a'`): leaf, returns `1`.
5. Node 0 (`s[0]='a'`): children 1 (`b`) and 2 (`a` same) → only child 1 contributes top1=2, top2=0 → maxPath=4.

---

## Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(n) – adjacency list and recursion stack.

---

## Follow-Up Questions

1. How would you modify the solution if the path must be a *simple* path (no repeated nodes) in an undirected tree?
2. Can the algorithm be extended to handle weighted edges where the goal is to maximize total weight under the character constraint?
3. What changes are needed if the character constraint is relaxed to allow at most `k` equal‑adjacent pairs?

---

## Key Takeaway

> The problem reduces to a tree‑diameter computation where only child branches with a different character can be combined. DFS collects the two longest valid branches at each node.
