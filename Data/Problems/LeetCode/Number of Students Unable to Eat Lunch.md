# 1700. Number of Students Unable to Eat Lunch

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-students-unable-to-eat-lunch](https://leetcode.com/problems/number-of-students-unable-to-eat-lunch)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counter — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

The school cafeteria offers circular and square sandwiches at lunch break, referred to by numbers `0` and `1` respectively. All students stand in a queue. Each student either prefers square or circular sandwiches.

The number of sandwiches in the cafeteria is equal to the number of students. The sandwiches are placed in a **stack**. At each step:

- If the student at the front of the queue **prefers** the sandwich on the top of the stack, they will **take it** and leave the queue.
- Otherwise, they will **leave it** and go to the queue's end.

This continues until none of the queue students want to take the top sandwich and are thus unable to eat.

You are given two integer arrays `students` and `sandwiches` where `sandwiches[i]` is the type of the `i^th` sandwich in the stack (`i = 0` is the top of the stack) and `students[j]` is the preference of the `j^th` student in the initial queue (`j = 0` is the front of the queue). Return *the number of students that are unable to eat.*

**Constraints:**
- `1 <= students.length, sandwiches.length <= 100`
- `students.length == sandwiches.length`
- `sandwiches[i]` is `0` or `1`.
- `students[i]` is `0` or `1`.

---

## 2. Key Insight

> Student order doesn't matter — any matching student will eventually reach the top. Process stops when the top sandwich has no matching students left. Just count preferences.

---

## 3. Approach: Counter — O(n) ✅

```text
FUNCTION countStudents(students, sandwiches):
    // Count how many students prefer each type of sandwich
    SET count ← Counter(students)
    FOR s IN sandwiches:
        IF count[s] > 0:
            SET count[s] ← count[s] - 1
        ELSE:
            // No student wants this sandwich, remaining students cannot eat
            RETURN count[0] + count[1]
    RETURN 0
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Examples

**Example 1:**
```
Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
Output: 0
Explanation: - Front student leaves the top sandwich and returns to the end of the line making students = [1,0,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,0,1,1].
- Front student takes the top sandwich and leaves the line making students = [0,1,1] and sandwiches = [1,0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [1,1,0].
- Front student takes the top sandwich and leaves the line making students = [1,0] and sandwiches = [0,1].
- Front student leaves the top sandwich and returns to the end of the line making students = [0,1].
- Front student takes the top sandwich and leaves the line making students = [1] and sandwiches = [1].
- Front student takes the top sandwich and leaves the line making students = [] and sandwiches = [].
Hence all students are able to eat.
```

**Example 2:**
```
Input: students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]
Output: 3
```

---

## 6. Walkthrough

| Step | Student Queue | Sandwich Stack | Action |
|------|---------------|----------------|--------|
| 1 | [1,1,0,0] | [0,1,0,1] | Top sandwich is 0, student 1 cannot eat → moves to back.
| 2 | [1,0,0,1] | [0,1,0,1] | Top sandwich 0 matches student 0 → student eats, remove sandwich.
| 3 | [1,0,1]   | [1,0,1]   | Top sandwich 1 matches student 1 → student eats.
| 4 | [0,1]     | [0,1]   | Continue similarly until no matches remain.

The process stops when a sandwich has no matching student, leaving three students unable to eat.

---

## 7. Key Takeaway

> **Order is irrelevant — only counts matter.** The circular queue means any student wanting the top sandwich will eventually get it. Stop when no student wants the current top.
