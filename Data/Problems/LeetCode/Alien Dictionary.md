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

```text
FUNCTION alienOrder(words):
    // Initialize graph with all characters
    graph ← MAP of char → SET of neighbors
    inDegree ← MAP of char → integer
    FOR word IN words:
        FOR ch IN word:
            IF ch NOT IN graph:
                graph[ch] ← SET()
                inDegree[ch] ← 0

    // Build directed edges from adjacent words
    FOR i ← 0 TO LENGTH(words) - 2:
        w1 ← words[i]
        w2 ← words[i+1]
        // Invalid case: longer word appears before its prefix
        IF LENGTH(w1) > LENGTH(w2) AND w1 STARTS_WITH w2:
            RETURN ""
        FOR j ← 0 TO MIN(LENGTH(w1), LENGTH(w2)) - 1:
            IF w1[j] != w2[j]:
                IF w2[j] NOT IN graph[w1[j]]:
                    ADD w2[j] TO graph[w1[j]]
                    inDegree[w2[j]] ← inDegree[w2[j]] + 1
                BREAK

    // Kahn's algorithm for topological ordering
    queue ← ALL chars WHERE inDegree[char] == 0
    result ← ""
    WHILE queue NOT EMPTY:
        ch ← DEQUEUE(queue)
        result ← result + ch
        FOR neighbor IN graph[ch]:
            inDegree[neighbor] ← inDegree[neighbor] - 1
            IF inDegree[neighbor] == 0:
                ENQUEUE(queue, neighbor)

    IF LENGTH(result) != LENGTH(inDegree):
        RETURN ""  // cycle detected
    RETURN result
```

---

## 3. Examples

| words | Output |
|-------|--------|
| ["wrt","wrf","er","ett","rftt"] | "wertf" |
| ["z","x"] | "zx" |
| ["z","z"] | "" |

**Explanation:** The first example yields ordering w → e → r → t → f.

---

## 4. Walkthrough

Consider `words = ["wrt","wrf","er","ett","rftt"]`:
1. Initialize graph with characters {w,r,t,f,e} and zero in‑degrees.
2. Compare "wrt" and "wrf": first differing char at position 2 → edge t → f.
3. Compare "wrf" and "er": first differing char at position 0 → edge w → e.
4. Compare "er" and "ett": first differing char at position 1 → edge r → t.
5. Compare "ett" and "rftt": first differing char at position 0 → edge e → r.
6. After building edges, perform Kahn's algorithm: start with nodes of indegree 0 → w, then process to obtain ordering "wertf".

---

## 5. Complexity Analysis

- **Time:** O(C) where C is total number of characters in all words (building graph + topological sort).
- **Space:** O(V + E) where V is number of distinct characters and E is number of edges.

---

## 6. Follow‑Up Questions

- How would you modify the algorithm to detect multiple valid orderings?
- Can the approach be adapted if the input list is not sorted?
- What if the alien language allows duplicate characters in the ordering?

---

## Key Takeaway

> Extract character ordering constraints from adjacent words in the sorted list, then topological sort. The key edge case: a longer word appearing before its prefix is invalid.
