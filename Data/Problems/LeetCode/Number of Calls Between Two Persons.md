# 1699. Number of Calls Between Two Persons

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-calls-between-two-persons](https://leetcode.com/problems/number-of-calls-between-two-persons)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Solution: SQL](#2-solution-sql)
3. [Examples](#3-examples)
4. [Approach](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Report the number of calls and total duration between each pair of persons. Normalize pairs so `person1 < person2`.

---

## 2. Solution: SQL ✅

```sql
SELECT
    LEAST(from_id, to_id) AS person1,
    GREATEST(from_id, to_id) AS person2,
    COUNT(*) AS call_count,
    SUM(duration) AS total_duration
FROM Calls
GROUP BY person1, person2;
```

---

## 3. Examples

| Calls Table (from_id, to_id, duration) | Output (person1, person2, call_count, total_duration) |
|---|---|
| (1,2,5) | (1,2,2,9) |
| (2,1,4) | |
| (1,2,0) | |
| (3,4,3) | (3,4,1,3) |

*Explanation*: Calls between `1` and `2` appear twice (both directions) with total duration `5+4=9`. Pair `(3,4)` appears once.

---

## 4. Approach

**Algorithm**: Use SQL aggregation with canonical ordering.

1. Apply `LEAST` and `GREATEST` to each row to ensure the smaller ID is `person1` and the larger is `person2`.
2. `GROUP BY` the canonical pair.
3. Compute `COUNT(*)` for call count and `SUM(duration)` for total duration.

Pseudocode (language‑agnostic):

```text
FUNCTION aggregateCalls(calls):
    CREATE map ← {}
    FOR each call IN calls:
        SET p1 ← MIN(call.from_id, call.to_id)
        SET p2 ← MAX(call.from_id, call.to_id)
        IF (p1, p2) NOT IN map:
            SET map[(p1,p2)] ← {count: 0, duration: 0}
        INCREMENT map[(p1,p2)].count
        ADD call.duration TO map[(p1,p2)].duration
    RETURN map
```

---

## 5. Walkthrough

Consider the sample calls: `[(1,2,5), (2,1,4), (1,2,0), (3,4,3)]`.

| Step | Call | Canonical Pair | Map after step |
|---|---|---|---|
| 1 | (1,2,5) | (1,2) | {(1,2): {count:1, duration:5}} |
| 2 | (2,1,4) | (1,2) | {(1,2): {count:2, duration:9}} |
| 3 | (1,2,0) | (1,2) | {(1,2): {count:3, duration:9}} |
| 4 | (3,4,3) | (3,4) | {(1,2): {count:3, duration:9}, (3,4): {count:1, duration:3}} |

The final map matches the expected output.

---

## 6. Complexity Analysis

- **Time**: O(N) – one pass over all call records.
- **Space**: O(K) – storage for each unique person pair, where K ≤ N.

---

## 7. Key Takeaway

> Normalizing bidirectional relationships with `LEAST`/`GREATEST` lets a single `GROUP BY` compute aggregated statistics for each unordered pair.
