# 1538. Guess the Majority in a Hidden Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/guess-the-majority-in-a-hidden-array](https://leetcode.com/problems/guess-the-majority-in-a-hidden-array)
**Companies:** Google

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

Hidden binary array. You can query `query(a, b, c, d)` which returns whether the majority among those 4 indices is 0 or 1. Find the index of the majority element using minimal queries.

---

## 2. Examples

| Array (hidden) | Query result example | Majority index |
|----------------|----------------------|----------------|
| `[0,0,1,0,1]` | `query(0,1,2,3) = 0` | `0` (value `0`) |
| `[1,1,0,1,0]` | `query(0,1,2,3) = 1` | `0` (value `1`) |

**Explanation:** The query returns the majority bit among the four positions. By comparing queries that share three indices, we can infer equality of the fourth index to a reference.

---

## 3. Approach

```
FUNCTION guessMajority(reader):
    baseline = query(0,1,2,3)
    sameCount = 0
    diffCount = 0
    reference = 3
    FOR i FROM 4 TO n-1:
        IF query(0,1,2,i) == baseline:
            // arr[i] == arr[reference]
            sameCount += 1
        ELSE:
            diffCount += 1
    // Determine which group is majority using counts and baseline
    IF sameCount > diffCount:
        RETURN reference   // majority element is at reference index
    ELSE:
        // Find any index that differed from reference
        FOR i FROM 4 TO n-1:
            IF query(0,1,2,i) != baseline:
                RETURN i
    RETURN -1   // no majority
```

---

## 4. Walkthrough

Assume hidden array length `5` and baseline query `query(0,1,2,3) = 0`.

1. Compare `query(0,1,2,4)`. If result equals baseline (`0`), then `arr[4]` matches `arr[3]`; otherwise it differs.
2. Count how many indices match the reference (`arr[3]`). Suppose `sameCount = 2`, `diffCount = 1`.
3. Since `sameCount > diffCount`, the majority bit is the one at the reference index, so return index `3`.

---

## 5. Complexity Analysis

- **Time:** `O(n)` – one query per element after the first four.
- **Space:** `O(1)` – only counters and a few variables.

---

## 6. Follow-Up Questions

- How would the algorithm change if the query returned the exact count of `1`s instead of the majority?
- Can the method be extended to arrays with more than two possible values?
- What is the minimum number of queries required in the worst case?

---

## 7. Key Takeaway

> Clever use of overlapping 4‑element queries lets you compare each element to a reference, achieving `O(n)` queries to locate the majority.
