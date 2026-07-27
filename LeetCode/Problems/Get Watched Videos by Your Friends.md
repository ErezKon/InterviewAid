# 1311. Get Watched Videos by Your Friends

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-watched-videos-by-your-friends](https://leetcode.com/problems/get-watched-videos-by-your-friends)
**Companies:** Amazon, Guidewire

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: BFS + Frequency Sort — O(n) ✅](#2-approach-bfs--frequency-sort--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given a social graph and each person's watched videos, find videos watched by friends at distance `level`. Sort by frequency, then alphabetically.

---

## 2. Approach: BFS + Frequency Sort — O(n) ✅

```
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

## 3. Key Takeaway

> **BFS to level K** + **frequency counting** + **sort by (freq, name)**. Standard graph + aggregation pattern.
