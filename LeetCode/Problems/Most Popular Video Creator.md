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

Given arrays `creators`, `ids`, `views`, find the creator(s) with the **highest total views**. For each, return the id of their **most viewed** video (lexicographically smallest if tie).

**Constraints:**
- `1 <= n <= 10⁵`

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

**Example 1:**
```
creators = ["alice","bob","alice","chris"]
ids      = ["one","two","three","four"]
views    = [5,6,5,7]
```
Total views: alice = 10, bob = 6, chris = 7 → max is alice. Most viewed video for alice is "one" (5) vs "three" (5); lexicographically smaller is "one".
**Output:** `[["alice","one"]]`

**Example 2 (tie):**
```
creators = ["alice","bob","alice","bob"]
ids      = ["one","two","three","four"]
views    = [5,5,5,5]
```
Both alice and bob have total 10. Alice's best video is "one", Bob's best is "four" (lexicographically smaller among ties). 
**Output:** `[["alice","one"],["bob","four"]]`

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
