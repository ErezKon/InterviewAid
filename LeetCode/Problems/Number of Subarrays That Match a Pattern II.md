# 3036. Number of Subarrays That Match a Pattern II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii)
**Companies:** Autodesk, Thoughtworks

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: KMP / Z-Algorithm — O(n + m)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Same as Pattern I but with larger constraints requiring O(n + m) solution.

---

## 2. Key Insight

> Convert `nums` to a difference-sign array. Then pattern matching becomes string matching → use KMP or Z-algorithm.

---

## 3. Approach: KMP / Z-Algorithm — O(n + m) ✅

```text
FUNCTION countMatchingSubarrays(nums, pattern):
    // Convert nums to sign array: sign(nums[i+1] - nums[i])
    text ← []
    FOR i ← 0 TO LENGTH(nums) - 2:
        SET diff ← nums[i+1] - nums[i]
        IF diff > 0:
            APPEND 1 TO text
        ELSE IF diff < 0:
            APPEND -1 TO text
        ELSE:
            APPEND 0 TO text
    // Build failure function for pattern
    failure ← BUILD_FAILURE(pattern)
    // KMP search
    SET i ← 0, j ← 0, count ← 0
    WHILE i < LENGTH(text):
        IF text[i] = pattern[j]:
            SET i ← i + 1
            SET j ← j + 1
            IF j = LENGTH(pattern):
                SET count ← count + 1
                SET j ← failure[j-1]
        ELSE:
            IF j != 0:
                SET j ← failure[j-1]
            ELSE:
                SET i ← i + 1
    RETURN count
```

---

## 4. Examples

| nums | pattern | Output |
|------|---------|--------|
| [1,2,3,4] | [1,1] | 2 |
| [5,3,1,2] | [-1,-1] | 1 |
| [1,1,1,1] | [0,0] | 2 |

*Explanation:* The sign array for the first example is `[1,1,1]`. The pattern `[1,1]` appears twice.

---

## 5. Walkthrough

Consider `nums = [5,3,1,2]` and `pattern = [-1,-1]`.

1. **Build sign array**: differences are `[-2, -2, 1]` → sign array `[-1, -1, 1]`.
2. **KMP failure table** for pattern `[-1, -1]` is `[0,1]`.
3. **Search**:
   - Compare first two signs `-1,-1` → match → count = 1.
   - Continue scanning, no further matches.
4. **Result**: Only one subarray matches the pattern.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n + m) |
| **Space** | O(m) for failure function |

---

## 7. Follow-Up Questions

- How would you handle patterns with wildcards (e.g., any positive difference)?
- Can you adapt the solution for streaming data where the array is received incrementally?
- What changes are needed if the pattern length is very large compared to the array?

---

## 8. Key Takeaway

> **Reduce to string matching on the difference-sign array.** KMP or Z-algorithm gives linear time. Classic reduction from subarray pattern to string matching.
