# 1023. Camelcase Matching

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/camelcase-matching](https://leetcode.com/problems/camelcase-matching)
**Companies:** Compass, Google

---

## 1. Problem Description

Given a list of queries and a pattern, check if each query matches the pattern by inserting **only lowercase** letters. Uppercase letters must match exactly in order.

---

## 2. Examples

**Example 1:**
```
queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"]
pattern = "FB"
output = [true,false,true,true,false]
```
*Explanation:* "FooBar", "FootBall" and "FrameBuffer" can be reduced to "FB" by deleting lowercase letters. "FooBarTest" contains extra uppercase "T" and fails. "ForceFeedBack" has mismatched uppercase order.

**Example 2:**
```
queries = ["CompetitiveProgramming","CounterPick","ControlPanel"]
pattern = "CPro"
output = [true,false,false]
```
*Explanation:* Only the first query matches the pattern when lowercase letters are removed.

---

## 3. Approach: Two Pointer — O(n × L) ✅

```text
FUNCTION camelMatch(queries, pattern):
    FUNCTION matches(query, pattern):
        j ← 0
        FOR ch IN query:
            IF j < len(pattern) AND ch == pattern[j]:
                j ← j + 1
            ELSE IF ch.isupper():
                RETURN false    // extra uppercase = no match
        RETURN j == len(pattern)
    
    RETURN [matches(q, pattern) for q in queries]
```

| Time | Space |
|------|-------|
| O(n × L) | O(1) extra |

---

## 4. Walkthrough

Consider the first query **"FooBar"** with pattern **"FB"**:
| Step | Query Char | Pattern Index | Action |
|------|------------|---------------|--------|
| 1 | F | 0 | Matches pattern[0] → index becomes 1 |
| 2 | o | 1 | Lowercase, ignored |
| 3 | o | 1 | Lowercase, ignored |
| 4 | B | 1 | Matches pattern[1] → index becomes 2 |
| 5 | a | 2 | Lowercase, ignored |
| 6 | r | 2 | Lowercase, ignored |
End of string, pattern index equals pattern length (2) → **match**.

---

## 5. Complexity Analysis

- **Time:** Each character of every query is visited once → O(total characters) = O(n × L).
- **Space:** Only a few integer pointers are used → O(1) auxiliary space.

---

## Key Takeaway

> Subsequence matching with a constraint: unmatched uppercase letters are forbidden. Two-pointer scan where lowercase mismatches are fine but uppercase mismatches fail.
