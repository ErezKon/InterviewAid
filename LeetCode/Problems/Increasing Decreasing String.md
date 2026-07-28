# 1370. Increasing Decreasing String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/increasing-decreasing-string](https://leetcode.com/problems/increasing-decreasing-string)
**Companies:** Akuna Capital, Amazon, Google

---

## Problem Description

Given a string `s`, sort its characters by repeatedly performing an ascending pass (pick the smallest unused character) followed by a descending pass (pick the largest unused character), and continue until all characters are used. Return the resulting string.

## Examples

**Example 1:**
```
Input: s = "aaaabbbbcccc"
Output: "abccbaabccba"
Explanation: Ascending pass picks 'a', then descending picks 'c', and so on until all characters are placed.
```

**Example 2:**
```
Input: s = "rat"
Output: "art"
Explanation: Ascending pass picks 'a', then descending picks 't', then remaining 'r'.
```

## Approach

**Algorithm:** Bucket Sort with alternating passes — O(n) time.

**Key Insight:** Count frequency of each character (26 letters). Repeatedly iterate from 'a' to 'z' adding one of each available character, then from 'z' to 'a'. Continue until the result length equals the input length.

```text
FUNCTION sortString(s):
    SET count[26] ← array of zeros
    FOR ch IN s:
        SET idx ← ASCII(ch) - ASCII('a')
        INCREMENT count[idx]
    SET result ← []
    WHILE LENGTH(result) < LENGTH(s):
        // Ascending pass
        FOR i ← 0 TO 25:
            IF count[i] > 0:
                APPEND CHAR(i + 'a') TO result
                DECREMENT count[i]
        // Descending pass
        FOR i ← 25 DOWNTO 0:
            IF count[i] > 0:
                APPEND CHAR(i + 'a') TO result
                DECREMENT count[i]
    RETURN JOIN(result)
```

## Walkthrough

| Step | Action | Result |
|------|--------|--------|
| 1 | Count frequencies of "rat" → a:1, r:1, t:1 | count = [a:1, r:1, t:1]
| 2 | Ascending pass: add 'a' | result = "a"
| 3 | Descending pass: add 't' | result = "at"
| 4 | Ascending pass: add remaining 'r' | result = "art"

## Complexity Analysis

- **Time:** O(n) where n is the length of the string (26‑letter alphabet constant).
- **Space:** O(1) extra space for the 26‑size count array plus output string.

## Follow-Up Questions

- How would you modify the algorithm for Unicode characters beyond 'a'‑'z'?
- Can this approach be adapted to sort characters based on custom ordering rules?
- What is the complexity if the alphabet size is not constant?

## Key Takeaway

> Use a frequency bucket for each character and perform alternating ascending/descending sweeps to build the required order in linear time.
