# 2678. Number of Senior Citizens

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-senior-citizens](https://leetcode.com/problems/number-of-senior-citizens)
**Companies:** Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Each string encodes passenger info. Characters at indices 11-12 represent age. Count passengers older than 60.

---

## 2. Examples

**Example 1:**
```
Input: details = ["0001 123 45 M", "0002 678 61 F", "0003 910 59 M"]
Output: 1
Explanation: Only the second passenger is older than 60.
```

**Example 2:**
```
Input: details = ["0010 111 62 M", "0011 222 63 F"]
Output: 2
Explanation: Both passengers are seniors.
```

---

## 3. Approach

**Algorithm:** Simple string parsing – O(n)

Iterate over each detail string, extract the two‑character age substring at positions 11‑12, convert to integer, and count if greater than 60.

**Pseudocode:**
```text
FUNCTION countSeniors(details):
    SET count ← 0
    FOR each record IN details:
        SET ageStr ← SUBSTRING(record, 11, 2)
        SET age ← INTEGER(ageStr)
        IF age > 60:
            SET count ← count + 1
    RETURN count
```

---

## 4. Walkthrough

Consider `details = ["0001 123 45 M", "0002 678 61 F"]`.

| Record | ageStr | age | senior? |
|--------|--------|-----|---------|
| "0001 123 45 M" | "45" | 45 | No |
| "0002 678 61 F" | "61" | 61 | Yes |

The loop increments `count` only for the second record, resulting in `count = 1`.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) – one pass over the list |
| **Space** | O(1) – only a few scalar variables |

---

## 6. Follow-Up Questions

1. How would you modify the solution if the age field could appear at variable positions?
2. What if the input size is massive and you need to process the data in a streaming fashion?
3. Could you extend the approach to count passengers within a specific age range?

---

## 7. Key Takeaway

> **Direct substring extraction** from a fixed‑position field enables an O(n) solution for counting senior citizens.
