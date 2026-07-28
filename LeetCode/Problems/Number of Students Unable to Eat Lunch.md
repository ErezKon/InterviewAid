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

Students queue for sandwiches (stack). Each student takes the top sandwich if it matches their preference, else goes to back. Count students who can't eat.

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
students = [1,1,0,0]
sandwiches = [0,1,0,1]
Output: 0
Explanation: All students can eat their preferred sandwich.
```

**Example 2:**
```
students = [1,1,1,0,0,1]
sandwiches = [1,0,0,0,1,1]
Output: 3
Explanation: After the first sandwich, the remaining students cannot eat the remaining sandwiches.
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
