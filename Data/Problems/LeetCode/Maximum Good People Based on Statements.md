# 2151. Maximum Good People Based on Statements

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-good-people-based-on-statements](https://leetcode.com/problems/maximum-good-people-based-on-statements)
**Companies:** Microsoft, Oracle, Tusimple

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Bitmask Enumeration — O(2ⁿ · n²)](#approach-bitmask-enumeration--o2ⁿ--n²-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)
- [Examples](#examples)
- [Walkthrough](#walkthrough)

---

## Problem Description

There are two types of persons:

- The **good person**: The person who always tells the truth.
- The **bad person**: The person who might tell the truth and might lie.

You are given a **0-indexed** 2D integer array `statements` of size `n x n` that represents the statements made by `n` people about each other. More specifically, `statements[i][j]` could be one of the following:

- `0` which represents a statement made by person `i` that person `j` is a **bad** person.
- `1` which represents a statement made by person `i` that person `j` is a **good** person.
- `2` represents that **no statement** is made by person `i` about person `j`.

Additionally, no person ever makes a statement about themselves. Formally, we have that `statements[i][i] = 2` for all `0 <= i < n`.

Return *the **maximum** number of people who can be **good** based on the statements made by the *`n`* people*.

**Constraints:**
- `n == statements.length == statements[i].length`
- `2 <= n <= 15`
- `statements[i][j]` is either `0`, `1`, or `2`.
- `statements[i][i] == 2`

---

## Key Insight

> With n ≤ 15, enumerate all 2ⁿ subsets as candidate "good" sets. For each subset, validate: every good person's statements must agree with the subset (if they say someone is good, that person must be in the subset; if bad, not in the subset).

---

## Approach: Bitmask Enumeration — O(2ⁿ · n²) ✅

```text
FUNCTION maximumGood(statements):
    n ← LENGTH(statements)
    result ← 0
    FOR mask ← 0 TO (1 << n) - 1:
        IF isValid(mask, statements):
            result ← MAX(result, POPCOUNT(mask))
    RETURN result

FUNCTION isValid(mask, statements):
    FOR i ← 0 TO n - 1:
        IF NOT (mask & (1 << i)): CONTINUE   // person i not good
        FOR j ← 0 TO n - 1:
            stmt ← statements[i][j]
            IF stmt = 1 AND NOT (mask & (1 << j)): RETURN false   // i says j good but j not in set
            IF stmt = 0 AND (mask & (1 << j)): RETURN false       // i says j bad but j in set
    RETURN true
```

---

## Examples

**Example 1:**
```
Input: statements = [[2,1,2],[1,2,2],[2,0,2]]
Output: 2
Explanation: Each person makes a single statement.
- Person 0 states that person 1 is good.
- Person 1 states that person 0 is good.
- Person 2 states that person 1 is bad.
Let's take person 2 as the key.
- Assuming that person 2 is a good person:
    - Based on the statement made by person 2, person 1 is a bad person.
    - Now we know for sure that person 1 is bad and person 2 is good.
    - Based on the statement made by person 1, and since person 1 is bad, they could be:
        - telling the truth. There will be a contradiction in this case and this assumption is invalid.
        - lying. In this case, person 0 is also a bad person and lied in their statement.
    - Following that person 2 is a good person, there will be only one good person in the group.
- Assuming that person 2 is a bad person:
    - Based on the statement made by person 2, and since person 2 is bad, they could be:
        - telling the truth. Following this scenario, person 0 and 1 are both bad as explained before.
            - Following that person 2 is bad but told the truth, there will be no good persons in the group.
        - lying. In this case person 1 is a good person.
            - Since person 1 is a good person, person 0 is also a good person.
            - Following that person 2 is bad and lied, there will be two good persons in the group.
We can see that at most 2 persons are good in the best case, so we return 2.
Note that there is more than one way to arrive at this conclusion.
```

**Example 2:**
```
Input: statements = [[2,0],[0,2]]
Output: 1
Explanation: Each person makes a single statement.
- Person 0 states that person 1 is bad.
- Person 1 states that person 0 is bad.
Let's take person 0 as the key.
- Assuming that person 0 is a good person:
    - Based on the statement made by person 0, person 1 is a bad person and was lying.
    - Following that person 0 is a good person, there will be only one good person in the group.
- Assuming that person 0 is a bad person:
    - Based on the statement made by person 0, and since person 0 is bad, they could be:
        - telling the truth. Following this scenario, person 0 and 1 are both bad.
            - Following that person 0 is bad but told the truth, there will be no good persons in the group.
        - lying. In this case person 1 is a good person.
            - Following that person 0 is bad and lied, there will be only one good person in the group.
We can see that at most, one person is good in the best case, so we return 1.
Note that there is more than one way to arrive at this conclusion.
```

---

## Walkthrough

| Mask (binary) | Good Set | Valid? | Good Count |
|---------------|----------|--------|------------|
| 111 | {0,1,2} | Invalid (0 says 1 bad) | – |
| 101 | {0,2} | Valid | 2 |
| 010 | {1} | Valid | 1 |
| 001 | {2} | Valid | 1 |
| 100 | {0} | Valid | 1 |

The maximum valid count is **2**.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Bitmask | **O(2ⁿ · n²)** | O(1) |

---

## Key Takeaway

> **Small n → enumerate all subsets as bitmasks.** Validate each subset against the constraint matrix. Classic bitmask brute force.
