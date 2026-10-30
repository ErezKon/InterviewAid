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

There are `n` people, each person has a unique *id* between `0` and `n-1`. Given the arrays `watchedVideos` and `friends`, where `watchedVideos[i]` and `friends[i]` contain the list of watched videos and the list of friends respectively for the person with `id = i`.

Level **1** of videos are all watched videos by your friends, level **2** of videos are all watched videos by the friends of your friends and so on. In general, the level `k` of videos are all watched videos by people with the shortest path **exactly** equal to `k` with you. Given your `id` and the `level` of videos, return the list of videos ordered by their frequencies (increasing). For videos with the same frequency order them alphabetically from least to greatest.

**Constraints:**
- `n == watchedVideos.length == friends.length`
- `2 <= n <= 100`
- `1 <= watchedVideos[i].length <= 100`
- `1 <= watchedVideos[i][j].length <= 8`
- `0 <= friends[i].length < n`
- `0 <= friends[i][j] < n`
- `0 <= id < n`
- `1 <= level < n`
- if `friends[i]` contains `j`, then `friends[j]` contains `i`

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

```
Example 1:
  Input: watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 1
  Output: ["B","C"]
  Explanation:
  You have id = 0 and your friends are:
  Person with id = 1 -> watchedVideos = ["C"]
  Person with id = 2 -> watchedVideos = ["B","C"]
  The frequencies of watchedVideos by your friends are:
  B -> 1
  C -> 2
```
```
Example 2:
  Input: watchedVideos = [["A","B"],["C"],["B","C"],["D"]], friends = [[1,2],[0,3],[0,3],[1,2]], id = 0, level = 2
  Output: ["D"]
  Explanation:
  You have id = 0 and the only friend of your friends is the person with id = 3.
```

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
