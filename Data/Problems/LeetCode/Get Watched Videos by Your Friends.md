# 1311. Get Watched Videos by Your Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-watched-videos-by-your-friends](https://leetcode.com/problems/get-watched-videos-by-your-friends)
**Companies:** Amazon, Guidewire

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: BFS + Frequency Sort — O(n) ✅](#2-approach-bfs--frequency-sort--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given a social graph and each person's watched videos, find videos watched by friends at distance `level`. Sort by frequency, then alphabetically.

---

## 2. Approach: BFS + Frequency Sort — O(n) ✅

```text
FUNCTION watchedVideosByFriends(watchedVideos, friends, id, level):
    // BFS from id to find all friends at exactly 'level' hops
    visited ← {id}; queue ← [id]
    FOR step ← 1 TO level DO
        nextQueue ← []
        FOR node IN queue DO
            FOR friend IN friends[node] DO
                IF friend NOT IN visited THEN
                    visited.ADD(friend); nextQueue.ADD(friend)
        queue ← nextQueue

    // Count video frequencies among level-friends
    freq ← Counter()
    FOR friend IN queue DO
        FOR video IN watchedVideos[friend] DO
            freq[video] += 1

    RETURN sorted(freq.keys(), key=lambda v: (freq[v], v))
```

---

## 3. Examples

| friends | watchedVideos | id | level | Output |
|---------|---------------|----|-------|--------|
| [[2,3],[1,3],[1,2]] | [["A"],["B"],["C"]] | 0 | 1 | ["B","C"] |
| [[1],[0,2],[1]] | [["X"],["Y","Z"],["Y"]] | 0 | 2 | ["Y"] |

---

## 4. Walkthrough

**Example 1**
1. Start from user `0`. Level 1 friends are `2` and `3`.
2. Collect videos: user 2 watched `"B"`, user 3 watched `"C"`.
3. Frequencies: `B:1`, `C:1`. Alphabetical order gives `["B","C"]`.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(N + E) – BFS traversal plus counting videos |
| **Space** | O(N) – visited set and frequency map |

---

## 6. Key Takeaway

> **BFS to level K** + **frequency counting** + **sort by (freq, name)**. Standard graph + aggregation pattern.
