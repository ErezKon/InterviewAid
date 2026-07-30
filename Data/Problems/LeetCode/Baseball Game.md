# 682. Baseball Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/baseball-game](https://leetcode.com/problems/baseball-game)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Turing
---

## Problem Description
You are given a list of strings `operations` where each element is one of the following:
- An integer `x` – record a new score of `x`.
- "+" – record a new score that is the sum of the previous two scores.
- "D" – record a new score that is double the previous score.
- "C" – invalidate the previous score, removing it.
Return the sum of all valid scores after processing all operations.

## Examples
**Example 1:**
```
Input: operations = ["5","2","C","D","+"]
Output: 30
Explanation: Record 5 and 2, then invalidate 2. Record double of 5 -> 10. Record sum of 5 and 10 -> 15. Total = 5 + 10 + 15 = 30.
```
**Example 2:**
```
Input: operations = ["5","-2","4","C","D","9","+"]
Output: 27
```

## Approach
Use a stack to keep track of valid scores. Iterate through `operations` and apply the rules, pushing or popping as needed. At the end, sum the stack.

```text
FUNCTION calPoints(operations):
    SET stack ← []
    FOR op IN operations:
        IF op == "+":
            SET last ← stack[LEN(stack)-1]
            SET secondLast ← stack[LEN(stack)-2]
            APPEND last + secondLast TO stack
        ELSE IF op == "D":
            APPEND 2 * stack[LEN(stack)-1] TO stack
        ELSE IF op == "C":
            POP stack
        ELSE:
            APPEND INT(op) TO stack
    RETURN SUM(stack)
```

## Walkthrough
| op | stack after op |
|----|----------------|
|"5"|[5]|
|"2"|[5,2]|
|"C"|[5]|
|"D"|[5,10]|
|"+"|[5,10,15]|
Sum = 30.

## Complexity Analysis
- **Time:** O(n) where n = number of operations.
- **Space:** O(n) for the stack (worst case all operations are scores).

## Follow‑Up Questions
1. How would you compute the total without storing the entire stack?
2. Can you extend the problem to support an operation that removes the last two scores?
3. What if the operations are streamed and you must output the running total after each step?

## Key Takeaway
A stack efficiently handles the undo and aggregation operations required by the baseball game scoring rules.
