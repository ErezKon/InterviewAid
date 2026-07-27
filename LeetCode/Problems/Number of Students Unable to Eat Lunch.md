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
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Students queue for sandwiches (stack). Each student takes the top sandwich if it matches their preference, else goes to back. Count students who can't eat.

---

## 2. Key Insight

> Student order doesn't matter — any matching student will eventually reach the top. Process stops when the top sandwich has no matching students left. Just count preferences.

---

## 3. Approach: Counter — O(n) ✅

```
FUNCTION countStudents(students, sandwiches):
    count = Counter(students)
    FOR s IN sandwiches:
        IF count[s] > 0:
            count[s] -= 1
        ELSE:
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

## 5. Key Takeaway

> **Order is irrelevant — only counts matter.** The circular queue means any student wanting the top sandwich will eventually get it. Stop when no student wants the current top.
