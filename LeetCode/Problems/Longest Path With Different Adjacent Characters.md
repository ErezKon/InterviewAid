# 2246. Longest Path With Different Adjacent Characters

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-path-with-different-adjacent-characters](https://leetcode.com/problems/longest-path-with-different-adjacent-characters)
**Companies:** Amazon, Hrt, Microsoft, Target, Uber

---

## 1. Problem Description

Find the longest path in a tree where no two adjacent nodes have the same character.

---

## 2. Approach: DFS — O(n) ✅

```
FUNCTION longestPath(parent, s):
    children = defaultdict(list)
    FOR i ← 1 TO n - 1: children[parent[i]].ADD(i)

    maxPath = [1]

    FUNCTION dfs(node):
        top1 = top2 = 0    // two longest paths from children
        FOR child IN children[node]:
            childLen = dfs(child)
            IF s[child] != s[node]:
                IF childLen > top1: top2 = top1; top1 = childLen
                ELSE IF childLen > top2: top2 = childLen
        maxPath[0] = MAX(maxPath[0], top1 + top2 + 1)
        RETURN top1 + 1

    dfs(0)
    RETURN maxPath[0]
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Same pattern as "tree diameter": at each node, combine the two longest valid child paths. Only extend through children with different characters. Return the single longest path upward.
