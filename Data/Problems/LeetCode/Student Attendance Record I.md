# 551. Student Attendance Record I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/student-attendance-record-i](https://leetcode.com/problems/student-attendance-record-i)
**Companies:** Bloomberg, Google

---

## Problem Description

You are given a string `s` representing an attendance record for a student where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:

- `'A'`: Absent.
- `'L'`: Late.
- `'P'`: Present.

The student is eligible for an attendance award if they meet **both** of the following criteria:

- The student was absent (`'A'`) for **strictly** fewer than 2 days **total**.
- The student was **never** late (`'L'`) for 3 or more **consecutive** days.

Return `true` *if the student is eligible for an attendance award, or* `false` *otherwise*.

**Constraints:**
- `1 <= s.length <= 1000`
- `s[i]` is either `'A'`, `'L'`, or `'P'`.

## Examples

**Example 1:**
```
Input: s = "PPALLP"
Output: true
Explanation: The student has fewer than 2 absences and was never late 3 or more consecutive days.
```

**Example 2:**
```
Input: s = "PPALLL"
Output: false
Explanation: The student was late 3 consecutive days in the last 3 days, so is not eligible for the award.
```

## Approach
The problem can be solved with a single linear scan, counting `'A'` occurrences and checking for a substring `'LLL'`. No additional data structures are required.

### Pseudocode
```text
FUNCTION isRewardable(record):
    SET absentCount ← 0
    SET consecutiveLate ← 0
    FOR ch IN record:
        IF ch = 'A':
            SET absentCount ← absentCount + 1
            IF absentCount ≥ 2:
                RETURN false
            SET consecutiveLate ← 0
        ELSE IF ch = 'L':
            SET consecutiveLate ← consecutiveLate + 1
            IF consecutiveLate = 3:
                RETURN false
        ELSE: // 'P'
            SET consecutiveLate ← 0
    RETURN true
```

## Walkthrough
Consider the input `"PPALLP"`:
| Index | Char | absentCount | consecutiveLate | Decision |
|-------|------|-------------|-----------------|----------|
| 0 | P | 0 | 0 | continue |
| 1 | P | 0 | 0 | continue |
| 2 | A | 1 | 0 | continue |
| 3 | L | 1 | 1 | continue |
| 4 | L | 1 | 2 | continue |
| 5 | P | 1 | 0 | end → return true |

## Complexity Analysis
- **Time:** O(n), where n is the length of the string, due to a single pass.
- **Space:** O(1), only constant extra variables are used.

## Follow-Up Questions
1. How would you modify the solution for *Student Attendance Record II*, which allows up to two `'A'` characters?
2. Can you extend the algorithm to count the number of rewardable records of length `n`?
3. How would you handle additional constraints, such as a maximum number of consecutive `'L'` days?

## Key Takeaway
A rewardable attendance record can be verified in linear time by tracking the count of absences and the streak of lates during a single scan.
