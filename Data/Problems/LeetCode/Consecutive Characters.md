# 1446. Consecutive Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/consecutive-characters](https://leetcode.com/problems/consecutive-characters)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Meta

---

## Problem Description
The **power** of the string is the maximum length of a non-empty substring that contains only one unique character.

Given a string `s`, return *the **power** of* `s`.

**Constraints:**
- `1 <= s.length <= 500`
- `s` consists of only lowercase English letters.

## Examples
```
Example 1:
  Input: s = "leetcode"
  Output: 2
  Explanation: The substring "ee" is of length 2 with the character 'e' only.
```
```
Example 2:
  Input: s = "abbcccddddeeeeedcba"
  Output: 5
  Explanation: The substring "eeeee" is of length 5 with the character 'e' only.
```

## Approach
Scan the string while tracking the current run length and the maximum run seen so far.

```text
FUNCTION maxPower(s):
    SET maxLen ← 1
    SET curr ← 1
    FOR i ← 1 TO LEN(s) - 1:
        IF s[i] = s[i-1]:
            SET curr ← curr + 1
        ELSE:
            SET curr ← 1
        SET maxLen ← MAX(maxLen, curr)
    RETURN maxLen
```

## Walkthrough
| Index | Char | curr | maxLen |
|-------|------|------|--------|
| 0 | l | 1 | 1 |
| 1 | e | 1 | 1 |
| 2 | e | 2 | 2 |
| 3 | t | 1 | 2 |
| … | … | … | … |
The maximum `curr` observed is 2, so the answer is 2.

## Complexity Analysis
- **Time:** `O(|s|)` – one pass over the string.
- **Space:** `O(1)` – only a few integer variables.

## Follow-Up Questions
1. How would you modify the algorithm to return the character(s) that achieve the maximum length?
2. Can you solve the problem in a single pass without storing `maxLen` until the end?
3. How would the solution change if the input were a stream of characters?

## Key Takeaway
A linear scan that updates a running count of identical consecutive characters yields the longest run in constant extra space.
