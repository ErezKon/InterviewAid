# 269. Alien Dictionary

**Difficulty:** 🔴 Hard
**Acceptance:** 35.0%
**LeetCode:** [https://leetcode.com/problems/alien-dictionary](https://leetcode.com/problems/alien-dictionary)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Coupang, Google, Meta, Microsoft, Nuro, Pocket Gems, Snapchat, Tiktok, Twitter, Uber, Waymo, Wix

---

## 1. Problem Description

Given a sorted list of words in an alien language, derive the order of characters. Return any valid ordering, or `""` if no valid order exists.

---

## 2. Approach: Topological Sort — O(C) ✅

Build a directed graph from adjacent word comparisons, then topological sort.

```
FUNCTION alienOrder(words):
    // Initialize graph: all characters
    graph = {}
    inDegree = {}
    FOR word IN words:
        FOR char IN word:
            graph[char] = set()
            inDegree[char] = 0

    // Build edges from adjacent words
    FOR i ← 0 TO len(words) - 2:
        w1, w2 = words[i], words[i+1]

        // Check for invalid case: "abc" before "ab"
        IF len(w1) > len(w2) AND w1.startsWith(w2):
            RETURN ""

        FOR j ← 0 TO MIN(len(w1), len(w2)) - 1:
            IF w1[j] != w2[j]:
                IF w2[j] NOT IN graph[w1[j]]:
                    graph[w1[j]].ADD(w2[j])
                    inDegree[w2[j]] += 1
                BREAK

    // Kahn's topological sort
    queue = all chars with inDegree == 0
    result = ""
    WHILE queue not empty:
        char = queue.DEQUEUE()
        result += char
        FOR neighbor IN graph[char]:
            inDegree[neighbor] -= 1
            IF inDegree[neighbor] == 0:
                queue.ENQUEUE(neighbor)

    IF len(result) != len(inDegree):
        RETURN ""       // cycle detected

    RETURN result
```

| Time | Space |
|------|-------|
| O(C) total characters | O(V + E) |

---

## Key Takeaway

> Extract character ordering constraints from adjacent words in the sorted list, then topological sort. The key edge case: a longer word appearing before its prefix is invalid.
