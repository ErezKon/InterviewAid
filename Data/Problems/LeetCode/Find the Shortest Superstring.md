# 943. Find the Shortest Superstring

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-shortest-superstring](https://leetcode.com/problems/find-the-shortest-superstring)
**Companies:** De Shaw, Google, Meta
---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask DP (TSP) — O(n²·2ⁿ) ✅](#3-approach-bitmask-dp-tsp--on²2ⁿ-)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of strings, find the shortest string that contains each string as a substring. Return any valid answer.

**Constraints:**
- `1 <= words.length <= 12`
- `1 <= words[i].length <= 20`

---

## 2. Key Insight

> This is the Shortest Superstring problem, reducible to TSP. Precompute pairwise overlaps, then use bitmask DP to find the ordering that maximizes total overlap (minimizing total length).

---

## 3. Approach: Bitmask DP (TSP) — O(n²·2ⁿ) ✅

```text
FUNCTION shortestSuperstring(words):
    n ← LENGTH(words)
    // Precompute overlap[i][j] = max overlap when word j follows word i
    overlap ← n × n array
    FOR i FROM 0 TO n-1:
        FOR j FROM 0 TO n-1:
            IF i != j THEN
                SET maxOverlap ← 0
                FOR k FROM MIN(LENGTH(words[i]), LENGTH(words[j])) DOWNTO 1:
                    IF words[i].endsWith(words[j][0:k]) THEN
                        SET maxOverlap ← k
                        BREAK
                SET overlap[i][j] ← maxOverlap

    // dp[mask][i] = max total overlap ending at word i using words in mask
    dp ← 2^n × n array of -∞
    parent ← 2^n × n array
    FOR i FROM 0 TO n-1 DO
        dp[1<<i][i] ← 0

    FOR mask FROM 1 TO (1<<n)-1 DO
        FOR last FROM 0 TO n-1 DO
            IF mask HAS BIT last THEN
                FOR nxt FROM 0 TO n-1 DO
                    IF NOT mask HAS BIT nxt THEN
                        newMask ← mask OR (1<<nxt)
                        newScore ← dp[mask][last] + overlap[last][nxt]
                        IF newScore > dp[newMask][nxt] THEN
                            dp[newMask][nxt] ← newScore
                            parent[newMask][nxt] ← last

    // Reconstruct path with maximum overlap
    SET end ← argmax_i dp[(1<<n)-1][i]
    SET mask ← (1<<n)-1
    SET path ← []
    WHILE mask > 0 DO
        APPEND end TO path
        SET prev ← parent[mask][end]
        SET mask ← mask XOR (1<<end)
        SET end ← prev
    REVERSE path

    // Build superstring from path
    SET result ← words[path[0]]
    FOR i FROM 1 TO LENGTH(path)-1 DO
        SET o ← overlap[path[i-1]][path[i]]
        APPEND words[path[i]][o:] TO result
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: words = ["catg","ctaagt","gcta","ttca","atgcatc"]
Output: "gctaagttcatgcatc"
Explanation: One possible shortest superstring.
```

**Example 2:**
```
Input: words = ["alex","loves","leetcode"]
Output: "alexlovesleetcode"
```

---

## 5. Walkthrough

For Example 1, compute pairwise overlaps, e.g., overlap["gcta"]["ctaagt"] = 3 because "gcta" ends with "cta". The DP explores all subsets of words, storing the maximum total overlap for each ending word. After filling `dp`, the path with maximum overlap is reconstructed, yielding ordering `["gcta","ctaagt","ttca","catg","atgcatc"]`. Concatenating while removing overlapped prefixes produces `"gctaagttcatgcatc"`.

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n²·2ⁿ) — DP over all subsets and transitions |
| **Space** | O(n·2ⁿ) — DP and parent tables |

---

## 7. Key Takeaway

> **TSP via bitmask DP** — maximize total overlap between consecutive words in the ordering. With n ≤ 12, 2¹² = 4096 states are manageable.
