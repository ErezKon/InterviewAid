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

There is a survey that consists of `n` questions where each question's answer is either `0` (no) or `1` (yes).

The survey was given to `m` students numbered from `0` to `m - 1` and `m` mentors numbered from `0` to `m - 1`. The answers of the students are represented by a 2D integer array `students` where `students[i]` is an integer array that contains the answers of the `i^th` student (**0-indexed**). The answers of the mentors are represented by a 2D integer array `mentors` where `mentors[j]` is an integer array that contains the answers of the `j^th` mentor (**0-indexed**).

Each student will be assigned to **one** mentor, and each mentor will have **one** student assigned to them. The **compatibility score** of a student-mentor pair is the number of answers that are the same for both the student and the mentor.

- For example, if the student's answers were `[1, 0, 1]` and the mentor's answers were `[0, 0, 1]`, then their compatibility score is 2 because only the second and the third answers are the same.

You are tasked with finding the optimal student-mentor pairings to **maximize** the** sum of the compatibility scores**.

Given `students` and `mentors`, return *the **maximum compatibility score sum** that can be achieved.*

**Constraints:**
- `m == students.length == mentors.length`
- `n == students[i].length == mentors[j].length`
- `1 <= m, n <= 8`
- `students[i][k]` is either `0` or `1`.
- `mentors[j][k]` is either `0` or `1`.

---

## Examples

**Example 1:**
```
Input: students = [[1,1,0],[1,0,1],[0,0,1]], mentors = [[1,0,0],[0,0,1],[1,1,0]]
Output: 8
Explanation: We assign students to mentors in the following way:
- student 0 to mentor 2 with a compatibility score of 3.
- student 1 to mentor 0 with a compatibility score of 2.
- student 2 to mentor 1 with a compatibility score of 3.
The compatibility score sum is 3 + 2 + 3 = 8.
```

**Example 2:**
```
Input: students = [[0,0],[0,0],[0,0]], mentors = [[1,1],[1,1],[1,1]]
Output: 0
Explanation: The compatibility score of any student-mentor pair is 0.
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
