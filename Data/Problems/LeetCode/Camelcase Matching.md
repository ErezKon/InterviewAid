# 1023. Camelcase Matching

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/camelcase-matching](https://leetcode.com/problems/camelcase-matching)
**Companies:** Compass, Google

---

## 1. Problem Description

Given an array of strings `queries` and a string `pattern`, return a boolean array `answer` where `answer[i]` is `true` if `queries[i]` matches `pattern`, and `false` otherwise.

A query word `queries[i]` matches `pattern` if you can insert lowercase English letters into the pattern so that it equals the query. You may insert a character at any position in pattern or you may choose not to insert any characters **at all**.

**Constraints:**
- `1 <= pattern.length, queries.length <= 100`
- `1 <= queries[i].length <= 100`
- `queries[i]` and `pattern` consist of English letters.

---

## 2. Examples

```
Example 1:
  Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FB"
  Output: [true,false,true,true,false]
  Explanation: "FooBar" can be generated like this "F" + "oo" + "B" + "ar".
  "FootBall" can be generated like this "F" + "oot" + "B" + "all".
  "FrameBuffer" can be generated like this "F" + "rame" + "B" + "uffer".
```

```
Example 2:
  Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBa"
  Output: [true,false,true,false,false]
  Explanation: "FooBar" can be generated like this "Fo" + "o" + "Ba" + "r".
  "FootBall" can be generated like this "Fo" + "ot" + "Ba" + "ll".
```

```
Example 3:
  Input: queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"], pattern = "FoBaT"
  Output: [false,true,false,false,false]
  Explanation: "FooBarTest" can be generated like this "Fo" + "o" + "Ba" + "r" + "T" + "est".
```

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
