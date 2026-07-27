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

In a group of `n` people, a **celebrity** is someone who is known by everyone else but knows nobody. Given an API `knows(a, b)` that returns whether `a` knows `b`, find the celebrity or return `-1`.

Minimize the number of API calls.

**Constraints:**
- `1 <= n <= 100`
- `knows(a, b)` is a black-box API.

---

## 2. Examples

```
Example 1:
  n = 3, celebrity = person 1
  knows(0,1)=true, knows(0,2)=false
  knows(1,0)=false, knows(1,2)=false   ← person 1 knows nobody
  knows(2,0)=false, knows(2,1)=true    ← everyone knows person 1
  Output: 1

Example 2:
  n = 2, no celebrity
  knows(0,1)=true, knows(1,0)=true
  Output: -1 (both know someone)
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
