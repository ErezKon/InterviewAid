# 2434. Using a Robot to Print the Lexicographically Smallest String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string](https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string)
**Companies:** Amazon, De Shaw, Meta, Nagarro, Salesforce, Tower Research

---

## Problem Description

You are given a string `s` and a robot that currently holds an empty string `t`. Apply one of the following operations until `s` and `t` **are both empty**:

- Remove the **first** character of a string `s` and give it to the robot. The robot will append this character to the string `t`.
- Remove the **last** character of a string `t` and give it to the robot. The robot will write this character on paper.

Return *the lexicographically smallest string that can be written on the paper.*

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists of only English lowercase letters.

## Examples

**Example 1:**
```
Input: s = "zza"
Output: "azz"
Explanation: Let p denote the written string.
Initially p="", s="zza", t="".
Perform first operation three times p="", s="", t="zza".
Perform second operation three times p="azz", s="", t="".
```

**Example 2:**
```
Input: s = "bac"
Output: "abc"
Explanation: Let p denote the written string.
Perform first operation twice p="", s="c", t="ba".
Perform second operation twice p="ab", s="c", t="".
Perform first operation p="ab", s="", t="c".
Perform second operation p="abc", s="", t="".
```

**Example 3:**
```
Input: s = "bdda"
Output: "addb"
Explanation: Let p denote the written string.
Initially p="", s="bdda", t="".
Perform first operation four times p="", s="", t="bdda".
Perform second operation four times p="addb", s="", t="".
```

## Approach
Use a monotonic stack guided by the suffix minimum of the remaining characters. Push each character, and whenever the top of the stack is less than or equal to the smallest character that will appear later, pop it to the output.

```text
FUNCTION RobotLexSmallest(s):
    SET n ← LENGTH(s)
    // Compute suffix minimum characters
    CREATE suffixMin[0…n-1]
    SET suffixMin[n-1] ← s[n-1]
    FOR i ← n-2 DOWN TO 0:
        SET suffixMin[i] ← MIN(s[i], suffixMin[i+1])
    
    CREATE stack ← []
    CREATE result ← []
    FOR i ← 0 TO n-1:
        PUSH s[i] ONTO stack
        SET nextMin ← suffixMin[i+1] IF i+1 < n ELSE '{' // char after 'z'
        WHILE stack NOT EMPTY AND stack[-1] ≤ nextMin:
            APPEND POP(stack) TO result
    RETURN JOIN(result)
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Compute `suffixMin` so each position knows the smallest future character. |
| 2 | Iterate through `s`, pushing each character onto `stack`. |
| 3 | After each push, compare `stack` top with `nextMin`. If top ≤ `nextMin`, pop to `result`. |
| 4 | Continue until all characters are processed; any remaining stack elements are popped at the end. |
| 5 | Join `result` to obtain the lexicographically smallest output. |

## Complexity Analysis
- **Time:** O(n) – one pass to compute suffix minima and one pass to process the stack.
- **Space:** O(n) for the `suffixMin` array and the stack (both ≤ length of `s`).

## Follow-Up Questions
1. How would the solution change if the robot could also peek at the next character without pushing?
2. Can the algorithm be adapted to produce the k‑th smallest possible output?
3. What is the impact on complexity if the input alphabet size is large (e.g., Unicode)?

## Key Takeaway
A monotonic stack combined with suffix minima enables greedy popping to construct the lexicographically smallest string in linear time.
