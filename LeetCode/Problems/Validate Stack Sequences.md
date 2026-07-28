# 946. Validate Stack Sequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/validate-stack-sequences](https://leetcode.com/problems/validate-stack-sequences)
**Companies:** Amazon, Google, Linkedin, Meta, Microsoft, Sprinklr

---

```text
FUNCTION validateStackSequences(pushed, popped):
    stack = []
    j = 0
    FOR val IN pushed:
        stack.PUSH(val)
        WHILE stack AND stack[-1] == popped[j]:
            stack.POP()
            j += 1
    RETURN j == len(popped)
```

## Problem Description
Given two integer arrays `pushed` and `popped` representing the order of push and pop operations on a stack, determine if the `popped` sequence could be the result of performing the pushes in order and interleaving pops. All elements are distinct.

## Examples
**Example 1:**
```
Input: pushed = [1,2,3,4,5], popped = [4,5,3,2,1]
Output: true
Explanation: Push 1,2,3,4 then pop 4, push 5 then pop 5,3,2,1.
```
**Example 2:**
```
Input: pushed = [1,2,3,4,5], popped = [4,3,5,1,2]
Output: false
Explanation: The sequence cannot be achieved.
```

## Approach
Use a simulated stack. Iterate through `pushed`, pushing each element. After each push, while the top of the stack matches the next element in `popped`, pop it and advance the pop pointer. If all elements are popped, the sequences are valid.

```text
FUNCTION isValid(pushed, popped):
    stack ← []
    j ← 0
    FOR val IN pushed:
        stack.PUSH(val)
        WHILE stack NOT EMPTY AND stack.TOP() = popped[j]:
            stack.POP()
            j ← j + 1
    RETURN j = LENGTH(popped)
```

## Walkthrough
| Step | Action | Stack | j (pop index) |
|------|--------|-------|---------------|
| 1 | PUSH 1 | [1] | 0 |
| 2 | PUSH 2 | [1,2] | 0 |
| 3 | PUSH 3 | [1,2,3] | 0 |
| 4 | PUSH 4 | [1,2,3,4] | 0 |
| 5 | POP (matches 4) | [1,2,3] | 1 |
| 6 | PUSH 5 | [1,2,3,5] | 1 |
| 7 | POP (matches 5) | [1,2,3] | 2 |
| 8 | POP (matches 3) | [1,2] | 3 |
| 9 | POP (matches 2) | [1] | 4 |
|10 | POP (matches 1) | [] | 5 |

All elements popped → valid.

## Complexity Analysis
- **Time:** O(n), each element is pushed and popped at most once.
- **Space:** O(n) for the simulated stack in the worst case.

## Follow-Up Questions
1. How would the solution change if duplicate values were allowed?
2. Can the algorithm be adapted to validate sequences for a queue?
3. What if we need to output the actual sequence of operations?

## Key Takeaway
Simulating the stack with a pointer to the pop sequence provides a linear‑time verification of push/pop order.
