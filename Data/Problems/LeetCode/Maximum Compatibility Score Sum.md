# 1947. Maximum Compatibility Score Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-compatibility-score-sum](https://leetcode.com/problems/maximum-compatibility-score-sum)
**Companies:** Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given `m` students and `m` mentors, each with an answer array of length `n`, assign each student to exactly one mentor. The compatibility score for a student‑mentor pair equals the number of matching answers. Find the maximum possible total compatibility score across all assignments.

---

## Examples

**Example 1:**
```
students = [[1,1,0],[0,1,1]]
mentors  = [[1,0,0],[0,1,1]]
Output: 4
Explanation: Pair student0 with mentor0 (score 2) and student1 with mentor1 (score 2). Total = 4.
```

**Example 2:**
```
students = [[1,0],[0,1]]
mentors  = [[0,1],[1,0]]
Output: 2
Explanation: Either pairing yields one matching answer per pair, total 2.
```

---

## Approach

**Algorithm:** Bitmask Dynamic Programming

1. Pre‑compute a `score[i][j]` matrix where `score[i][j]` is the compatibility between student `i` and mentor `j`.
2. Use a DP array `dp[mask]` where `mask` represents which mentors have been assigned. `popcount(mask)` gives the index of the next student to assign.
3. Transition: for each unassigned mentor `j`, update `dp[mask | (1<<j)]` with `dp[mask] + score[student][j]`.
4. The answer is `dp[(1<<m) - 1]`.

```text
FUNCTION maxCompatibilitySum(students, mentors):
    m ← LENGTH(students)
    // Pre‑compute scores
    score ← MATRIX(m, m)
    FOR i ← 0 TO m-1:
        FOR j ← 0 TO m-1:
            matches ← 0
            FOR k ← 0 TO LENGTH(students[i])-1:
                IF students[i][k] = mentors[j][k]:
                    matches ← matches + 1
            score[i][j] ← matches
    dp ← ARRAY(1 << m) FILLED WITH 0
    FOR mask ← 0 TO (1 << m) - 1:
        student ← POPCOUNT(mask)
        IF student = m: CONTINUE
        FOR mentor ← 0 TO m-1:
            IF NOT (mask AND (1 << mentor)):
                newMask ← mask OR (1 << mentor)
                dp[newMask] ← MAX(dp[newMask], dp[mask] + score[student][mentor])
    RETURN dp[(1 << m) - 1]
```

---

## Walkthrough

Take `students = [[1,1,0],[0,1,1]]`, `mentors = [[1,0,0],[0,1,1]]`.

| mask (binary) | assigned mentors | student index | best score |
|---------------|------------------|--------------|------------|
| 00            | none             | 0            | 0          |
| 01            | mentor0          | 1            | 2 (student0‑mentor0) |
| 10            | mentor1          | 1            | 2 (student0‑mentor1) |
| 11            | both mentors     | 2            | 4 (optimal) |

The DP builds these states and yields 4.

---

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(m · 2^m)** – pre‑compute scores O(m²·n) and DP over all masks |
| Space  | **O(2^m)** – DP table |

---

## Follow-Up Questions

- How would the solution change if the number of students and mentors differed?
- Can you extend the DP to also output the actual assignment mapping?
- What if compatibility scores were weighted differently for each question?

---

## Key Takeaway

> For small‑scale assignment problems, a bitmask DP efficiently explores all possible pairings while using the mask to track used mentors.
