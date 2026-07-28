# 2434. Using a Robot to Print the Lexicographically Smallest String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string](https://leetcode.com/problems/using-a-robot-to-print-the-lexicographically-smallest-string)
**Companies:** Amazon, De Shaw, Meta, Nagarro, Salesforce, Tower Research

---

## Problem Description
You are given a string `s` consisting of lowercase letters. A robot starts with an empty stack and an empty output string. It can perform two operations repeatedly:
1. **Push** the next character of `s` onto the stack.
2. **Pop** the top character from the stack and append it to the output.
The robot must process all characters of `s` in order, and after all operations the output string must be a permutation of `s`. Return the lexicographically smallest possible output string.

## Examples
| s | Output |
|---|--------|
| "zza" | "azz" |
| "bac" | "abc" |
| "bcaab" | "aabbc" |
*The robot can reorder characters via the stack to achieve the smallest lexicographic result.*

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
