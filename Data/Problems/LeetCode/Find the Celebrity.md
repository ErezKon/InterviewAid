# 277. Find the Celebrity

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-celebrity](https://leetcode.com/problems/find-the-celebrity)
**Companies:** Amazon, Apple, Goldman Sachs, Google, Hubspot, Linkedin, Meta, Microsoft, Nvidia, Tiktok, Toast, Uber

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Two Pass — O(n) ✅](#4-approach-two-pass--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Suppose you are at a party with `n` people labeled from `0` to `n - 1` and among them, there may exist one celebrity. The definition of a celebrity is that all the other `n - 1` people know the celebrity, but the celebrity does not know any of them.

Now you want to find out who the celebrity is or verify that there is not one. You are only allowed to ask questions like: "Hi, A. Do you know B?" to get information about whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given an integer `n` and a helper function `bool knows(a, b)` that tells you whether `a` knows `b`. Implement a function `int findCelebrity(n)`. There will be exactly one celebrity if they are at the party.

Return *the celebrity's label if there is a celebrity at the party*. If there is no celebrity, return `-1`.

**Note** that the `n x n` 2D array `graph` given as input is **not** directly available to you, and instead **only** accessible through the helper function `knows`. `graph[i][j] == 1` represents person `i` knows person `j`, whereas `graph[i][j] == 0` represents person `j` does not know person `i`.

**Constraints:**
- `n == graph.length == graph[i].length`
- `2 <= n <= 100`
- `graph[i][j]` is `0` or `1`.
- `graph[i][i] == 1`

**Follow up:** If the maximum number of allowed calls to the API `knows` is `3 * n`, could you find a solution without exceeding the maximum number of calls?

---

## 2. Examples

```
Example 1:
  Input: graph = [[1,1,0],[0,1,0],[1,1,1]]
  Output: 1
  Explanation: There are three persons labeled with 0, 1 and 2. graph[i][j] = 1 means person i knows
  person j, otherwise graph[i][j] = 0 means person i does not know person j. The celebrity is the person
  labeled as 1 because both 0 and 2 know him but 1 does not know anybody.

Example 2:
  Input: graph = [[1,0,1],[1,1,0],[0,1,1]]
  Output: -1
  Explanation: There is no celebrity.
```

---

## 3. Key Insight

> Each call to `knows(A, B)` eliminates one candidate: if `knows(A, B)` is true, A isn't the celebrity; if false, B isn't. So `n-1` calls find a single candidate, and `2(n-1)` more calls verify.

---

## 4. Approach: Two Pass — O(n) ✅

```
FUNCTION findCelebrity(n):
    // Pass 1: Find candidate
    candidate = 0
    FOR i ← 1 TO n - 1:
        IF knows(candidate, i):
            candidate = i

    // Pass 2: Verify
    FOR i ← 0 TO n - 1:
        IF i == candidate: CONTINUE
        IF knows(candidate, i) OR NOT knows(i, candidate):
            RETURN -1

    RETURN candidate
```

If `knows(A, B)`, A is not the celebrity. If `!knows(A, B)`, B is not the celebrity. Each comparison eliminates one candidate.

---

## 5. Walkthrough

```
n = 3, celebrity = 1

Pass 1 (find candidate):
  candidate=0, i=1: knows(0,1)=true → candidate=1
  candidate=1, i=2: knows(1,2)=false → candidate stays 1

Pass 2 (verify candidate=1):
  i=0: knows(1,0)=false ✓, knows(0,1)=true ✓
  i=2: knows(1,2)=false ✓, knows(2,1)=true ✓

All checks pass → RETURN 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — 3(n-1) API calls at most |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

### 7.1 Why does the candidate elimination work?

At each step we compare two people — one is eliminated. After `n-1` comparisons, only one candidate remains. If a celebrity exists, it must be this candidate.

### 7.2 What if there are multiple celebrities?

By definition there can be at most one celebrity (if A and B are both celebrities, then A knows nobody including B, but B must be known by everyone including A — contradiction since A doesn't know B).

### 7.3 Can you cache `knows()` calls?

Yes — memoize results to avoid redundant API calls. This doesn't improve worst-case but helps in practice.

---

## 8. Key Takeaway

> **Candidate elimination** reduces n candidates to 1 in n-1 comparisons, then O(n) verification confirms. This is a classic example of the "tournament" technique — each comparison eliminates exactly one person.
