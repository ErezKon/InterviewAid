# 2456. Most Popular Video Creator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/most-popular-video-creator](https://leetcode.com/problems/most-popular-video-creator)
**Companies:** Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Maps — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given two string arrays `creators` and `ids`, and an integer array `views`, all of length `n`. The `iᵗʰ` video on a platform was created by `creators[i]`, has an id of `ids[i]`, and has `views[i]` views.

The **popularity** of a creator is the **sum** of the number of views on **all** of the creator's videos. Find the creator with the **highest** popularity and the id of their **most** viewed video.

- If multiple creators have the highest popularity, find all of them.
- If multiple videos have the highest view count for a creator, find the lexicographically **smallest** id.

Note: It is possible for different videos to have the same `id`, meaning that `id`s do not uniquely identify a video. For example, two videos with the same ID are considered as distinct videos with their own viewcount.

Return *a **2D array** of **strings*** `answer` *where* `answer[i] = [creatorsᵢ, idᵢ]` *means that* `creatorsᵢ` *has the **highest** popularity and* `idᵢ` *is the **id** of their most **popular** video.* The answer can be returned in any order.

**Constraints:**
- `n == creators.length == ids.length == views.length`
- `1 <= n <= 10⁵`
- `1 <= creators[i].length, ids[i].length <= 5`
- `creators[i]` and `ids[i]` consist only of lowercase English letters.
- `0 <= views[i] <= 10⁵`

---

## 2. Key Insight

> Two maps: `totalViews[creator]` for total, `bestVideo[creator]` for the video with max views (smallest id for tie). Scan once, then filter creators with max total.

---

## 3. Approach: Hash Maps — O(n) ✅

```text
FUNCTION mostPopularCreator(creators, ids, views):
    totalViews ← {}
    bestVideo ← {}
    FOR i ← 0 TO n - 1:
        c ← creators[i]
        id ← ids[i]
        v ← views[i]
        totalViews[c] ← totalViews.GET(c, 0) + v
        IF c NOT IN bestVideo OR v > bestVideo[c][1] OR (v == bestVideo[c][1] AND id < bestVideo[c][0]):
            bestVideo[c] ← (id, v)
    maxTotal ← MAX(totalViews.values())
    RETURN [[c, bestVideo[c][0]] FOR c IN totalViews IF totalViews[c] == maxTotal]
```

---

## 4. Examples

```
Example 1:
  Input: creators = ["alice","bob","alice","chris"], ids = ["one","two","three","four"], views = [5,10,5,4]
  Output: [["alice","one"],["bob","two"]]
  Explanation:
  The popularity of alice is 5 + 5 = 10.
  The popularity of bob is 10.
  The popularity of chris is 4.
  alice and bob are the most popular creators.
  For bob, the video with the highest view count is "two".
  For alice, the videos with the highest view count are "one" and "three". Since "one" is lexicographically smaller than "three", it is included in the answer.
```

```
Example 2:
  Input: creators = ["alice","alice","alice"], ids = ["a","b","c"], views = [1,2,2]
  Output: [["alice","b"]]
  Explanation:
  The videos with id "b" and "c" have the highest view count.
  Since "b" is lexicographically smaller than "c", it is included in the answer.
```

---

## 5. Walkthrough

Take Example 1.
1. Initialize empty maps.
2. Iterate i=0: creator=alice, id=one, views=5 → totalViews[alice]=5, bestVideo[alice]=(one,5).
3. i=1: creator=bob → totalViews[bob]=5, bestVideo[bob]=(two,5).
4. i=2: creator=alice, id=three, views=5 → totalViews[alice]=10. Views equal to current best (5) and "three" > "one", so bestVideo unchanged.
5. i=3: creator=chris → totalViews[chris]=7, bestVideo[chris]=(four,7).
6. After loop, maxTotal = 10.
7. Filter creators with total 10 → only alice. Return [[alice, bestVideo[alice][0]]] = [[alice, "one"]].

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would you modify the solution to return the top k creators by total views?
- Can you solve the problem using a single pass without storing all creators (streaming scenario)?
- How would the approach change if the number of creators is extremely large and does not fit in memory?

---

## 5. Key Takeaway

> **Dual hash maps** — track total views and best video per creator simultaneously. Single pass with composite tie‑breaking.
