# 38. Count and Say

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-and-say](https://leetcode.com/problems/count-and-say)
**Companies:** Amazon, Bloomberg, Expedia, Google, Lg Electronics, Meta, Microsoft, Oracle, Pinterest, Tcs, Veeva, Wix, Zoho

---

## Problem Description
Given an integer `n`, generate the `n`‑th term of the count‑and‑say sequence. The sequence starts with "1" and each subsequent term describes the previous term by counting consecutive identical digits.

## Examples
**Example 1**
```
Input: n = 1
Output: "1"
```
**Example 2**
```
Input: n = 4
Output: "1211"
Explanation: 1 → 11 → 21 → 1211
```

## Approach
Iteratively build each term using run‑length encoding of the previous term.

```text
FUNCTION countAndSay(n):
    SET result ← "1"
    FOR i FROM 2 TO n:
        SET next ← ""
        SET j ← 0
        WHILE j < LENGTH(result):
            SET char ← result[j]
            SET count ← 0
            WHILE j < LENGTH(result) AND result[j] == char:
                SET j ← j + 1
                SET count ← count + 1
            SET next ← next + STRING(count) + char
        SET result ← next
    RETURN result
```

## Walkthrough
For `n = 4`:
| i | result before | next built |
|---|---------------|-----------|
|1|"1"| – |
|2|"1"|"11" (one 1) |
|3|"11"|"21" (two 1s) |
|4|"21"|"1211" (one 2, one 1) |

## Complexity Analysis
- **Time:** O(k) where k is the total length of all generated terms (approximately O(2^n)).
- **Space:** O(k) for storing the current term.

## Follow-Up Questions
1. How would you generate the sequence using recursion?
2. Can you compute the term without constructing all previous terms?
3. What is the length growth rate of the `n`‑th term?

## Key Takeaway
The count‑and‑say sequence is built by repeatedly applying run‑length encoding to the previous term.
